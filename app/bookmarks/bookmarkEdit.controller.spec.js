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

	describe('utilities', function() {
		it('should have a stored refrence to \'this\' named \'that\'', function() {
			expect(edit.that).toBe(edit)
		})
	})

	// describe('updateBookmark',function(){
	// 	it('', function() {

	// 	})
	// })

	// describe('deleteBookmark',function(){
	// 	it('', function() {

	// 	})
	// })

	// describe('shouldShowEditing',function(){
	// 	it('', function() {

	// 	})
	// })

	describe('cancelEditing',function(){
		it('should toggle the \'isEditing\' flag to false', function() {
			edit.cancelEditing()
			expect(edit.datastore.isEditing).toBe(false)
		})
	})

})