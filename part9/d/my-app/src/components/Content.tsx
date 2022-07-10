import Part, {CoursePart} from "./Part";

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) : JSX.Element => {
    const style = {marginBottom: 10}
    return (
        <div>
            {courseParts.map(p =>
                <div key={p.name} style={style}>
                    <Part part={p}/>
                </div>)}
        </div>
    )
}

export default Content