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
		}

		this.cancelEditing = function(form) {
			resetEditForm(form)
			datastore.isEditing = false
		}

		this.shouldShowEditing = function() {
			return datastore.isEditing && !datastore.isCreating
		}

		function resetEditForm(form) {
			that.editedBookmark = null
			form.$setPristine()
			form.$setUntouched()
		}

		this.deleteBookmark = function(bookmark) {
			var index = datastore.bookmarks.map(function(e) { return e.id }).indexOf(that.editedBookmark.id)
			datastore.bookmarks.splice(index, 1)
			datastore.isEditing = false
		}
	}

	angular
		.module('bookmarks')
		.controller('editBookmark', ['$rootScope','datastore', editBookmark])