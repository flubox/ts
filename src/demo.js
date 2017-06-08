import ts from './index';

const trad = {
    "0": {
        "en_UK": {
            "title": "lorem"
        }
    },
    "1": {
        "en_UK": {
            "title": "ipsum"
        }
    },
    "2": {
        "en_UK": {
            "title": "dolor"
        }
    },
    "3": {
        "en_UK": {
            "title": "sit"
        }
    },
    "4": {
        "en_UK": {
            "title": "amet"
        }
    },
    "5": {
        "en_UK": {
            "title": "consectetur"
        }
    }
};

const debug = Boolean(window.location.search && !!window.location.search.match(/debug/));

const options = {
    debug,
    domElement: '#root',
    // endpoint: 'http://localhost:8080/fakeapi',
    endpoint: () => {
        // Using local fakeapi after `npm run api`
        // return fetch('http://localhost:8080/fakeapi')
        // .then(data => data.json())
        // .then(data => {
        //     if (debug) console.info('data', data);
        //     return new Promise(resolve => {
        //         setTimeout(() => {
        //             resolve({json: () => ({then: resolve => resolve(data)})});
        //         }, 1000);
        //     });
        // });
        // Using github
        return fetch('https://api.github.com/repos/flubox/ts/contents/demo?ref=master')
        .then(data => data.json())
        .then(data => {
            data = data.map((each, id) => ({id, url: [each.download_url]}));
            return new Promise(resolve => {
                //Fake adjustable delay
                setTimeout(() => {
                    resolve({json: () => ({then: resolve => resolve(data)})});
                }, 1000);
            });
        });
    },
    gaTrackingId: 'UA-100598143-1',
    gaOptions: {
        debug: true,
        name: 'Theme_Selector_Preview',
        alwaysSendReferrer: true
    },
    locale: 'en_UK',
    resolve: id => console.info(`resolve id: ${id}`),
    reject: err => console.warn('err:', err),
    sort: (a, b) => Math.round((Math.random() * 2) - 1),
    tracking: {
        id: 'UA-100598143-1',
        events: {
            onLoaded: {
                event: "view",
                category: "User",
                action: "View the themes"
            }
        },
        options: {
            alwaysSendReferrer: true
        }
    },
    translate: (id, locale) => ({...trad[id][locale], button: 'choose this theme'})
};

if (debug) {
    console.info('debug', options);
}

const promises = ts(options);
