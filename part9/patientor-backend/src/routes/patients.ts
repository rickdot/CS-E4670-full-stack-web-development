/* eslint-disable @typescript-eslint/no-explicit-any */

import express from 'express';

import patientService from '../services/patientService';

import {toNewPatient} from '../utils';
import {toNewEntry} from '../utils';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsNoSsn());
});


router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

// 9.12
router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});




// 9.23
router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  try {
      const newEntry = toNewEntry(req.body);
      const returnedEntry = patientService.addEntry(id, newEntry);
      if(returnedEntry){
        res.json(returnedEntry);
      }
      res.status(404);
  } catch (e: any) {
      res.status(400).send(e.message);
  }
});


  // const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  // const newPatient = patientService.addPatient({
  //   name,
  //   dateOfBirth,
  //   ssn,
  //   gender,
  //   occupation
  // });
  // res.json(newPatient);



export default router;