import React, { useState } from 'react';
import { storageService } from '../..';

function Search() {
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');
  const handleSearch = (data) => {
    try {
      setError('');
      storageService
        .getBlogListCategaryWise([Query.search('category', [`${data}`])])
        .then((res) => {
          if (res) {
            setResult(res);
          }
        });
    } catch (error) {
      setError(error);
    }
  };
  return <div></div>;
}

export default Search;
