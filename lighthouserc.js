module.exports = {
    ci: {
        collect: {
            url: [
                'http://localhost:5000/',
                'http://localhost:5000/gallery',
                'http://localhost:5000/sponsor',
                'http://localhost:5000/join',
                'http://localhost:5000/blog',
                'http://localhost:5000/contact'
            ],
            startServerCommand: 'firebase emulators:start',
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};