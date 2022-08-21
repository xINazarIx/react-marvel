import useHttp from "../hooks/http.hook";

const useMarvelServices = () => {
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=6ac1776b504a62f059d0ae9bceebf3db';
  const _baseOffset = 210;
  const _baseComicsOffset = 10;

  const {request, clearError, process, setProcess} = useHttp()

  const getCharacter = async (id) => {
    const resolve = await request(`${_apiBase}/characters/${id}?${_apiKey}`)
    return _transformCharacter(resolve.data.results[0])
  }

  const getCharacterByName = async(name) => {
    const resolve = await request(`${_apiBase}/characters?name=${name}&${_apiKey}`)
    return resolve.data.results.length === 0 ? undefined : _transformCharacter(resolve.data.results[0])
  }

  const getAllCharacters = async (offset = _baseOffset) => {
    const resolve = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
    return resolve.data.results.map(_transformCharacters)
  }

  const getComics = async (offset = _baseOffset) => {
    const resolve = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)

    return resolve.data.results.map(_transformComics)
  }

  const getComic = async (id) => {
    const resolve = await request(`${_apiBase}comics/${id}?${_apiKey}`)
    return _transformComic(resolve.data.results[0])
  }

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homePage: char.urls[0].url,
      wiki: char.urls[0].url,
      comics: char.comics.items
    }
  }

  const _transformCharacters = (char) => {
    return {
      id: char.id,
      name: char.name,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
    }
  }

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      url: comics.urls[0].url,
      img: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
      desc: comics.title,
      price: comics.prices[0].price
    }
  }

  const _transformComic = (comic) => {
    return {
      id: comic.id,
      title: comic.title,
      desc: comic.description,
      thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      pageCount: comic.pageCount,
      price: comic.prices[0].price
    }
  }

  return {clearError, process, setProcess, getCharacter, getCharacterByName, getAllCharacters, getComics, getComic}
}

export default useMarvelServices