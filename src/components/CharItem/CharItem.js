import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './CharItem.scss';

const CharItem = (props) => {

  const setRef = (elem) => {
    props.setCardsRef(elem)
  }
  
  const onClicked = (e) => {
    props.onCharSelected(props.id, e.target.closest('.char__item'))
  }

  const onKeyPress = (e) => {
    if(e.key === 'Enter'){
      onClicked(e)
    }
  }

  const {id, name, img} = props
  let styleImg = img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {'objectFit': 'contain'} : {'objectFit': 'cover'}

  return (
    <li ref={setRef} className="char__item" tabIndex={0} onClick={onClicked} onKeyPress={onKeyPress}>
      <img src={img} alt='hero' style={styleImg}/>
      <div className="char__name">{name}</div>
    </li>
  );
};

export default CharItem;
