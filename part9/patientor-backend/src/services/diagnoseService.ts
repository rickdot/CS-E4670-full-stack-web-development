// import diagnosticData from '../../data/diagnoses';
import diagnoses from '../../data/diagnoses';

import { Diagnose } from '../types';

// 9.10
const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};



export default {
  getDiagnoses
};

