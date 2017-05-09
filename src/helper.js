export const domElementChecker = selector => new Promise((resolve, reject) => !!getNode(selector)(document) ? resolve(node) : reject(node));

export const factory = list => props => builder => builder && props && list && list.filter(({preview}) => !!preview).map(builder(props));

export const getNode = selector => document => typeof selector === 'string' ? document.querySelector(selector) : selector;

export const id = a => i => ({...a, id: i});

export const isUrl = data => data && !!data.match(/^(http)(s?):/);

export const merge = a => b => !!a && !!b ? ({...a, ...b}) : a || b;

export const mergeByKeys = object => (accumulator, k) => ({...accumulator, [k]: object[k]});

export const preview = a => p => ({...a, preview: p});

export const props = ({className, clickable, id, onClick, preview, type}) => ({id, onClick, className: `${className}${onClick ? clickable : ''}`, data: preview, key: preview, src: preview, type });

export const standardize = object => Object.keys(object).reduce((a, key) => isUrl(object[key]) ? preview(a)(object[key]) : id(a)(object[key]), {});

export const titlelize = text => `${text.substr(0, 1).toUpperCase()}${text.substr(1)}`;

export const titlelizeAll = text => text.split(' ').map(titlelize).join(' ');