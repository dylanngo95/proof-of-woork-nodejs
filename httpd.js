var net = require('net');

var port = 8080;
var server = net.createServer();
server.listen(port);

console.log("Server waiting on, 0.0.0.0:" + port);

server.on('connection', function (socket) {
        socket.on('data', function (data) {
                console.log(data.toString('utf-8'));
                let headers = [
                        'HTTP/1.1 200 OK',
                        'Content-Type: text/html; charset=UTF-8',
                        'Content-Encoding: UTF-8',
                        'Accept-Ranges: bytes',
                        'Connection: keep-alive',
                ].join('\n') + '\n\n';
                socket.write(headers);
                let boby = `<!DOCTYPE html>
                <html lang="en">
                <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                </head>
                <body>
                        <h1>Tinh Ngo</h1>
                </body>
                </html>`;
                socket.write(boby.toString('utf-8'));
                socket.end();
        });
});