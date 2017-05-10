import React from 'react';
import test from 'ava';
import {shallow, mount} from 'enzyme';
import Button from '../src/components/Button';

const props = {
    button: 'ok',
    id: 42,
    onClick: a => a
};

const className = 'ts-button';

const clickable = 'ts-clickable';

test('Button is a div', t => t.is(shallow(<Button {...props}/>).type(), 'button'));

test('Button has class name: ' + className, t => t.true(shallow(<Button {...props}/>).hasClass(className)));

test('Button has class name: ' + clickable, t => t.true(shallow(<Button {...props}/>).hasClass(clickable)));

test('Button id is props.id', t => t.is(shallow(<Button {...props}/>).instance().props.id, props.id));

test('Button text is props.button', t => t.is(shallow(<Button {...props}/>).instance().props.button, props.button));