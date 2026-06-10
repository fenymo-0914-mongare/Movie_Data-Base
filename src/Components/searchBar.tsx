
const SearchBar = () => {
  return (
    <>
      <div className="flex items-center gap-2 text-white w-full max-w-md bg-slate-700 rounded-lg px-4 py-2 mb-4">
        <img src="/search.svg" alt="search icon" className="w-6 h-6" />
        <input
        type="search"
        id="search-bar"
        placeholder="Search your Favorites Here..."
        className="bg-transparent outline-none border-none w-full"/>
      </div>
    </>
  )
}

export default SearchBar
