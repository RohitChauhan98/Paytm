import PropTypes from 'prop-types';

function Button(props) {
  return (
      <button onClick={props.click}>{props.buttonName}</button>
  );
}

Button.propTypes = {
  click: PropTypes.func.isRequired,
  buttonName: PropTypes.string.isRequired,
};

export default Button;
