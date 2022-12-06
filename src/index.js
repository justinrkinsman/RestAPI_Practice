import 'dotenv/config'
import express from 'express'

const app = express()

app.listen(3000, () => 
    console.log('Example app listening on post 3000!')
)