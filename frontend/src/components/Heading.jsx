import PropTypes from 'prop-types';

function Heading(props) {
    return (
        <div>
            {props.size === "mid" ? (
                <h3>{props.title}</h3>
                ) : (
                    <h1 className="text-4xl text-center mt-10">{props.title}</h1>
            )}
        </div>
    );
}

Heading.propTypes = {
    size: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default Heading;