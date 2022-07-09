/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Patient, NoSsnPatient, NewPatient } from '../types'
import patientsData from '../../data/patients.json'
import { v1 as uuid } from 'uuid'


const patients: Array<Patient> = patientsData

const getPatients = (): Patient[] => {
    return patients
}

const getNoSsnPatients = (): NoSsnPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};


const findPatientById = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id)
}

const addPatient = (object: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...object,
    }
    patientsData.push(newPatient)
    
    return newPatient
}


export default {
    getPatients,
    getNoSsnPatients,
    findPatientById,
    addPatient,
    
}