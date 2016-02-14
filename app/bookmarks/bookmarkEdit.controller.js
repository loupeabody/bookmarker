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