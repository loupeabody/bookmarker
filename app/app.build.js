(function() {

	angular.module('categories',[])
	angular.module('bookmarks',[])
	angular.module('bookmarker',['categories','bookmarks'])
		.factory('datastore', function() {

			return {

				bookmarks: [
					{"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development"},
					{"id": 1, "title": "Egghead.io", "url": "http://egghead.io", "category": "Development"},
					{"id": 2, "title": "A List Apart", "url": "http://alistapart.com", "category": "Design"},
					{"id": 3, "title": "One Page Love", "url": "http://onepagelove.com", "category": "Design"},
					{"id": 4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com", "category": "Exercise"},
					{"id": 5, "title": "Robb Wolf", "url": "http://robbwolf.com", "category": "Exercise"},
					{"id": 6, "title": "Senor Gif", "url": "http://membase.cheezburger.com/senorgif", "category": "Humor"},
					{"id": 7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor"},
					{"id": 8, "title": "Dump", "url": "http://dump.com", "category": "Humor"}
				],

				categories: [
					{"id": 0, "name": "Development"},
					{"id": 1, "name": "Design"},
					{"id": 2, "name": "Exercise"},
					{"id": 3, "name": "Humor"}
				],

				currentCategory: null,
				isCreating: false,
				isEditing: false

			}

		})

	function categoryList(datastore) {

		this.datastore = datastore

		this.setCurrentCategory = function(category) { 
			if (!category) { datastore.currentCategory = null }
			else datastore.currentCategory = category
			datastore.isCreating = false
			datastore.isEditing = false
		}

		this.isCurrentCategory = function(category) {
			if (category === null) { return false }
			return datastore.currentCategory !== null && category.name === datastore.currentCategory.name
		}
	}

	angular
		.module('categories')
		.controller('categoryList', ['datastore', categoryList])

	function createBookmark(datastore) {

		this.datastore = datastore

		this.createBookmark = function(bookmark,form) {
			bookmark.id = datastore.bookmarks.length
			datastore.bookmarks.push(bookmark)
			resetCreateForm(form)
		}

		this.cancelCreating = function(form) {
			resetCreateForm(form)
			datastore.isCreating = false
			console.log(form)
		}

		function resetCreateForm(form){
			this.newBookmark = { title: '', url: '', category: datastore.currentCategory }
			form.$setPristine()
			form.$setUntouched()
		}

		this.shouldShowCreating = function() { return datastore.isCreating && !datastore.isEditing }

	}

	angular
		.module('bookmarks')
		.controller('createBookmark', ['datastore',createBookmark])

	function createForm() {
		return {
			restrict: 'E',
			templateUrl: 'app/bookmarks/bookmarkCreate.directive.html'
		}
	}

	angular
		.module('bookmarks') 
		.directive('createForm',createForm)

	function editBookmark($rootScope,datastore) {

		var that = this
		this.datastore = datastore

		$rootScope.$on('editThisBookmark', function(e,bookmark) {
			that.editedBookmark = {
				title: bookmark.title,
				url: bookmark.url,
				category: bookmark.category,
				id: bookmark.id
			}
		})

		this.updateBookmark = function() {
			var index = datastore.bookmarks.map(function(e) { return e.id }).indexOf(that.editedBookmark.id)
			datastore.bookmarks.splice(index,1,that.editedBookmark)
			datastore.isEditing = false
			resetEditForm()
		}

		this.cancelEditing = function() {
			resetEditForm()
			datastore.isEditing = false
		}

		this.shouldShowEditing = function() {
			return datastore.isEditing && !datastore.isCreating
		}

		function resetEditForm() {
			that.editedBookmark = null
			that.form.$setPristine()
			that.form.$setUntouched()
		}

		this.deleteBookmark = function() {
			var index = datastore.bookmarks.map(function(e) { return e.id }).indexOf(that.editedBookmark.id)
			datastore.bookmarks.splice(index, 1)
			datastore.isEditing = false
		}
	}

	angular
		.module('bookmarks')
		.controller('editBookmark', ['$rootScope','datastore', editBookmark])

	function editForm() {
		return {
			restrict: 'E',
			templateUrl: 'app/bookmarks/bookmarkEdit.directive.html'
		}
	}

	angular
		.module('bookmarks') 
		.directive('editForm',editForm)

	function listBookmark($rootScope,datastore) {

		this.datastore = datastore

		this.startEditing = function(bookmark) {
			datastore.isCreating = false
			datastore.isEditing = true
			$rootScope.$emit('editThisBookmark',bookmark)
		}

		this.startCreating = function() {
			datastore.isCreating = true
			datastore.isEditing = false
		}

	}

	angular
		.module('bookmarks')
		.controller('listBookmark', ['$rootScope','datastore',listBookmark])

})()