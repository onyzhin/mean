angular.module('projectService', [])

	// each function returns a promise object 
	.factory('Project', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/projects');
			},
			create : function(data) {
				return $http.post('/api/projects', data);
			},
			delete : function(id) {
				return $http.delete('/api/projects/' + id);
			},
			find : function(id) {
				return $http.post('/api/projects/find/' + id);
			}
		}
	}]);