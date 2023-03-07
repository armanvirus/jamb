import react from 'react';
import background from '../imgs/jamb-course-bg.jpg';
import play from '../imgs/play.svg';
import Combinations from "../Combinations";


function Info(){
    return(
        <div className=''  > 
            <img src={background} alt='bg' className='w-screen h-[669px]' />
        <div className='bg-black/10 w-screen h-[669px] z-20 absolute top-0'>
        </div>
                <p className='text-2xl -mt-20 pl-4    text-white font-bold'>Select your Preferred Course Of study and start your Quiz</p>
            <div className='  px-4 space-y-8'>
                <div className='flex gap-12 mt-20 flex-wrap justify-center w-screen '>
                    {Combinations.map((comb) => {
                        return (
                            <div className='flex ' key={comb.id}>
                                <div className='flex flex-col bg-white rounded-xl  comb pb-20 '>
                                    <div className='bg-[#181754] pl-9 py-7 rounded-t-xl'>
                                        <p className='text-[#FDFDFF] max-w-[319px] text-2xl  '>{comb.name}</p>
                                    </div>
                                    <div className='flex justify-between items-center pl-9 pr-14'>
                                        <div className=' pt-5'>
                                            <p>{comb.course1}</p>
                                            <p>{comb.course2}</p>
                                            <p>{comb.course3}</p>
                                            <p>{comb.course4}</p>

                                            
                                        </div>
                                        <img src={play} alt='bg' className='w-[60px] h-[60px]' />

                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>

            
        </div>
    )

}

export default Info;