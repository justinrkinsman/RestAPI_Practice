import { v4 as uuidv4 } from 'uuid'
import 'dotenv/config'
import cors from 'cors'
import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

app.get('/', (req, res) => {
    return res.redirect('/users')
})

app.get('/users', (req, res) => {
    return res.send(Object.values(users))
})

app.get('/users/:userId', (req, res) => {
    return res.send(res.send(users[req.params.userId]))
})

app.delete('/users/:userId', (req, res) => {
    return res.send(`DELETE HTTP method on user/${req.params.userId} resource`)
})

app.get('/messages', (req, res) => {
    return res.send(Object.values(messages))
})

app.post('/messages', (req, res) => {
    const id = uuidv4()
    const message = {
        id,
        text: req.body.text,
    }

    messages[id] = message
    
    return res.send(message)
})

app.get('/messages/:messageId', (req, res) => {
    return res.send(messages[req.params.messageId])
})

app.listen(3000, () => 
    console.log(`Example app listening on post ${process.env.PORT}!`)
)