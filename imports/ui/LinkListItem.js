import React from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import Clipboard from 'clipboard';

export default class LinkListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            justCopied: false
        }
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard.on("success", () => {
            console.log("LinkListItem", "clipboard.on event", "copy text success");
            this.setState({
                justCopied: true
            });

            setTimeout(() => {
                this.setState({
                    justCopied: false
                });

            }, 1000);

        }).on("error", () => {
            console.log("LinkListItem", "clipboard.on event", "error");
        });
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }
    render() {
        return (
            <div className="item">
        
        
        <h2>  {this.props.url} </h2>
        <p className="item__message">{this.props.shortUrl}</p>
        <p className="item__message">   Visit Count: {this.props.visitedCount} </p>
        
        <p className="item__message">Visited At: { this.props.lastVisitedAt ? moment(this.props.lastVisitedAt).fromNow() : 'None' } </p>
       
       
        <a className="button button--pill button--link" key={this.props._id} href={this.props.shortUrl} target="_blank"> Visit </a>
        
        <button className="button button--pill"  ref="copy" data-clipboard-text={this.props.shortUrl}> {this.state.justCopied? 'Copied':'Copy'} </button>
        
        <button className="button button--pill"  ref="visibility" onClick={()=>{
           console.log('LinkListItem','visibility button clicked');
           Meteor.call('links.setVisibility', this.props._id, !this.props.visible, (req,res)=>{});
           
           
        }} >{this.props.visible? 'Hide':'Unhide'}</button>
        
       
        </div>

        )
    };
}
