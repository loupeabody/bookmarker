describe('editBookmark', function() {
	var $rootScope,
			$controller,
			datastore,
			Bookmarks,
			scope,
			edit

	beforeEach(module('bookmarker'))

	beforeEach(inject(function(_$rootScope_,_$controller_,_Bookmarks_,_datastore_) {
		$rootScope = _$rootScope_
		scope = $rootScope.$new()
		datastore = _datastore_
		Bookmarks = _Bookmarks_
		$controller = _$controller_

		edit = $controller('editBookmark',{$scope: scope},{datastore: datastore, Bookmarks: Bookmarks})
	}))

	describe('private behavior', function() {
		it('should have a stored refrence to \'this\' named \'that\'', function() {
			expect(edit.that).toBe(edit)
		})
	})

	describe('updateBookmark',function(){

		beforeEach(function() {
			Bookmarks.create({
				id: 1,
				title: 'before',
				url: 'before',
				category: 'before'
			})
			edit.editedBookmark = {
				id: 1,
				title: 'test',
				url: 'test',
				category: 'test'
			}
		})

		// Are these tests passing because the assertions
		// clear or are the assertions not executing at all?
		// I want a reporter which will explicate the assertions
		// and the value in each of the clauses

		it('should set the \'isEditing\' flag to false', function(done) {
			datastore.isEditing = true
			edit.updateBookmark()
			done()
			expect(datastore.isEditing).toBe(false)
		})
		it('should nullify the editedBookmark object', function(done) {
			edit.updateBookmark()
			done()
			expect(edit.editedBookmark).toBe(null)
		})
		it('should update the target bookmark', function(done) {
			edit.updateBookmark()
			var bookmark = {}
			Bookmarks.find(1).then(function(b) { bookmark = b })
			done()
			expect(bookmark.title).toBe('test')
		})
	})

	describe('deleteBookmark',function(){

		// these tests pass, but they don't really cover
		// the changes to the underlying data, where a bookmark
		// that existed in the database is removed

		// the Bookmarks service is not touched here.
		// I'm using the methods which return promises
		// How should I test promises? Or perhaps more generally
		// How are async methods tested?
		// by using done() to signal when async work is finished

		beforeEach(function() {
			edit.editedBookmark = { id: 1 }
		})

		it('should emit the custom \'bookmarkDeleted\' event on the $rootScope object', function() {
			var hasEmitted = false
			$rootScope.$on('bookmarkDeleted', function() {
				hasEmitted = true
				expect(hasEmitted).toBe(true)
			})
			edit.deleteBookmark()
		})
		it('should nullify the editedBookmark object', function() {
			edit.deleteBookmark()
			$rootScope.$on('bookmarkDeleted', function() {
				expect(edit.editedBookmark).toBe(null)
			})
		})
		it('should set the \'isEditing\' flag to false', function() {
			datastore.isEditing = true
			edit.deleteBookmark()
			$rootScope.$on('bookmarkDeleted', function() {
				expect(datastore.isEditing).toBe(false)
			})
		})
	})

	describe('shouldShowEditing',function(){
		it('returns false when the isCreating flag is true and the isEditing flag is true', function() {
			datastore.isCreating = true
			datastore.isEditing = true
			expect(edit.shouldShowEditing()).toBe(false)
		})
		it('returns true when the isCreating flag is false and the isEditing flag is true', function() {
			datastore.isEditing = true
			datastore.isCreating = false
			expect(edit.shouldShowEditing()).toBe(true)
		})
	})

	describe('cancelEditing',function(){
		it('should toggle the \'isEditing\' flag to false', function() {
			edit.cancelEditing()
			expect(edit.datastore.isEditing).toBe(false)
		})
	})

})