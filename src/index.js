import dotenv from 'dotenv'
import app from './app.js'
import { connectDB } from './db/connetDB.db'
dotenv.config()

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Listening to port ${port}`)
    })
}).catch((err) => {
    console.log("Error in index.js (catch) ! ")
    throw err
})