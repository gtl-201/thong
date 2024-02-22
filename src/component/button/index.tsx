import React from 'react';


interface ButtonProps {
  text?: string;
  icon?: string;
  bg?: string;
  textSize?: 'sm' | 'md' | 'lg'
  onclick?: () => void
}

const Button: React.FC<ButtonProps> = ({ text, icon, bg, textSize, onclick }) => {

  return (
    <div onClick={onclick ? () => onclick() : () => { }}
      className="w-fit drop-shadow-md flex items-center rounded-full bg-[#EA5958] px-1 py-1 text-[#FFFCFF] transition ease-in-out hover:scale-110 duration-200"
      style={bg ? { backgroundColor: bg } : {}}
    >
      {icon ? <div className="p-1 rounded-full bg-[#FACA62] text-black" dangerouslySetInnerHTML={{ __html: icon }} /> : null}
      {textSize
        ? textSize == 'sm'
          ? <div className='px-2 text-sm'>{text ?? ''}</div>
          : textSize == 'md'
            ? <div className='px-2 text-md'>{text ?? ''}</div>
            : <div className='px-2 text-lg'>{text ?? ''}</div>
        : <div className='px-2'>{text ?? ''}</div>
      }

    </div>
  );
}

export default Button;