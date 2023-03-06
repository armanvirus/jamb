import {useState,useEffect} from 'react';
import {useParams,useNavigate,useLocation} from 'react-router-dom';
// import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Timer from '../quizUtils/Timer';
import PlaceHolder from '../quizUtils/PlaceHolder'
import Completed from './completed';
import _ from 'lodash';
import indeces from './Index';


function Quiz(){
    const {category} = useParams();
    let navigate = useNavigate();
    let url = useLocation();
    const [questins, setQuestions] = useState();
    const [subjectIndex, setSubjectIndex] = useState(0);
    const [student,setStudent] = useState()
    const [loading, setLoading] = useState(true);
    const [isCompleted, setCompleted] = useState(false);
    const [cindex, setcIndex] = useState(0);
    const [selectedOp,setSelectedOp] = useState([]);
    const [progress,setProgress] = useState(1);
    var   [score,setScore] = useState([]);
    var   [sortedScore,setsortedScore] = useState([]);
    var currentQuestion;
    loading ? currentQuestion = '' : currentQuestion = questins[subjectIndex].questions[cindex];
    // const indeces = import('../index');
    let isSelected = (i)=>selectedOp.some((el) => el.subject == subjectIndex && el.questionIndex == cindex && el.optionIndex == i);
    let checkIndex = (index) =>{
        if(index -1 == cindex){
            return('activeQ')
        }
        if(selectedOp.some((el) => el.questionIndex == index -1 && el.subject == subjectIndex)){
            return('answered')
        }else{
            return('notAnswerd')
        }
    }
    // the demo score data
    const completedAnswer = [
        {scored:[
            {quest: 'is gee really a javascript biology fan boy, can you say about the course css tell us your vision', ans: 'i have no words in biology', subject: 0},
            {quest: 'is really a biology fan boy, can you say about the course css tell us your vision', ans: 'Is awesome', subject: 0},
            {quest: 'is gee really a javascript biology fan boy, can you say about the course css tell us your vision', ans: 'i have no words in biology', subject: 0},
            {quest: 'is really a biology fan boy, can you say about the course css tell us your vision', ans: 'Is awesome', subject: 0}
        ],
        subject:'Biology'},
        {scored:[
            {quest: 'is gee really a javascript biology fan boy, can you say about the course css tell us your vision', ans: 'i have no words in biology', subject: 0},
            
        ],
        subject:'Physics'},
        {scored:[
            {quest: 'is gee really a javascript biology fan boy, can you say about the course css tell us your vision', ans: 'i have no words in biology', subject: 0},
            {quest: 'is really a biology fan boy, can you say about the course css tell us your vision', ans: 'Is awesome', subject: 0},
            {quest: 'is really a biology fan boy, can you say about the course css tell us your vision', ans: 'Is awesome', subject: 0}
        ],
        subject:'Math'},
        {scored:[
            {quest: 'is gee really a javascript biology fan boy, can you say about the course css tell us your vision', ans: 'i have no words in biology', subject: 0},
            {quest: 'is really a biology fan boy, can you say about the course css tell us your vision', ans: 'Is awesome', subject: 0},
            {quest: 'is gee really a javascript biology fan boy, can you say about the course css tell us your vision', ans: 'i have no words in biology', subject: 0},
            {quest: 'is really a biology fan boy, can you say about the course css tell us your vision', ans: 'Is awesome', subject: 0}
        ],
        subject:'English'}
    ];

    // end of the demo score


    useEffect(() => {
        fechQuestions();
        // window.toolbar.visible = false;
      }, []);
    
    useEffect(()=>{
        // setProgress(Number(selectedOp.length));
        // console.log((progress/questins?.length) * 100 + '%')
        // console.log(selectedOp)
    },[selectedOp])
    
    useEffect(() =>{
        // console.log(score)
    },[score])

    const fechQuestions = ()=>{
        setLoading(true);
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:2000/testing/${category}`)
        .then((res)=>{
            if(res.data?.verification === false){
                localStorage.setItem('intendedRoute',`${url.pathname}`)
                navigate("/login",)
            }else{
                setQuestions(res.data.questions);
                setStudent(res.data.student);
                console.log(res)
            }
            setLoading(false);
        }).catch((err)=>{
            console.log(err)
            setLoading(false);
        })
    }

    const indexCounter = ()=>{
        if(cindex < questins.length){
           setcIndex(cindex + 1);
            // setProgres(Math.floor(((index + 1)/questions.length)*100))
            
        }else if(cindex == questins.length-1){
            // send the result to the backend in here
            setcIndex(0);
            
        }
    }

    const calScore = (option, i)=>{
        let matchedComparison;
            if(selectedOp.length > 0){
                matchedComparison = selectedOp;
                const checkQuestAndOP = matchedComparison.some((el) =>el.subject == subjectIndex && el.questionIndex == cindex && el.optionIndex == i);
                const checkQuest = matchedComparison.some((el) => el.subject == subjectIndex && el.questionIndex == cindex);
                if(checkQuestAndOP){
                    const unitFiltered = matchedComparison.filter((el)=> el.questionIndex !== cindex && el.optionIndex !==i && el.subject == subjectIndex );
                    const allFiltered = matchedComparison.filter((el)=> el.subject != subjectIndex );
                    let merge = [...allFiltered,...unitFiltered];
                    setSelectedOp(merge);
                }else if(checkQuest){
                    const unitFiltered = matchedComparison.filter((el)=> el.subject == subjectIndex && el.questionIndex !== cindex);
                    const allFiltered = matchedComparison.filter((el)=> el.subject != subjectIndex);
                    const filtered = [...allFiltered,...unitFiltered];
                    if(filtered.length > 0){
                    // console.log([...filtered,{questionIndex:cindex,optionIndex:i}])
                    setSelectedOp([...filtered,{questionIndex:cindex,optionIndex:i,subject:subjectIndex}]);
                    }else{
                    setSelectedOp([{questionIndex:cindex,optionIndex:i,subject:subjectIndex}]);
                }
                }else{
                    setSelectedOp([...selectedOp,{questionIndex:cindex,optionIndex:i,subject:subjectIndex}]);
                }

            }else{
            setSelectedOp([{
                'questionIndex':cindex, 
                'optionIndex':i,
                'subject':subjectIndex
            }]);
                // console.log("state is set")
            }
                
            if( option == currentQuestion.answer){
                // calculate the score
                if(score.length > 0){
                    const checkQuestAns = score.some((el) => el.quest == currentQuestion.question && el.ans == currentQuestion.answer);
                    if(checkQuestAns){
                        let filterChoices = score.filter((el)=> el.quest !== currentQuestion.question && el.ans !== currentQuestion.answer);
                        setScore(filterChoices);
                    }else{
                        setScore([...score,{
                            "quest":currentQuestion.question,
                             "ans":currentQuestion.answer,
                             "subject":subjectIndex
                        }])
                    }

                }else{
                    setScore([{"quest":currentQuestion.question,
                             "ans":currentQuestion.answer, "subject":subjectIndex}])
                }  
            }else{
                const isQuestionAnswered = score.some((el)=> el.quest == currentQuestion.question);
                if(isQuestionAnswered){
                    let removeAns = score.filter((el)=> el.quest !== currentQuestion.question);
                    setScore(removeAns);
                }else{
                    setScore(score)
                }
            }
            
    }

    const finish = ()=>{
        const [subject1,subject2,subject3,subject4] = questins;
        if(cindex === questins[subjectIndex].questions.length - 1 && subjectIndex == questins.length -1){
            const sub1Ans = score.filter(el => el.subject == 0);
            const sub2Ans = score.filter(el => el.subject == 1);
            const sub3Ans = score.filter(el => el.subject == 2);
            const sub4Ans = score.filter(el => el.subject == 3);
            const sotedScore = [
                {
                    subject:subject1.subject,
                    scored:sub1Ans
                },
                {
                    subject:subject2.subject,
                    scored:sub2Ans
                },
                {
                    subject:subject3.subject,
                    scored:sub3Ans
                },
                {
                    subject:subject4.subject,
                    scored:sub4Ans
                }
            ];
            setsortedScore(sotedScore)
            setCompleted(true)
        }else{
            setSubjectIndex(subjectIndex + 1)
            setcIndex(0);
        }
        let gain = Math.ceil((score.length/questins.length)*100);
        console.log(gain + "%")
    }
    

    return(
        <div className="quiz">
            {loading ? <div> please wait and calm down while questions are getting ready</div> : <div>
                { isCompleted ? <> <Completed total={score.length} scores={sortedScore}/></> :
            <div className="quiz-sec">
            {/* quiz for information for mobile view */}
                <div className="quiz-utils">
                 <div className="user-"><img src={require('../imgs/man.png')}/> <span>{student.name}</span></div>
                 <div className="ct">
                 <div>{questins.map((el,index)=>{
                     return(<button
                    //  className={checkIndex(index)}
                     onClick={(e)=>{
                     setSubjectIndex(e.target.value)
                     setcIndex(0)
                     }} 
                     value={index} 
                    key={index}>
                     {el.subject}
                     </button>)
                 })}</div>
                 {/* <div className="time">
                <MdOutlineHourglassFull/>
                30:00
                </div> */}
                <Timer score={(score.length/questins.length)*100}/>
                 </div>
                 <div className="index">
                    {indeces.map((index)=>{
                        return(<button
                            className={checkIndex(index)}
                            onClick={(e)=>{
                            setcIndex(e.target.value - 1)
                            }} 
                            value={index} 
                        key={index}>
                            {index}
                            </button>)
                    })}
                 </div>
                </div>

                {/* quiz information for desktop view */}
                <div className="quiz-utils-desktop">
                 <div className="user-"><img src={require('../imgs/man.png')}/> <span>Arman Grema</span></div>
                 <div className="ct">
                 <div className="subjects">
                 {questins.map((el,index)=>{
                     return(<button
                     className={index == subjectIndex ? 'active' : ""}
                     onClick={(e)=>{
                     setSubjectIndex(e.target.value);
                     setcIndex(0)
                     }} 
                     value={index} 
                    key={index}>
                     {el.subject}
                     </button>)
                 })}
                 </div>
                 {/* <div className="time">
                <MdOutlineHourglassFull/>
                30:00
                </div> */}
                <Timer score={(score.length/questins.length)*100}/>
                 </div>
                 <div className="index">
                    {indeces.map((index)=>{
                        return(<button
                            className={checkIndex(index)} 
                            onClick={(e)=>{
                                setcIndex(e.target.value - 1)
                            }}
                            key={index} 
                            value={index}>
                            {index}
                            </button>)
                    })}
                 </div>
                 {/* <div className="progress-bar">
                   <div style={{width:`${(progress/questins?.length) * 100}%`}} className="bar"></div>
                 </div> */}
                </div>

                <div className="quiz-main">
                    <p>{currentQuestion.question}
                    </p>
                    <div className="options">
                        {currentQuestion.options.map((option,i)=>{
                            return(<button
                                className={isSelected(i) ? 'selected': ''} 
                                onClick={()=>calScore(option,i)}
                                key={i}>
                                <span>{PlaceHolder(i)}
                                </span>
                                {option}
                                </button>)
                        })}
                    </div>
                    <div className='next'>
                    {
                        cindex === questins[subjectIndex].questions.length - 1 ? 
                        <button onClick = {()=> finish() }>
                         Finished
                         </button> 
                         :
                        <button onClick = {()=>indexCounter()}>
                        Continue
                        </button>
                    }
                    </div>
                </div>
                <div className="quit" onClick={()=>finish()}>
                    <img src={require('../imgs/power.png')}/> Quit
                </div>
                    </div>}
            </div> 
        }
        </div>
    )
}

export default Quiz;