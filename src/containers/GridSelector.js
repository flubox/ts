import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator';
import {factory, standardize} from '../helper';
import ContentBuilder from '../ContentBuilder';
const config = require('../../config.json');

@autobind
export class GridSelector extends Component {
    state = {data: []}
    componentWillMount() {
        const event = new Event('ts.started', {detail: {started: true}});
        document.dispatchEvent(event);

        fetch(
            this.props.options.endpoint || config.endpoint,
            {
                method: 'GET',
                headers: new Headers({'Accept': 'application/json'}),
                mode: 'cors'
            }
        )
        .then(response => {
            const {options} = this.props;
            const {locale, resolve, reject, translate} = options;
            response.json().then(data => {
                const event = new Event('ts.update', {detail: {update: true}});
                document.dispatchEvent(event);
                this.setState({data: data.map(standardize)});
            });
        })
        .catch(error => {
            console.warn(error);
        })
    }
    render() {
        return (
            <div className="ts-grid-selector">
                {factory(this.state.data)({...config, ...this.props.options})(ContentBuilder)}
            </div>
        );
    }
};

export default GridSelector;