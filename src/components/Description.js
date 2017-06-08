import React from 'react';
import {isDef, titlelize} from '../helper';

export default ({description}) => isDef(description) && <div className="ts-content-description">{titlelize(description)}</div>;