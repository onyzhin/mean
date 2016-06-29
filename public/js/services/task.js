angular.module('taskService', [])

	// each function returns a promise object 
	.factory('Task', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/tasks');
			},
			create : function(data) {
				return $http.post('/api/tasks', data);
			},
			delete : function(id) {
				return $http.delete('/api/tasks/' + id);
			}
		}
	}]);