import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator';
import {factory, getLocale, getScreenResolution, getViewport, isDef, standardize, unDef} from '../helper';
import ContentBuilder from '../ContentBuilder';
import {fetchInit} from '../constants';
import { Grid, Row } from 'react-flexbox-grid';
import ReactGA from 'react-ga';

export const sort = sortFunction => data => typeof sortFunction === 'function' ? data.sort(sortFunction) : data;

export const standardizeState = context => data => context.setState({data: sort(context.props.options.sort)(data).map(standardize)});

export const afterFetch = context => response => response.json().then(standardizeState(context));

export const checkEndpoint = context => isDef(context.props.options.endpoint);

export const useEndpointAsFetcher = ({props}) => typeof props.options.endpoint === 'function';

export const updateStateFromFetch = context => {
    return checkEndpoint(context) && (useEndpointAsFetcher(context) ? context.props.options.endpoint() : fetch(context.props.options.endpoint, fetchInit))
    .then(afterFetch(context)).catch(console.warn);
}

const category = 'User';

@autobind
export class GridSelector extends Component {
    state = {data: []}
    constructor(props) {
        super(props);
        const {endpoint, gaTrackingId, gaOptions, locale, sort} = props.options;

        if (unDef(endpoint)) {
            console.error('GridSelector: No endpoint found');
            return false;
        }

        if (isDef(sort) && typeof sort !== 'function') {
            console.error('GridSelector: options.sort is not a function');
            return false;
        }

        if (isDef(gaOptions)) {
            if (unDef(gaTrackingId)) {
                console.error('GridSelector: options.gaTrackingId is undefined');
                return false;
            }
            if (typeof gaTrackingId !== 'string') {
                console.error('GridSelector: options.gaTrackingId is no a string');
                return false;
            }
            if (gaTrackingId.match(/UA-([\d]{4,})-([\d]{1})/) === null) {
                console.error('GridSelector: options.gaTrackingId doesn\'t match UA-XXXX-Y pattern');
                return false;
            }
        }

        if (isDef(gaTrackingId) && isDef(gaOptions)) {
            const mixedOptions = {
                ...gaOptions,
                language: (gaOptions.language || locale || getLocale()).toLowerCase().replace('_', '-'),
                screenResolution: getScreenResolution(),
                viewportSize: getViewport()
            };
            console.info('mixedOptions', mixedOptions);
            ReactGA.initialize(gaTrackingId, gaOptions);
        }
    }
    onClick(value) {
        ReactGA.event({
            category,
            action: 'Click',
            value,
            hitCallback: () => this.props.options.resolve(value)
        });
    }
    componentWillMount() {
        updateStateFromFetch(this);
    }
    componentDidMount(nextProps) {
        ReactGA.event({
            category,
            action: 'View Selector Page',
            nonInteraction: true
        });
    }
    render() {
        const {onClick, props, state} = this;
        const className = `ts-grid-selector`;
        return (
            <div className="container">
                <Grid fluid>
                    <Row className={className}>
                        {factory(state.data)({onClick: this.onClick, ...props.options})(ContentBuilder)}
                    </Row>
                </Grid>
            </div>
        );
    }
};

export default GridSelector;
