import ts from './index';

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('ts.started', () => console.info('event: ts started'));
    document.addEventListener('ts.onClick', ({target}) => console.info(`event onClick`, target));
});

const promises = ts({
    debug: true,
    domElement: '#root',
    locale: 'en_UK',
    resolve: id => console.info(`resolve id: ${id}`),
    reject: err => console.warn('err:', err),
    translate: (id, locale) => require('../trad.json')[id][locale]
});