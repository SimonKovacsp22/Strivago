import mongoose from 'mongoose'
import {server} from './server'
import listEndpoints from 'express-list-endpoints'

const port = process.env.PORT

mongoose.connect(process.env.MONGO_CON_URL!)

mongoose.connection.on("connected", () => {
    console.log("success")
    server.listen(port, () => {
        console.table(listEndpoints(server))
        console.log("server is listening on port:",port)
    })
})