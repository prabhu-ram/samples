angular.module("productCategoryModule")
  .controller("editProductCategoryController", editProductCategoryController);

editProductCategoryController.$inject = ['$scope', '$timeout', '$location', 'productCategoryService', 'requiredFieldValidationService'];

function editProductCategoryController($scope, $timeout, $location, productCategoryService, requiredFieldValidationService) {

	$scope.productCategory = {
		categoryName : "",
		categoryDetails : ""
	};
	
	getProductCategoryId();

	// impl of the above method
	function getProductCategoryId() {
		productCategoryService.getProductCategoryId(productCategoryService.getIdFromEndPoint())
		   .success(function(data) {

			if (data && 
				data.productCategories &&
				data.productCategories.length > 0) {

				// there is only row here
				bindView(data.productCategories[0]);

			}
		});	
	}

	function bindView(productCategory) {
		$scope.productCategory.categoryName = productCategory.CategoryName;
		$scope.productCategory.categoryDetails = productCategory.Details;
	}
}
