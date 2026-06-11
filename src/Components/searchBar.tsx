import React from 'react'
import { searchQueryAtom,searchResultsAtom, errorAtom, isLoadingAtom, debouncedSearchQueryAtom } from '../States/TSAtoms'
import { useAtom, useSetAtom } from 'jotai'
import RenderResults from './results.tsx'
import {useDebounce} from 'react-use'

const BASE_URL = 'https://api.themoviedb.org/3/'
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY
const API_OPS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}

const normalizeResults = (items: any[]) => {
  return items
    .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
    .map((item) => ({
      id: item.id,
      media_type: item.media_type,
      title: item.title || item.name || 'Untitled',
      release_date: item.release_date || item.first_air_date || '',
      poster_path: item.poster_path ?? null,
      vote_average: item.vote_average ?? 0,
      original_language: item.original_language || '-'
    }))
}

const SearchBar = () => {

  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const setSearchResults = useSetAtom(searchResultsAtom)
  const [error, setError] = useAtom(errorAtom)
  const [, setIsLoading] = useAtom(isLoadingAtom)
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useAtom(debouncedSearchQueryAtom)

  useDebounce(() => setDebouncedSearchQuery(searchQuery), 1000, [searchQuery])

  const endPoint =
    searchQuery.trim() === ''
      ? 'trending/all/week?language=en-US&'
      : `search/multi?query=${encodeURIComponent(searchQuery)}&language=en-US&include_adult=false&`

  const handleSearch = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch(`${BASE_URL}${endPoint}api_key=${API_KEY}`, API_OPS)
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.status_message || 'Failed to fetch search results')
      }

      const normalized = normalizeResults(data.results || [])
      setSearchResults(normalized)
      if (normalized.length === 0) {
        setError(`No results found for: ${searchQuery}`)
      }
    } catch (error) {
      setError('Failed to fetch search results')
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    handleSearch()
  }, [debouncedSearchQuery])

  return (
    <>
      <div className="flex items-center gap-2 text-white w-full max-w-md bg-slate-700 rounded-lg px-4 py-2 mb-4 focus-within:ring-3 focus-within:ring-blue-500">
        <img src="/search.svg" alt="search icon" className="w-6 h-6" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setError('')}
          id="search-bar"
          placeholder="Search your Favorites Here..."
          className="bg-transparent outline-none border-none w-full"
        />
      </div>

      {error && (
        <p className="text-red-500 text-center font-bold bg-red-200 p-2 border border-red-500 rounded-sm w-[80%] mb-4">
          {error}
        </p>
      )}

      <RenderResults />
    </>
  )
}

export default SearchBar
