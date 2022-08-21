import './errorMessage.scss';
import img from './error.gif';

const ErrorMessage = () => {
  return (
    <img className="error__img"  src={img} alt="Error img"/>
  );
};

export default ErrorMessage;