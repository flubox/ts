export const domElementChecker = document => domElement => new Promise((resolve, reject) => !!getNode(domElement)(document) ? resolve(domElement) : reject(domElement));

export const factory = list => props => builder => isDef(builder) && isDef(props) && isDef(list) && isArr(list) && list.length > 0 && list.filter(({preview}) => isDef(preview)).map(builder(props));

export const getNode = selector => document => typeof selector === 'string' ? document.querySelector(selector) : selector;

export const getLocale = () => window.navigator.language || window.navigator.browserLanguage || window.navigator.systemLanguage || window.navigator.userLanguage;

export const getScreenResolution = () => `${window.screen.width}x${window.screen.height}`;

export const getViewport = () => `${window.innerWidth}x${window.innerHeight}`;

export const id = a => i => ({...a, id: i});

export const isArr = item => Array.isArray(item);

export const isDef = item => !unDef(item);

export const isUrl = data => isDef(data) && !!data.toString().match(/^(http)(s?):/);

export const merge = a => b => !!a && !!b ? ({...a, ...b}) : a || b;

export const mergeByKeys = object => (accumulator, k) => ({...accumulator, [k]: object[k]});

export const preview = a => p => ({...a, preview: p});

export const props = ({className, clickable, id, onClick, preview, type}) => ({id, onClick, className: `${className}${clickable && onClick ? clickable : ''}`, data: preview, key: `${id}${preview}`, src: preview, type });

export const standardize = object => Object.keys(object).reduce((a, key) => Array.isArray(object[key]) || isUrl(object[key]) ? preview(a)(object[key]) : id(a)(object[key]), {});

export const titlelize = text => `${text.substr(0, 1).toUpperCase()}${text.substr(1)}`;

export const titlelizeAll = text => text.split(' ').map(titlelize).join(' ');

export const unDef = item => typeof item === 'undefined';