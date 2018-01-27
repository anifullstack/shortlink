import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';


import { Links } from './../api/links';


export class AddLink extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: 'default url',
            isOpen: false,
            links: [],
            error: ''
        };
        console.log("client", "MyLinkList", "constructor", "user", Meteor.user());
    }



    onSubmit(e) {
        e.preventDefault();
        const url = this.state.url;

        if (url) {
            Meteor.call('links.insert', url, (err, res) => {
                if (err) this.setState({ error: err.reason, });
                else {
                    this.setState({ error: '', url: '', isOpen: false });
                }
            });

        }


    }

    onURLChange(e) {
        this.setState({
            url: e.target.value.trim()
        });

    }

    handleModalClose() {
        this.setState({ isOpen: false, url: '', error: '' });
    }

    render() {
        return (<div>
       
        <button  className="button" onClick={()=> this.setState({isOpen:true})}>+Add Link </button>
        <Modal 
            isOpen={this.state.isOpen}
            onAfterOpen={()=> this.refs.url.focus()}
            contentLabel="Add Link"
            onRequestClose={this.handleModalClose.bind(this)}
            className="boxed-view__box"
            overlayClassName="boxed-view boxed-view--modal"
            >
                <h1>Add Link </h1>
                {this.state.error ? <p>{this.state.error}</p> : undefined }
                <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                    <input type="text" ref="url" placeholder="url" value={this.state.url} onChange={this.onURLChange.bind(this)}/>
                    <button className="button">Add Link </button>
                    <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
                </form>
                <p/>
                
         </Modal>
        </div>);
    }
}
