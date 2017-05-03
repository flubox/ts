import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator';

@autobind
class GridSelector extends Component {
    getRenderProps() {
        return {className: 'ts-grid-selector'};
    }
    render() {
        return (
            <div {...this.getRenderProps()}>
            </div>
        );
    }
};

export default GridSelector;