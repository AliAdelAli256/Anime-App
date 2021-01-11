import React from 'react';

const SearchAnime = (props) => {
	return (
        <div className='col col-sm-4'>
          <input
            className='form-control'
            value={props.value}
            onChange={(event) => props.setSearchValue(event.target.value)}
            placeholder='Search For an Anime...'
          ></input>
        </div>
	);
};

export default SearchAnime;