var Debug = require('debug');
var debug = Debug('productCategoryRouteConfig');

function productCategoryRouteConfig(app, dbConnectionPool) {
	this.app = app;
	this.dbConnectionPool = dbConnectionPool;
	this.routeTable = [];
	this.init();
}

productCategoryRouteConfig.prototype.init = function () {
	var self = this;

	debug(self.dbConnectionPool);	
	self.addRoutes();
	self.processRoutes();

	debug("-----------------------");
	debug(self.routeTable);
	debug("-----------------------");
}

productCategoryRouteConfig.prototype.addRoutes = function() {
	var self = this;

	self.routeTable.push({
		requestType : 'get',
		requestUrl  : '/createProductCategory',
		callbackFunction: function(request, response) {
			response.render('createProductCategory', {title: "Create Product Category"});
		}
	});

	self.routeTable.push({
		requestType : 'post',
		requestUrl  : '/createProductCategory',
		callbackFunction: function(request, response) {

			debug("posted data:");
			debug(request.body);

			// DAO op api goes here
			var productCategoryDao = require('../Server/Dao/productCategoryDao.js');

			productCategoryDao.productCategoryDao.createProductCategory(
			    self.dbConnectionPool,
			    request.body, 
			    function(status) {
				response.json(status);
			});
		}
	});

	self.routeTable.push({
		requestType : 'get',
		requestUrl  : '/viewProductCategory',
		callbackFunction: function(request, response) {
			response.render('viewProductCategory', {title: "View Product Category"});
		}
	});

	// this is a RESTful api end point that is called by /viewProductCategory
	// http://localhost:3000/getAllProductCategory
	self.routeTable.push({
		requestType : 'get',
		requestUrl  : '/getAllProductCategory',
		callbackFunction: function(request, response) {
			var productCategoryDao = require('../Server/Dao/productCategoryDao.js');

			productCategoryDao.productCategoryDao.getAllProductCategory (
				self.dbConnectionPool,
				function(productCategories) {

					// debug("+++++++++++++++++++++++");
					// debug(productCategories);
					// debug("+++++++++++++++++++++++");

					response.json({productCategories: productCategories});
				}
			);
		}
	});

	self.routeTable.push({
		requestType : 'get',
		requestUrl  : '/editProductCategory/:productCategoryId',
		callbackFunction: function(request, response) {
			response.render('editProductCategory', {title: "Edit Product Category"});
		}
	});

	// REST api call
	// http://localhost:3000/getProductCategoryById/48
	self.routeTable.push({
		requestType : 'get',
		requestUrl  : '/getProductCategoryById/:productCategoryId',
		callbackFunction: function(request, response) {
			var productCategoryDao = require('../Server/Dao/productCategoryDao.js');

			productCategoryDao.productCategoryDao.getProductCategoryId (
			        self.dbConnectionPool,
				request.params.productCategoryId,
				function(productCategories) {

					//debug("+++++++++++++++++++++++");
					//debug(productCategories);
					//debug("+++++++++++++++++++++++");

					response.json({productCategories: productCategories});
				}
			);
		}
	});
}

productCategoryRouteConfig.prototype.processRoutes = function () {
	var self = this;
	self.routeTable.forEach(function(route) {
		if (route.requestType == 'get') {

			// debug(route);

			self.app.get(route.requestUrl, route.callbackFunction);
		}
		else if (route.requestType == 'post') {

			self.app.post(route.requestUrl, route.callbackFunction);
		}
		else if (route.requestType == 'delete') {}
	});
}

module.exports = productCategoryRouteConfig;
