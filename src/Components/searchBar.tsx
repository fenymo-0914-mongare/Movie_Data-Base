import React from 'react'
import { searchQueryAtom } from '../States/TSAtoms'
import { useAtom }from 'jotai'

const BASE_URL = 'https://api.themoviedb.org/3/search/movie?query='
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY
const API_OPS = {method: 'GET'}

const SearchBar = () => {

  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)

  const handleSearch = async () => {
    try {
      const response = await fetch(`${BASE_URL}${searchQuery}&api_key=${API_KEY}`, API_OPS)
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.status_message || 'Failed to fetch search results')
      }
      console.log('Search results:', data)
      if (data.results.length === 0) {
        console.log('No results found for:', searchQuery)
      }
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }

  React.useEffect(() => {
    if (searchQuery.trim() !== '') {
      handleSearch()
    }
  }, [searchQuery])

  return (
    <>
      <div className="flex items-center gap-2 text-white w-full max-w-md bg-slate-700 rounded-lg px-4 py-2 mb-4">
        <img src="/search.svg" alt="search icon" className="w-6 h-6" />
        <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        id="search-bar"
        placeholder="Search your Favorites Here..."
        className="bg-transparent outline-none border-none w-full"/>
      </div>
      <h1 className="text-white text-2xl font-bold mb-4">{searchQuery || "Search Results"}</h1>
    </>
  )
}

export default SearchBar
