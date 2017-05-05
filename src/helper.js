export const domElementChecker = selector => new Promise((resolve, reject) => !!getNode(selector)(document) ? resolve(node) : reject(node));

export const factory = list => props => builder => builder && props && list && list.map(builder(props));

export const getNode = selector => document => typeof selector === 'string' ? document.querySelector(selector) : selector;

export const id = a => i => ({...a, id: i});

export const isUrl = data => !!data.match(/http:/);

export const keys = object => Object.keys(object);

export const not = list => keys => !list.includes(keys);

export const only = list => key => list.includes(keys);

export const preview = a => p => ({...a, preview: p});

export const merge = a => b => !!a && !!b ? ({...a, ...b}) : a || b;

export const mergeByKeys = object => (accumulator, k) => ({...accumulator, [k]: object[k]});

export const standardize = object => keys(object).reduce((a, key) => isUrl(object[key]) ? preview(a)(object[key]) : id(a)(object[key]), {});
