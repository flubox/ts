import {
    factory,
    getNode,
    getRenderProps,
    id,
    isUrl,
    merge,
    metaConfig,
    preview,
    standardize,
    titlelize,
    titlelizeAll
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

// id
test('id', t => t.is(id({lorem: 'ipsum'})(42).id, 42));

// isUrl
test('isUrl', t => {
    t.true(isUrl('http://lorem.ipsum'));
    t.false(isUrl('lorem://ipsum.dolor'));
});

// merge
test('merge', t => t.is(merge({a: 'a'})({b: 'b'}).b, 'b'));

// preview
test('preview', t => t.is(preview({lorem: 'ipsum'})('dolor').preview, 'dolor'));

// standardize
test('standardize', t => {
    const o = {lorem: '42', ipsum: 'http://lorem.ipsum'};
    const standardized = standardize(o);
    t.is(standardized.id, o.lorem);
    t.is(standardized.preview, o.ipsum);
});

// titlelize
test('titlelize', t => t.is(titlelize('lorem'), 'Lorem'));

// titlelizeAll
test('titlelizeAll', t => t.is(titlelizeAll('lorem ipsum'), 'Lorem Ipsum'));