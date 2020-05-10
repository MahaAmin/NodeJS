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


function printTodo(todo){
    for(var key of Object.keys(todo)){
        console.log(key + ': ' + todo[key]);
    }
    console.log('-------------------------------------------------');
}


exports.listTodo = function listTodo(options){
    todosData = readTodosFromFile('todosData');
    for(var key of Object.keys(options)){
        switch(key){
            case 'all':
                todosData.map(todo => printTodo(todo));
                break;
            case 'checked':
                checkedTodos = todosData.filter(todo => todo.checked == true);
                checkedTodos.map(todo => printTodo(todo));
                break;
            case 'unchecked':
                checkedTodos = todosData.filter(todo => todo.checked == false);
                checkedTodos.map(todo => printTodo(todo));
                break;
            case 'command':
                break;
            default:
                console.log('ERROR: Un-defined argument: ' + key);
                break;
        }
    }
}

exports.removeTodo = function removeTodo(options){
    todosData = readTodosFromFile('todosData');
    for(i=0; i<todosData.length; i++){
        if(todosData[i]['id'] == options['id']){
            todosData.splice(i,1);
            break;
        }
    }
    writeTodosToFile('todosData', todosData);
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




