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