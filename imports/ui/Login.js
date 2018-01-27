import React from 'react';
import { Link } from 'react-router';
import { meteor } from 'meteor/meteor';

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };

    }

    handleLogin(e) {
        e.preventDefault();
        const email = this.refs.email.value.trim();
        const password = this.refs.password.value.trim();

        Meteor.loginWithPassword({ email }, password, (err) => {
            if (err) {
                this.setState({
                    error: 'Unable to login. Check email and password'
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
                    <div>Login Form </div>
            {(this.state.error)? <p>{this.state.error}</p> : undefined}
            <form className = "boxed-view__form" onSubmit={this.handleLogin.bind(this)}>
               <input type="email" ref="email" placeholder="email" />
               <input type="password" ref="password" placeholder="password" />
               <button className="button">Login</button>
            </form>
            <p/>
            <div><Link to='/signup' >Sign up here </Link></div>
                </div>
            
            </div>);
    }
}
