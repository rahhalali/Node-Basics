
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
  load();
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
 var lists = [];
function onDataReceived(text) {
 
  if (text === 'quit\n' || text === 'exit\n' || text === 'q\n') {
    save();
    quit();
  }else if(text === 'help\n'){
      help();
  }
  else if(text.slice(0,5) ===  'hello'){
    hello(text);
  }else if(text === 'list\n'){
    List();
  }else if(text.slice(0,3)=== 'add'){
    add(text);
  }else if(text.slice(0,6)==='remove'){
    remove(text.slice(6));
  }else if(text.slice(0,4)==='edit'){
    edit(text.slice(5));
  }
  else if(text.slice(0,5)==='check'){
    check(text);
  }
  else if(text.slice(0,7)==='uncheck'){
    uncheck(text);
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text){
  const text1 = text.replace(/ +/g, " ");
  console.log("this is text1"+text1);
  const text2 =text1.trim()+"!";
  console.log(text2);
  
}
// that shows us the list of options to do
function help(){
  const Check ="to make the list done ";
  const Uncheck ="To make the list not done";
  const exit="To stop the program";
  const q="To stop the program";
  const quit="To stop the program";
  const add ="To add something to the list";
  const remove="To remove something from list";
  const list ="To the list";
  const Hello="To say hello or hello ...;"
  console.log("quit:"+exit+"\n exit :"+quit+"q :"+q+"\nremove :"+remove+"\nadd :"+add+"\nlist:"+list+"\nhello:"+Hello+"\ncheck: "+Check+"\n uncheck"+Uncheck+"\n");
}
/*the lists of the tasks are :
1)add new word exit and char q to stop running the program
2)add help function to see the options that u have 
3)handle the hello function 
*/
let Info =getInfo();

function List(){
  for (var i=0; i<lists.length;i++){
    console.log(lists[i]);
  }
}

function check(text){
  text1=text.slice(0,5);
  text2=text1.trim();
  if(text2 != ""){
    for(var i=0;i<lists.length;i++){
      if (i == "1"){
        var LI =lists[i-1].slice(3);
          lists[i-1]=lists[i-1].replace(lists[i-1],Info[0].check.concat(LI));
          
      }
    }
  }else{
    console.log("hello khaldon nothing to do,go backward!...")
  }
}
function uncheck(text){
  text1=text.slice(0,7);
  text2=text1.trim();
  if(text2 != ""){
    for(var i=0;i<lists.length;i++){
      if (i == "1"){
        var LI =lists[i-1].slice(3);
          lists[i-1]=lists[i-1].replace(lists[i-1],Info[0].uncheck.concat(LI));
          
      }
    }
  }else{
    console.log("hello khaldon nothing to do,go backward!...")
  }
}

function add(text){
    text=text.slice(3);
    text=text.trim();
    if(text != ""){
      var text1=Info[0].uncheck.concat(text);
      lists.push(text1);
    }else{
      console.log("error u cant add nothing");
    }
}
function remove(text){
  text = text.trim();
  if(text<=lists.length){
  if(text == ""){
   lists.pop();
  }else if(text == "1"){
    lists.shift();
  }else if(text == "2"){
    lists.splice(1,1);
  }
}else{
  console.log("you enter a number greater than length of the list");
}}
function edit(text){
  if(text == ""){
    console.log("u cant edit anything");
  }else if(text.charAt(0) == "1"){
    var tex=text.slice(2);
    lists.splice(0,2,tex);
  }else {
      lists.pop();
      lists.push(text);
  }
}
function getInfo(){
  const LIST =[{
    uncheck:"[ ]",
    check:"[✓]"
  }];
  return LIST;
}
function save(){
const fs = require('fs');
let data = JSON.stringify(lists, null, 2);
fs.writeFile('database.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});
}
function load(){
const fs = require('fs');
fs.readFile('database.json', (err, data) => {
    if (err) throw err;
    lists = JSON.parse(data);
});

} 


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log("Quitting now, goodbye!");
  process.exit();
}

// The following line starts the application
startApp("ali rahhal")
