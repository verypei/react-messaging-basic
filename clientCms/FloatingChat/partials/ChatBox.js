import React from 'react'
import HeaderChatBox from './HeaderChatBox'
import { Box, Tab, FormControl, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TextPreview from './TextPreview';
import { dummyChatPreview } from '../helpers/dummyData'

const ChatBox = ({visible, profileStatus, onClick}) => {
    const [ value, setValue ] = React.useState('instalasi')
    const [search, setSearch] = React.useState(null)

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }
  

  return (
    <div 
    className='fc-chatbox' 
    style={{opacity: visible ? '1' : '0' }} 
    >
    {/* <StickDisplay profileStatus={profileStatus} />     */}
    <HeaderChatBox profileStatus={profileStatus} onClick={onClick} /> 
    <div className='fc-tabs'>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab  label="Instalasi" wrapped value="instalasi" />
                <Tab label="Privasi" wrapped value="privasi" />
            </TabList>
            </Box>
            <FormControl className='p-3' fullWidth variant="outlined">
                <OutlinedInput        
                    value={search}
                    onChange={handleSearch}
                    className="ta-form-search"
                    placeholder={"Search"}
                    startAdornment={
                        <InputAdornment position="end">
                            <SearchIcon  />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton disabled={!!!search} onClick={() => setSearch("")}>
                                <CloseIcon  />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            { dummyChatPreview.map((dummy) => 
                <TabPanel className='fc-tab-items' value={dummy.type}>
                    { dummy.data.map(data => {
                            return (
                                <TextPreview data={data}/>
                            )
                        })
                    }
                </TabPanel>
             )
                
            }
        </TabContext>
    </div>
    
    </div>
  )
}

export default ChatBox

