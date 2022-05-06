// import
const express = require('express')

// constants
const port = process.env.PORT
const testPayloadKey = 'string_to_cut'


const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Lyft!')
})

function returnEveryThreeLetter(input) {
  let res = ''
  Array.from(input).forEach((letter, index) =>{
    res += (index % 3 == 2 ? letter : '')
  })
  
  return res
}

app.post('/test', (req, res) => {
  // error handling
  if (!req.is("application/json")) {
    res.status(400)
    res.send("Unsupported content type")
  } else if (!(testPayloadKey in req.body)) {
    res.status(400)
    res.send("Missing key in payload")
  } 
  
  // return response
  const resPayload = {return_string: returnEveryThreeLetter(req.body[testPayloadKey])}
  res.json(resPayload)
})

// start server
app.listen(port, () => {
  console.log(`Lyft interview app listening on port ${port}`)
})