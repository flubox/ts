import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator';
import {factory, standardize} from '../helper';
import ContentBuilder from '../ContentBuilder';
const config = require('../../config.json');

@autobind
export class GridSelector extends Component {
    state = {data: []}
    onClick({target}) {
        return this.props.options.resolve(target);
    }
    componentWillMount() {
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
            response.json().then(data => this.setState({data: data.map(standardize)}));
        })
        .catch(console.warn)
    }
    render() {
        const {onClick, props, state} = this;
        return (
            <div className="ts-grid-selector">
                {factory(state.data)({...config, onClick: ({target}) => props.options.resolve(target.id), ...props.options})(ContentBuilder)}
            </div>
        );
    }
};

export default GridSelector;