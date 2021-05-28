package main

import (
	"fmt"
	"log"
	"net"

	logger "github.com/Ash110/grpc-logger/logger"
	"google.golang.org/grpc"
)

func main() {

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", 9000))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := logger.Server{}

	grpcServer := grpc.NewServer()

	logger.RegisterLogServiceServer(grpcServer, &s)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %s", err)
	}
}
