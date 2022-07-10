import React from 'react'

interface CoursePartBase {
    name: string,
    exerciseCount: number,
    type: string
}

// add a description property
// interface CoursePartDescription extends CoursePartBase {
//     description: string
// }

interface CourseNormalPart extends CoursePartBase {
    type: "normal";
    description: string;
  }

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}


interface CourseSubmissionPart extends CoursePartBase {
    type: "submission",
    exerciseSubmissionLink: string;
    description: string
}


interface CourseRequirementPart extends CoursePartBase {
    type: "special",
    description: string,
    requirements: Array<string>
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementPart


/**
 * Helper function for exhaustive type checking
 */
 const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ part }: { part: CoursePart }) : JSX.Element => {
    switch (part.type) {
        case 'normal':
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div><i>{part.description}</i></div>
                </div>
            )
        case 'groupProject':
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div>project exercises {part.groupProjectCount}</div>
                </div>
            )
        case 'submission':
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div><i>{part.description}</i></div>
                    <div>submit to {part.exerciseSubmissionLink}</div>
                </div>
            )
        case 'special':
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div><i>{part.description}</i></div>
                    <div>required skils: {part.requirements.join(", ")}</div>
                </div>
            )
        default:
            return assertNever(part)
    }
}

export default Part