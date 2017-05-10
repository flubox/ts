import React from 'react';
import {merge} from './helper';
import Content from './containers/Content';

export const check = item => typeof item !== 'undefined';

export const ContentBuilder = props => (data, key) => check(props) && check(data) && check(key) && <Content key={key} {...merge(props)(data)}/>;

export default ContentBuilder;