import React from 'react';
import {isDef, props, unDef} from '../helper';
import { Col, Row } from 'react-flexbox-grid';

const className = 'ts-content-preview ts-img-content-preview';

const clickable = ' ts-clickable';

export default ({id, preview}) => {
    if (unDef(id) || unDef(preview)) {
        return false;
    }
    return (
        <div className="ts-content-preview-wrapper">
            <img {...props({className, clickable, id, preview})}/>
        </div>
    );
}
