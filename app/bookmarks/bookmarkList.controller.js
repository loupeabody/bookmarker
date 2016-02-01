	function listBookmark($scope) {

		$scope.startEditing = function(bookmark) {
			$scope.$parent.isCreating = false
			$scope.$parent.isEditing = true
			$scope.$parent.currentBookmark = bookmark
		}

		$scope.startCreating = function() {
			$scope.$parent.isCreating = true
			$scope.$parent.isEditing = false
			resetCreateForm()
		}

		function resetCreateForm(){
			$scope.newBookmark = { title: '', url: '', category: $scope.$parent.currentCategory }
		}

	}

	angular
		.module('bookmarks')
		.controller('listBookmark', ['$scope', listBookmark])