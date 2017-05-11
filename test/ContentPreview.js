import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import ContentPreview from '../src/components/ContentPreview';

const id = 42;
const preview = 'http://lorem.ipsum';
const props = {id, preview};

const className = 'ts-content-preview ts-img-content-preview';

test('ContentPreview without props return null', t => t.is(shallow(<ContentPreview/>).type(), null));

test('ContentPreview without "id" return null', t => t.is(shallow(<ContentPreview {...props} id={undefined}/>).type(), null));

test('ContentPreview without "preview" return null', t => t.is(shallow(<ContentPreview {...props} preview={undefined}/>).type(), null));

test('ContentPreview is a div', t => t.is(shallow(<ContentPreview {...props}/>).type(), 'img'));

test(`ContentPreview has class name: "${className}"`, t => t.true(shallow(<ContentPreview {...props}/>).hasClass(className)));

test('ContentPreview src is props.preview', t => t.is(shallow(<ContentPreview {...props}/>).props().src, props.preview));

test('ContentPreview id is props.id', t => t.is(shallow(<ContentPreview {...props}/>).props().id, props.id));

test('ContentPreview key is props.id + props.preview', t => t.is(shallow(<ContentPreview {...props}/>).key(), `${props.id}${props.preview}`));