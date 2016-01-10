# samples
Files here are prototype and knockoff code. The code is not clean and are written just for illustration purposes. There

To get started get the latest of the following (instructions assuming windows). Unless you have a very old machine you will need the <b>64-bit version</b> if presented with a choice.

Installations:
-------------

1. MySql community edition. http://dev.mysql.com/downloads/mysql/ 

2. MySql Workbench.  Handy to have this around. http://dev.mysql.com/downloads/workbench/ 

3. Get a git client if you don't have it already.  https://git-scm.com/download/win 

	+ Here is an article on how you can interact with a git repository and contribute.  http://www.pontikis.net/blog/how-to-collaborate-on-github-open-source-projects

	+ I am using Windows style crlf when adding files to git.  To do so in Windows do the following:

		- git config --global core.autocrlf false	

4. Download node.js binary. Accept the defaults and make sure node and npm are in your PATH.  https://nodejs.org/en/download/

5. Install gulp globally.  From anywhere in your machine type the following:

		- npm install gulp -g 

6. Now you should be able to install the node packages.  To do so:

	+ You should have already cloned the repository if you are seeing this file.  If not,

		- git clone  https://github.com/prabhu-ram/samples

	+ cd "to where you cloned the git repository"

	+ cd "to endtoend directory"

	+ npm install --save

		This will start all the downloads for the endtoend prototype.  The --save at the end is important as it will install the files locally in the prototype.  This will make installation/deployments easier later. This install will download tons of stuff - be patient as there is a lot of bloat in the code.

	+ bower install --save

That should do it for the installs.


Configurations:
--------------
I will put a README file under the first level directories (eg. endtoend) with configuration instructions.
