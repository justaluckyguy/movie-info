const UserController = require("./controllers/UserController")

const AuthenticatePolicy = require('./policies/AuthenticatePolicy')

module.exports = (app) => {

    app.post('/users/login', UserController.login)

    app.get('/users/:id', AuthenticatePolicy.isValidToken, UserController.getUserById)
    app.post('/users', UserController.register)
    app.put('/users/:id', UserController.update)
    app.delete('/users/:id', UserController.delete)
}