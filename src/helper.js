const schema = require('../options.schema');
import ZSchema from 'z-schema';

export const _typeof = data => typeof data;

export const iof = instance => data => data instanceof instance;

export const metaConfig = config => {
    let meta = {};
    if (config.callbacks) {
        const callbacks = Object.keys(config.callbacks).reduce((accumulator, k) => ({
            [k]: _typeof(config.callbacks[k])
        }), {});
        meta = {...meta, callbacks};
    }
    return {...config, typeof: meta};
};

export const configChecker = config => {
    return new Promise((resolve, reject) => {
        const validator = new ZSchema();
        config = config ? metaConfig(config) : config;
        const valid = validator.validate(config, schema);
        const error = validator.getLastError();
        // console.log('###', 'config', config, 'error', error);
        return !!error ? reject(error) : resolve({then: resolve => resolve(config)});
    });
};

export const getNode = selector => typeof selector === 'string' ? document.querySelector(selector) : selector;

export const domElementChecker = selector => {
    return new Promise((resolve, reject) => {
        const node = getNode(selector);
        return !!node ? resolve(node) : reject(node);
    });
};
