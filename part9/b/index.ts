
import express = require('express');
const app = express();
app.use(express.json());

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { target, daily_exercises } = req.body;
  if (!target || !daily_exercises) {
    return res.status(400).json({'error': 'parameters missing'});
  } 

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument , @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const all = () => daily_exercises.every((element: number) => typeof element === "number");

  try {
        if (isNaN(Number(target)) || !all()) throw new Error('malformatted parameters');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = calculateExercises(Number(target), daily_exercises);
        return res.status(200).json(result);
    }
    catch (error: unknown) {
         return res.status(400).json({'error': (error as Error).message});
    }



  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(Number(target), daily_exercises);

  
  res.status(200)
    .json(result);
    
  
});

app.get('/bmi', (req, res) => {
    const queryParams = req.query;
    if(!queryParams.weight || !queryParams.height){
        res.status(400)
            .json({error: "malformatted parameters"});
        return;
    }
    try{
        
        const result = calculateBmi(Number(queryParams.height), Number(queryParams.weight));
        res.status(200)
            .json({
                weight: queryParams.weight,
                height: queryParams.height,
                bmi: result
            });
    } catch (error: unknown) {
        res.status(400)
            .json({'error': (error as Error).message});
    }
    

  });

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});