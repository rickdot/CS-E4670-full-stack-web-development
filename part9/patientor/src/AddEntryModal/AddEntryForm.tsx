/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField } from "./FormField";

// import { Gender, Patient } from "../types";

import { EntryType } from "../types";
import { EntryOption } from "./FormField";

import { HealthCheckRating } from '../types';
import { healthcheckOption } from "./FormField";

import { DiagnosisSelection } from "./FormField";

// import { HealthCheckEntry } from '../types';

import { useStateValue } from "../state";
// export type EntryFormValues = Omit<HealthCheckEntry, "id" >;


export interface EntryFormValues {
  type: EntryType,
  date: string,
  description: string,
  specialist: string,
  diagnosisCodes?: string[],
  healthCheckRating: HealthCheckRating,
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryOptions: EntryOption[] = [
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" },
  { value: EntryType.HealthCheck, label: "HealthCheck" },    // implemented in 9.24
];

const healthcheckOptions: healthcheckOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "LowRisk" },
  { value: HealthCheckRating.HighRisk, label: "HighRisk" },
  { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" },
];


export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: "",
        description: "",
        specialist: "",
        healthCheckRating: HealthCheckRating.Healthy,
        type: EntryType.HealthCheck,
        diagnosisCodes: []
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        // if (!values.occupation) {
        //   errors.occupation = requiredError;
        // }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={entryOptions} />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            
            <SelectField label="HealthcheckRating" name="healthCheckRating" options={healthcheckOptions} />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            /> 

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
