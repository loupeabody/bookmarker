	function listBookmark($rootScope,datastore,Bookmarks) {

		var that = this
		this.datastore = datastore

		addDefaultBookmarks(updateBookmarksInControllerScope)
		$rootScope.$on('newBookmarkCreated', updateBookmarksInControllerScope)
		// try resource#haschanges
		$rootScope.$on('bookmarkDeleted', updateBookmarksInControllerScope)

		this.startEditing = function(bookmark) {
			datastore.isCreating = false
			datastore.isEditing = true
			$rootScope.$emit('editThisBookmark',bookmark)
		}

		this.startCreating = function() {
			datastore.isCreating = true
			datastore.isEditing = false
		}

		function updateBookmarksInControllerScope() {
			Bookmarks.digest()
			Bookmarks.findAll({},{bypassCache: true}).then(function(p) { that.bookmarks = p })
		}

		function addDefaultBookmarks(cb) {
			Bookmarks.create({title: "AngularJS", url: "http://angularjs.org", category: "Development"}).then(cb)
			Bookmarks.create({title: "Egghead.io", url: "http://egghead.io", category: "Development"}).then(cb)
			Bookmarks.create({title: "A List Apart", url: "http://alistapart.com", category: "Design"}).then(cb)
			Bookmarks.create({title: "One Page Love", url: "http://onepagelove.com", category: "Design"}).then(cb)
			Bookmarks.create({title: "MobilityWOD", url: "http://www.mobilitywod.com", category: "Exercise"}).then(cb)
			Bookmarks.create({title: "Robb Wolf", url: "http://robbwolf.com", category: "Exercise"}).then(cb)
			Bookmarks.create({title: "Senor Gif", url: "http://membase.cheezburger.com/senorgif", category: "Humor"}).then(cb)
			Bookmarks.create({title: "Wimp", url: "http://wimp.com", category: "Humor"}).then(cb)
			Bookmarks.create({title: "Dump", url: "http://dump.com", category: "Humor"}).then(cb)
		}

	}

	angular
		.module('bookmarks')
		.controller('listBookmark', ['$rootScope','datastore','Bookmarks',listBookmark])