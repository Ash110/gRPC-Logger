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
        const { method, url, httpVersion, headers } = req;
        const ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const log = {
            timeOfLog : new Date().toISOString(),
            method,
            url,
            httpVersion,
            headers,
            remoteAddress : ip_address
        }
        var client = new logger.LogService(target,
            grpc.credentials.createInsecure());

        client.LogRequest({ body: JSON.stringify(log) }, function (err, _) {
            if (err) throw err;
        });
    } catch (err) {
        console.log(err);
    } finally {
        next();
    }
}


module.exports = loggerMiddleware;