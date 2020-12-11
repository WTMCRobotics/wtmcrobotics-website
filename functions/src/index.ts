import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as builder from 'xmlbuilder';

admin.initializeApp();
const db = admin.firestore();

const topLevel = ['gallery', 'sponsor', 'join', 'blog', 'contact']

export const sitemap = functions.https.onRequest(async (req, res) => {
    let urls = [{ loc: '', priority: 1 }];
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
