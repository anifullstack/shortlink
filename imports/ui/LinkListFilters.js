import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';


export class LinkListFilters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showVisible: true
        }
    }

    componentDidMount() {

        this.showVisibleTracker = Tracker.autorun(() => {
            //set component state
            this.setState({
                showVisible: !this.state.showVisible
            });


        });

    }

    componentWillUnmount() {

        this.showVisibleTracker.stop();
    }

    onShowHiddenLinksChange(e) {
        console.log('LinkListFilters', 'HiddenLinkCheckbox', 'checked', e.target.checked);
        Session.set('visibleFlag', !e.target.checked);
        this.setState({ showVisibleTracker: !e.target.checked });

    }

    render() {
        return (<div>
            <label className="checkbox">
                <input type="checkbox" className="checkbox__box" checked ={this.state.showHiddenLinks} onChange = { this.onShowHiddenLinksChange.bind(this) }/>
                Show hidden links
            </label>
        </div>);
    }
}
