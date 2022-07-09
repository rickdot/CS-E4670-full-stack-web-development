

import express = require('express');
const app = express();


import calculateBmi from './bmiCalculator'

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const queryParams = req.query
    if(!queryParams.weight || !queryParams.height){
        res.status(400)
            .json({error: "malformatted parameters"})
        return
    }
    try{
        
        const result = calculateBmi(Number(queryParams.height), Number(queryParams.weight))
        res.status(200)
            .json({
                weight: queryParams.weight,
                height: queryParams.height,
                bmi: result
            })
    } catch (error: unknown) {
        res.status(400)
            .json({'error': (error as Error).message})
    }
    

  });

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});