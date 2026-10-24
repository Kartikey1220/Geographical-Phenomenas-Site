import React from 'react'

function Bar({value , label, color}) {
   const percentage = Math.min(Math.max(value, 0), 100)
  return (
    <>
    <div className=' w-60'>
        <div className='font-bold font-sans text-white'>{label}</div>
        <div className="h-4 w-full rounded-xl bg-gray-400" style={{width:`${percentage}%`, backgroundColor: color, transition: 'width 0.3s ease'}}></div>
    </div>
    </>
  )
}

export default Bar