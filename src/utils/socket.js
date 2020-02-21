const { verifyToken } = require("./auth")
const M = require("../models/msgSchema")

module.exports = {
    configureIO: (io) => {
        io.on("connection", async socket => {
            socket.on("broadcast", (payload) => {
                console.log(payload)
                socket.broadcast.emit("broadcast", payload)
            })
        
            socket.on("disconnect", () => {
                const connectedUsers = []
                Object.keys(io.sockets.connected).forEach(socketKey => { //we are searching in the connected sockets
                    if (io.sockets.connected[socketKey].username)
                        connectedUsers.push(io.sockets.connected[socketKey].username)
                })
                console.log(connectedUsers)
        
                socket.broadcast.emit("login", {
                    newUser: "",
                    connectedUsers: connectedUsers
                })
            })
        
            socket.on("login", (payload) => {
                const username = verifyToken(payload.token);
                socket.username =  username// <== here we are setting the property!!!
                const connectedUsers = []
                Object.keys(io.sockets.connected).forEach(socketKey => { //we are searching in the connected sockets
                    if (io.sockets.connected[socketKey].username)
                        connectedUsers.push(io.sockets.connected[socketKey].username)
                })
        
                console.log("new user ", connectedUsers)
                socket.emit("login", {
                    newUser: username,
                    connectedUsers: connectedUsers
                })
                socket.broadcast.emit("login", {
                    newUser: username,
                    connectedUsers: connectedUsers
                })
            })
        
            socket.on("Msg", (payload) => {
                Object.keys(io.sockets.connected).forEach(socketKey => { //we are searching in the connected sockets
                    if (payload.to === io.sockets.connected[socketKey].username) { //the socket with the required user name
                        //when we find him, we deliver!
                        io.sockets.connected[socketKey].emit("Msg", { ...payload, from: socket.username })
                       
                    }
                })
                //here you can save the messages too
                console.log({
                    from: socket.username,
                    to: payload.to,
                    Msg: payload.Msg,
                    date: new Date()
                })
                Msg.create({
                    from: socket.username,
                    to: payload.to,
                    Msg: payload.Msg,
                    date: new Date()
                })
            })
        })
    }
}