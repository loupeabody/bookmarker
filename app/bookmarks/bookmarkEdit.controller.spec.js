describe('editBookmark', function() {
	var $rootScope,
			datastore,
			Bookmarks,
			createController

	beforeEach(module('bookmarker'))

	beforeEach(inject(function(_$rootScope_,$templateCache,$compile,$controller,_Bookmarks_,_datastore_) {
		$rootScope = _$rootScope_
		datastore = _datastore_
		Bookmarks = _Bookmarks_

		var formDirective = $templateCache.get('app/bookmarks/editBookmark.directive.html')
		$rootScope.form = $compile(formDirective)($rootScope)
		$rootScope.$digest()

		createController = function() { return $controller('editBookmark',{},{form: $rootScope.form,datastore: datastore}) }
	}))

	describe('updateBookmark',function(){
		it('', function() {

		})
	})

	describe('deleteBookmark',function(){
		it('', function() {

		})
	})

	describe('shouldShowEditing',function(){
		it('', function() {

		})
	})

	describe('cancelEditing',function(){
		it('should toggle the \'isEditing\' flag to false', function() {
			var edit = createController()
			edit.cancelEditing()
			expect(edit.datastore.isEditing).toBe(false)
		})
	})

})