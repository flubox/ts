import React from 'react';

export const ContentPreview = ({preview}) => <img key={preview} className="ts-content-preview" src={preview}/>;

export default ContentPreview;