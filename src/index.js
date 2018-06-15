import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactInterval from 'react-interval';
import { tz } from 'moment-timezone';

function getCurrentTime(timezone) {
    return tz(timezone).toLocaleString();
}

class Clock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentTime: null
        };
    }

    render() {
        return(
            <span>
                <ReactInterval
                    timeout={1}
                    enabled={true}
                    callback={() => {this.setState({
                        currentTime: getCurrentTime(this.props.timezone)
                    })}}>
                </ReactInterval>                
                <span>{ this.state.currentTime }</span>
            </span>
        );
    }
}

ReactDOM.render(
    <div>Current time: <Clock timezone={tz.guess()}/></div>,
    document.getElementById('root')
);