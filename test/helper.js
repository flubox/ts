import {
    domElementChecker,
    factory,
    getNode,
    getRenderProps,
    id,
    isArr,
    isDef,
    isUrl,
    merge,
    mergeByKeys,
    preview,
    props,
    standardize,
    titlelize,
    titlelizeAll,
    unDef
} from '../src/helper';
import test from 'ava';
import {shallow} from 'enzyme';

// domElementChecker
test('domElementChecker return a Promise', t => t.true(domElementChecker({querySelector: a => a})('lorem') instanceof Promise));

// factory
test('factory return false if neither list, props nor builder provided', t => t.false(factory()()()));
test('factory return false if neither list not builder provided', t => t.false(factory()({c: 'd'})()));
test('factory return false if neither props nor builder provided', t => t.false(factory([{a: 'b'}])()()));
test('factory return false if no builder provided', t => t.false(factory([{a: 'b'}])({c: 'd'})()));
test('factory return false if no list provided', t => t.false(factory()({c: 'd'})(a => a)));
test('factory return false if list is empty', t => t.false(factory([])({b: "b"})(a => a)));
test('factory return false if no props provided', t => t.false(factory([{a: 'b'}])()(a => a)));
// test('factory return false if the list provided is empty', t => {
//     const result = factory([{}])({b: "b"})(a => a);
//     t.is(result.length, 0);
// });

// getNode
test('getNode("#root")({querySelector: selector => "a"}) return "a"', t => t.is(getNode('#root')({querySelector: selector => 'a'}), 'a'));
test('getNode({a: "a"})().a return "a"', t => t.is(getNode({a: 'a'})().a, 'a'));

// id
test('id({lorem: "ipsum"})(42) return {lorem: "ipsum", id: 42}', t => t.is(id({lorem: 'ipsum'})(42).id, 42));

// isArr
test('isArr return true for: []', t => t.true(isArr([])));
test('isArr return false for: "lorem" ', t => t.false(isArr("lorem")));
test('isArr return false for: 42 ', t => t.false(isArr(42)));

// isDef
test('isDef() return false', t => t.false(isDef()));
test('isDef("") return true', t => t.true(isDef('')));

// isUrl
test('isUrl return true for: http://lorem.ipsum', t => t.true(isUrl('http://lorem.ipsum')));
test('isUrl return true for: https://lorem.ipsum', t => t.true(isUrl('https://lorem.ipsum')));
test('isUrl return false for: lorem://ipsum.dolor', t => t.false(isUrl('lorem://ipsum.dolor')));

// merge
test('merge({a: "a"})({b: "b"}) return {a: "a", b: "b"}', t => t.is(merge({a: 'a'})({b: 'b'}).b, 'b'));
test('merge()({b: "b"}) return {b: "b"}', t => t.is(merge()({b: 'b'}).b, 'b'));

// mergeByKeys
test('mergeByKeys', t => t.is(mergeByKeys({a: 'a'})({b: 'b'}).b, 'b'));

// preview
test('preview({lorem: "ipsum"})("dolor")', t => t.is(preview({lorem: 'ipsum'})('dolor').preview, 'dolor'));

// props
test(`props({className}).className === className`, t => t.is(props({className: 'lorem'}).className, 'lorem'));
test(`props({preview}).data === preview`, t => t.is(props({preview: 'lorem'}).data, 'lorem'));
test(`props({id, preview}).key === id + preview`, t => t.is(props({id:42, preview: 'lorem'}).key, '42lorem'));
test(`props({preview}).src === preview`, t => t.is(props({preview: 'lorem'}).src, 'lorem'));
test(`props({className, clickable, onClick}).className === className + clickable`, t => t.is(props({className: 'lorem', clickable: ' ipsum', onClick: 'a'}).className, 'lorem ipsum'));

// standardize
test('standardize({lorem: "42", ipsum: "http://lorem.ipsum"}) return {id: "42" preview: "http://lorem.ipsum"}', t => {
    const o = {lorem: '42', ipsum: 'http://lorem.ipsum'};
    const standardized = standardize(o);
    t.is(standardized.id, o.lorem);
    t.is(standardized.preview, o.ipsum);
});

// titlelize
test('titlelize("lorem") return "Lorem"', t => t.is(titlelize('lorem'), 'Lorem'));

// titlelizeAll
test('titlelizeAll("lorem ipsum") return "Lorem Ipsum"', t => t.is(titlelizeAll('lorem ipsum'), 'Lorem Ipsum'));

// unDef
test('unDef() return true', t => t.true(unDef()));
test('unDef({}) return false', t => t.false(unDef({})));