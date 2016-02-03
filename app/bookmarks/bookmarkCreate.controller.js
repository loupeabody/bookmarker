	function createBookmark($scope) {

		var form = $scope.createForm

		$scope.createBookmark = function(bookmark,form) {
			bookmark.id = $scope.bookmarks.length
			$scope.$parent.bookmarks.push(bookmark)
			resetCreateForm(form)
		}

		$scope.cancelCreating = function(form) {
			$scope.$parent.isCreating = false
			console.log(form)
			resetCreateForm(form)
		}

		function resetCreateForm(form){
			$scope.newBookmark = { title: '', url: '', category: $scope.$parent.currentCategory }
			form.$setPristine()
			form.$setUntouched()
		}

		$scope.shouldShowCreating = function() { return $scope.$parent.isCreating && !$scope.$parent.isEditing }

		$scope.debug = function(form) { console.log(form) }

	}

	angular
		.module('bookmarks')
		.controller('createBookmark', ['$scope', createBookmark])