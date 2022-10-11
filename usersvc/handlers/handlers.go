package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/ambassadorlabs/edge-stack-overview/usersvc/users"
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

func ServeUsers(w http.ResponseWriter, r *http.Request) {
	users := users.GetUsers()
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(users)
}
