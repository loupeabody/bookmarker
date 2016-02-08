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
			// complicates the id situation, datastore/db will
			// likely solve this for us, but still...
			var index = datastore.bookmarks.map(function(e) { return e.id }).indexOf(that.editedBookmark.id)
			datastore.bookmarks.splice(index, 1)
			datastore.isEditing = false
		}
	}

	angular
		.module('bookmarks')
		.controller('editBookmark', ['$rootScope','datastore', editBookmark])