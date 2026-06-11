import  { atom } from 'jotai'

export type SearchResult = {
  id: number
  media_type: 'movie' | 'tvshow'
  title: string
  release_date: string
  poster_path: string | null
  vote_average: number
  original_language: string
}

export const searchQueryAtom = atom('')
export const searchResultsAtom = atom<SearchResult[]>([])
export const errorAtom = atom('')
export const isLoadingAtom = atom(false)
export const debouncedSearchQueryAtom = atom('')