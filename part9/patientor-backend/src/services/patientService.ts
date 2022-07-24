/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */


// import patientData from '../../data/patients';
import patients from '../../data/patients';

import { Patient, PatientNoSsn, NewPatient, NewEntry,  } from '../types';

import { v1 as uuid } from 'uuid';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsNoSsn = (): Array<PatientNoSsn> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};




const findById = (id: string): Patient | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};


const addPatient = ( entry: NewPatient ): Patient => {
    const id = uuid();
    const newPatient = {
      id: id,
      ...entry
    };
  
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Patient | undefined => {
  const patient = patients.find(patient => patient.id == id);
  if (patient) {
    const newEntry = {
        id: uuid(),
        ...entry
    };
    patient.entries.push(newEntry);
  }
  return patient;
};


export default {
  getPatients,
  getPatientsNoSsn,
  findById,
  addPatient,
  addEntry

};

