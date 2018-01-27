import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base'
export class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }

    createNewAccount(e) {

        e.preventDefault();
        const email = this.refs.email.value.trim();
        const password = this.refs.password.value.trim();

        Accounts.createUser({ email, password }, (err) => {
            console.log("client", "Signup", "createNewAccount", "err", err);
            if (err) {
                this.setState({
                    error: err.reason
                });
            }
            else {
                this.setState({
                    error: ''
                });
            }

        });



    }


    render() {
        return (<div className="boxed-view">
            <div className="boxed-view__box">
                <div><h1>Join ShortLink </h1></div>
             {(this.state.error)? <p>{this.state.error}</p>: undefined}
            <form className="boxed-view__form">
              <input type="email" ref="email" name="email" placeholder="Email" /> 
              <input type="password" ref="password" name="password" placeholder="Password" />
              <button className="button" onClick={this.createNewAccount.bind(this)}>Create New Account</button>
            </form>
            
            <p/>
            <div><Link to="/">Already Have An account</Link></div>
            </div>
            
            </div>);
    }
}
