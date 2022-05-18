import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context';
import './SearchField.css';

export const SearchField = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    state: { videos },
  } = useData();

  const navigate = useNavigate();

  const submitSearch = (text) => {
    if (text) {
      navigate(`/results?search_query=${encodeURIComponent(text)}`);
      setSearchTerm('');
    }
  };

  const searchSuggestions = () => {
    const suggestions = [];
    videos?.forEach((video) => {
      if (video.title.toLowerCase().includes(searchTerm?.toLowerCase())) {
        suggestions.push(
          <li
            className='suggestion-item'
            key={video._id}
            onClick={() => submitSearch(video.title)}
          >
            {video.title}
          </li>
        );
      }
    });
    return suggestions;
  };

  return (
    <div className='search'>
      <i className='fa-solid fa-magnifying-glass icon' />
      <input
        className='search-field'
        type='search'
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        placeholder='Search...'
        aria-label='Search Videos'
        onKeyUp={(e) => {
          if (e.key === 'Enter') submitSearch(searchTerm);
        }}
      />
      {searchTerm && (
        <ul className='search-suggestions'>
          {searchSuggestions().length > 0 ? (
            searchSuggestions()
          ) : (
            <li className='suggestion-item'>{`No Search results for: ${searchTerm}`}</li>
          )}
        </ul>
      )}
    </div>
  );
};
