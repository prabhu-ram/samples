# endtoend

Configurations:
--------------

- there is a sql script under the main directory call schema.sql.  It will create the database and tables necessary for this example.   You can run this from MySQL Workbench.

- under Server directory there is a file called mySQLConnectionString.js. This contains the db connection string.  It will not be this way in production and is a hack for now.  Edit it to reflect yourdatabase.  It will look like this: 

 		dev: {
        	host: '192.168.1.5',
        	user: 'prabhu',
        	password: 'prabhu',
        	database: 'productmanagement'
        },

	You will need to change it to something like this

		dev: {
        	host: 'localhost',  // changed here
        	user: 'whatEverUserName',  // changed here
        	password: 'whatEverUserPassword',  // changed here
        	database: 'productmanagement'
        },

- under the main directory, there is a file called app.js.  I have some db connection info there too.  I did mentioned the sample was dirty, right?  So you will see something like this:

		var pool      =    mysql.createPool({
       		connectionLimit : 5,
            host: 'localhost',  // changed here
        	user     : 'prabhu', // changed here
        	password : 'prabhu', // changed here
        	database : 'productmanagement',
        	debug    :  false
		});

	You will need to change it to something like this

		var pool      =    mysql.createPool({
       		connectionLimit : 5,
            host: 'localhost',
            user: 'whatEverUserName',
            password: 'whatEverUserPassword',
        	database : 'productmanagement',
        	debug    :  false
		});

That should be it for configurations.

Running endtoend:
---------------

Assuming you are doing this on windows and you want to see debug statements:

Open a command window.  From the main folder, type in:

<h5>set DEBUG=endtoend* & npm start</h5>

If you don't want to see debug statement type in:

<h5>npm start</h5>

After this you can go to http://localhost:3000/ on your browser and interact with the app.


