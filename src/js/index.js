import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactInterval from 'react-interval';
import { tz } from 'moment-timezone';
import Clock from 'react-clock';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import '../css/style.css';

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

class LocAdder extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Downshift
                onChange={selection => alert(`You selected ${selection.value}`)}
                itemToString={item => (item ? item.value : '')}/>
        )
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

        const items = [
            {value: 'apple'},
            {value: 'pear'},
            {value: 'orange'},
            {value: 'grape'},
            {value: 'banana'},
          ]  

        return (
            <div>
                <h1 id="title">World Clock</h1>
                <div id="clocks-container">{ [ clocks ] }</div>
                <Downshift
                    onChange={selection => alert(`You selected ${selection.value}`)}
                    itemToString={item => (item ? item.value : '')}>
                    {({
                        getInputProps,
                        getItemProps,
                        getLabelProps,
                        getMenuProps,
                        isOpen,
                        inputValue,
                        highlightedIndex,
                        selectedItem,
                        }) => (
                        <div>
                            <label {...getLabelProps()}>Enter a fruit</label>
                            <input {...getInputProps()} />
                            <ul {...getMenuProps()}>
                            {isOpen
                                ? items
                                    .filter(item => !inputValue || item.value.includes(inputValue))
                                    .map((item, index) => (
                                    <li
                                        {...getItemProps({
                                        key: item.value,
                                        index,
                                        item,
                                        style: {
                                            backgroundColor:
                                            highlightedIndex === index ? 'lightgray' : 'white',
                                            fontWeight: selectedItem === item ? 'bold' : 'normal',
                                        },
                                        })}
                                    >
                                        {item.value}
                                    </li>
                                    ))
                                : null}
                            </ul>
                        </div>
                        )}
                    </Downshift>                    
            </div>
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