	function createForm() {
		return {
			restrict: 'E',
			templateUrl: 'app/bookmarks/bookmarkCreate.directive.html'
		}
	}

	angular
		.module('bookmarks') 
		.directive('createForm',createForm)