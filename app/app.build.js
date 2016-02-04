(function() {

	angular.module('categories',[])
	angular.module('bookmarks',[])
	angular.module('bookmarker',['categories','bookmarks'])
		.controller('bookmarkerMain', ['$scope', function($scope) {

			$scope.bookmarks = [
				{"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development"},
				{"id": 1, "title": "Egghead.io", "url": "http://egghead.io", "category": "Development"},
				{"id": 2, "title": "A List Apart", "url": "http://alistapart.com", "category": "Design"},
				{"id": 3, "title": "One Page Love", "url": "http://onepagelove.com", "category": "Design"},
				{"id": 4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com", "category": "Exercise"},
				{"id": 5, "title": "Robb Wolf", "url": "http://robbwolf.com", "category": "Exercise"},
				{"id": 6, "title": "Senor Gif", "url": "http://membase.cheezburger.com/senorgif", "category": "Humor"},
				{"id": 7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor"},
				{"id": 8, "title": "Dump", "url": "http://dump.com", "category": "Humor"}
			]

			$scope.categories = [
				{"id": 0, "name": "Development"},
				{"id": 1, "name": "Design"},
				{"id": 2, "name": "Exercise"},
				{"id": 3, "name": "Humor"}
			]

			$scope.currentBookmark = {title: "",url: "",category:""}
			$scope.currentCategory = null
			$scope.isCreating = false
			$scope.isEditing = false

		}])

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

	function createForm() {
		return {
			restrict: 'E',
			templateUrl: 'app/bookmarks/bookmarkCreate.directive.html'
		}
	}

	angular
		.module('bookmarks') 
		.directive('createForm',createForm)

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

	function editForm() {
		return {
			restrict: 'E',
			templateUrl: 'app/bookmarks/bookmarkEdit.directive.html'
		}
	}

	angular
		.module('bookmarks') 
		.directive('editForm',editForm)

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

	function categoryList($scope) {
		$scope.setCurrentCategory = function(category) { 
			if (!category) { $scope.$parent.currentCategory = null }
			else $scope.$parent.currentCategory = category
			$scope.$parent.isCreating = false
			$scope.$parent.isEditing = false
		}

		$scope.isCurrentCategory = function(category) {
			if (category === null) { return false }
			return $scope.$parent.currentCategory !== null && category.name === $scope.$parent.currentCategory.name
		}
	}

	angular
		.module('categories')
		.controller('categoryList', ['$scope', categoryList])

})()