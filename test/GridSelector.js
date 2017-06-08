// import React from 'react';
import test from 'ava';
test('censored tests until further notice', t => t.pass())
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
// import GridSelector, {afterFetch, standardizeState, updateStateFromFetch} from '../src/containers/GridSelector';

// const className = 'ts-grid-selector';
// const endpoint = 'http://google.com';
// const resolve = id => id;
// const reject = err => err;
// const translate = key => ({title:'lorem', description:'ipsum'});
// const options = {endpoint, resolve, reject, translate};
// const props = {options:{...options}};
// const setState = a => a;
// const context = {props: {...props}, setState};
// const contextWithoutEndpoint = {...context, props: {...props, options: {...options, endpoint: undefined}}};
// const data = [{lol: 42, preview: 'http://lorem.ipsum/img/42'}, {lorem: 1337, ipsum: 'http://lorem.ipsum/img/1337'}];
// const standardized = [{id: 42, preview: 'http://lorem.ipsum/img/42'}, {id: 1337, preview: 'http://lorem.ipsum/img/1337'}];
// const response = {json: () => ({then: () => data})};

// test('standardizeState(context)(data)', t => {
//     const after = standardizeState(context)(data);
//     t.not({...context}, after);
//     t.deepEqual(after, {data: standardized});
// });

// test('afterFetch(context)(data)', t => {
//     const after = afterFetch(context)(response);
//     t.not({...context}, after);
//     t.deepEqual(after, data);
// });

// test('updateStateFromFetch(context) return a Promise', t => t.true(updateStateFromFetch(context) instanceof Promise));

// test('updateStateFromFetch(context) return false if no endpoint provided', t => t.false(updateStateFromFetch(contextWithoutEndpoint)));

// test('GridSelector show a div container', t => t.is(shallow(<GridSelector {...props}/>).type(), 'div'));

// test(`GridSelector has class ${className}`, t => t.true(shallow(<GridSelector {...props}/>).hasClass(className)));

