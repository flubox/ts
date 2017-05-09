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

const debug = window.location.search && !!window.location.search.match(/debug/);

const options = {
    debug,
    domElement: '#root',
    locale: 'en_UK',
    resolve: id => console.info(`resolve id: ${id}`),
    reject: err => console.warn('err:', err),
    translate: (id, locale) => ({...trad[id][locale], button: 'choose this theme'})
};

if (debug) {
    console.info('debug', options);
}

const promises = ts(options);