const fs = require('fs');

function readTodosFromFile(filePath){
    todosDataString = fs.readFileSync(filePath, 'utf8').split('\n');

    const todosDataJSON = todosDataString.map((el) => {
        const todoJSON = JSON.parse(el);
        return todoJSON;
    });
    return todosDataJSON;
}


function writeTodosToFile(filePath, todosJSONArray){
    var todosString = "";
    todosJSONArray.map((el) => {
        todosString += JSON.stringify(el)+'\n';
    });
    
    todosString = todosString.slice(0,-1);
    fs.writeFileSync(filePath, todosString);
}


exports.addTodo = function addTodo(options){
    /*
        1) Read all todos
        2) convert todos from strings to JSON
        3) get last id
        4) create new todo
        5) push the new todo to old todos
        6) convert todos from json to strings
        7) write todos to todosData file
    */
    
    const todosData = readTodosFromFile('todosData');
    
    var maxID = 0;
    for(i=0; i<todosData.length; i++)
        if(todosData[i]["id"] > maxID)
            maxID = todosData[i]["id"];

    todo = {
        id: maxID+1,
        title: options["title"],
        content: options["content"],
        checked: false,
    };

    todosData.push(todo);
    writeTodosToFile('todosData', todosData);
    
}

exports.editTodo = function editTodo(options){
    console.log("in editTodo");
}

exports.listTodo = function listTodo(options){
    console.log("in listTodo");
}

exports.removeTodo = function removeTodo(options){
    console.log("in removeTodo");
}

exports.checkTodo = function checkTodo(options){
    console.log("in checkTodo");
}

exports.uncheckTodo = function uncheckTodo(options){
    console.log("in uncheckTodo");
}




