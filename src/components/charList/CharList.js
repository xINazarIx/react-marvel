import { useState, useEffect, useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CharItem from '../CharItem/CharItem';
import Loader from '../Common/loader/Loader.js';
import ErrorMessage from '../Common/errorMessage/ErrorMessage';

import './charList.scss';
import useMarvelService from '../../services/MarvelService.js';

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

const  CharList = (props) => {

    const {process, setProcess, getAllCharacters} = useMarvelService()
    const [charList, setCharList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)


    useEffect(() => {
        onRequset(offset, true)
    }, [])


    const onRequset = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset).then(onCharListLoaded).then(() => setProcess('confirmed'))
    }

    const onCharListLoaded = (newCharList) => {

        let ended = false;

        if(newCharList.length < 9){
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList])
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
        setNewItemLoading(false)
    }

    
    const cardsRefs = useRef([])

    const setCardsRef = (elem) => {
        cardsRefs.current.push(elem)
    }

    const onCharSelected = (id, target) => {
        props.onCharSelected(id)

        cardsRefs.current.forEach(elem => {
            if(elem != null){
                elem.classList.remove('char__item_selected')
                target.classList.add('char__item_selected')
            }
        }) 
    }

  
    const elements = charList.map((item,i) => <CSSTransition key={item.id} timeout={300} classNames='char'>
                                                <CharItem
                                                    id={item.id} name={item.name} 
                                                    img={item.thumbnail}
                                                    setCardsRef={setCardsRef}
                                                    onCharSelected={onCharSelected}
                                                    /> 
                                                </CSSTransition>);


    // const loader = loading && !newItemLoading ? <Loader /> : null;
    // const errorMessage = error ? <ErrorMessage /> : null;
    // const content = <View elements={elements}/>


    return (
        <div className="char__list">

            {setContent(process, View, elements, newItemLoading)}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequset(offset, false)}
                style={{'display': charEnded ? 'none' : 'block'}}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
}



const View = ({data}) => {

    return (
        <ul className="char__grid">
            <TransitionGroup component={null}>
                {data}
            </TransitionGroup>
        </ul>
    );
};



export default CharList;
