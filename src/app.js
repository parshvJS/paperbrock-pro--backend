import express from 'express'
import cors from 'cors'
import { route } from './routes/users.routes.js'
import { admin } from './routes/admin.route.js'
import cookieParser from 'cookie-parser';
import { pyqRoute } from './routes/pyq.routes.js';
import { errorHandler } from './middleware/errHandler.middleware.js';
import { aibook } from './routes/aibook.route.js';

const app = express()

app.use(cors())
app.use(cookieParser());

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}))

app.use(express.json({
    limit: '16kb'
}))
app.use('/api/v1/users', route)
app.use('/api/v1/admin', admin)
app.use('/api/v1/pyq',pyqRoute )
app.use('/api/v1/ai',aibook )
app.use(errorHandler); 

export default app
