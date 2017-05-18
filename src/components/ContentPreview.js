import React from 'react';
import {isDef, props} from '../helper';
import { Col, Row } from 'react-flexbox-grid';

const className = 'ts-content-preview ts-img-content-preview';

const clickable = ' ts-clickable';

export const ContentPreview = ({id, preview}) => isDef(id) && isDef(preview) && <img {...props({className, clickable, id, preview})}/>;
// export const ContentPreview = ({id, preview}) => {
//     if (isDef(id) && isDef(preview)) {
//         return (
//             <Row>
//                 <Col xs={12}>
//                     <div className={`${className}${clickable}`} style={{backgroundImage:`url(${preview})`}}/>
//                 </Col>
//             </Row>
//         );
//     }
//     return false;
// }

export default ContentPreview;