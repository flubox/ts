import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator';
import {factory, isDef, standardize, unDef} from '../helper';
import ContentBuilder from '../ContentBuilder';
import {fetchInit} from '../constants';
import { Grid, Row } from 'react-flexbox-grid';

export const sort = sortFunction => data => typeof sortFunction === 'function' ? data.sort(sortFunction) : data;

export const standardizeState = context => data => context.setState({data: sort(context.props.options.sort)(data).map(standardize)});

export const afterFetch = context => response => response.json().then(standardizeState(context));

export const checkEndpoint = context => isDef(context.props.options.endpoint);

export const useEndpointAsFetcher = ({props}) => typeof props.options.endpoint === 'function';

export const updateStateFromFetch = context => {
    return checkEndpoint(context) && (useEndpointAsFetcher(context) ? context.props.options.endpoint() : fetch(context.props.options.endpoint, fetchInit))
    .then(afterFetch(context)).catch(console.warn);
}

@autobind
export class GridSelector extends Component {
    state = {data: []}
    constructor(props) {
        super(props);
        if (unDef(props.options.endpoint)) {
            console.error('GridSelector: No endpoint found');
            return false;
        }
        if (isDef(props.options.sort) && typeof props.options.sort !== 'function') {
            console.error('GridSelector: options.sort is not a function');
            return false;
        }
    }
    onClick({target}) {
        return this.props.options.resolve(target);
    }
    componentWillMount() {
        updateStateFromFetch(this);
    }
    render() {
        const {onClick, props, state} = this;
        const className = `ts-grid-selector`;
        return (
            <div className="container">
                <Grid fluid>
                    <Row className={className}>
                        {factory(state.data)({onClick: props.options.resolve, ...props.options})(ContentBuilder)}
                    </Row>
                </Grid>
            </div>
        );
    }
};

export default GridSelector;
