const websocketClient = require('websocket').client;
const ws = new websocketClient();
const config = require('./config.json');
const name = config.name;
const address = config.vmAddress;
const pass = config.password;

ws.on('connect',function(f){
  function send(str){
    f.sendUTF(encodeCommand(['chat',str]));
  }
  function rename(str){
    f.sendUTF(encodeCommand(['rename',str]));
  }
  function ban(str){
    f.sendUTF(encodeCommand(['admin','12',str]));
  }
  function msg(){
    send("likely andrej detected.");
  }
  f.on('message',function(msg){
    cmd = decodeCommand(msg.utf8Data);
    rename(name);
    f.sendUTF(encodeCommand(['admin','2',pass]));
    
    if (cmd[0] == "chat"){
      cmd[2].toLowerCase();
      //i love jjjj
      if (cmd[2].includes("i love jjjj")){
        msg();
        ban(cmd[1]);
      }
      //your sister gay
      if (cmd[2].includes("your sister gay")){
        msg();
        ban(cmd[1]);
      }
      if (cmd[2].includes("your sister is gay")){
        msg();
        ban(cmd[1]);
      }
      //iexist gay
      if (cmd[2].includes("iexist gay")){
        msg();
        ban(cmd[1]);
      }
      if (cmd[2].includes("iexist is gay")){
        msg();
        ban(cmd[1]);
      }
      //i made u
      if (cmd[2].includes("i made u")){
        msg();
        ban(cmd[1]);
      }
      //i made underfishin
      if (cmd[2].includes("i made underfishin")){
        msg();
        ban(cmd[1]);
      }
      //is feces
      if (cmd[2].includes("is feces")){
        msg();
        ban(cmd[1]);
      }
    }
    if (cmd[0] == "remuser"){
      cmd[2].toLowerCase();
      if (cmd[2].includes("jjjj")){
        msg();
        ban(cmd[2]);
      }
      if (cmd[2].includes("bbbb")){
        msg();
        ban(cmd[2]);
      }
      if (cmd[2].includes("nina005")){
        msg();
        ban(cmd[2]);
      }
    }
    if (cmd[0] == "rename"){
      cmd[3].toLowerCase();
      if (cmd[3].includes("jjjj")){
        msg();
        ban(cmd[3]);
      }
      if (cmd[3].includes("bbbb")){
        msg();
        ban(cmd[3]);
      }
      if (cmd[3].includes("nina005")){
        msg();
        ban(cmd[3]);
      }
    }
    
    
    setInterval(function(){
      if (f.connected){
        f.sendUTF("3.nop;")
      }
    },2500);
  });
});

function decodeCommand(cypher) {
	var sections = [];
	var bump = 0;
	while (sections.length <= 50 && cypher.length >= bump) {
		var current = cypher.substring(bump);
		var length = parseInt(current.substring(current.search(/\./) - 2));
		var paramater = current.substring(length.toString().length + 1, Math.floor(length / 10) + 2 + length);
		sections[sections.length] = paramater;
		bump += Math.floor(length / 10) + 3 + length;
	}
	sections[sections.length - 1] = sections[sections.length - 1].substring(0, sections[sections.length - 1].length - 1);
	return sections;
}
function encodeCommand(cypher) {
	var command = "";
	for (var i = 0; i < cypher.length; i++) {
		var current = cypher[i];
		command += current.length + "." + current;
		command += (i < cypher.length - 1 ? "," : ";");
	}
	return command;
}
ws.connect("ws://" + address,'guacamole');
