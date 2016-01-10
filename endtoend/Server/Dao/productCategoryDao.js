var Debug = require('debug');
var debug = Debug('productCategoryDao');

// these methods are called through the productCategoryConfigRoutes.js file
// TODO: connection pooling not done

// var connectionProvider = require('../mysqlConnectionStringProvider.js');

var productCategoryDao = {

	//TODO: need to add transactions
	createProductCategory : function(pool, productCategory, OnSuccessfulCallback) {

		pool.getConnection(function(err,connection){
			if(err) {
				//TODO: error handling - either db is down or running out of connections both of which are bad
				throw (err);
			} else {
				var insertStatement = "INSERT INTO productCategory SET?";

				var category = {
					CategoryName: productCategory.productCategoryName,
					Details: productCategory.productCategoryDetails,
					isValid: true,
					CreatedDate: new Date()
				};

				connection.query(insertStatement, category, function(err, result) {
					if (err) {
						console.log("error on insert");
					}
					connection.release();
					OnSuccessfulCallback({status: 'successful'});
				});
			}
		}); // getConnection end

		/*
		var insertStatement = "INSERT INTO productCategory SET?";

		var category = {
			CategoryName: productCategory.productCategoryName,
			Details: productCategory.productCategoryDetails,
			isValid: true,
			CreatedDate: new Date()
		};

		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		if (connection) {
			connection.query(insertStatement, category, function(err, result) {
				if (err) {
					console.log("error on insert");
				}
				OnSuccessfulCallback({status: 'successful'});
			});
		}
		connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		*/
	},

	getAllProductCategory : function(pool, callback) {
		pool.getConnection(function(err,connection){
			if(err) {
				//TODO: error handling - serious error here
				// callback(true);
				throw (err);
			} else {
				var queryStatement = "SELECT * FROM productCategory ORDER BY Id DESC";
				connection.query(queryStatement, function(err, rows, fields) {
					if (err) {
						throw err;
					}
					else {
						connection.release();
						callback(rows);
					}
				});
		     	}
		});
		/*
		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();

		var queryStatement = "SELECT * FROM productCategory ORDER BY Id DESC";

		// console.log(queryStatement);

		if (connection) {
			connection.query(queryStatement, function(err, rows, fields) {
				if (err) {
					throw err;
				}

				// console.log(rows);
				callback(rows);
			});
		}
		connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		*/
	},

	getProductCategoryId : function(pool, productCategoryId, callback) {
		pool.getConnection(function(err,connection){
			if(err) {
				//TODO: error handling - serious error here
				// callback(true);
				throw (err);
			} else {
				var queryStatement = "SELECT * FROM productCategory WHERE Id = ?";
				connection.query(queryStatement, [productCategoryId], function(err, rows, fields) {
					if (err) {
						throw err;
					}

					debug("=============================");
					debug(rows);
					debug("=============================");

					connection.release();
					callback(rows);
			});

			}
		});

		/*
		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		var queryStatement = "SELECT * FROM productCategory WHERE Id = ?";

		debug(queryStatement);

		if (connection) {
			connection.query(queryStatement, [productCategoryId], function(err, rows, fields) {
				if (err) {
					throw err;
				}

				debug("=============================");
				debug(rows);
				debug("=============================");

				callback(rows);
			});
		}
		connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		*/
	}
};

module.exports.productCategoryDao = productCategoryDao;
