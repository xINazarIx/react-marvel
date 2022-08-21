import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelServices from '../../../services/MarvelService';
import setContent from '../../utils/setContent';

import './singleComicPage.scss';


const SingleComicPage = () => {
  const { comicId } = useParams();
  const [ comic, setComic ] = useState(null);
  const { process, setProcess, getComic, clearError } = useMarvelServices();

  useEffect(() => {
    updateComic();
  }, [comicId]);
    

  const updateComic = () => {
    clearError();
    getComic(comicId).then(onComicLoaded).then(() => setProcess('confirmed'));
  };

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  // const ErrorMessage = error ? <ErrorMessage /> : null;
  // const Loader = loading ? <Spinner /> : null
  // const content = !(loading || error || !comic) ? <View comic={comic} /> : null 

  return (
    <>
      {setContent(process, View, comic)}
    </>
  );
};

const View = ({ data }) => {

  const {title, desc, pageCount, thumbnail, price} = data

  return (
    <div className="single-comic">
      <img src={thumbnail} alt="x-men" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{desc}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <div className="single-comic__price">{price}$</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
