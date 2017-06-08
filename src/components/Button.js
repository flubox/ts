import React from 'react';
import {isDef, props, titlelize} from '../helper';

const className = 'ts-content-button';

const clickable = ' ts-clickable';

export default ({button, id, onClick}) => isDef(button) && isDef(id) && isDef(onClick) && <button {...props({className, clickable, id, onClick})}>{titlelize(button)}</button>;
