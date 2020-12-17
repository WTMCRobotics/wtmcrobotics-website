import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as builder from 'xmlbuilder';
import * as nodemailer from 'nodemailer';

admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();

const nodemailerTransport = nodemailer.createTransport(functions.config().email?.smtpurl);

const topLevel = ['gallery', 'sponsor', 'join', 'blog', 'contact']

export const sitemap = functions.https.onRequest(async (req, res) => {
    const urls = [{ loc: '', priority: 1 }];
    for (const path of topLevel) {
        urls.push({ loc: '/' + path, priority: 0.8 });
    }
    await db.collection('blogs').where("public", "==", true).orderBy('date', 'desc').get().then(snapshot => {
        for (const doc of snapshot.docs) {
            urls.push({ loc: '/blog/' + doc.id, priority: 0.4 });
        }
    });

    const urlsetElement = builder.create('urlset', { version: '1.0', encoding: 'UTF-8' });

    for (const url of urls) {
        const urlElement = urlsetElement.element('url')
        urlElement.element('loc', undefined, 'https://' + req.hostname + url.loc)
        urlElement.element('priority', undefined, url.priority)
    }

    res.status(200).contentType('application/xml').send(urlsetElement.end());
});

function setEditorData(uid: string, data: { admin: boolean, name: string } | undefined) {
    auth.setCustomUserClaims(uid, { isEditor: Boolean(data), isAdmin: Boolean(data?.admin) })
        .then(() => {
            auth.revokeRefreshTokens(uid)
                .catch(err => {
                    console.error(err)
                });
        })
        .catch(err => {
            console.error(err)
        });
    if (data?.name) {
        auth.updateUser(uid, { displayName: data.name })
            .catch(err => {
                console.error(err)
            });
    }
}

export const updateEditors = functions.firestore.document('/main/editors').onUpdate((change) => {
    const before = change.before.data();
    const after = change.after.data();
    const changedEmails = [];
    for (const email in before) {
        if (after[email] !== before[email]) {
            changedEmails.push(email)
        }
    }
    for (const email in after) {
        if (before[email] === undefined) {
            changedEmails.push(email)
        }
    }
    auth.getUsers(changedEmails.map(email => ({ email }))).then((getUsersResult) => {
        getUsersResult.users.forEach(userRecord => {
            if (userRecord.email && userRecord.emailVerified) {
                setEditorData(userRecord.uid, after[userRecord.email])
            }
        })
    }).catch(err => {
        console.error(err)
    });
});

export const newUser = functions.auth.user().onCreate((user) => {
    if (user.email && user.emailVerified) {
        db.doc('/main/editors').get().then((snapshot) => {
            const editor = snapshot.data()?.[user.email as string];
            if (editor) {
                setEditorData(user.uid, editor);
            }
        }).catch(err => {
            console.error(err)
        });
    }
});

export const sendEmail = functions.https.onCall(async data => {
    if (nodemailerTransport) {
        if (isContactFormData(data)) {
            return await nodemailerTransport.sendMail({
                from: 'wccnet.edu@wccnet.edu',
                to: 'wccnet.edu@wccnet.edu',
                replyTo: data.email,
                subject: `Message from ${data.name}`,
                text: `Message sent by: ${data.name} (${data.email})\n\n${data.message}`,
            }).then((result) => {
                console.log(result)
            }).catch(err => {
                console.log(err)
            });
        }
    } else {
        console.log('cannot find email.smtpurl')
    }
    return 'unknown error'
})

interface contactFormData {
    name: string,
    email: string,
    message: string
}

function isContactFormData(data: any): data is contactFormData {
    if (typeof data?.name !== 'string') {
        return false
    }
    if (typeof data?.email !== 'string' || !/\S +@\S +\.\S +/.test(data.email)) {
        return false
    }
    if (typeof data?.message !== 'string') {
        return false
    }
    return true;
}