package main

import (
	"context"
	"github.com/aws/aws-lambda-go/lambda"
	"log"
)

type Response struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

func appSyncLambda(ctx context.Context, req map[string]interface{}) (Response, error) {
	log.Printf("#v: %#v\n", req)
	log.Printf("T: %T\n", req)
	for k, v := range req {
		log.Printf("req.k: %#v\n", k)
		log.Printf("req.v: %#v\n", v)
	}

	response := Response{
		Id:   "dummyId",
		Name: "dummyName",
	}
	return response, nil
}

func main() {
	lambda.Start(appSyncLambda)
}
