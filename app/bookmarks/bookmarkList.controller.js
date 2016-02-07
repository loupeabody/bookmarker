	function listBookmark(datastore) {

		this.datastore = datastore

		this.startEditing = function(bookmark) {
			datastore.isCreating = false
			datastore.isEditing = true
			datastore.currentBookmark = bookmark
		}

		this.startCreating = function() {
			datastore.isCreating = true
			datastore.isEditing = false
		}

	}

	angular
		.module('bookmarks')
		.controller('listBookmark', ['datastore',listBookmark])