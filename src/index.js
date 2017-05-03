import React from 'react';
import { render } from 'react-dom';
import {configChecker} from './helper';
import {GridSelector} from './containers/GridSelector';

const onLoaded = options => render(<GridSelector options={options}/>, document.querySelector(options.domElement));
const ts = options => {
    return new Promise((resolve, reject) => {
        configChecker(options)
        .then(options => {
            if (options.debug) {
                console.info('options are ok');
            }
            document.addEventListener('DomContentLoaded', () => onLoaded(options));
        })
        .catch(error => reject(error.details));
    });
};

window.ts = ts;

export default ts;