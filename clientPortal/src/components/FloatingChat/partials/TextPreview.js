import React from 'react'
import { Avatar } from '@mui/material'

const TextPreview = ({data}) => {
  console.log(data)
  return (
    <div className='fc-text-preview'>
        <div className='fc-avatar-chat'>
            <Avatar sx={{width: 42, height: 42}}>{data.initial}</Avatar>
        </div>
        <div className='fc-text-wrapper'>
          <h5 className='m-1'>{data.titleName}</h5>
          <p className='m-0 p-1'>
            {data.text}
          </p> 
        </div>

          <span className=''>10:40</span>
        
    </div>
  )
}

export default TextPreview