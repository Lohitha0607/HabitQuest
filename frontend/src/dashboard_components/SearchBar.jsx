import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search Habits"
            className="p-2 mb-4 border w-full"
        />
    );
};

export default SearchBar;