import react from 'react';
import Exams from '../imgs/Exapms.png';
import Logo from '../imgs/logo.svg';
import CoursesData from "../CoursesData";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import VideocamIcon from '@mui/icons-material/Videocam';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { width } from '@mui/system';


function Courses(){
    return(
        <div className="courses">

            <div className="hero">
                <img src={Exams}/>
            <div className='image-cover'></div>
            <div className="hero-texts">

            <div class="show-case-title">
                {/* <img src={Logo}className='logo'/> */}

                        <div class="show-case-circle"></div>
                        <h2>Explore Progress You make!</h2>
                    </div>
                
                <p>json provides metadata used when your web 
                    app is installed on a</p>
            </div>
            </div>  

            <div className="products">
             {CoursesData.map((course)=>{
                 return(
                 <div className="products_list" key={course.name}>
                    <div className='courseLinks'>
                        <a href={`/quiz/${course.name}`} className='course_name'> 
                            {/* <img src={require(`../${course.displayImg}`)} alt="" className="im pro-image"/> */}
                           <>{course.id === 'a1' && <PlayCircleIcon style={{fontSize:'50', color: '#139d37'}}/>}</>
                           <>{course.id === 'a2' && <DocumentScannerIcon style={{fontSize:'80', color: '#fff'}}/>}</>
                           <>{course.id === 'a5' && <HelpOutlineIcon style={{fontSize:'80', color: '#fff'}}/>}</>
                           <>{course.id === 'a4' && <VideocamIcon style={{fontSize:'80', color: '#fff'}}/>}</>
                           <>{course.id === 'a8' && <InfoOutlinedIcon style={{fontSize:'80', color: '#fff'}}/>}</>
                           <>{course.id === 'a9' && <VideocamIcon style={{fontSize:'80', color: '#fff'}}/>}</>
                           <>{course.id === 'a10' && <HelpOutlineIcon style={{fontSize:'80', color: '#fff'}}/>}</>
                            {/* <p>{course.action}</p> */}
                        </a>
                    </div>
                        <div className="effect"></div>
                <div className="courseHead">
                 <p className="text text-muted">
                   {course.name}
                 </p>
                <p className='paraName'>{course.description}</p>
                </div>

               </div>)
             })}
            </div>

        </div>
        
    )
}

export default Courses;