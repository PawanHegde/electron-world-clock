import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactInterval from 'react-interval';
import { tz } from 'moment-timezone';
import Clock from 'react-clock/dist/entry.nostyle';

function getCurrentTime(timezone) {
    return tz(timezone).format('HH:mm:ss').toLocaleString();
}

class LocalisedClock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentTime: null
        };
    }

    render() {
        return(
            <div className="localisedClock">
                <ReactInterval
                    timeout={1}
                    enabled={true}
                    callback={ () => { this.setState({
                        currentTime: getCurrentTime(this.props.timezone)
                    }) } }>
                </ReactInterval>        
                
                <Clock className="clock" value={ this.state.currentTime }/>
                <div className="location">{ this.props.location }</div>
                <div className="timezone">({ this.props.timezone })</div>
            </div>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const clocks = this.props.locations.map((location) => 
            <LocalisedClock key={ location.name } location={ location.display_name } timezone={ location.timezone }/>
        );

        return (
            [ clocks ]
        )
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
            timezone: 'Europe/London',
            name: 'Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch',
            display_name: 'Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch'
        }
    ] } />,
    document.getElementById('root')
);