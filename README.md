# gRPC-Logger

This is a simple Express Middleware for remote request logging using gRPC

## Server

The repository contains the code for the logging server writting in Golang. Run the server.go file to start the logging server. All new logs will be written to a `requests_log.ndjson` file on the server. Currently the gRPC server only has a `LogRequest` method that takes a message of type Log as input and returns a type Response which will always be an empty {}
The Log type requires an object with key `body` and value of any string which will be logged.
To change the input or response structure, modify `logger.proto` in the server and in the Express Middleware as needed.

After modifying the logger.proto, run

``` shell
protoc --go_out=plugins=grpc:logger ./logger.proto
```

This will regenerate the gRPC code for the server connections.

To modify the LogRequest functionality, edit the `LogRequest`function in `logger/logger.go`
Currently it just accepts the input `in`, calls a function to write `in.Body` to logfile, and sends the response.

## Express Middleware

The gRPC server can be called from any client to log any data. However, this repository contains the code to make requests from a NodeJS client.

The `express-middleware` folder contains the middleware and proto file for logging. Check the `example` folder on how to use it. Make sure to include the sacme proto file as that on the server.

By default, the middleware connects to `localhost:9000` as gRPC server location. Change as necessary.

For each incoming request, the middleware makes a remote call to the logger with the following details from the request -

- Time of request
- Remote Address from connection header, or proxy header if the server is behind a reverse proxy
- HTTP method
- URL
- HTTP Version
- Headers

These are completely customizable and you can add or remove any data you want to change
The selected ones are the fields in the Morgan logger "common" predefined format
