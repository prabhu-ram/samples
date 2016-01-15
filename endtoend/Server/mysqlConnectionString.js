var mysqlConnectionString = {
	connection : {
		dev: {
			host: 'localhost',
			user: 'root',
			password: 'Abc123!@#',
			database: 'productmanagement'
		},

		qa: {
			host: '192.168.1.5',
			user: 'prabhu',
			password: 'prabhu',
			database: 'productmanagement'
		}
	}
};

module.exports.mysqlConnectionString = mysqlConnectionString;
