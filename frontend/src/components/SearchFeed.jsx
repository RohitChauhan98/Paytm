import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import "./SearchFeed.css"


function SearchFeed(props) {

    return (
        <div className='feed'>
            <div style={{display:"flex", width:"200px", alignItems:"center"}}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{props.firstName[0]}</Avatar>
                <h3 style={{margin:"0px", marginLeft:"15px"}}>{props.firstName} {props.lastName}</h3>
            </div>
            <Stack>
                <Button variant="contained" endIcon={<SendIcon />} onClick={props.click}>
                    Pay
                </Button>
            </Stack>
        </div>
    )
}

export default SearchFeed;