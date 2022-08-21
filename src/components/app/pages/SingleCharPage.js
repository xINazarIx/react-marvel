import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMarvelServices from "../../../services/MarvelService";
import setContent from "../../utils/setContent";

import './singleComicPage.scss';


const CharPage = () => {

  const [char, setChar] = useState(null)
  const {charId} = useParams()
  const {process, setProcess, getCharacter, cleanError} = useMarvelServices()

  useEffect(() => {
    onCharLoad()
  }, [])

  const onCharLoad = () => {
    getCharacter(charId).then(setChar).then(() => setProcess('confirmed'))
  }

  // const loader = loading ? <Loader /> : null;
  // const errorMessage = error ? <ErrorMessage/> : null;
  // const content = char != null ? <View name={char.name} description={char.description} img={char.thumbnail}/> : null;

  return (
    <>
      {setContent(process, View, char)}
    </>
  )
}


const View = ({data}) => {

  const {name, description, thumbnail} = data

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__char-img"/>
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>  
  )
}

export default CharPage