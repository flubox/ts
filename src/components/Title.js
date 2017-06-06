import React from 'react';
import {isDef, titlelizeAll} from '../helper';

export default ({title}) => isDef(title) && <div className='ts-content-title'>{titlelizeAll(title)}</div>;