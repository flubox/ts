import React from 'react';
import {isDef, titlelize} from '../helper';

export const Description = ({description}) => isDef(description) && <div className="ts-content-description">{titlelize(description)}</div>;

export default Description;