import React, { useState } from 'react';

function Ownername() {

    //state variable
    const [isHovered, setIsHovered] = useState();

    const toggleHover = () => {
        setIsHovered(prevState => !prevState);
    };

    return (
        <div className="">
            <div 
                onClick={toggleHover}
                style={{ display: 'inline-block' }}
            >
                {/* SR logo shortform of sreeram  */}
                <button><img className='absolute -top-1 right-0' src="/images/Sr.png" alt="Sr Logo" style={{ width: '80px',}} /></button>    
            </div>
            {isHovered && (
                <div className="flex flex-row-reverse bg-white top-0 right-0 p-2 bg-gray-none rounded-lg shadow">
                    <p className=' mr-5 font-sans text-black'>This page is crafted by <a href="https://github.com/sreeramss" target="blank"><b>Sree Ram </b></a>, Student of Tailwind cohort </p>
                </div>
            )}
        </div>
    );
}

export default Ownername;
