import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import PropTypes from 'prop-types';


    function User(props) {
        return (
                <div className='flex justify-center flex-col text-center' onClick={props.click}>
                    <div className='flex justify-center'>
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>{props.firstName[0]}</Avatar>
                    </div>
                    <h3 className='font-semibold pt-1'>{props.firstName}</h3>
                </div>
        )
    }

    User.propTypes = {
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        click: PropTypes.func.isRequired
    };
    

export default User;