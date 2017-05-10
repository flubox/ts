import React from 'react';
import test from 'ava';
import {shallow, mount} from 'enzyme';
import Content, {className} from '../src/containers/Content';

const props = {
    resolve: id => id,
    reject: err => err,
    translate: key => ({title:'lorem', description:'ipsum'}),
    id: 42
};

const cn = 'ts-content-element';

const preview = 'http://lorem.ipsum'

test(`className(preview)({innerWidth: ${128}, innerHeight: ${256}})`, t => t.true(className({preview})({innerWidth: 128, innerHeight: 256}).includes('mobile')));

test(`className(preview)({innerWidth: ${256}, innerHeight: ${128}})`, t => t.true(className({preview})({innerWidth: 256, innerHeight: 128}).includes('desktop')));

test(`className(preview)({innerWidth, innerHeight})`, t => t.true(className({preview})({innerWidth: 2, innerHeight: 1}).includes('loaded')));

test(`className()({innerWidth, innerHeight})`, t => t.true(className()({innerWidth: 2, innerHeight: 1}).includes('unloaded')));

test('Content is a div', t => t.is(shallow(<Content {...props}/>).type(), 'div'));

test('Content is null is tranlate is not provided in the props', t => t.is(shallow(<Content/>).type(), null));

test(`Content has class name: ${cn}`, t => t.true(shallow(<Content {...props}/>).hasClass(cn)));

test('Content has class name: desktop', t => t.true(shallow(<Content {...props}/>).hasClass('desktop')));

test('Content has class name: unloaded', t => t.true(shallow(<Content {...props}/>).hasClass('unloaded')));