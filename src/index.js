import 'dotenv/config'
import cors from 'cors'
import express from 'express'

const app = express()

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

app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method')
})

app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method')
})

app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method')
})

app.get('/users', (req, res) => {
    return res.send(Object.values(users))
})

app.post('/users', (req, res) => {
    return res.send('POST HTTP method on a user resource')
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

app.get('/messages/:messageId', (req, res) => {
    return res.send(messages[req.params.messageId])
})

app.listen(3000, () => 
    console.log(`Example app listening on post ${process.env.PORT}!`)
)