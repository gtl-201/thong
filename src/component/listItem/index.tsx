import React from 'react';
import imgtmp from '../../assets/header/lau.jpg';
import Button from '../button';

interface ItemListProps {
    img?: string;
    rating?: string;
    price?: string;
}

const ItemList: React.FC<ItemListProps> = ({ img, rating, price }) => {
    //   const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        console.log('Add to card order', rating);
    };
    const rateStar = []
    // Math.ceil(Math.random() * (5 - 0)) + 0
    for (let i = 0; i < 5; i++) {
        rateStar.push(i);
    }
    return (
        <div className="flex flex-wrap mt-[2rem] justify-center">
            <div onClick={() => handleClick()} className='flex-wrap shadow-sm bg-[#FDE9DE] m-10 w-[13rem] h-[16rem] rounded-[2rem] relative'>
                <div className='shadow-lg w-[12.5rem] h-[12.5rem] overflow-hidden rounded-full border-[12px] border-[#E95758] absolute ml-[3.5rem] -mt-[3.5rem]'>
                    <img src={img ? img : imgtmp} alt="" className='min-h-[12.5rem] min-w-[12.5rem] shadow-inner' />
                </div>
                <div className='mt-3 ml-3'>
                    <Button text='+'></Button>
                </div>
                <div className='absolute bottom-0 mx-4 my-5'>
                    <div className='font-Fredoka font-bold text-[22px] text-wrap tracking-wide capitalize '>Combo 2 nguoi</div>
                    <div className='flex'>
                        {rateStar.map((item) => {
                            console.log(item);
                            return (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#F9C205" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F9C205" className="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                            )
                        })}
                    </div>
                    <div className='flex justify-between w-[11rem] mt-2'>
                        <div className='font-Fredoka font-medium text-[25px] text-wrap tracking-wide capitalize'>
                            {price ? price : '135K'}
                        </div>
                        <div className='flex' onClick={(e) => e.stopPropagation()}>
                            <Button
                                text='Chi tiết'
                                textSize='sm'
                                onclick={() => {
                                    console.log('chi tiet hon');
                                }} />
                        </div>
                    </div>
                </div>
            </div>
            
            <div onClick={() => handleClick()} className='flex-wrap shadow-sm bg-[#FDE9DE] m-10 w-[13rem] h-[16rem] rounded-[2rem] relative'>
                <div className='shadow-lg w-[12.5rem] h-[12.5rem] overflow-hidden rounded-full border-[12px] border-[#E95758] absolute ml-[3.5rem] -mt-[3.5rem]'>
                    <img src={img ? img : imgtmp} alt="" className='min-h-[12.5rem] min-w-[12.5rem] shadow-inner' />
                </div>
                <div className='mt-3 ml-3'>
                    <Button text='+'></Button>
                </div>
                <div className='absolute bottom-0 mx-4 my-5'>
                    <div className='font-Fredoka font-bold text-[22px] text-wrap tracking-wide capitalize '>Combo 2 nguoi</div>
                    <div className='flex'>
                        {rateStar.map((item) => {
                            console.log(item);
                            return (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#F9C205" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F9C205" className="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                            )
                        })}
                    </div>
                    <div className='flex justify-between w-[11rem] mt-2'>
                        <div className='font-Fredoka font-medium text-[25px] text-wrap tracking-wide capitalize'>
                            {price ? price : '135K'}
                        </div>
                        <div className='flex' onClick={(e) => e.stopPropagation()}>
                            <Button
                                text='Chi tiết'
                                textSize='sm'
                                onclick={() => {
                                    console.log('chi tiet hon');
                                }} />
                        </div>
                    </div>
                </div>
            </div>

            <div onClick={() => handleClick()} className='flex-wrap shadow-sm bg-[#FDE9DE] m-10 w-[13rem] h-[16rem] rounded-[2rem] relative'>
                <div className='shadow-lg w-[12.5rem] h-[12.5rem] overflow-hidden rounded-full border-[12px] border-[#E95758] absolute ml-[3.5rem] -mt-[3.5rem]'>
                    <img src={img ? img : imgtmp} alt="" className='min-h-[12.5rem] min-w-[12.5rem] shadow-inner' />
                </div>
                <div className='mt-3 ml-3'>
                    <Button text='+'></Button>
                </div>
                <div className='absolute bottom-0 mx-4 my-5'>
                    <div className='font-Fredoka font-bold text-[22px] text-wrap tracking-wide capitalize '>Combo 2 nguoi</div>
                    <div className='flex'>
                        {rateStar.map((item) => {
                            console.log(item);
                            return (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#F9C205" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F9C205" className="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                            )
                        })}
                    </div>
                    <div className='flex justify-between w-[11rem] mt-2'>
                        <div className='font-Fredoka font-medium text-[25px] text-wrap tracking-wide capitalize'>
                            {price ? price : '135K'}
                        </div>
                        <div className='flex' onClick={(e) => e.stopPropagation()}>
                            <Button
                                text='Chi tiết'
                                textSize='sm'
                                onclick={() => {
                                    console.log('chi tiet hon');
                                }} />
                        </div>
                    </div>
                </div>
            </div>

            <div onClick={() => handleClick()} className='flex-wrap shadow-sm bg-[#FDE9DE] m-10 w-[13rem] h-[16rem] rounded-[2rem] relative'>
                <div className='shadow-lg w-[12.5rem] h-[12.5rem] overflow-hidden rounded-full border-[12px] border-[#E95758] absolute ml-[3.5rem] -mt-[3.5rem]'>
                    <img src={img ? img : imgtmp} alt="" className='min-h-[12.5rem] min-w-[12.5rem] shadow-inner' />
                </div>
                <div className='mt-3 ml-3'>
                    <Button text='+'></Button>
                </div>
                <div className='absolute bottom-0 mx-4 my-5'>
                    <div className='font-Fredoka font-bold text-[22px] text-wrap tracking-wide capitalize '>Combo 2 nguoi</div>
                    <div className='flex'>
                        {rateStar.map((item) => {
                            console.log(item);
                            return (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#F9C205" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F9C205" className="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                            )
                        })}
                    </div>
                    <div className='flex justify-between w-[11rem] mt-2'>
                        <div className='font-Fredoka font-medium text-[25px] text-wrap tracking-wide capitalize'>
                            {price ? price : '135K'}
                        </div>
                        <div className='flex' onClick={(e) => e.stopPropagation()}>
                            <Button
                                text='Chi tiết'
                                textSize='sm'
                                onclick={() => {
                                    console.log('chi tiet hon');
                                }} />
                        </div>
                    </div>
                </div>
            </div>

            <div onClick={() => handleClick()} className='flex-wrap shadow-sm bg-[#FDE9DE] m-10 w-[13rem] h-[16rem] rounded-[2rem] relative'>
                <div className='shadow-lg w-[12.5rem] h-[12.5rem] overflow-hidden rounded-full border-[12px] border-[#E95758] absolute ml-[3.5rem] -mt-[3.5rem]'>
                    <img src={img ? img : imgtmp} alt="" className='min-h-[12.5rem] min-w-[12.5rem] shadow-inner' />
                </div>
                <div className='mt-3 ml-3'>
                    <Button text='+'></Button>
                </div>
                <div className='absolute bottom-0 mx-4 my-5'>
                    <div className='font-Fredoka font-bold text-[22px] text-wrap tracking-wide capitalize '>Combo 2 nguoi</div>
                    <div className='flex'>
                        {rateStar.map((item) => {
                            console.log(item);
                            return (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#F9C205" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F9C205" className="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                            )
                        })}
                    </div>
                    <div className='flex justify-between w-[11rem] mt-2'>
                        <div className='font-Fredoka font-medium text-[25px] text-wrap tracking-wide capitalize'>
                            {price ? price : '135K'}
                        </div>
                        <div className='flex' onClick={(e) => e.stopPropagation()}>
                            <Button
                                text='Chi tiết'
                                textSize='sm'
                                onclick={() => {
                                    console.log('chi tiet hon');
                                }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemList;