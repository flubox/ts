import test from 'ava';
import {shallow, mount} from 'enzyme';
import ContentBuilder from '../src/ContentBuilder';
import Content from '../src/containers/Content';

const props = {
    resolve: id => id,
    reject: err => err
};

test('ContentBuilder return a function', t => t.true(typeof ContentBuilder(props) === 'function'));

// test('ContentBuilder return a function', t => t.true(shallow(ContentBuilder(props)({id: 42}, 0)).instance(Content)));