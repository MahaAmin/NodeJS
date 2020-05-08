const todoHelpers = require('./helpers.js');

function parseCmdArgs(args){
    const [, , command, ... options] = args;
    const parsedOptions = options.reduce((cum, el) => {
        const [optionName, optionValue] = el.split('=');
        cum[optionName] = optionValue;
        return cum;
    }, {});

    parsedOptions.command = command;
    return parsedOptions;
}


function main(cmdArgs){
    const parsedOptions = parseCmdArgs(cmdArgs);

    switch (parsedOptions.command){
        case 'add':
            todoHelpers.addTodo(parsedOptions);
            break;
        case 'edit':
            todoHelpers.editTodo(parsedOptions);
            break;
        case 'list':
            todoHelpers.listTodo(parsedOptions);
            break;
        case 'remove':
            todoHelpers.removeTodo(parsedOptions);
            break;
        case 'check':
            todoHelpers.checkTodo(parsedOptions);
            break;
        case 'uncheck':
            todoHelpers.uncheckTodo(parsedOptions);
            break;
        default:
            console.log('ERROR: Undefined command '+parsedOptions.command);
    }
}

main(process.argv);
