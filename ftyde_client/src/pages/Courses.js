import react,{useState} from 'react';
import Exams from '../imgs/Exapms.png';
import CoursesData from "../CoursesData";
import SearchResult from "./SearchResult"

function Courses(){
    const [isSearching, setSearching] = useState(false);
    const [matched, setMatched] = useState();

    const searchCourse = (event)=>{
        if(event.target.value.length == 0){
            setSearching(false)
        }else{
            var searchData = event.target.value;
            let  matches = CoursesData.filter(el =>{
                const regex = new RegExp(`^${searchData}`, 'gi');
                return el.name.match(regex) || el.description.match(regex);
              });
              console.log(matches)
              setMatched(matches)
        setSearching(true) }
    }
    return(
        <div className="courses">

            <div className="hero">
            <img src={Exams}/>
            <div className='image-cover'></div>
            <div className="hero-texts">
            <div className="show-case-title">
                        <div class="show-case-circle"></div>
                        <h2>Explore Progress You make!</h2>
                    </div>
                
                <p>json provides metadata used when your web 
                    app is installed on a</p>

                    <div className="search-container">
                     <div className="search-field">
                        <input onChange={(e)=> searchCourse(e)} type="text" placeholder="Search a Course..."/>
                     </div>
                     <div className="search-icon">
                        <img src={require('../imgs/search.png')}/>
                     </div>
                    </div>
            </div>
            </div>

            { isSearching? <div className="products">
                {matched.length > 0 ? <SearchResult data={matched}/> : <div className="not-found">
                    &nbsp;&nbsp; ! <br/>
                    No for your search!, try another keyword
                </div>}
            </div> :<div className="products">
             {CoursesData.map((course)=>{
                 return(
                 <div className="products_list" key={course.name}>
                    <a href={`/quiz/${course.name}`}> 
                    <img src={require(`../${course.displayImg}`)} alt="" className="im pro-image"/>
                     
                <div className="effect">
                 <p className="text ">
                   {course.name}
                 </p>
                 <div>{course.description}</div>
                </div>
                </a>
               </div>)
             })}
            </div>}

        </div>
        
    )
}

export default Courses;