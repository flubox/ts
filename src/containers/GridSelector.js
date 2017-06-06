import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator';
import {factory, getLocale, getScreenResolution, getViewport, isDef, standardize, unDef} from '../helper';
import ContentBuilder from '../ContentBuilder';
import Loading from '../components/Loading';
import {category, fetchInit, name} from '../constants';
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

@autobind
export class GridSelector extends Component {
    state = {data: []}
    constructor(props) {
        super(props);
        const {endpoint, locale, sort, tracking} = props.options;
        this.state = {...this.state, name: props.options.name || name};

        if (unDef(endpoint)) {
            console.error('GridSelector: No endpoint found');
            return false;
        }

        if (isDef(sort) && typeof sort !== 'function') {
            console.error('GridSelector: options.sort is not a function');
            return false;
        }

        if (isDef(tracking)) {
            if (unDef(tracking.options)) {
                console.error('GridSelector: options.tracking.options is required');
                return false;
            }
            if (unDef(tracking.id)) {
                console.error('GridSelector: options.tracking.id is undefined');
                return false;
            }
            if (typeof tracking.id !== 'string') {
                console.error('GridSelector: options.tracking.id is no a string');
                return false;
            }
            if (tracking.id.match(/UA-([\d]{4,})-([\d]{1})/) === null) {
                console.error('GridSelector: options.tracking.id doesn\'t match UA-XXXX-Y pattern');
                return false;
            }

            const mixedOptions = {
                ...tracking.options,
                language: (tracking.options.language || locale || getLocale()).toLowerCase().replace('_', '-'),
                screenResolution: getScreenResolution(),
                viewportSize: getViewport()
            };
            console.info('mixedOptions', mixedOptions);
            ReactGA.initialize(tracking.id, tracking.options);
        }
    }
    onClick(value) {
        ReactGA.event({
            category,
            action: `Clicked on ${this.state.name} "${value}"`,
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
            action: `View the "${this.state.name}" Selector Page`,
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
                        {state.data.length ? factory(state.data)({onClick: this.onClick, ...props.options})(ContentBuilder):<Loading/>}
                    </Row>
                </Grid>
            </div>
        );
    }
};

export default GridSelector;
