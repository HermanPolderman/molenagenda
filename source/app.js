import React from 'react'
import { render } from 'react-dom'
import moment from 'moment'
import { getEvents } from './gcal'

import BigCalendar from 'react-big-calendar'
// a localizer for BigCalendar
BigCalendar.momentLocalizer(moment);

// this weird syntax is just a shorthand way of specifying loaders
require('style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css')

class App extends React.Component {
    constructor () {
        super();
        this.state = {
            events: []
        }
    }
    componentDidMount () {
        getEvents((events) => {
            console.log(events);
            this.setState({events})
        })
    }
    render () {
        return (
            // React Components in JSX look like HTML tags
            <BigCalendar
                selectable
                style={{height: '420px'}}
                events={this.state.events}
                onSelectEvent={event => console.log(event.title)}
                onSelectSlot={(slotInfo) => console.log(
                     `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} \nend: ${slotInfo.end.toLocaleString()}`
                 )}
            />
        )
    }
}

render(<App />, document.getElementById('root'));
