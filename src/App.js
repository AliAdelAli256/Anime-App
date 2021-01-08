import React , { useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AnimeList from './components/AnimeList';
import AnimeListHeading from './components/AnimeListHeading';
import AnimeSearch from './components/SearchAnime';
import AddFavourite from './components/AddFavourites';
import RemoveFavourite from './components/RemoveFavourites';

const App = () => {
  const [animes, setAnimes] = useState( [] );
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

const getAnimeRequest = async(searchValue) => {
        const url = `https://api.jikan.moe/v3/search/anime?q=${searchValue}`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.results) {
                setAnimes(responseJson.results);
        }
};

useEffect(() => {
  getAnimeRequest(searchValue);
}, [searchValue] );

useEffect(() => {
  const animeFavourites = JSON.parse(
    localStorage.getItem('react-anime-app-favourites')
  );

  if (animeFavourites) {
    setFavourites(animeFavourites);
  }
}, []);

const saveToLocalStorage = (items) => {
  localStorage.setItem('react-anime-app-favourites', JSON.stringify(items));
};

const addFavouriteAnimes = (anime) => {
        const newFavouriteList = [...favourites, anime];
        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
};

const removeFavouriteAnimes = (anime) => {
        const newFavouriteList = favourites.filter(
          (favourite) => favourite.mal_id !== anime.mal_id );

        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
};

  return ( 
        <div className = 'container-fluid anime-app'>
          <div className = 'row d-flex align-items-center mt-4 mb-4'>
              <AnimeListHeading heading = 'Anime'/>
              <AnimeSearch searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
            <div className = 'row'>
              <AnimeList animes = {animes} handleFavouritesClick = {addFavouriteAnimes} favouriteComponent = {AddFavourite} />
            </div>
            <div className = 'row d-flex align-items-center mt-4 mb-4'>
              <AnimeListHeading heading = 'Favourites'/>
          </div>
          <div className = 'row'>
              <AnimeList animes = {favourites} handleFavouritesClick = {removeFavouriteAnimes} favouriteComponent = {RemoveFavourite} />
            </div>  
        </div>
  );
}

export default App;
