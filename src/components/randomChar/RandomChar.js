import { useState, useEffect } from 'react';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import setContent from '../utils/setContent.js'

import './randomChar.scss';

const RandomChar = (props) => {

  const {process, setProcess, clearError, getCharacter} = useMarvelService();
  const [char, setChar] = useState({})

  useEffect(() => {
    updateChar();
  }, []);

  const updateChar = () => {
    clearError();
    let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id).then(onCharLoaded);
  };

 
  const onCharLoaded = (char) => {
    setChar(char);
    setProcess('confirmed');
  };



  const onLoadChar = () => {
    updateChar()
  }


    // const errorMessage = error ? <ErrorMessage/> : null
    // const loader = loading ? <Loader /> : null
    // const content = !(loading || error) ? <View char={char}/> : null

    return (
      <div className="randomchar">
        
        {setContent(process, View, char)}

        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main" onClick={onLoadChar}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
}

const View = ({data}) => {
    const {name, description, thumbnail, homePage, wiki} = data;
    let styleImg = thumbnail=== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {'objectFit': 'contain'} : {'objectFit': 'cover'}

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={styleImg}/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">{description === '' ? 'Description is lack' : description}</p>
            <div className="randomchar__btns">
                <a href={homePage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
        </div>
    );
};

export default RandomChar;
