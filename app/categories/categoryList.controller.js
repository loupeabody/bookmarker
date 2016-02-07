	function categoryList(datastore) {

		this.datastore = datastore

		this.setCurrentCategory = function(category) { 
			if (!category) { datastore.currentCategory = null }
			else datastore.currentCategory = category
			datastore.isCreating = false
			datastore.isEditing = false
		}

		this.isCurrentCategory = function(category) {
			if (category === null) { return false }
			return datastore.currentCategory !== null && category.name === datastore.currentCategory.name
		}
	}

	angular
		.module('categories')
		.controller('categoryList', ['datastore', categoryList])