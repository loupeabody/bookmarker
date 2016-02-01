	function editBookmark($scope) {

		$scope.cancelEditing = function() {
			$scope.$parent.isEditing = false
		}

		$scope.initEditForm = function() {
			$scope.editedBookmark = {
				title: $scope.$parent.currentBookmark.title,
				url: $scope.$parent.currentBookmark.url,
				category: $scope.$parent.currentBookmark.category
			}
		}

		$scope.shouldShowEditing = function() {
			$scope.initEditForm()
			return $scope.$parent.isEditing && !$scope.$parent.isCreating
		}
	}

	angular
		.module('bookmarks')
		.controller('editBookmark', ['$scope', editBookmark])