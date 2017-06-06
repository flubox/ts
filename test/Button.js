import React from 'react';
import test from 'ava';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import Button from '../src/components/Button';

const props = {
    button: 'ok',
    id: 42,
    onClick: console.info
};

const className = 'ts-content-button';

const clickable = 'ts-clickable';

test('Button without props return null', t => t.is(shallow(<Button/>).type(), null));

test('Button without id return null', t => t.is(shallow(<Button {...props} id={undefined}/>).type(), null));

test('Button without "button" text return null', t => t.is(shallow(<Button {...props} button={undefined}/>).type(), null));

test('Button without onClick return null', t => t.is(shallow(<Button {...props} onClick={undefined}/>).type(), null));

test('Button is a div', t => t.is(shallow(<Button {...props}/>).type(), 'button'));

test('Button has class name: ' + className, t => t.true(shallow(<Button {...props}/>).hasClass(className)));

test('Button has class name: ' + clickable, t => t.true(shallow(<Button {...props}/>).hasClass(clickable)));

test('Button id is props.id', t => t.is(shallow(<Button {...props}/>).instance().props.id, props.id));

test('Button text is props.button', t => t.is(shallow(<Button {...props}/>).instance().props.button, props.button));
