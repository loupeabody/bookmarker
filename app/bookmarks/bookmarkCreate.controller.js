	function createBookmark($scope) {

		$scope.createBookmark = function(bookmark) {
			bookmark.id = $scope.bookmarks.length
			$scope.$parent.bookmarks.push(bookmark)

			resetCreateForm()
		}

		$scope.cancelCreating = function() {
			$scope.$parent.isCreating = false
		}

		function resetCreateForm(){
			$scope.newBookmark = { title: '', url: '', category: $scope.$parent.currentCategory }
		}

		$scope.shouldShowCreating = function() { return $scope.$parent.isCreating && !$scope.$parent.isEditing }

	}

	angular
		.module('bookmarks')
		.controller('createBookmark', ['$scope', createBookmark])