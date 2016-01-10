var mysql = require('mysql');

var mysqlConnectionString = require('./mysqlConnectionString.js');

var mysqlConnectionStringProvider = {

	getMySqlConnection: function() {

		// console.log('==========================');
		// console.log(mysqlConnectionString.mysqlConnectionString.connection.dev);
		// console.log('==========================');

		var connection = mysql.createConnection(mysqlConnectionString.mysqlConnectionString.connection.dev);

		connection.connect(function (err) {
			if (err) { throw err}

			// console.log('==========================');
			// console.log('Connected successfully');
			// console.log('==========================');
		});
		return connection;
	},
	closeMySqlConnection: function(currentConnection) {
		if (currentConnection) {
			currentConnection.end(function(err) {
				if (err) { throw err;}

				// console.log('Connection closed successfully');
			});
		}

	}
}

module.exports.mysqlConnectionStringProvider = mysqlConnectionStringProvider;
