import React, { useState } from 'react'
import { Button, IconButton, Avatar, Badge } from '@mui/material'
import { ReactComponent as WriteIcon } from '../../Assets/cms/write-text.svg'
import { StyledBadge } from '../../Styles/style.js'
import generateColor from '../helpers/generateRandomColors'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const StickDisplay = ({ profileStatus, onClick, visible }) => {

    const generateInitial = (name) => {
        const [first, mid, last] = name.split(" ")
        if(last) return  first[0] + mid[0] + last[0]
        else if (first && mid) return  first[0] + mid[0]
        else return first[0]
    }
    function stringAvatar(name) {
        return {
          sx: {
            bgcolor: generateColor(name),
            width: 48, 
            height: 48
          }
      }
    }
  return (
    <div 
    onClick={() => onClick && onClick()}
    className='fc-display-stick'
    style={{zIndex: visible ? '0' : '1'}}
    >
            {/* <div className='align-items-center justify-content-between'> */}
                <div className='row'>
                    <div className='col-md-5'>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            {/* <Avatar {...stringAvatar(profileStatus.personName)}>{generateInitial(profileStatus.personName)}</Avatar> */}
                        </StyledBadge>
                    </div>
                    <div className='col-md-7 p-1 d-flex gap-1 align-items-center'>
                        <h5 className='m-0'>Pesan</h5>
                        <span className='badge rounded-pill text-bg-danger'>5</span>
                    </div>
                </div>
                <div className='d-flex gap-2 align-items-center'>
                    <IconButton sx={{width: 40, height: 40}}>
                        <WriteIcon />
                    </IconButton>
                    <KeyboardArrowUpIcon />
                </div>
            {/* </div> */}
        </div>
  )
}

export default StickDisplay