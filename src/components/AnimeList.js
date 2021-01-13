import React from 'react';
import { animated , useSpring } from 'react-spring';
import { useScroll } from "react-use-gesture";

const clamp = (value , clampAt = 30) => {
  if (value > 0) {
    return value > clampAt ? clampAt : value;
  } else {
    return value < -clampAt ? -clampAt : value;
  }
};

const AnimeList = (props) => {
  const [style, set] = useSpring(() => ({
    transform: "perspective(400px) rotateY(0deg)"
  }));

  const bind = useScroll(event => {
    set({
      transform: `perspective(400px) rotateY(${
        event.scrolling ? clamp(event.delta[0]) : 0
      }deg)`
    });
  });
    const FavouriteComponent = props.favouriteComponent;
  return (
      <>
      <div className="container d-flex justify-content-start m-2" {...bind()}>
      {
        props.animes.map((anime, index) => (
          <div className = "image-container d-flex justify-content-start m-3" >
            <animated.div
            key={anime.image_url}
            className="image"
            style={{
              width: '220px',
              height: '300px',
              backgroundSize: 'cover',
              ...style,
              backgroundImage: `url(${anime.image_url})`
            }}
          />      
            <div 
                    onClick={() => props.handleFavouritesClick(anime)}
                    className='overlay d-flex align-items-center justify-content-center'>
              <FavouriteComponent />
					  </div>
          </div>
        ))
      }
      </div>
      </>
  );
};

export default AnimeList;