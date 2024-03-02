import React, { useEffect, useState } from 'react';


interface CardButtonProps {
  onclick?: () => void
}

const CardButton: React.FC<CardButtonProps> = ({ onclick }) => {
  const [count, setCount] = useState<number>(0);
  const [localStorageData, setLocalStorageData] = useState<string | null>(
    localStorage.getItem('dataOrder')
  );

  const handleStorageChange = () => {
    const data = localStorage.getItem('dataOrder');
    setLocalStorageData(data);
  };
  
  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setCount(parsedData.length);
    }
  }, [localStorageData]);


  return (
    <div onClick={onclick ? () => onclick() : () => { }}
      className="z-50 fixed bottom-3 -left-1 w-fit drop-shadow-lg flex items-center rounded-r-full bg-[#EA5958] px-1 py-1 text-[#FFFCFF] transition ease-in-out hover:scale-110 duration-200"
    >
      <div className="py-1 pr-2 pl-0 rounded-r-full text-black bg-[#FACA62]">
        <svg xmlns="http://www.w3.org/2000/svg" className='w-14 h-14' data-name="Layer 1" viewBox="0 0 32 32" id="cart"><circle cx="21.5" cy="26.5" r="2.5"></circle><circle cx="12.5" cy="26.5" r="2.5"></circle><path d="M26,22a1,1,0,0,1-1,1H10.58a3,3,0,0,1-2.92-2.31L7.29,19,4.45,6.16,4.02,4.22a1,1,0,0,1,1.96-.44L6.47,6,9.34,19l.27,1.24a1.006,1.006,0,0,0,.97.76H25A1,1,0,0,1,26,22Z"></path><path d="M26.28,9.79l-1.91,7A3.018,3.018,0,0,1,21.47,19H7.29L4.45,6.16A1.04,1.04,0,0,1,5,6H23.38a3,3,0,0,1,2.9,3.79Z"></path></svg>
      </div>

      <div className='absolute text-center w-8 top-[1.18rem] right-[1.5rem]'>
        {/* {count ? JSON.parse(count) : 0} */}
        {count}
      </div>
    </div>
  );
}

export default CardButton;