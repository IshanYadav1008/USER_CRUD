* Sbse pehle humne init command run krenge isse package.json file banegi:

Command:
--------
npm init

<-------------------------------------------------------------------------->

* Fir humne Express ko install kiya:

Command:
--------
npm i express

<-------------------------------------------------------------------------->

* Ab hum server.js file banayenge, isme server related configuration krenge:

USER_CRUD ==> new file ==> server.js

Command:
--------
node server.js

<-------------------------------------------------------------------------->

* Hume files mai changes krne k baad server ko bar-bar restart na krna pde
  uske liye hum 'nodemon' library ko install krenge:

Command:
--------
npm i nodemon

<-------------------------------------------------------------------------->

* Ab hum lodash library ko install krenge:

Command:
--------
npm i lodash

<-------------------------------------------------------------------------->

* Ab hum 'db.js' file banayenge or isme Node.js server or Database server 
  ke beech connection setup karwayenge:

USER_CRUD ==> new file ==> db.js 

<-------------------------------------------------------------------------->

* Ab hum mongoose ko install krenge, node.js server or database server ke
  beech connection setup karne ke liye:

Command:
--------
=> npm i mongoose

<-------------------------------------------------------------------------->

* Ab hum models folder banayenge or isme 'Person.js' file banayenge:

New Folder => models => new file => Person.js

<-------------------------------------------------------------------------->

* Ab hum 'body-parser' ko apne project mai install krenge:

Command:
--------
==> npm i body-parser

<-------------------------------------------------------------------------->

* Adding Git for project Versoning:

Command:
--------
==> git init

<-------------------------------------------------------------------------->

* Ab hum apne Database ko Remote Database Server pr HOST krenge,
  or iske liye hum use krenge MongoDB Atlas ko:

link: https://www.mongodb.com/cloud/atlas/register

<-------------------------------------------------------------------------->

* Now create .env file or jo bhi sensitive information hoti hai use hum
  es file ke andar rakhte hai or es file ko hum GitHub pr push nahi krte
  hai.

* Ab hum 'dotenv' ko install krenge:
------------------------------------

Node Command:
-------------
=> npm i dotenv

* Ab hum ek file banayenge jiska naam hoga '.env':
--------------------------------------------------

=> new file => .env 

<-------------------------------------------------------------------------->

* Ab hum apne local Node.js server ko Remote pr HOST krenge, or iske liye 
  hum use krenge 'render' ko: mtlb ab hmari website local par nahi balki
  remote pr host hogi:

link: https://dashboard.render.com/

<-------------------------------------------------------------------------->

* Applying 'logRequest' Middleware function in server.js file:

  Jab bbhi hum kisi route ko access krenge toh ye middleware run hoga
  kyuki ise humne sabhi routes k liye accessible bna diya hai by 
  applying below code:

// Now applying middleware to the all routes.  
app.use(logRequest);

<-------------------------------------------------------------------------->

* Installing another middleware 'Passport':

Node Command:
-------------
=> npm install passport passport-local 

<-------------------------------------------------------------------------->

* Installing 'bcrypt' for converting password in as Hashing form:

command:
--------
npm i bcrypt --save