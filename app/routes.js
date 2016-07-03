var Project = require('./models/project');
var Task = require('./models/task');
var Person = require('./models/person');
var ObjectId = require('mongoose').Types.ObjectId;

function getProject(res) {
    Project
    .find()
    .populate('tasks')
    .exec ( function (err, project) {
        if (err)
            res.send(err);

        console.log(project);
        res.json(project); 
    });
   
};

function getTask(res) {
    Task
    .find()
    .populate('project')
    .exec ( function (err, task) {
        if (err)
            res.send(err);

        console.log(task);
        res.json(task); 
    });
};

module.exports = function (app) {

    app.get('/api/projects', function (req, res) {
        getProject(res);
    });
    app.get('/api/tasks', function (req, res) {
        getTask(res);
    });

    app.post('/api/projects', function (req, res) {

        Project.create({
            title: req.body.title
        }, function (err, data) {
            if (err)
                res.send(err);

           getProject(res);
        });

    });

    app.post('/api/tasks', function (req, res) {
 
        Task.create({
            description: req.body.description,
            details: req.body.details,
            priority: req.body.priority,
            project: req.body.projectId
         }, function(err, task) {

                if (err) {
                    res.send(err);
                }

                Project.update({ _id: req.body.projectId },
                    { $push: { tasks: task._id } },
                    function (err, data) {
                        if (err)
                            res.send(err);
                        getTask(res);
                    }
                );  
            });
    });

    app.post('/api/projects/find/:project_id', function (req, res) {
        
        Project.findById(req.params.project_id, 
        function (err, project) {
            if (err) {
                res.send(err);
            }

            res.json(project);
        });

    });

    app.delete('/api/projects/:project_id', function (req, res) {
        Project.remove({
            _id: req.params.project_id
        }, function (err, project) {
            if (err) {
                res.send(err);
            }

            getProject(res);
        });
    });

    app.delete('/api/tasks/:task_id', function (req, res) {

        var task_id = new ObjectId(req.params.task_id);

        Task.remove({
            _id: req.params.task_id
        }, function (err, task) {
            if (err) {
                res.send(err);
            };
            Project.update({ tasks: task_id },                
                { $pull: { tasks: task_id } },
                function (err, data) {
                    if (err)
                        res.send(err);
                    getTask(res);
                }
            ); 
        });
    });

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};