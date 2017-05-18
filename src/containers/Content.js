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
        <Col xs={12} sm={6}>
            <div className='ts-content-element'>
                <Row>
                    <Col xs={4} sm={12}>
                        {Title({title})}
                    </Col>
                </Row>
                <Row>
                    <Col xs={8} sm={8}>
                        {ContentPreview({id, preview})}
                        {Description({description})}
                    </Col>
                </Row>
                <Row>
                    <Col xs={8} xsOffset={1} sm={6} smOffset={4}>
                        {Button({button, id, onClick: ({target}) => onClick(target.id)})}
                    </Col>
                </Row>
            </div>
        </Col>
    );
};

export default Content;