'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
angular.module('users').factory('User', ['$resource',
	function($resource) {
		return $resource('auth/:action/:token', {
			action: '@action',
			token: '@token',
			},{'signin': {
						method: 'POST', 
						isArray: false,
						params:{action:'signin'}
						
         		},'signout': {
						method: 'GET', 
						isArray: false,
						params:{action:'signout'}
         		},'signup': {
						method: 'POST', 
						isArray: false,
						params:{action:'signup'}
         		}
     		}
 		);
	}
]);

angular.module('users').directive('pwCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.pwCheck.replace('.','-');
        elem.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val()===$(firstPassword).val();
            ctrl.$setValidity('pwmatch', v);
          });
        });
      }
    };
  }]);

