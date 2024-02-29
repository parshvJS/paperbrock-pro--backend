import dotenv from 'dotenv'
import app from './app.js'
import  connectDB  from './db/connetDB.db.js'
import serverless from 'serverless-http';

dotenv.config();

const port = process.env.port || 8000;
connectDB().then(() => {
    app.get('/',(req,res)=>{
        res.send("I am live ")
    })
    app.listen(port, () => {
        console.log(process.env.CHATGPT_API)
        console.log(`Listening to port ${port}`)
    })
}).catch((err) => {
    console.log("Error in index.js (catch) ! ")
    throw err
})

export const handler = serverless(app);
