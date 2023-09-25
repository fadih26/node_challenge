const Task = require('./task.js');
const fs = require('fs');
const path = "database.json";

const commandList = ['help', 'quit', 'exit','hello'];
var tasksList = [new Task("buy batata"), new Task("go home")];
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
 let arg = process.argv[2]
  try{
    const data = fs.readFileSync((arg)? arg : path);
    tasksList = JSON.parse(data);

  }catch(e){
    console.log("error: make sure the file existed")
    console.log("Exit...", e);
    process.exit();
  }
  
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
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
function onDataReceived(text) {
  console.log(text)
  if (text.startsWith("quit")|| text.startsWith("exit")) {
    quit();
  }
  else if (text.startsWith("hello")){
    hello(text.trim());
  } else if (text.startsWith("add")){
    add(text.trim());
  }else if (text.startsWith("remove")){
    remove(text.trim());
  }else if (text.startsWith("edit")){
    edit(text.trim());
  }else if (text.startsWith("check")){
    check(text.trim());
  }else if (text.startsWith("uncheck")){
    uncheck(text.trim());
  }
  else if(text.startsWith("help")){
    help();
  }else if(text.startsWith("list")){
    list();
  }
  else{
    unknownCommand(text);
  }
}

/**
 * list my application commands
 *
 * @returns {void}
 */
function help(){
  commandList.forEach(element => console.log("- ", element));
}

/**
 * list all my tasks
 *
 * @returns {void}
 */
function list(){
  console.log("----------------------------");
  tasksList.forEach((obj,index) => 
  obj.checked ? console.log(`[✓] ${index + 1}- ${obj.taskContent}`) : console.log(`[ ] ${index + 1}- ${obj.taskContent}`));
}

function add(arg){
  arg = arg.replace("\n","");
  if (arg == "add"){
    console.log("error: add command take a parameter")
  }else{
    arg = arg.replace("add ","");
    tasksList.push(new Task(arg));
  }
 
}

function remove(arg){
  arg = arg.replace("\n","");
  if (arg == "remove"){
      tasksList.pop();
  }else{

    let arr = arg.split(" ");
    let index = parseInt(arr[1]);//if arg[1] is not a number it will give me NaN

    // console.log("index:", index);
    if (isNaN(index)){
      console.log("please enter task number after remove command");
    }else if(index < 1 || index > tasksList.length)  {
        console.log("given index is not valid");
    }else{
      tasksList.splice(index-1 , 1);
      //splice can add or remove to an array :
      //splice(0,1): it will remove 1 item at index 0
      //splice(0,1,"hello"): it will replace 1 item at index 0 by "hello"
    }
  }
} 

function edit(arg){
  arg = arg.replace("\n","");
  if (arg == "edit"){
      console.log("you should add the new text or the number of tasks to be edited + new text")
  }else{
    let arr = arg.split(" ")
    let index = parseInt(arr[1]);
    // console.log(index);
    // console.log(isNaN(index));
    if (isNaN(index)){
        tasksList[tasksList.length-1].taskContent = arg.replace("edit ","");
    }else{
      let newStr = "";
        arr.splice(0,2);
        arr.forEach(item => newStr = newStr + " " + item)
        newStr = newStr.trim();
        // console.log("newStr",newStr);
        tasksList[index-1].taskContent = newStr
    }
  }
}

function check(arg){
  arg = arg.replace("\n","");
  if (arg == "check"){
      console.log("error: you should add the number of task to be checked")
  }else{
    arg = arg.replace("check ","")
    let index = parseInt(arg);
    tasksList[index-1].checked = true;
  }
}

function uncheck(arg){
  arg = arg.replace("\n","");
  if (arg == "uncheck"){
    console.log("error: you should add the number of task to be unchecked")
  }else{
    arg = arg.replace("uncheck ","")
    let index = parseInt(arg);
    tasksList[index-1].checked = false;
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
function hello(arg){
  console.log("arg",arg);
  arg = arg.replace("\n","");
  if (arg == "hello"){
    console.log("hello !");
  }else{
    console.log(arg + "!");
  }
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  let arg = process.argv[2]
  try{
    let data = JSON.stringify(tasksList);
    fs.writeFileSync((arg) ? arg : 'database.json',data);

  }catch(e){
    console.log(e)
  }
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Fadi Haddad")
