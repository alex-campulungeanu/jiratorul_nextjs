import React from 'react'

interface CardWrapperProps {
  color?: string,
  background?: string,
  children: JSX.Element
}

const CardWrapper: React.FC<CardWrapperProps> = ({children, background='white', color='#e64980'}) => { //#0ca678
  return (
    <div style={{width: '100%', padding: '20px', background: `${background}`,  borderRadius: '5px', borderTop: `solid ${color} 6px`}}>
      {children}
    </div>
  )
}

export default CardWrapper
