(function() {

	angular.module('categories',[])
	angular.module('bookmarks',['js-data'])
		.config(['DSProvider','DSLocalStorageAdapterProvider', function(DSProvider,DSLocalStorageAdapterProvider) {
			angular.extend(DSProvider.defaults,{})
			angular.extend(DSLocalStorageAdapterProvider.defaults,{})
		}])
		.run(function(DS,DSLocalStorageAdapter) {
			DS.registerAdapter('localstorage', DSLocalStorageAdapter, { default: true })
		})
		.factory('Bookmarks', function(DS,$window) {
			$window.localStorage.clear()
			return DS.defineResource('bookmark')
		})
	angular.module('bookmarker',['categories','bookmarks'])
		.factory('datastore', function() {

			return {

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

	function createBookmark($rootScope,datastore,Bookmarks) {

		var that = this
		this.datastore = datastore

		// can add a $rootScope event to
		// update the value of the category field
		// with the currentCategory

		this.createBookmark = function() {
			Bookmarks.create(that.newBookmark).then(function() {
				resetCreateForm()
				$rootScope.$emit('newBookmarkCreated')
			})
		}

		this.cancelCreating = function() {
			resetCreateForm()
			datastore.isCreating = false
		}

		function resetCreateForm(){
			that.newBookmark = null
			that.form.$setPristine()
			that.form.$setUntouched()
		}

		this.shouldShowCreating = function() { return datastore.isCreating && !datastore.isEditing }

	}

	angular
		.module('bookmarks')
		.controller('createBookmark', ['$rootScope','datastore','Bookmarks',createBookmark])

	function createForm() {
		return {
			restrict: 'E',
			templateUrl: 'app/bookmarks/bookmarkCreate.directive.html'
		}
	}

	angular
		.module('bookmarks') 
		.directive('createForm',createForm)

	function editBookmark($rootScope,datastore,Bookmarks) {

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
			Bookmarks.find(that.editedBookmark.id).then(function(b) {

				b.title = that.editedBookmark.title
				b.url = that.editedBookmark.url
				b.category = that.editedBookmark.category

				return Bookmarks.save(b.id)

			}).then(function() {
				datastore.isEditing = false
				resetEditForm()
			})
		}

		this.deleteBookmark = function() {
			// complicates the id situation, datastore/db will
			// likely solve this for us, but still...
			Bookmarks.destroy(that.editedBookmark.id).then(function() {
				resetEditForm()
				$rootScope.$emit('bookmarkDeleted')
				datastore.isEditing = false
			})
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

	}

	angular
		.module('bookmarks')
		.controller('editBookmark', ['$rootScope','datastore','Bookmarks', editBookmark])

	function editForm() {
		return {
			restrict: 'E',
			templateUrl: 'app/bookmarks/bookmarkEdit.directive.html'
		}
	}

	angular
		.module('bookmarks') 
		.directive('editForm',editForm)

	function listBookmark($rootScope,datastore,Bookmarks) {

		var that = this
		this.datastore = datastore

		addDefaultBookmarks(updateBookmarksInControllerScope)
		$rootScope.$on('newBookmarkCreated', updateBookmarksInControllerScope)
		// try resource#haschanges
		$rootScope.$on('bookmarkDeleted', updateBookmarksInControllerScope)

		this.startEditing = function(bookmark) {
			datastore.isCreating = false
			datastore.isEditing = true
			$rootScope.$emit('editThisBookmark',bookmark)
		}

		this.startCreating = function() {
			datastore.isCreating = true
			datastore.isEditing = false
		}

		function updateBookmarksInControllerScope() {
			Bookmarks.digest()
			Bookmarks.findAll({},{bypassCache: true}).then(function(p) { that.bookmarks = p })
		}

		function addDefaultBookmarks(cb) {
			Bookmarks.create({title: "AngularJS", url: "http://angularjs.org", category: "Development"}).then(cb)
			Bookmarks.create({title: "Egghead.io", url: "http://egghead.io", category: "Development"}).then(cb)
			Bookmarks.create({title: "A List Apart", url: "http://alistapart.com", category: "Design"}).then(cb)
			Bookmarks.create({title: "One Page Love", url: "http://onepagelove.com", category: "Design"}).then(cb)
			Bookmarks.create({title: "MobilityWOD", url: "http://www.mobilitywod.com", category: "Exercise"}).then(cb)
			Bookmarks.create({title: "Robb Wolf", url: "http://robbwolf.com", category: "Exercise"}).then(cb)
			Bookmarks.create({title: "Senor Gif", url: "http://membase.cheezburger.com/senorgif", category: "Humor"}).then(cb)
			Bookmarks.create({title: "Wimp", url: "http://wimp.com", category: "Humor"}).then(cb)
			Bookmarks.create({title: "Dump", url: "http://dump.com", category: "Humor"}).then(cb)
		}

	}

	angular
		.module('bookmarks')
		.controller('listBookmark', ['$rootScope','datastore','Bookmarks',listBookmark])

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

})()