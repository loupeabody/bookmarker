	function editBookmark(datastore) {

		this.datastore = datastore

		this.editedBookmark = {
			title: datastore.currentBookmark.title,
			url: datastore.currentBookmark.url,
			category: datastore.currentBookmark.category
		}

		this.updateBookmark = function() {}

		this.cancelEditing = function(form) {
			resetEditForm(form)
			datastore.isEditing = false
		}

		this.shouldShowEditing = function() {
			return datastore.isEditing && !datastore.isCreating
		}

		function resetEditForm(form) {
			this.editedBookmark = {
				title: datastore.currentBookmark.title,
				url: datastore.currentBookmark.url,
				category: datastore.currentBookmark.category
			}
			form.$setPristine()
			form.$setUntouched()
		}

		this.deleteBookmark = function(bookmark) {
			var index = datastore.bookmarks.indexOf(bookmark)
			datastore.bookmarks.splice(index, 1)
			datastore.isEditing = false
		}
	}

	angular
		.module('bookmarks')
		.controller('editBookmark', ['datastore', editBookmark])