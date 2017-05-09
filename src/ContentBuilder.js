import React from 'react';
import {merge} from './helper';
import Content from './containers/Content';

const t = a => typeof(a) !== 'undefined';

export const ContentBuilder = props => (data, key) => t(props) && t(data) && t(key) && <Content key={key} {...merge(props)(data)}/>;

export default ContentBuilder;