import express from 'express'
import patientService from "../services/patientService";

import { NewPatient } from '../types';

const patientRouter = express.Router()

patientRouter.get('/', (_req, res) => {
    // res.send(patientService.getNoSsnPatients())
    res.send(patientService.getPatients())
})


patientRouter.get('/:id', (req, res) => {
    const patient = patientService.findPatientById(req.params.id)
    res.json(patient)
})

patientRouter.post('/', (req: express.Request<NewPatient>, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newPatient = req.body
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const addedPatient = patientService.addPatient(newPatient)
        res.json(addedPatient)
        
        
    }
    catch (error: unknown) {
        res.status(400).send((error as Error).message)
    }
})

// patientRouter.get('/:id', (req, res:express.Response<Patient|string>) => {
//     const patient = patientService.getPatientById(req.params.id)
//     return patient ? res.status(200).json(patient) : res.status(400).send("patient id not found")
// })




export default patientRouter