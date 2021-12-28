var net = require('net');

var port = 8081;
var server = net.createServer();
server.listen(port);

console.log("Server waiting on, 0.0.0.0:" + port);

server.on('connection', function (socket) {
        socket.on('data', function (data) {
                console.log(data.toString('utf-8'));
                let headers = [
                        'HTTP/1.1 200 OK',
                        'Content-Type: application/json; charset=utf-8',
                        'Connection: keep-alive',
                ].join('\n') + '\n\n';
                socket.write(headers);
                const body = JSON.stringify({
                        name: 'John Doe',
                        job: 'Content Writer'
                });
                socket.write(body);
                socket.end();
        });
});