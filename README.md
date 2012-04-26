Django+Backbone.js+Require.js Example
-----------------------

This is an example application using Django, with the help of [django-tastypie](https://github.com/toastdriven/django-tastypie), [backbone.js](https://github.com/documentcloud/backbone), [icanhaz.js](https://github.com/HenrikJoreteg/ICanHaz.js) and [require.js](http://requirejs.org/). It is based on the awesome [django-backbone-example](https://github.com/joshbohde/django-backbone-example) by Josh Bohde. I have just taken his example and modified for the purpose of the demonstration.


Running locally
---------------

Preferably in a virtualenv, run the following commands:

    git clone https://jvashishtha@github.com/jvashishtha/backbone-tastypie-requirejs.git
    cd ackbone-tastypie-requirejs/backbone_example
    pip install -r requirements.txt
    ./manage.py syncdb --noinput
    ./manage.py runserver
    

**This project uses grunt for building**. So go [grunt-bbb](https://github.com/backbone-boilerplate/grunt-bbb) for more info on how to do a build. Here's what I did:

    npm install -g bbb
    bbb debug
    bbb release
    
That's it. Run the above runserver command and open up the project.
