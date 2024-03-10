import React from 'react';


interface ButtonProps {
  text?: string;
  icon?: string;
  bg?: string;
  textSize?: 'sm' | 'md' | 'lg' | string
  bgIcon?: string;
  onclick?: () => void
  icPosition?: 'left' | 'right'
}

const Button: React.FC<ButtonProps> = ({ text, icon, bg, textSize, bgIcon, icPosition ,onclick }) => {

  return (
    <div onClick={onclick ? () => onclick() : () => { }}
      className="cursor-pointer w-fit drop-shadow-md flex items-center rounded-full bg-[#EA5958] px-1 py-1 text-[#FFFCFF] transition ease-in-out hover:scale-110 duration-200"
      style={bg ? { backgroundColor: bg } : {}}
    >
      {icPosition === undefined && icon ? <div style={bgIcon? {backgroundColor: bgIcon} : {backgroundColor: '#FACA62'}} className="p-1 rounded-full text-black" dangerouslySetInnerHTML={{ __html: icon }} /> : null}
      {icPosition && icPosition =='left' && icon ? <div style={bgIcon? {backgroundColor: bgIcon} : {backgroundColor: '#FACA62'}} className="p-1 rounded-full text-black" dangerouslySetInnerHTML={{ __html: icon }} /> : null}
      {text
        ? textSize
          ? textSize == 'sm'
            ? <div className='px-2 text-sm'>{text ?? ''}</div>
            : textSize == 'md'
              ? <div className='px-2 text-md'>{text ?? ''}</div>
              : textSize == 'lg'
                ? <div className='px-2 text-lg'>{text ?? ''}</div>
                : <div className={'px-2 py-1 text-[' + textSize + ']'}>{text ?? ''}</div>
          : <div className='px-2'>{text ?? ''}</div>
        : null
      }
      {icPosition && icPosition =='right' && icon ? <div style={bgIcon? {backgroundColor: bgIcon} : {backgroundColor: '#FACA62'}} className="p-1 rounded-full text-black" dangerouslySetInnerHTML={{ __html: icon }} /> : null}

    </div>
  );
}

export default Button;