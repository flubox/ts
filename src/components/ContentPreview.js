import React from 'react';
import {isDef, merge, imgProps} from '../helper';
import { Col, Row } from 'react-flexbox-grid';

const className = 'ts-content-preview ts-img-content-preview';

const clickable = ' ts-clickable';

export const ContentPreview = ({id, preview}) => {
    return isDef(id) && isDef(preview) && (
        <div className="ts-content-preview-wrapper">
            <img {...imgProps({className, clickable, id, preview})}/>
        </div>
    );
}

export default ContentPreview;