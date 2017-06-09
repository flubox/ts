import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator';
import {factory, getScreenResolution, getViewport, isDef, standardize, unDef} from '../helper';
import ContentBuilder from '../ContentBuilder';
import Loading from '../components/Loading';
import {category, fetchInit, name} from '../constants';
import { Grid, Row } from 'react-flexbox-grid';
import ReactGA from 'react-ga';

const srcSet = require('../../srcSet.json');
const configSchema = require('../../config.schema.json');
const events = require('../../ga.events.json');
const Ajv = require('ajv');
const ajv = new Ajv();

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
    state = {data: [], tracking: false}
    constructor(props) {
        super(props);

        // Validate the config object provided via props.options
        const validateConfig = ajv.compile(configSchema);
        if (!validateConfig(props.options)) {
            validateConfig.errors.forEach(({dataPath, keyword, message}) => {
                return console.error(`GridSelector: options is invalid options${dataPath} ${message}`)
            });
            return false;
        }

        if (isDef(props.options.tracking)) {
            // Setting usable tracking 
            this.state = {...this.state, events: {...events, ...props.options.tracking.events}};

            // Mixing options for GA gtracking initialization
            const mixedOptions = {
                ...props.options.tracking.options,
                debug: props.options.debug,
                screenResolution: getScreenResolution(),
                viewportSize: getViewport()
            };
            ReactGA.initialize(props.options.tracking.id, props.options.tracking.options);

            // Ready to track
            this.state = {...this.state, tracking: true};
        }
    }
    onClick(value) {
        const {props, state} = this;
        const {options} = props;
        const {events, tracking} = state;
        value = Number(value);
        return tracking ? ReactGA.event({...events.onClick, value, hitCallback: () => options.resolve(value)}) : this.props.options.resolve(value);
    }
    componentWillMount() {
        updateStateFromFetch(this);
    }
    componentDidMount(nextProps) {
        return this.state.tracking && isDef(this.state.events.onLoad) && ReactGA.event({...this.state.events.onLoad, event: this.state.events.onLoad});
    }
    render() {
        const {onClick, props, state} = this;
        const className = `ts-grid-selector`;
        return (
            <div className="container">
                <Grid fluid>
                    <Row className={className}>
                        {state.data.length ? factory(state.data)({onClick: this.onClick, ...props.options, srcSet})(ContentBuilder):<Loading/>}
                    </Row>
                </Grid>
            </div>
        );
    }
};

export default GridSelector;
