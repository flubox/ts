import ts from './index';

const trad = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum lacus ac sem dignissim, quis porttitor ligula facilisis. Nam porttitor, lacus ac ultrices mollis, felis lectus interdum purus, ut suscipit urna dolor et enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean mattis tortor nec eros porta vulputate. Nam aliquet nulla at augue faucibus, et congue lacus vehicula. Praesent nec erat et velit cursus luctus. Integer sodales a neque ac ullamcorper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut vel est malesuada, congue sem vitae, dapibus elit.'
.replace(/[\.,+]/, '').split(' ').map(t => ({title: t})).map((a, i) => ({[i]: a})).reduce((a, b) => ({...a, ...b}), {});

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
            data = data.map(({download_url}) => download_url).filter(url => url.match(/\.png$/))
            .sort().reverse()
            .reduce((accumulator, current, index, all) => {
                if (index % 2 === 0) {
                    return accumulator.concat([{id: index / 2, url: [current, all[index + 1]]}]);
                }
                return accumulator;
            }, [])
            ;
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
    translate: (id) => ({...trad[id], button: 'choose this theme'})
};

if (debug) {
    console.info('debug', options);
}

const promises = ts(options);
