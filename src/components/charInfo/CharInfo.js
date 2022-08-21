import { useEffect, useState } from 'react';
import useMarvelServices from '../../services/MarvelService';
import setContent from '../utils/setContent';

import './charInfo.scss';



const CharInfo = (props) => {

  const [char, setChar] = useState(null)
  const {clearError, process, setProcess, getCharacter} = useMarvelServices()

  useEffect(() => {
    udpdateChar();
  }, [props.charId])

  const udpdateChar = () => {
    const { charId } = props;

    if (!charId) {
      return;
    }

    clearError()
    getCharacter(charId).then(onCharLoaded).then(() => setProcess('confirmed'));

  };

  const onCharLoaded = (char) => {
    setChar(char)
  };


  return (
    <div className="char__info">
      {setContent(process, View, char)}
    </div>
  );
}

const View = ({ data }) => {
    
    const {name, description, thumbnail, homepage, wiki, comics} = data
    let styleImg = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {'objectFit': 'contain'} : {'objectFit': 'cover'}

    return (
        <div>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={styleImg}/>
                <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                    </a>
                </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">

                {
                    comics.length === 0 ? "There is no comics with this character"
                    : comics.map((item, i) => {return (
                        <li key={i} className="char__comics-item">{item.name}</li>
                    )}).splice(0, 10)
                }


            </ul>
        </div>
    );
};

export default CharInfo;
