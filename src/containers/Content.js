import React from 'react';
import Button from '../components/Button';
import {unDef} from '../helper';
import Title from '../components/Title';
import Description from '../components/Description';
import ContentPreview from '../components/ContentPreview';
import { Col, Row } from 'react-flexbox-grid';


export default ({id, preview, onClick, translate, sort, srcSet}) => {
    if (unDef(onClick)) {
        console.error('Content: No onClick function found');
        return false;
    }
    if (unDef(translate)) {
        console.error('Content: No translate function found');
        return false;
    }
    const {title, description, button} = translate(id);
    return (
        <Col className='ts-content-element' xs={12} sm={6}>
            <Row>
                <Col>
                    {Title({title})}
                </Col>
            </Row>
            <Row>
                <Col>
                    {ContentPreview({id, preview, srcSet, title})}
                    {Description({description})}
                </Col>
            </Row>
            <Row>
                <Col>
                    {Button({button, id, onClick: ({target}) => onClick(target.id)})}
                </Col>
            </Row>
        </Col>
    );
};