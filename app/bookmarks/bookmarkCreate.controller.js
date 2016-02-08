	function createBookmark(datastore) {

		var that = this
		this.datastore = datastore

		// can add a $rootScope event to
		// update the value of the category field
		// with the currentCategory

		this.createBookmark = function() {
			// needs a better solution for unique ids
			that.newBookmark.id = datastore.bookmarks.length
			datastore.bookmarks.push(that.newBookmark)
			resetCreateForm()
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
		.controller('createBookmark', ['datastore',createBookmark])