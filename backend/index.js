const connectToMongo=require('./db');
//connection to mongodb 
connectToMongo();
const express = require('express')
const app = express()
const port = 5000
var cors=require('cors')


app.use(cors())
app.use(express.json())


//           ALL END POINTS FILES ARE ASSIGNED HERE
//           WE CAN WRITE ALL END POINTS HERE BUT WE DONT WRITE FOR MAKING IT BETTER IN MANAGEMENT 

// for / at localhost3000 hello aditya will be running
// app.get('/', (req, res) => {
//   res.send('Hello aditya aryan!')
// })


//you cant directly use req.body you need a middle way to use it 
app.use(express.json())



//putting all routes like inotes/auth and inotes/login or inotes/about in routes folder 
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/dealingNotes.js'))


app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`)
})


