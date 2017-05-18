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
        window.addEventListener('resize', () => this.forceUpdate());
        // this.setState({width: `${document.querySelector(this.props.options.domElement).getBoundingClientRect().width}px`});
        updateStateFromFetch(this);
    }
    render() {
        const {onClick, props, state} = this;
        const mobile = !!md.mobile();
        const orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
        const className = `ts-grid-selector${mobile ? ' mobile' : ''} ${orientation}`;
        return (
            <Grid fluid style={{padding: 0}}>
                <Row className={className} style={{width: state.width}}>
                    {factory(state.data)({onClick: props.options.resolve, ...props.options})(ContentBuilder)}
                </Row>
            </Grid>
        );
    }
};

export default GridSelector;