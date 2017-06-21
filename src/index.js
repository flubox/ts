import React from 'react';
import { render } from 'react-dom';
import './ts.css';
import {GridSelector} from './containers/GridSelector';

const onLoaded = options => render(<GridSelector options={options}/>, document.querySelector(options.domElement));
const ts = options => document.addEventListener('DOMContentLoaded', () => onLoaded(options));

if (window) {
    window.ts = ts;
}

export default ts;