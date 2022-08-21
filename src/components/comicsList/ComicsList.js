import { useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import useMarvelServices from '../../services/MarvelService';
import ComicsItem from '../ComicsItem/ComicsItem';
import Loader from '../Common/loader/Loader.js'
import ErrorMessage from '../Common/errorMessage/ErrorMessage';

import './comicsList.scss';


const setContent = (process, Component, data, newItemLoading) => {

    switch (process) {
      case 'waiting': {
        return <Loader />;
        break;
      };
      case 'loading': {
        return newItemLoading ? <Component data={data} /> : <Loader />;
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


const ComicsList = () => {
    
    const {process, setProcess, getComics} = useMarvelServices()
    const [comicsList, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(0)
  

    useEffect(() => {
        onRequset(true)
    }, [])

    const onRequset = (initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getComics(offset).then(onComicsLoaded).then(() => setProcess('confirmed'))
    }

    const onComicsLoaded = (newComicsList) => {
        setComicsList(comicsList => [...comicsList, ...newComicsList])
        setOffset(offset => offset + 8)
        setNewItemLoading(false)
    }

    const elements = comicsList.map((elem, i) => <CSSTransition key={i} timeout={300} classNames="comic">
        <ComicsItem
            id={elem.id} 
            url={elem.url} 
            img={elem.img} 
            desc={elem.desc} 
            price={elem.price}
                                                     
            />
    </CSSTransition>)

    // const loader = loading && !newItemLoading ? <Loader /> : null
    // const errorMessage = error ? <ErrorMessage/> : null
    // const content = <View elements={elements}/>
     
    return (
        <div className="comics__list">
            
            {setContent(process, View, elements, newItemLoading)}

            <button className="button button__main button__long" hidden={newItemLoading} onClick={() => onRequset(false)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const View = ({data}) => {
    return (
        <ul className="comics__grid">
            <TransitionGroup component={null}>
                {data}
            </TransitionGroup>
        </ul>
    )
}

export default ComicsList;

