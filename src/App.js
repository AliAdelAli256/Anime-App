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
  const [darkMode, setDarkMode] = useState(false);

const getAnimeRequest = async(searchValue) => {
        //const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjllZTMyZDVhMDFiYTU1ZjhhYTZkY2U1NjQzMGIwNDMzZmY0OWFhY2UzOWEwNDU1ZDIyNTMwYTUwNzBmZTNkZWY0ZjI0ZDE4YTMzNDM5ZWVjIn0.eyJhdWQiOiIxZDBjOWQwNjc1NDEwZTlkOTE1NmMzNjM5ODlmYWU5OSIsImp0aSI6IjllZTMyZDVhMDFiYTU1ZjhhYTZkY2U1NjQzMGIwNDMzZmY0OWFhY2UzOWEwNDU1ZDIyNTMwYTUwNzBmZTNkZWY0ZjI0ZDE4YTMzNDM5ZWVjIiwiaWF0IjoxNjA4OTkzMTU0LCJuYmYiOjE2MDg5OTMxNTQsImV4cCI6MTYxMTY3MTU1NCwic3ViIjoiMTExMzYzOTYiLCJzY29wZXMiOltdfQ.rxy6O174bl63J1_CMCPQQ1C-5TiQhCX54euYfVue7LGHT97u2q-wc3DZ1_EdW82iNWo185EwggkibdseDEQ9VZc9whct-Shg_mvbsZPffYWVNm65YQpPIJJLsr6fJ9VK9YHctz1r882PshB-k0vDdGmobaqroxTBKsepkIFupAoBmw6KWLxl27-mKeErrrOcaotjyGBg8zqFgxeby_9kaJ241NPrpeVaww5N_FmkkFgnmOE5LTVbvYeJ2yKrH9uJkBlzSErCHCI21cUKLiDatBdbp2htWwPJIvla1Iv7YRs050ciPqoNVcEZWM7ICiI6rTQ3OHLMVeK_zQFNBFRKmg';
        //const proxy = 'https://cors-anywhere.herokuapp.com/'; 
        //const url = `${proxy}https://api.myanimelist.net/v2/anime?q=${searchValue}`;
        const url = `https://api.jikan.moe/v3/search/anime?q=${searchValue}order_by=name&limit=10`;

        const response = await fetch(url /*, {
          headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }*/);
        const responseJson = await response.json();

        if (responseJson.results) {
                setAnimes(responseJson.results);
        }
};

useEffect(() => {
  if(searchValue.length >= 3) {
    getAnimeRequest(searchValue);
  }
  else if (searchValue === '') {
    setAnimes([]);
}
  
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
        const favouriteList_without_duplicate = newFavouriteList.filter(function(elem, pos) {
          return newFavouriteList.indexOf(elem) === pos;
      });
        setFavourites(favouriteList_without_duplicate);
        saveToLocalStorage(favouriteList_without_duplicate);
};

const removeFavouriteAnimes = (anime) => {
        const newFavouriteList = favourites.filter(
          (favourite) => favourite.mal_id !== anime.mal_id );

        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
};

  return ( 
    <div className={darkMode ? "dark-mode dark-input" : "light-mode light-input"}>
       <div className="container">
                <span style={{ fontSize: 30}}>☀️</span>
                <div className="switch-checkbox">
                  <label className="switch">
                    <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
                    <span className="slider round"> </span>
                  </label>
                </div>
                <span style={{ fontSize: 30 }}>🌑</span>
       </div>
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
    </div>
  );
}

export default App;