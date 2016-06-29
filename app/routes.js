var Project = require('./models/project');
var Task = require('./models/task');
var Person = require('./models/person');

function getProject(res) {
    Project.find(function (err, projects) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(projects); // return all todos in JSON format
    }); 
};

function getTask(res) {
    Task.find(function (err, tasks) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(tasks); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/projects', function (req, res) {
        // use mongoose to get all todos in the database
        getProject(res);
    });
    app.get('/api/tasks', function (req, res) {
        // use mongoose to get all todos in the database
        getTask(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/projects', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Project.create({
            title: req.body.title
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
           getProject(res);
        });

    });
    // create todo and send back all todos after creation
    app.post('/api/tasks', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Task.create({
            description: req.body.description,
            priority: req.body.priority,
            timePlaning: req.body.timePlaning,
            project: req.body.projectID
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
           getTask(res);
        });

    });

    app.post('/api/projects/find/:project_id', function (req, res) {
        
        Project.findById(req.params.project_id, 
        function (err, project) {
            if (err)
                res.send(err);

            res.json(project);
        });

    });

    // delete a todo
    app.delete('/api/projects/:project_id', function (req, res) {
        Project.remove({
            _id: req.params.project_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getProject(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};