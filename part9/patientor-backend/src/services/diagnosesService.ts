import { Diagnose } from '../types'
import diagnosesData from '../../data/diagnoses.json'

const diagnoses: Array<Diagnose> = diagnosesData

const getDiagnoses = (): Diagnose[] => {
    return diagnoses
}

export default {
    getDiagnoses,
}