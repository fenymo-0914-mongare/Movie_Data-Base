import { useAtomValue } from 'jotai'
import { searchResultsAtom, isLoadingAtom, searchQueryAtom } from '../States/TSAtoms'
import type { SearchResult } from '../States/TSAtoms'
import { Spinner } from 'flowbite-react'


const RenderResults = () => {
    const searchQuery = useAtomValue(searchQueryAtom)
    const searchResults = useAtomValue(searchResultsAtom)
    const isLoading = useAtomValue(isLoadingAtom)

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <Spinner color="pink" size="xl" aria-label="Loading" />
      </div>
    )
  }

  const hasResults = Array.isArray(searchResults) && searchResults.length > 0
  const isSearching = searchQuery.trim() !== ''

  return (
    <>
      {hasResults ? (
        <div className="w-full flex justify-center items-center py-4">
          <h1 className="text-center bg-linear-to-r from-purple-500 to-pink-500 p-2 text-transparent bg-clip-text text-2xl font-bold mb-1">
            {isSearching ? `Search Results for "${searchQuery}"` : 'Popular Movies and TV Shows'}
          </h1>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center py-12">
          <p className="text-lg font-bold bg-linear-to-r from-purple-500 to-pink-500 p-2 text-transparent bg-clip-text">
            {isSearching ? `No results found for "${searchQuery}"` : 'Search results will appear here.'}
          </p>
        </div>
      )}
      <section className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 mx-2.5">
        {searchResults.map((result: SearchResult) => (
          <div key={`${result.media_type}-${result.id}`} className="bg-slate-800 rounded-lg overflow-hidden">
            <img src={result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : '/no-movie.png'} alt={result.title} 
            className="w-full h-45 cursor-pointer" />
        <div className="p-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h2 className="text-white text-md font-bold text-pretty">{result.title}</h2>
            <span className="text-xs uppercase tracking-wider text-slate-400">{result.media_type}</span>
          </div>
          <div className="flex justify-items-center gap-0.5 items-center text-white">
            <div className="flex items-center gap-0.5 justify-center">
              <img src="/star.svg" alt="rating" className="w-5 h-5 cursor-pointer" />
              <p className="text-base">{result.vote_average ? result.vote_average.toFixed(1) : '-'}</p>
            </div> 
              <span className="text-white text-lg text-center">&bull;</span>
            <p className="text-sm">{result.release_date ? result.release_date.split('-')[0] : '-'}</p>
              <span className="text-white text-lg text-center">&bull;</span>
            <p className="text-sm">{result.original_language ? result.original_language.toUpperCase() : '-'}</p>
          </div>
          
        </div>
      </div>
    ))}
      </section>
    </>
  )
}

export default RenderResults

