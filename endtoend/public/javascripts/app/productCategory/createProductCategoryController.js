angular.module("productCategoryModule")
  .controller("createProductCategoryController", createProductCategoryController);

createProductCategoryController.$inject = ['$scope', '$timeout', 'productCategoryService', 'requiredFieldValidationService'];

function createProductCategoryController($scope, $timeout, productCategoryService, requiredFieldValidationService) {
	
	$scope.productCategory = {
		categoryName : "",
		categoryDetails : ""
	};

	function clearProductCategory() {
		$scope.productCategory.categoryName = "";
		$scope.productCategory.categoryDetails = "";
	}

	$scope.message = {
		containsSuccessfulMessage: false,
		successfulMessage: ""
	};

	function clearMessage() {
		$scope.message.containsSuccessfulMessage = false;
		$scope.message.successfulMessage = "";
	}

	function displayMessage() {
		$scope.message.containsSuccessfulMessage = true;
		$scope.message.successfulMessage = "A record was added successfully";
	}

	$scope.validationResult = {
		containsValidationError: false,
		validationSummary: ""
	};

	function clearValidationResult() {
		$scope.validationResult.containsValidationError = false;
		$scope.validationResult.validationSummary = "";
	}

	$scope.createProductCategory = function(productCategory) {

		var validationMessages = requiredFieldValidationService.getRequiredFieldValidationErrorMessage(
			[
			 {name: $scope.productCategory.categoryName || "", errorMessage : 'please enter product category\n'},
			 {name: $scope.productCategory.categoryDetails || "", errorMessage : 'please enter product category details'}
			]);

		if (validationMessages.length > 0) {
			$scope.validationResult.containsValidationError = true;

			angular.element("#validationErrorMessage").empty();

			validationMessages.forEach(function(errorMessage) {

				angular.element("<li></li>")
				    .html (errorMessage)
				    .appendTo("#validationErrorMessage");
				 
			});
		}
		else {
			productCategoryService.createProductCategory(productCategory)
		   	    .success(function(data) {

				if (data.status &&
				       data.status == 'successful')
					displayMessage();

				$timeout(function afterTimeOut() {
					clearMessage();
					clearProductCategory();
					clearValidationResult();
				}, 5000);

			// alert("data posted successfully");
		   });
		}
	};
}

