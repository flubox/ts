import React from 'react';
import test from 'ava';
import {shallow, mount} from 'enzyme';
import Content from '../src/containers/Content';

const props = {
    resolve: id => id,
    reject: err => err,
    translate: () => {},
    id: 44,
    locale: "en_UK"
};

const className = 'ts-content-element';

test('Content is a div', t => t.is(shallow(<Content {...props}/>).type(), 'div'));

test('Content has class name: ' + className, t => t.true(shallow(<Content {...props}/>).hasClass(className)));