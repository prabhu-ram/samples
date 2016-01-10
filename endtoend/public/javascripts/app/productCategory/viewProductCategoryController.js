angular.module("productCategoryModule")
  .controller("viewProductCategoryController", viewProductCategoryController);

viewProductCategoryController.$inject = ['$scope', '$timeout', 'productCategoryService'];

function viewProductCategoryController($scope, $timeout, productCategoryService) {

	// alert("viewProductCategoryController entered");

	$scope.productCategories = [];
	
	getAllProductCategories();

	function getAllProductCategories() {
		productCategoryService.getAllProductCategories()
		   .success(function(data) {

			if (data &&
			    data.productCategories &&
				data.productCategories.length > 0) {

				$scope.productCategories = data.productCategories;

				// alert($scope.productCategories[0].Id);
			}
		});	
	}
}
