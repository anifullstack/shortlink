import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import { browserHistory } from 'react-router';
import { Links } from './../api/links';

import LinkListItem from './LinkListItem';
import FlipMove from 'react-flip-move';

export class LinkList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            links: [],
            error: ''
        };
        console.log("client", "MyLinkList", "constructor", "user", Meteor.user());
    }

    componentDidMount() {
        console.log("client", "MyLinkList", "componentDidMount", "user", Meteor.user());
        //subscribe to publication
        Meteor.subscribe('links');

        //save tracker reference in an instance variable
        this.linksTracker = Tracker.autorun(() => {
            const links = Links.find({ visible: Session.get('visibleFlag') }).fetch();
            //set component state
            this.setState({
                links
            });
            console.log("client", "MyLinkList", "componentDidMount", "links", this.state.links);


        });
    }

    componentWillUnmount() {
        console.log("client", "MyLinkList", "componentWillUnmount");
        this.linksTracker.stop();
    }

    renderLinkItems() {

        if (!this.state.links || this.state.links.length === 0) {
            return <div className="item item__status"> <p>There are no links</p> </div>;
        }


        return this.state.links.map((link) => {

            const shortUrl = Meteor.absoluteUrl(link._id);
            // const shortUrl = 'https://lab-sushilshimpi.c9users.io' + '/' + link._id;
            //use of spread operator to exampnd l link object
            return <LinkListItem key={ link._id } shortUrl={shortUrl}  {...link}/>;

        });
    }


    render() {
        return (<div>
        <FlipMove containerHeight={true}>
        { this.renderLinkItems() }
        </FlipMove>
        </div>);
    }
}
