import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

//below syntax directly executes the code
import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-config.js';


Meteor.startup(() => {
    // code to run on server at startup




    //Redirect to full url middleware if we find linkid
    WebApp.connectHandlers.use((req, res, next) => {

        //retrieve linkid
        const _linkId = req.url.slice(1);
        const link = Links.findOne({ _id: _linkId });
        if (link) {
            res.statusCode = 302;
            res.setHeader('Location', link.url);
            res.end();
            Meteor.call('links.trackVisit', _linkId);
        }
        else {
            next();
        }

    });

    WebApp.connectHandlers.use((req, res, next) => {
        console.log("server", "main", "startup", "custom middleware", "req.url", req.url, "req.query", req.query);

        //set http status code
        //res.statusCode = 404;
        //set HTTP header
        //res.setHeader('mycustomerheader', 'shortlink');
        //res.write('<h1>Middleware overriding</h1>');
        //res.end();
        next();
    });

});
