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
