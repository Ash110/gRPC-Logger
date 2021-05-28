var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

var PROTO_PATH = './logger.proto';

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

var logger = grpc.loadPackageDefinition(packageDefinition).logger;

var target = 'localhost:9000'


const loggerMiddleware = (req, _, next) => {
    try {
        console.log(req.body);
        var client = new logger.LogService(target,
            grpc.credentials.createInsecure());

        client.LogRequest({body : 'hi'}, function (err, _) {
            if (err) throw err;
        });
    } catch (err) {
        console.log(err);
    } finally {
        next();
    }
}


module.exports = loggerMiddleware;