angular.module('main', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Project','Task', function($scope, $http, Project, Task) {
		$scope.project = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Project.get()
			.success(function(data) {
				$scope.projects = data; 
				$scope.loading = false;
			});

		Task.get()
			.success(function(data) {
				$scope.tasks = data; 
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createProject = function() {

			// validate the formData to make sure that something is there
			if ($scope.project.title != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Project.create($scope.project)
		
					.success(function(data) {
						$scope.loading = false;
						$scope.project = {}; 
						$scope.projects = data; 
					});
			}
		};

		$scope.findProject = function(id) {
			
			if (typeof id !== 'undefined') {

				Project.find(id)

					.success(function(data) {
						return data.title;
					}); 
			}
		};

		$scope.createTask = function() {
			console.log($scope.task); 
			Task.create($scope.task)

				.success(function(data) {
					$scope.task = {}; 
					$scope.tasks = data; 
				});
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteProject = function(id) {
			$scope.loading = true;

			Project.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.projects = data; // assign our new list of todos
				});
		};
	}]);