	function listBookmark($rootScope,datastore) {

		this.datastore = datastore

		this.startEditing = function(bookmark) {
			datastore.isCreating = false
			datastore.isEditing = true
			$rootScope.$emit('editThis',bookmark)
		}

		this.startCreating = function() {
			datastore.isCreating = true
			datastore.isEditing = false
		}

	}

	angular
		.module('bookmarks')
		.controller('listBookmark', ['$rootScope','datastore',listBookmark])