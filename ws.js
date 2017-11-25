const server = 'ws://188.166.46.38/',
      ws = new WebSocket(server),
      name = "RSS is COOL!";

let serverMessage,
    myMessage,
    _data,
    myToken;

ws.binaryType = 'arraybuffer';
var time = Date.now();

ws.onopen = function () {

    myMessage = {
        "name": name,
        "command": "challenge accepted"
    }

    ws.send(JSON.stringify(myMessage));

    ws.onmessage = function (e) {
        _data = e.data;
        serverMessage = JSON.parse(e.data);
        console.log(serverMessage);
        console.log(time - Date.now());
        time = Date.now();
    }

    setTimeout(() => {
        myMessage = {
            "token": serverMessage.token,
            "command": serverMessage.next
        }
        ws.send(JSON.stringify(myMessage));
    }, 100);

    setTimeout(() => {
        var res;
        switch (serverMessage.task.sign) {
            case '+':
                res = serverMessage.task.values.reduce((x,y)=> x+y);
                break;
            ;        
            case '-':
                res = serverMessage.task.values.reduce((x, y) => x - y);
                break;
            ;
            case '*':
                res = serverMessage.task.values.reduce((x, y) => x * y);
                break;
            ;
        }
        myMessage.answer = res;
        console.log(myMessage);
        ws.send(JSON.stringify(myMessage));
    }, 200);

    setTimeout(() => {
        delete myMessage.answer;
        myMessage.command = serverMessage.next;
        ws.send(JSON.stringify(myMessage));
    }, 300);

    setTimeout(() => {
        var res;
        switch (serverMessage.task.bits) {
            case 8:
                res = new Uint8Array(_data).reduce((x, y) => x + y);
                break;
        
            case 16:
                res = new Uint16Array(_data).reduce((x, y) => x + y);
                break;
        }
        myMessage.answer = res;
        ws.send(JSON.stringify(myMessage));
    }, 400);

    setTimeout(() => {
        delete myMessage.answer;
        myMessage.command = serverMessage.next;
        ws.send(JSON.stringify(myMessage));
    }, 500);

}






