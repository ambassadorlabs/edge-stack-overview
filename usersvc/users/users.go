package users

type User struct {
	Username string `json:"username"`
}

type UserList struct {
	Users []User `json:"users"`
}

func GetUsers() UserList {
	users := UserList{
		Users: []User{
			{
				Username: "theGOAT",
			},
			{
				Username: "db",
			},
			{
				Username: "whatevs",
			},
		},
	}
	return users
}
