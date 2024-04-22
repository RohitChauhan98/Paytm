import ptmLogo from "../assets/ptm.png";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors"
import Search from "../assets/search.svg"
import { useNavigate } from 'react-router-dom';


import PropTypes from 'prop-types';

export const Header = (props) =>{
    const navigate = useNavigate();
    return <div className="flex justify-between lg:justify-around p-5 bg-slate-200">
    <img onClick={() => {navigate('/dashboard')}} className="h-7"  src={ptmLogo} alt="PayTM Logo" />
    <div className="flex">
        <div className="mr-5" onClick={() => {
            navigate('/searchUser');
        }}>
        <img className="w-10 h-10" src={Search} alt="" />
        </div>
    <Avatar sx={{ bgcolor: deepOrange[500] }}>{props.name[0]}</Avatar>
    </div>
</div>
}

Header.propTypes = {
    name: PropTypes.string.isRequired,
}