angular.module('main', [])

	.controller('mainController', ['$scope','$http','Project','Task', function($scope, $http, Project, Task) {
		$scope.project = {};
		$scope.loading = true;

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

		$scope.createProject = function() {

			if ($scope.project.title != undefined) {
				$scope.loading = true;

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
			Task.create($scope.task)
			.success(function(data) {
				$scope.task = {}; 
				$scope.tasks = data; 
				//upd project
				Project.get()
					.success(function(data) {
						$scope.projects = data; 
						$scope.loading = false;
					});
			});
		};

		$scope.deleteProject = function(id) {
			$scope.loading = true;

			Project.delete(id)
			.success(function(data) {
				$scope.loading = false;
				$scope.projects = data; 
			});
		};

		$scope.deleteTask= function(id) {

			Task.delete(id)
			.success(function(data) {
				$scope.tasks = data; 
				//upd project
				Project.get()
					.success(function(data) {
						$scope.projects = data; 
						$scope.loading = false;
					});
			});
		};
	}]);