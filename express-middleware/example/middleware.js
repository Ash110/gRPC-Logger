var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

var PROTO_PATH = './chat.proto';

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

var chat = grpc.loadPackageDefinition(packageDefinition).chat;

var target = 'localhost:9000'


const logger = (req, res, next) => {
    try {
        console.log(req.body);
        var client = new chat.ChatService(target,
            grpc.credentials.createInsecure());

        client.SayHello({body : 'hi'}, function (err, response) {
            console.log('Greeting:', response);
        });
    } catch (err) {
        console.log(err);
    } finally {
        next();
    }
}


module.exports = logger;