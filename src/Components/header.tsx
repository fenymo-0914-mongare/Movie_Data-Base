
const Header = () => {
  return (
    <>
      <header className="min-w-dvw w-full flex flex-col justify-center items-center py-4 text-white text-2xl font-bold">
        <img src='/hero.png' alt="hero banner" className="w-70 h-50" />
        <h1 className="text-center text-3xl text-pretty">
          Search your favourite <span className="bg-linear-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">Movies
            </span> and <span className="bg-linear-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">TV Shows</span>
        </h1>
      </header>
    </>
  )
}

export default Header
