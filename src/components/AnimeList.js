import React from 'react';

const AnimeList = (props) => {
    const FavouriteComponent = props.favouriteComponent;
  return (
      <>
      {
        props.animes.map((anime, index) => (
          <div className = "image-container d-flex justify-content-start m-3">
            <img className = "image" src = {anime.image_url} alt = 'anime'></img>
            <div 
                    onClick={() => props.handleFavouritesClick(anime)}
                    className='overlay d-flex align-items-center justify-content-center'>
              <FavouriteComponent />
					  </div>
          </div>
        ))
      }
      </>
  );
};

export default AnimeList;