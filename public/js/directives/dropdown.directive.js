angular.module('structureService', ['ui.bootstrap'])
  .directive('dropdown', function() {
    return {
      restrict: 'E',
      require: '^ngModel',
      scope: {
        ngModel: '=', // selection
        items: '=',   // items to select from
        callback: '&' // callback
      },
      link: function(scope, element, attrs) {
        element.on('click', function(event) {
          event.preventDefault();
        });
        
        scope.default = 'Вибрати проект';

        // selection changed handler
        scope.select = function(item) {
          scope.ngModel = item;
          if (scope.callback) {
            scope.callback({ item: item });
          }
        };
      },
      templateUrl: '../../templates/dropdown.template.html'
    };
  })
