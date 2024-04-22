import PropTypes from 'prop-types';

function Button(props) {
  return (
      <button className='h-10 mt-3 border-2 px-8 text-xl rounded-xl' onClick={props.click}>{props.buttonName}</button>
  );
}

Button.propTypes = {
  click: PropTypes.func.isRequired,
  buttonName: PropTypes.string.isRequired,
};

export default Button;
