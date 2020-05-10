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

    todosData = readTodosFromFile('todosData');
    for(i=0; i<todosData.length; i++){
        if(todosData[i]["id"] == options["id"]){
            for(var key of Object.keys(options)){
                if(key != 'command'){
                    todosData[i][key] = options[key];
                }
            }
            break;
        }
    } 
    writeTodosToFile('todosData', todosData);
}

exports.listTodo = function listTodo(options){
    console.log("in listTodo");
}

exports.removeTodo = function removeTodo(options){
    console.log("in removeTodo");
}

exports.checkTodo = function checkTodo(options){
    todosData = readTodosFromFile('todosData');    
    for(i=0; i<todosData.length; i++){
        if(todosData[i]['id'] == options['id']){
            todosData[i]['checked'] = true;
            break;
        }
    }
    writeTodosToFile('todosData', todosData);
}

exports.uncheckTodo = function uncheckTodo(options){
    todosData = readTodosFromFile('todosData');    
    for(i=0; i<todosData.length; i++){
        if(todosData[i]['id'] == options['id']){
            todosData[i]['checked'] = false;
            break;
        }
    }
    writeTodosToFile('todosData', todosData);
}




