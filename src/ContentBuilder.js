import React from 'react';
import {merge} from './helper';
import Content from './containers/Content';

export const ContentBuilder = props => (data, key) => {
    console.info('...', 'ContentBuilder', {...props}, {...data});
    return !!props && !!data && !!key && <Content key={key} {...merge(props)(data)}/>;
};

export default ContentBuilder;