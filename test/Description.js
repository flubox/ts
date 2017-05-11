import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import Description from '../src/components/Description';
import {titlelize} from '../src/helper';

const props = {description: 'lorem ipsum dolor sit amet'};

const className = 'ts-content-description';

test('Description without props return null', t => t.is(shallow(<Description/>).type(), null));

test('Description without "title" text return null', t => t.is(shallow(<Description {...props} description={undefined}/>).type(), null));

test('Description is a div', t => t.is(shallow(<Description {...props}/>).type(), 'div'));

test(`Description has class name: "${className}"`, t => t.true(shallow(<Description {...props}/>).hasClass(className)));

test('Description text is props.description', t => t.is(shallow(<Description {...props}/>).instance().props.description, props.description));

test('Description text has each first letter in uppercase', t => t.is(shallow(<Description {...props}/>).text(), titlelize(props.description)));