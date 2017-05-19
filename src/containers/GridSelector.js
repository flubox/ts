import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator';
import {factory, isDef, standardize} from '../helper';
import ContentBuilder from '../ContentBuilder';
import {fetchInit} from '../constants';
import { Grid, Row } from 'react-flexbox-grid';

export const standardizeState = context => data => context.setState({data: data.map(standardize)});

export const afterFetch = context => response => response.json().then(standardizeState(context));

export const updateStateFromFetch = context => {
    return isDef(context.props.options.endpoint) ? fetch(context.props.options.endpoint, fetchInit).then(afterFetch(context)).catch(console.warn) : false;
};

@autobind
export class GridSelector extends Component {
    state = {data: []}
    constructor(props) {
        super(props);
    }
    onClick({target}) {
        return this.props.options.resolve(target);
    }
    componentWillMount() {
        // this.setState({width: `${document.querySelector(this.props.options.domElement).getBoundingClientRect().width}px`});
        updateStateFromFetch(this);
    }
    render() {
        const {onClick, props, state} = this;
        const className = `ts-grid-selector`;
        return (
            <Grid fluid>
                <Row className={className}>
                    {factory(state.data)({onClick: props.options.resolve, ...props.options})(ContentBuilder)}
                </Row>
            </Grid>
        );
    }
};

export default GridSelector;