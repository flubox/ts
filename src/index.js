import React from 'react';
import { render } from 'react-dom';
import {GridSelector} from './containers/GridSelector';

const onLoaded = options => render(<GridSelector options={options}/>, document.querySelector(options.domElement));
const ts = options => document.addEventListener('DOMContentLoaded', () => onLoaded(options));

export default ts;