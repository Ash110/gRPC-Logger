package __

import (
	"log"
	"os"

	"golang.org/x/net/context"
)

type Server struct {
}

func (s *Server) LogRequest(ctx context.Context, in *Log) (*Response, error) {
	// log.Printf("Receive message body from client: %s", in)
	go writeLog(in.Body)
	return &Response{}, nil
}

func writeLog(s string) {
	file, err := os.OpenFile("requests_log.ndjson", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		log.Fatal(err)
	}

	log.SetFlags(0)
	log.SetOutput(file)

	log.Printf("%s", s)
}
