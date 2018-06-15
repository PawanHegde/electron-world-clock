import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactInterval from 'react-interval';
import { tz } from 'moment-timezone';

function getCurrentTime(timezone) {
    return tz(timezone).toLocaleString();
}

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const clocks = this.props.locations.map((location) => 
            <Clock location={ location.display_name } timezone={ location.timezone }/>
        );

        return (
            <p>{ clocks }</p>
        )
    }
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
                <div>{ this.props.location }: { this.state.currentTime }</div>
            </span>
        );
    }
}

ReactDOM.render(
    <App locations={ [
        {
            timezone: 'Asia/Kolkata',
            name: 'Mumbai',
            display_name: 'Bombay'
        },
        {
            timezone: 'Asia/Dhaka',
            name: 'Dhaka',
            display_name: 'Dhaka'
        },
        {
            timezone: 'Europe',
            name: 'London',
            display_name: 'Londonwa'
        }
    ] } />,
    document.getElementById('root')
);