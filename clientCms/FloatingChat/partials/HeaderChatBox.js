import { width } from '@mui/system'
import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledBadge } from 'Styles/style'
import { Button, IconButton, Avatar, Badge } from '@mui/material'
import { ReactComponent as WriteIcon } from '../../../Assets/cms/write-text.svg'

const HeaderChatBox = ({ profileStatus, onClick }) => {

    const generateInitial = (name) => {
        const [first, mid, last] = name.split(" ")
        if(last) return  first[0] + mid[0] + last[0]
        else if (first && mid) return  first[0] + mid[0]
        else return first[0]
    }
   
  return (
    <>
    <div 
    onClick={() => onClick && onClick()}
    className='fc-header-stick'
    >
        <div className='row'>
            <div className='col-md-5'>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    {/* <Avatar sx={{width: 48, height: 48}}>{generateInitial(profileStatus.personName)}</Avatar> */}
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
            <KeyboardArrowDownIcon />
        </div>
    </div>
    < hr style={{marginTop: '4.6rem'}}/>
    </>
  )
}

export default HeaderChatBox