const express = require('express')
const app = express()




app.use(express.json())



let notes = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/', (request, response) => {     
  response.send('<h1>Hello World!</h1>')     
})  

app.get('/api/persons', (request, response) => {
  response.json(notes)  
})  


app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    
    if (note) {   // all objects are true,  undefined is false
      response.json(note)
    } else {
      response.status(404).end()   // status method: set the status
    }                    // end method: respond without sending any data
})


app.get('/info', (request, response) => {
    let time = new Date();
    console.log(time);
    response.send(`<div>
            <p>Phonebook has info for 2 people</p>
            ${time}
        </div>`
        

    )
})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
})


const generateId = () => {
  // range 0-9999
  let newID = Math.floor(Math.random() * 10000)
  idarr = notes.map(n => n.id)
  while (idarr.includes(newID)){
    newID = Math.floor(Math.random() * 10000)
  }
  return newID
}



app.post('/api/persons', (request, response) => {
    const body = request.body
    // console.log(body)

    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
  
    const note = {
      id: generateId(),
      name: body.name,
      number: body.number,      
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })




const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

