import { Meteor } from 'meteor/meteor';
import React from 'react';

import { Router, Route, browserHistory } from 'react-router';
import { Signup } from './../ui/Signup';
import MyLinkApp from './../ui/MyLinkApp';
import NotFound from './../ui/NotFound';
import { Login } from './../ui/Login';


const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = () => {
    if (Meteor.userId()) {
        browserHistory.replace('/links');
    }
}

const onEnterPrivatePage = () => {
    if (!Meteor.userId()) {
        browserHistory.replace('/');
    }
}

export const onAuthChange = (isAuthenticated) => {


    const pathname = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    console.log("client", "Main", "autorun", "isAuthenticated", isAuthenticated, 'isUnauthenticatedPage', isUnauthenticatedPage, 'isAuthenticatedPage', isAuthenticatedPage);
    //if unauthenticated page and logged in redirect to links
    if (isUnauthenticatedPage && isAuthenticated) browserHistory.replace('/links');
    else if (isAuthenticatedPage && !isAuthenticated) browserHistory.replace('/login');


}

export const routes = (
    <Router history={browserHistory}>
       
        <Route path='/' component={Login} exact={true}  onEnter={onEnterPublicPage}/>
         <Route path='/login' component={Login} exact={true}  onEnter={onEnterPublicPage}/>
        <Route path='/signup' component={Signup} exact={true} onEnter={onEnterPublicPage}  />
        <Route path='/links' component={MyLinkApp} exact={true}  onEnter={onEnterPrivatePage} />
        
        <Route path='*' component={NotFound}/>
    </Router>);
