'use strict';

/* To test:
 *   echo -n <input> | nc localhost 1300
 *
 * Results are <input> <nonce>
 *
 */
var createHash = require('crypto').createHash
        , createServer = require('net').createServer;

/**
 * Simple proof of work: concatenate the input string with a nonce, returning
 * the nonce when the last 3 digits of the hex-encoded SHA256 hash are '000'.
 * This version calculates the nonce by incrementing a number and converting it
 * to a hex string.
 *
 * @param  String input The starting string.
 * @return String       The computed nonce.
 */
function work(input) {
        var id = 0;
        while (true) {
                var nonce = id.toString(16);

                var sha256 = createHash('sha256');
                var inputString = input.toString() + " " + nonce;
                sha256.update(inputString);

                var hash = sha256.digest('hex');
                if (hash.slice(0, 2) === '00') {
                        console.log("String: " + inputString);
                        console.log("Hash found: " + hash);
                        return nonce;
                }
                else id++;
        }
}

/* Upon connection, server sends 'ok\n' and waits for a packet containing the
 * input. Immediately does work and returns it in the format specified above.
 */
var prover = createServer(function (conn) {
        conn.write('ok\n', function acked() {
                conn.on('readable', function ready() {
                        var input;
                        if (!(input = conn.read())) return;

                        conn.write(input + ' ' + work(input), function done() {
                                conn.end();
                        });
                });
        });
});

prover.listen(1300, function () {
        console.log('prover up and running on port 1300');
});