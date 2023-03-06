import  "../styles/Score.css";
const Completed = (props)=>{
    return(
        <>
        <div className="score-display">
          <div>
            <div className="score">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe ratione</p>
                <div className="course">
                    <div>Course</div>
                    <div>Mark</div>
                    </div>
                    {props.scores.map((score,i)=>{
                        return(
                            <div className="unit-score">
                                <div className="subject-name">{score.subject}</div>
                                <div className="score-figure">{score.scored.length}</div>
            </div>
                        )
                    })}
                <div className="progress">
                <div>Total Score</div>
                <div>{props.total}</div>
            </div>
            <div><a href={`/`}>Retry again</a></div>
            </div>
           </div>
           <div className="bg-score">
        <img src={require("../imgs/bg.png")} alt="Background image"/>
    </div>
        </div>
        </>
    )
}

export default Completed;