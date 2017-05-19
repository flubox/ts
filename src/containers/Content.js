import React from 'react';
import Button from '../components/Button';
import Title from '../components/Title';
import Description from '../components/Description';
import ContentPreview from '../components/ContentPreview';
import { Col, Row } from 'react-flexbox-grid';


export const Content = ({id, locale, preview, onClick, translate}) => {
    if (!translate) {
        console.warn('Content: No translate function found');
        return false;
    }
    const {title, description, button} = translate(id, locale);
    return (
        <Col className='ts-content-element' xs={12} sm={6}>
            <Row>
                <Col>
                    {Title({title})}
                </Col>
            </Row>
            <Row>
                <Col>
                    {ContentPreview({id, preview})}
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

export default Content;