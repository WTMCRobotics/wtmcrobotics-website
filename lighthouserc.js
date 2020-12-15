module.exports = {
    ci: {
        collect: {
            url: ['http://localhost:5000/'],
            startServerCommand: 'firebase emulators:start',
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};