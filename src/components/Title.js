import React from 'react';
import {isDef, titlelizeAll} from '../helper';

export const Title = ({title}) => isDef(title) && <h3 className='ts-content-title'>{titlelizeAll(title)}</h3>;

export default Title;