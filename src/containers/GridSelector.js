import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator';
import {factory, isDef, standardize} from '../helper';
import ContentBuilder from '../ContentBuilder';
import {fetchInit} from '../constants';
import { Grid, Row } from 'react-flexbox-grid';
var MobileDetect = require('mobile-detect'),
md = new MobileDetect(window.navigator.userAgent);

export const standardizeState = context => data => context.setState({data: data.map(standardize)});

export const afterFetch = context => response => response.json().then(standardizeState(context));

export const updateStateFromFetch = context => {
    return isDef(context.props.options.endpoint) ? fetch(context.props.options.endpoint, fetchInit).then(afterFetch(context)).catch(console.warn) : false;
};

@autobind
export class GridSelector extends Component {
    state = {data: [], width: '100%'}
    constructor(props) {
        super(props);
    }
    onClick({target}) {
        return this.props.options.resolve(target);
    }
    componentWillMount() {
        updateStateFromFetch(this);
    }
    render() {
        const {onClick, props, state} = this;
        return (
            <Grid fluid>
                <Row className={`ts-grid-selector${md.mobile() ? ' mobile' : ''}`}>
                    {factory(state.data)({onClick: props.options.resolve, ...props.options})(ContentBuilder)}
                </Row>
            </Grid>
        );
    }
};

export default GridSelector;