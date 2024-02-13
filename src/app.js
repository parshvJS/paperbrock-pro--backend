import express from 'express'
import cors from 'cors'
import { route } from './routes/users.routes.js'

const app = express()

app.use(cors())

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}))

app.use(express.json({
    limit: '16kb'
}))

app.use('/api/v1/users', route)
