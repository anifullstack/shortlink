import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Accounts } from 'meteor/accounts-base';

import { browserHistory } from 'react-router';


import PrivateHeader from './PrivateHeader';
import { LinkList } from './LinkList';
import { AddLink } from './AddLink';
import { LinkListFilters } from './LinkListFilters';



export default () => {
    return (
        <div>
            <PrivateHeader title = "Short Links v0.0.3"/>
            <div className="page-content">
                <LinkListFilters/>
                <AddLink />
                <LinkList /> 
            </div>
        </div>);
};
