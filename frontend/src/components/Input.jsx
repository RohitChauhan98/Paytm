import PropTypes from 'prop-types';

function Input(props) {
    return (
        <div className="flex flex-col mx-10 my-5">
            <label htmlFor="firstname">{props.inputTitle}</label>
            <input className='border-2 rounded-lg text-xl mt-1'
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
