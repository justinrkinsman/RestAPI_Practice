import { v4 as uuidv4 } from 'uuid'
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import models from './models'
import routes from './routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
    }
    next()
})
app.use('/session', routes.session)
app.use('/users', routes.user)
app.use('/messages', routes.message)

app.get('/', (req, res) => {
    return res.redirect('/users')
})

app.delete('/users/:userId', (req, res) => {
    return res.send(`DELETE HTTP method on user/${req.params.userId} resource`)
})

app.get('/messages', (req, res) => {
    return res.send(Object.values(req.context.models.messages))
})

app.post('/messages', (req, res) => {
    const id = uuidv4()
    const message = {
        id,
        text: req.body.text,
        userId: req.context.me.id
    }

    req.context.models.messages[id] = message
    
    return res.send(message)
})

app.get('/messages/:messageId', (req, res) => {
    return res.send(req.context.models.messages[req.params.messageId])
})

app.delete('/messages/:messageId', (req, res) => {
    const {
        [req.params.messageId]: message,
        ...otherMessages
    } = req.context.models.messages

    req.context.models.messages = otherMessages

    return res.send(message)
})

app.get('/session', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id])
})

app.listen(3000, () => 
    console.log(`Example app listening on post ${process.env.PORT}!`)
)