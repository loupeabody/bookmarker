	function editForm() {
		return {
			restrict: 'E',
			templateUrl: 'app/bookmarks/bookmarkEdit.directive.html'
		}
	}

	angular
		.module('bookmarks') 
		.directive('editForm',editForm)