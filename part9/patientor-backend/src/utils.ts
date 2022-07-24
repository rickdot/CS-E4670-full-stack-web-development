/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NewPatient, Gender, NewEntry, EntryType, HealthCheckRating } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown } | any;

const assertNever = (value: any): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
  
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    
    return date;
};

const parseSsn = (ssn: unknown): string => {
    return String(ssn);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender types: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    return String(occupation);
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatient => {
    const newPatient: NewPatient = {
      name: parseName(name),
      dateOfBirth: parseDate(dateOfBirth),
      ssn: parseSsn(ssn),
      gender: parseGender(gender),
      occupation: parseOccupation(occupation),
      entries: []
    };
  
    return newPatient;
};






const parseEntryType = (entryType: any): EntryType => {
    if (!Object.values(EntryType).includes(entryType)) {
        throw new Error(`Incorrect or missing type: ${entryType || ""}`);
    }
    return entryType;
};

const parseDescription = (description: unknown): string => {
    return String(description);
};

const parseSpecialist = (specialist: unknown): string => {
    return String(specialist);
};

const parseDischarge = (discharge: any): object => {
    if (!discharge) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    return discharge;
};

const parseEmployer = (employerName: unknown): string => {
    return String(employerName);
};

const parseSickLeave = (sickLeave: any): object => {
    if (!sickLeave) {
        throw new Error('Incorrect or missing sickleave: ' + sickLeave);
    }
    return sickLeave;
};


const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (!Object.values(HealthCheckRating).includes(rating)) {
        throw new Error(`Incorrect or missing type: ${rating || ""}`);
    }
    return rating;
};



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {


    switch (object.type) {
        case EntryType.Hospital:
            const newHospitalEntry = {
                date: parseDate(object.date),
                type: parseEntryType(object.type),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: object.diagnosisCodes,
                description: parseDescription(object.description),
                discharge: parseDischarge(object.discharge)
            };
            return newHospitalEntry as NewEntry;

        case EntryType.OccupationalHealthCare:
            const newOccupationalHCEntry = {
                date: parseDate(object.date),
                type: parseEntryType(object.type),
                specialist: parseSpecialist(object.specialist),
                employerName: parseEmployer(object.employerName),
                diagnosisCodes: object.diagnosisCodes,
                description: parseDescription(object.description),
                sickLeave: parseSickLeave(object.sickLeave)
            };   
            return newOccupationalHCEntry as NewEntry; 

        case EntryType.HealthCheck:
            const newHealthCheckEntry = {
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                type: parseEntryType(object.type),
                diagnosisCodes: object.diagnosisCodes,
                description: parseDescription(object.description),
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
            return newHealthCheckEntry as NewEntry;


        default:
            return assertNever(object.type);
    }
};



