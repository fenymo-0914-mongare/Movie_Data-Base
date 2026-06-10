import { useAtomValue } from 'jotai'
import { searchResultsAtom } from '../States/TSAtoms'

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
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
        {searchResults.map((result: MovieResult) => (
          <div key={result.id} className="bg-slate-800 rounded-lg overflow-hidden">
            <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt={result.title} 
            className="w-full h-45 cursor-pointer" />
            <div className="p-4">
              <h2 className="text-white text-lg font-bold">{result.title}</h2> 
              <div className="flex justify-items-center items-center text-white">
                <div className="flex items-center justify-center">
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

