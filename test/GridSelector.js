import React from 'react';
import test from 'ava';
import {shallow, mount} from 'enzyme';
import GridSelector from '../src/containers/GridSelector';

test('show a div container', t => {
    const options = {};
	const container = shallow(<GridSelector options={options}/>);
	const child = <div className="ts-grid-selector"/>;
	t.true(container.contains(child));
});
