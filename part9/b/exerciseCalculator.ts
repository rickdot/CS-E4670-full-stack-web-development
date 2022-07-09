interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface Input {
  target: number,
  hourArr: Array<number>
}


const parseArguments = (args: Array<string>): Input => {
  const len = process.argv.length;

  if (len < 4) throw new Error('Not enough arguments');

  // check all arguments are numbers
  args.slice(2, len).forEach(element => {
    if(isNaN(Number(element))){
      throw new Error(`Provided values '${element}' were not numbers!`);
    }
  });

  const target = Number(process.argv[2]);
  const hours = process.argv.slice(3, len).map(e => Number(e));
  return {
    target: target,
    hourArr: hours
  };
  
};


const calculateExercises = (target: number, inputArr: Array<number>): Result =>{
  // the number of days
  const periodLength = inputArr.length;
  
  // the number of training days
  const trainingDays = inputArr.filter(e => e>0).length;
  
  const totalHours = inputArr.reduce((a, b) => a + b, 0);
  // the calculated average time
  const average = totalHours/periodLength;

  //if the target was reached
  const success = (average >= target) ? true :false;

  // how well the hours are met
  let rating = 0;
  if(average < target/2){
      rating = 1;
  }else if(average <target){
      rating = 2;
  }else{
      rating = 3;
  }

  // a text value explaining the rating
  let ratingDescription = '';
  if(rating === 1){
      ratingDescription = 'bad';
  }else if(rating === 2){
      ratingDescription = 'not too bad but could be better';
  }else{
      ratingDescription = 'very good';
  }

  return(
    {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    }
  );
};


// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));


try {
  const {target, hourArr} = parseArguments(process.argv);
  console.log(calculateExercises(target, hourArr));

} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}



export default calculateExercises;