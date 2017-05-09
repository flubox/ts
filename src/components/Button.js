import React from 'react';
import {props, titlelize} from '../helper';

const className = 'ts-button';

const clickable = ' ts-clickable';

export const Button = ({button, id, onClick}) => button && onClick && <button {...props({className, clickable, id, onClick})}>{titlelize(button)}</button>;

export default Button;