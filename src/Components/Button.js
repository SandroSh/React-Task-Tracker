import PropTypes from 'prop-types';

export const Button = ({color, text, onClick}) => {
  return (<button className="btn" style={{backgroundColor: color} } onClick={onClick} >{text}</button>);
}

Button.defaultProps = {
    color:'steelblue',
}

Button.propTypes = {
   color: PropTypes.string,
   text: PropTypes.string,
}


export default Button