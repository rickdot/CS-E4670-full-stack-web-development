/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {  NewPatient, Gender } from "./types";

type Field = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown }



export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Field): NewPatient => {
    const newPatientEntry = {
        name: parseParams('name', name),
        dateOfBirth: parseParams('dateOfBirth', dateOfBirth),
        ssn: parseParams('ssn', ssn),
        gender: parseGender(gender),
        occupation: parseParams('occupation', occupation),
        entries: []
    }
    return newPatientEntry
}


const isString = (text: unknown) : text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isGender = (param: any): boolean => {
    return Object.values(Gender).includes(param);
}

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) throw new Error(`Incorrect or missing gender: ${gender}`)
    return gender as Gender;
}

const parseParams = (paramName: string, param: unknown): string => {
    if (!param || !isString(param)) throw new Error(`Incorrect or missing ${paramName}: ${param}`)
    return param;
}