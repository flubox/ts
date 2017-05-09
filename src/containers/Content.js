import React from 'react';
import Button from '../components/Button';
import Title from '../components/Title';
import Description from '../components/Description';
import ContentPreview from '../components/ContentPreview';

const className = preview => ({innerWidth, innerHeight}) => `ts-content-element${innerWidth < innerHeight ? ' mobile' : ' desktop'}${!!preview ? ' loaded' : ' unloaded'}`;;

export const Content = ({id, locale, preview, onClick, translate}) => {
    if (typeof translate === 'undefined') {
        console.warn('Content: No translate function found');
        return false;
    }
    const {title, description, button} = translate(id, locale);
    return (
        <div className={className(preview)(window)}>
            <ul>
                <li>{Title({title})}</li>
                <li>
                    <div className="ts-content-preview-wrapper">
                        {ContentPreview({id, preview})}
                        {Description({description})}
                    </div>
                </li>
                <li>{Button({button, id, onClick})}</li>
            </ul>
        </div>
    );
};

export default Content;