import React from 'react';
import {props} from '../helper';

const className = 'ts-content-preview ts-img-content-preview';

const clickable = ' ts-clickable';

export const ContentPreview = ({id, preview}) => preview && <img {...props({className, clickable, id, preview})}/>;

export default ContentPreview;