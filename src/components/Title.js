import React from 'react';
import {titlelizeAll} from '../helper';

export const Title = ({title, onClick}) => title && <h3 className={`ts-content-title${onClick ? ' ts-clickable': ''}`}>{titlelizeAll(title)}</h3>;

export default Title;