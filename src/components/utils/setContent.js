import Loader from '../Common/loader/Loader.js';
import Skeleton from '../skeleton/Skeleton.js';
import ErrorMessage from '../Common/errorMessage/ErrorMessage.js';


const setContent = (process, Component, data) => {
  switch (process) {
    case 'waiting': {
      return <Skeleton />;
      break;
    };
    case 'loading': {
      return <Loader />;
      break;
    };
    case 'confirmed': {
      return <Component data={data} />;
      break;
    };
    case 'error': {
      return <ErrorMessage />;
      break;
    }
    default: {
      throw new Error('Unxepected process state');
    }
  }
}

export default setContent;
