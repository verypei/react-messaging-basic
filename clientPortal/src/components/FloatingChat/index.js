import React from 'react';
import StickDisplay from './partials/StickDisplay';
import ChatBox from './partials/ChatBox';

const FloatingChat = ({profileStatus}) => {
    console.log(profileStatus)
    const [visible, setVisible] = React.useState(false)
  
  return (
    <div className=''>
        {/* Chatbox */}
        <ChatBox 
        visible={visible}
        profileStatus={profileStatus} 
        onClick={() => setVisible(state => !state)} 
        />
        {/* Sticky chat display */}
        <StickDisplay
        onClick={() => setVisible(state => !state)} 
        profileStatus={profileStatus}
        visible={visible} 
        />
    </div>
  )
}

export default FloatingChat