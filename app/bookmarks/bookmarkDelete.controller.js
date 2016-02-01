	function deleteBookmark($scope) {
		$scope.deleteBookmark = function(bookmark) {
			var index = $scope.$parent.bookmarks.indexOf(bookmark)
			$scope.$parent.bookmarks.splice(index, 1)
			$scope.$parent.isEditing = false
		}
	}

	angular
		.module('bookmarks')
		.controller('deleteBookmark', ['$scope', deleteBookmark])