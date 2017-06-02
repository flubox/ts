import React from 'react';
import {isDef, titlelizeAll} from '../helper';

export const Title = ({title}) => isDef(title) && <div className='ts-content-title'>{titlelizeAll(title)}</div>;

export default Title;