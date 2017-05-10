import React from 'react';
import test from 'ava';
import {shallow, mount} from 'enzyme';
import GridSelector from '../src/containers/GridSelector';

const options = {
    resolve: id => id,
    reject: err => err,
    translate: key => ({title:'lorem', description:'ipsum'})
};

test('GridSelector show a div container', t => t.is(shallow(<GridSelector options={options}/>).type(), 'div'));
