fetch("./users.json").then((usersResponse) => {
        return usersResponse.json();
    }).then((users)