import { useAtomValue } from 'jotai'
import { searchResultsAtom, isLoadingAtom } from '../States/TSAtoms'
import { Spinner } from 'flowbite-react'

type MovieResult = {
  id: number
  title: string
  release_date: string
  poster_path: string | null
  vote_average: number
  original_language: string
}

const RenderResults = () => {
    const searchResults = useAtomValue(searchResultsAtom)
    const isLoading = useAtomValue(isLoadingAtom)

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <Spinner aria-label="Loading" />
      </div>
    )
  }

  return (
    <>
      
      {searchResults.length === 0 ? (
         <div className="w-full flex justify-center items-center py-12">
           <p className="text-lg font-bold bg-linear-to-r from-purple-500 to-pink-500 p-2 text-transparent bg-clip-text">Your Results Will Appear Here.</p>
         </div>
       ) : (
          <div className="w-full flex justify-center items-center py-4">
            <h1 className="text-center bg-linear-to-r from-purple-500 to-pink-500 p-2 text-transparent bg-clip-text text-2xl font-bold mb-1">Search Results</h1>
        </div>
      )}
      <section className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 mx-2.5">
        {searchResults.map((result: MovieResult) => (
          <div key={result.id} className="bg-slate-800 rounded-lg overflow-hidden">
            <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt={result.title} 
            className="w-full h-45 cursor-pointer" />
        <div className="p-4">
          <h2 className="text-white text-lg font-bold">{result.title}</h2> 
          <div className="flex justify-items-center gap-0.5 items-center text-white">
            <div className="flex items-center gap-0.5 justify-center">
              <img src="/star.svg" alt="rating" className="w-5 h-5 cursor-pointer" />
              <p className="text-base">{result.vote_average.toFixed(1)}</p>
            </div> 
              <span className="text-white text-lg text-center">&bull;</span>
            <p className="text-sm">{result.release_date.split('-')[0]}</p>
              <span className="text-white text-lg text-center">&bull;</span>
            <p className="text-sm">{result.original_language.toUpperCase()}</p>
          </div>
          
        </div>
      </div>
    ))}
      </section>
    </>
  )
}

export default RenderResults

