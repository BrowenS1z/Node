const colors = require('colors');

const args = process.argv.slice(2, 5);
const argsArr = [];
for (let i = 0; i < args.length; i++) {
    argsArr.push(Number(args[i]));
}

for(let i = 0; i < argsArr.length; i++){
    if(isNaN(argsArr[i])){
        console.log(colors.red('Введи число!'));
    }
}

console.log('Диапазон: ' + args);

let Get_colors = false;
let set_color = "green";

for(let i = argsArr[0]; i <= argsArr[1]; i++){
    for(let j = 2; j < i; j++){
        if(i % j == 0){
            Get_colors = true;
        }
    }

    if(Get_colors == false){
        switch(set_color){
            case "green": {
                console.log(colors.green(i));
                set_color = "yellow";
                break;
            }
            case "yellow": {
                console.log(colors.yellow(i));
                set_color = "red";
                break;
            }
            case "red": {
                console.log(colors.red(i));
                set_color = "green";
                break;
            }
        }
    }  
    Get_colors = false; 
}