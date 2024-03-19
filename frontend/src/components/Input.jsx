import PropTypes from 'prop-types';

function Input(props) {
    return (
        <div className="inputs">
            <label htmlFor="firstname">{props.inputTitle}</label>
            <input 
                type={props.inputTitle === "Password"? "password":"text"}
                onChange={(e) => {
                    props.stateUpdater(e.target.value);
                }}
            />
        </div>
    );
}

Input.propTypes = {
    inputTitle: PropTypes.string.isRequired,
    stateUpdater: PropTypes.func.isRequired,
};

export default Input;
