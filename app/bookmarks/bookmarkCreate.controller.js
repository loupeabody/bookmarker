	function createBookmark(datastore) {

		this.datastore = datastore

		this.createBookmark = function(bookmark,form) {
			bookmark.id = datastore.bookmarks.length
			datastore.bookmarks.push(bookmark)
			resetCreateForm(form)
		}

		this.cancelCreating = function(form) {
			resetCreateForm(form)
			datastore.isCreating = false
			console.log(form)
		}

		function resetCreateForm(form){
			this.newBookmark = { title: '', url: '', category: datastore.currentCategory }
			form.$setPristine()
			form.$setUntouched()
		}

		this.shouldShowCreating = function() { return datastore.isCreating && !datastore.isEditing }

	}

	angular
		.module('bookmarks')
		.controller('createBookmark', ['datastore',createBookmark])