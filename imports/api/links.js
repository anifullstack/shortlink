import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {

    //userId is not easily available through api Meteor.userId is not available in publish functions.
    //we use this binding
    Meteor.publish('links', function() {
        console.log("server", "api", "links", "userId", this.userId);
        return Links.find({ userId: this.userId });
    });
}

//use of Meteor Methods
Meteor.methods({
    'links.insert' (url) {
        if (!this.userId) throw new Meteor.Error('unauthorized', 'you need to log in');


        new SimpleSchema({ url: { type: String, regEx: SimpleSchema.RegEx.Url, label: 'Your Link' } }).validate({ url });


        Links.insert({ _id: shortid.generate(), url, userId: this.userId, visible: true, visitedCount: 0, lastVisitedAt: null });
    },

    'links.setVisibility' (_id, visible) {
        if (!this.userId) throw new Meteor.Error('unauthorized', 'you need to log in');

        //request param validation
        new SimpleSchema({
            _id: { type: String, min: 1 },
            visible: { type: Boolean }

        }).validate({ _id, visible });



        console.log("server", "api", "links", "setVisibility", _id, visible);
        Links.update({ _id, userId: this.userId }, { $set: { visible: visible } });

    },

    'links.trackVisit' (_id) {

        //request param validation
        new SimpleSchema({
            _id: { type: String, min: 1 },

        }).validate({ _id });

        Links.update({ _id }, { $set: { lastVisitedAt: new Date().getTime() }, $inc: { visitedCount: 1 } })
    }
});
