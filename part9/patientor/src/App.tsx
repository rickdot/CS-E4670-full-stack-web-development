import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes, useParams } from "react-router-dom";
import { Button, Divider, Container} from "@material-ui/core";
import { useStateValue } from "../state";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import { Typography } from "@material-ui/core";

const PatientInfo = () => {
  
  const [{ patients }] = useStateValue();
  const {id} = useParams<{id: string}>();
  console.log(patients);
  console.log(id);
  
  const patient = Object.values(patients).find(e => e.id === id);
  console.log(patient);

  if(patient){
    return (
      <div>
        <h2>{patient.name}</h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
    );
  }

  return null;
  
  
  
};

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patient/:id" element={<PatientInfo />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
