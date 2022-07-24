/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React from "react";
import axios from "axios";


import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Entry, Patient, Diagnosis } from "../types";

import { useStateValue, updatePatient } from "../state";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import AddEntryModal from "../AddEntryModal";
import { Button } from "@material-ui/core";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

import { HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const toCodes = (entries: Entry, diagnoses: { [id: string]: Diagnosis })  => {
  if(entries.diagnosisCodes){
    return (
      entries.diagnosisCodes.map(code => 
      <li key={code}>
        {code} {Object.values(diagnoses).find(e => e.code === code)?.name}
      </li>
      ));
  }
};



const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry}/>;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry}/>;
    default:
      return assertNever(entry);
  }
};


const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({entry}) => {
  if (!entry) {
      return null;
  }
  return (
      <div>
          <div>
            {`${entry.date} ${entry.type}`} 
          </div>
          <div>
            {`${entry.discharge.date} ${entry.discharge.criteria}`} 
          </div>
          <div>
            {entry.description}
          </div>
          <p>diagnosed by {entry.specialist}</p>
      </div>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({entry}) => {
  if (!entry) {
      return null;
  }
  return (
      <div>
          <div>
            {`${entry.date} ${entry.type}`} 
          </div>
          <div>
            {entry.description}
            EmplyerName: {entry.employerName} <br/>
            Sick Leave: <br/>
            Start: {entry.sickLeave ? entry.sickLeave.startDate : null} <br/>
            End: {entry.sickLeave ? entry.sickLeave.endDate : null} <br/>
          </div>
          <p>diagnosed by {entry.specialist}</p>
      </div>
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({entry}) => {
  if (!entry) {
      return null;
  }
  return (
      <div>
          <div>
            {`${entry.date} ${entry.type}`} 
          </div>
          <div>
            {entry.description} <br/>
            HealthCheckRating: {entry.healthCheckRating}
          </div>
          <p>diagnosed by {entry.specialist}</p>
      </div>
  );
};



const PatientInfoPage = () => {
  const [patient, setPatient] = React.useState<Patient|undefined>();
  const [{ diagnoses }, dispatch] = useStateValue();
  console.log(diagnoses);
  
  const [{ patients } ] = useStateValue();
  const { id } = useParams<{ id: string }>();
  
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: result } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${String(id)}`
        );
        setPatient(result);
        
      } catch (error: unknown) {
        if(axios.isAxiosError(error) && error.response) {
          console.log(error.response.data.message);
        }
      }
    };
    fetchPatient();

    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch({ type: "SET_DIAGNOSES", payload: diagnosesFromApi });
        // dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  }, [patients, dispatch]);



  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const findPatient = Object.values(patients).find(p => p.id === id);
  if (!findPatient) {
    return null;
} 

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log('submit');
    console.log(values);
    
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${findPatient.id}/entries`, values
      );
      // dispatch({ type: "ADD_PATIENT", payload: newPatient });
      dispatch(updatePatient(newPatient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if(patient){
    return (
      <div>
        <h2>
          {patient.name} 
          { (patient.gender==='male') ? <MaleIcon /> : <FemaleIcon /> }
        </h2> 
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>

        <h3>entries</h3>
        {patient.entries.map(e => 
          <div key={e.id}>
            {/* {e.date} {e.description}  */}
            {toCodes(e, diagnoses)}
            <EntryDetails entry={e} key={e.id}/>
            <br/>
            <br/>
          </div>
          
        )}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>

      </div>
    );
  }
  return null;
};

export default PatientInfoPage;
