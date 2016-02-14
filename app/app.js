	angular.module('categories',[])
	angular.module('bookmarks',['js-data'])
		.config(['DSProvider','DSLocalStorageAdapterProvider', function(DSProvider,DSLocalStorageAdapterProvider) {
			angular.extend(DSProvider.defaults,{})
			angular.extend(DSLocalStorageAdapterProvider.defaults,{})
		}])
		.run(function(DS,DSLocalStorageAdapter) {
			DS.registerAdapter('localstorage', DSLocalStorageAdapter, { default: true })
		})
		.factory('Bookmarks', function(DS,$window) {
			$window.localStorage.clear()
			return DS.defineResource('bookmark')
		})
	angular.module('bookmarker',['categories','bookmarks'])
		.factory('datastore', function() {

			return {

				categories: [
					{"id": 0, "name": "Development"},
					{"id": 1, "name": "Design"},
					{"id": 2, "name": "Exercise"},
					{"id": 3, "name": "Humor"}
				],

				currentCategory: null,
				isCreating: false,
				isEditing: false

			}

		})