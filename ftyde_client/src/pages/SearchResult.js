import React from 'react'
const SearchResult = (props)=>{
    return(<>
        {props.data.map((course)=>{
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
        </>
    )
}

export default SearchResult;