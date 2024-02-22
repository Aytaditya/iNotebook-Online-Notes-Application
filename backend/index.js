const connectToMongo=require('./db');
connectToMongo();

const express = require('express')
const app = express()
const port = 3000

// for / at localhost3000 hello aditya will be running
// app.get('/', (req, res) => {
//   res.send('Hello aditya aryan!')
// })

//putting all routes like inotes/auth and inotes/login or inotes/about in routes folder 
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))


app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`)
})


