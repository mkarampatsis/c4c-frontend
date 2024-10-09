/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {

    let code = `
        console.log = function (value){
            return value
        }
        ${data}
    ` 
    const originalConsolelog = console.log
    
    try {
        let response = eval(code);
        console.log = originalConsolelog;
        
        if (typeof(response) === 'object')
            response = JSON.stringify(response);

        postMessage({status: true, result: response});
    } catch (error) {
        postMessage({status: false, result: error.message} );
    }
});