import React from 'react';
import test from 'ava';
import {shallow, mount} from 'enzyme';
import GridSelector from '../src/containers/GridSelector';

const options = {
    resolve: id => id,
    reject: err => err
};

test('GridSelector show a div container', t => {
	const container = shallow(<GridSelector options={options}/>);
	// const child = <div className="ts-grid-selector"/>;
    t.is(container.type(), 'div');
	// t.true(container.contains(child));
});
