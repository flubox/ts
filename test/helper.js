import {
    factory,
    getNode,
    getRenderProps,
    merge,
    metaConfig,
    not,
    only
} from '../src/helper';
import test from 'ava';

const defaultErrorHandling = t => error => t.true(error instanceof Error);
const configs = [
    {description: 'empty config', config: {}},
    {description: 'undefined config', config: undefined},
    {description: 'empty endpoint', config: {endpoint: ''}},
    {description: 'resolve is not a function', config: {endpoint: 'http://lorem.ipsum', resolve: 'lorem ipsum'}},
    {description: 'reject is not a function', config: {endpoint: 'http://lorem.ipsum', reject: 'lorem ipsum'}},
    // {description: 'onClick callback is not a function', config: {endpoint: 'http://lorem.ipsum', events: {onClick: 'lorem ipsum'}}}
]

// factory
test('factory', t => {
    t.is(typeof factory({}), 'function');
    t.is(typeof factory([{a: 'b'}])({c: 'd'}), 'function');
});

// getNode
test('getNode', t => {
    t.is(getNode('#root')({querySelector: selector => 'a'}), 'a');
    t.is(getNode({a: 'a'})().a, 'a');
});

// not
test('not', t => t.true(not(['a', 'b'])('c')));

// merge
test('merge', t => t.is(merge({a: 'a'})({b: 'b'}).b, 'b'));