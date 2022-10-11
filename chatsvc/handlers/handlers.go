package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/ambassadorlabs/edge-stack-overview/chatsvc/sockets"
)

// HealthBody is the response body for a health check
type HealthBody struct {
	OK bool `json:"ok"`
}

// ServeHealth handles healthcheck requests
func ServeHealth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(HealthBody{OK: true})
}

// ServeSocket returns a socket handler
func ServeSocket(h *sockets.Hub) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		sockets.ServeWs(h, w, r)
	}
}
