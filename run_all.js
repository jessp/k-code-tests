const fs = require('fs');
var childProcess = require('child_process');


//read every file in folder
fs.readdirSync("./").forEach(file => {
    //check if js
    if (file.split(".")[file.split(".").length - 1] === "js"){
            runScript("./" + file, function (err) {
            if (err){
             throw err + " " + file;
            } 
            console.log('finished running ' + file);
        });
    }
})

function runScript(scriptPath, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}

