const express = require("express");
const path = require("path");
const {
    getUsers,
    getUserById,
    getUserByFirstName,
    createTeam,
    editTeam,
    delTeam,
} = require("./db");
const { engine } = require("express-handlebars");
// const { response } = require("express");

const app = express();

// handlebars setup
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// importante para request body transforma em um objeto e fazer a pagina search team funcionar
app.use(express.urlencoded({ extended: false }));

// First Page
app.get("/", (request, response) => {
    response.render("homeTeam", {
        title: "teamsWorlds",
    });
});

// this page for all users list
app.get("/admin/users", async (request, response) => {
    // get the users from the db
    // then() render the appropriate hbs template and pass the users to it
    // getUsers().then((users) => {
    //     console.log(users);
    //     response.render("userList", { users });
    // });
    const users = await getUsers();
    response.render("userList", { users });
});

// this page for edit user
app.get("/admin/users/:user_id/edit", async (request, response) => {
    // get the user with the given user_id from the db
    // then()  render the appropriate hbs template and pass the user to it
    // if no user if found, render a 404 page
    // const { user_id } = request.params;
    // // console.log("GET /admin/users/:user_id/edit", user_id);
    // getUserById(user_id).then((user) => {
    //     console.log("GET /admin/users/:user_id/edit", user);
    //     response.render("editUser", { title: "Edit team", user });
    // });
    const { user_id } = request.params;
    const user = await getUserById(user_id);
    response.render("editUser", {
        title: "Edit Team",
        user,
    });
});

app.post("/admin/users/:user_id/edit", async (request, response) => {
    try {
        await editTeam({ ...request.body, user_id: request.params.user_id });
        response.redirect("/admin/users");
    } catch (error) {
        console.log("error: ", error);
        const { user_id } = request.params;

        const user = await getUserById(user_id);
        response.render("editUser", {
            title: "Edit Team",
            user,
            error: "OPPPSS",
        });
    }

    // // const { user_id } = request.params;
    // editTeam({ ...request.body, user_id: request.params.user_id }).then(
    //     (result) => {
    //         result.rows[0];
    //         response.redirect("/admin/users");
    //     }
    // );
});

// this page for find especific user
app.get("/search", (request, response) => {
    response.render("searchTeam", {
        title: "Teams Search",
    });
});

// When located it should appear through the commands below
app.post("/search", async (request, response) => {
    getUserByFirstName(request.body.q).then((users) => {
        response.send(
            `<ul>${users.map(
                (user) => `<li>${user.first_name} ${user.country}</li>`
            )}</ul>`
        );
    });
});

// Page for add new Team
app.get("/admin/users/new", (request, response) => {
    response.render("newTeam", {
        title: "Teams",
    });
});

// Page for add new Team method post
app.post("/admin/users/new", async (request, response) => {
    // console.log("POST /admin/users/new", request.body);
    // createTeam(
    //     request.body.firstName,
    //     request.body.country,
    //     request.body.Email,
    //     request.body.profilePicture
    // ).then((newTeam) => {
    //     console.log("POST /admin/users/new", "success", newTeam);
    //     response.redirect("/admin/users");
    // });

    try {
        await createTeam(request.body);
        response.redirect("/admin/users");
    } catch (err) {
        console.log("err: ", err);
        response.render("newTeam", {
            title: "Add New Team",
            err: "ops you are wrong",
        });
    }
});

// Delete team
app.post("/admin/users/delete", async (request, response) => {
    try {
        let userTeam;

        if (Array.isArray(request.body.users)) {
            userTeam = request.body.users;
        } else {
            userTeam = [request.body.users];
        }

        console.log('teste do delete', userTeam);

        await Promise.all(userTeam.map((id) => delTeam(id)));
        response.redirect("/admin/users");
    } catch (error) {
        console.log("error: ", error);
    }


    // let userTeam = [];
    // if (Array.isArray(request.body.checkbox)) {
    //     userTeam = request.body.checkbox;
    // } else {
    //     userTeam.push(request.body.checkbox);
    // }
    // Promise.all(userTeam.map((id) => delTeam(id))).then(() =>
    //     response.redirect("/admin/users")
    // );
});

// this allows you to run:
// PORT=8081 npm start
// from the terminal, in case you want to use a different port (useful if you are running multiple examples together)
// if you run it without the PORT env variable, it will default to 8080
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
