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

const FavouriteList = (props) => {
  const FavouriteComponent = props.favouriteComponent;
  const [style, set] = useSpring(() => ({
    transform: "perspective(350px) rotateY(0deg)"
  }));

  const bind = useScroll(event => {
    set({
      transform: `perspective(350px) rotateY(${
        event.scrolling ? clamp(event.delta[0]) : 0
      }deg)`
    });
  });
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
                    className='overlay d-flex align-items-center justify-content-center'>
                <span>{anime.title}</span>
                <button onClick={() => props.handleFavouritesClick(anime)} type="button" style={{borderRadius: '15px'}} class="btn btn-dark ml-3" data-tip data-for="addTip">
                  <svg xmlns="http://www.w3.org/2000/svg"
                         width="15"
                         height="15" 
                         fill="currentColor" 
                         class="bi bi-trash-fill" 
                         viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                  </svg>
                </button>
                <FavouriteComponent />
					  </div>
          </div>
        ))
      }
      </div>
      </>
  );
};

export default FavouriteList;