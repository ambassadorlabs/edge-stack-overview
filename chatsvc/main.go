package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/ambassadorlabs/edge-stack-overview/chatsvc/handlers"
	"github.com/ambassadorlabs/edge-stack-overview/chatsvc/sockets"
	"github.com/gorilla/mux"
)

func main() {
	// set up a context that can be passed to all goroutines
	// with cancel so they can be cleaned up if a sig is received
	var ctx context.Context
	{
		var cancel context.CancelFunc
		ctx = context.Background()
		ctx, cancel = context.WithCancel(ctx)
		defer cancel()

		// if we receive a sigint or sigterm, we call cancel,
		// which should cause all goroutines to return
		// then we kill the app
		sigc := make(chan os.Signal, 1)
		signal.Notify(sigc, syscall.SIGINT, syscall.SIGTERM)
		go func() {
			sig := <-sigc
			cancel()
			fmt.Println("received a SIGINT or SIGTERM")
			log.Fatal(sig)
		}()
	}

	startServer(ctx)

}

func startServer(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			return
		default:
			hub := sockets.NewHub()
			go hub.Run()

			r := mux.NewRouter()
			r.HandleFunc("/health", handlers.ServeHealth).Methods("Get")

			r.HandleFunc("/ws", handlers.ServeSocket(hub))

			srv := &http.Server{
				Handler:      r,
				Addr:         "0.0.0.0:3000",
				WriteTimeout: 15 * time.Second,
				ReadTimeout:  15 * time.Second,
			}

			log.Println("starting server on port 3000")
			log.Fatal(srv.ListenAndServe())
		}
	}
}
