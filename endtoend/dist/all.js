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

var productCategoryModule = angular.module("productCategoryModule", []);

angular.module("productCategoryModule")
  .service("productCategoryService", productCategoryService);

productCategoryService.$inject = ['$http', '$location'];


// all the functions here are available to all the controllers
// so put functions here that are reusable

function productCategoryService($http, $location) {

	return {
		// this is a method and the controller will send the productCategory
		createProductCategory: function(productCategory) {

			return $http.post('/createProductCategory', 
				{ 
					productCategoryName : productCategory.categoryName,
					productCategoryDetails : productCategory.categoryDetails
				}
			);
		},
	    // notice the comma above
		// viewProductCategoryController.js calls this method and takes back the json objects to bind with front end variables
		// rest call made here and the endpoint is exposed in the productCategoryRouteConfig.js file
		getAllProductCategories : function() {
			return $http.get('/getAllProductCategory');
		},

		// this is a hack done for expediency
		getIdFromEndPoint : function() {
			var absoluteUrl = $location.absUrl();
			var segments = absoluteUrl.split("/");

			var productCategoryId = segments[segments.length - 1];

			return productCategoryId;
		},

		// end point defined in productCategoryRouteConfig
		getProductCategoryId: function(productCategoryId) {
			return $http.get('/getProductCategoryById/' + productCategoryId);
		}
	};
}

angular.module("productCategoryModule")
  .factory("requiredFieldValidationService", requiredFieldValidationService);

// all the functions here are available to all the controllers
// so put functions here that are reusable

function requiredFieldValidationService() {

	// change this name later	
	function _getRequiredValidationMessage(requiredInfos) {

		var errorMessages = [];
		if (requiredInfos.length > 0) {
			angular.forEach(requiredInfos, function (requiredInfo) {
				if (requiredInfo.name !== 'undefined' &&
				   (requiredInfo.name === null ||
				   requiredInfo.name === '' ||
				   requiredInfo.name.length === 0) )
				{
					errorMessages.push(requiredInfo.errorMessage);
				}
			});
		}
		return errorMessages;
	}

	// because the above is a private method, the following is needed
	return {
		getRequiredFieldValidationErrorMessage: _getRequiredValidationMessage
	};
}

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
