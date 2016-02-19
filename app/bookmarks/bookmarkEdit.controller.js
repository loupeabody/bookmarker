	function editBookmark($rootScope,datastore,Bookmarks) {

		var that = this
		this.that = this
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
				that.editedBookmark = null
			})
		}

		this.deleteBookmark = function() {
			Bookmarks.destroy(that.editedBookmark.id).then(function() {
				that.editedBookmark = null
				$rootScope.$emit('bookmarkDeleted')
				datastore.isEditing = false
			})
		}

		this.cancelEditing = function() {
			that.editedBookmark = null
			datastore.isEditing = false
		}

		this.shouldShowEditing = function() {
			return datastore.isEditing && !datastore.isCreating
		}

	}

	angular
		.module('bookmarks')
		.controller('editBookmark', ['$rootScope','datastore','Bookmarks', editBookmark])