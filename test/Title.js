import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import Title from '../src/components/Title';
import {titlelizeAll} from '../src/helper';

const props = {title: 'ok'};

const className = 'ts-content-title';

test('Title without props return null', t => t.is(shallow(<Title/>).type(), null));

test('Title without "title" text return null', t => t.is(shallow(<Title {...props} title={undefined}/>).type(), null));

test('Title is a div', t => t.is(shallow(<Title {...props}/>).type(), 'h3'));

test(`Title has class name: "${className}"`, t => t.true(shallow(<Title {...props}/>).hasClass(className)));

test('Title text is props.title', t => t.is(shallow(<Title {...props}/>).instance().props.title, props.title));

test('Title text has each first letter in uppercase', t => t.is(shallow(<Title {...props}/>).text(), titlelizeAll(props.title)));