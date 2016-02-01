	function categoryList($scope) {
		$scope.setCurrentCategory = function(category) { 
			if (!category) { $scope.$parent.currentCategory = null }
			else $scope.$parent.currentCategory = category
			$scope.$parent.isCreating = false
			$scope.$parent.isEditing = false
		}

		$scope.isCurrentCategory = function(category) {
			if (category === null) { return false }
			return $scope.$parent.currentCategory !== null && category.name === $scope.$parent.currentCategory.name
		}
	}

	angular
		.module('categories')
		.controller('categoryList', ['$scope', categoryList])