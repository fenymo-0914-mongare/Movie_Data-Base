import  { atom } from 'jotai'

export const searchQueryAtom = atom('')
export const searchResultsAtom = atom([])
export const errorAtom = atom('')
export const isLoadingAtom = atom(false)
export const debouncedSearchQueryAtom = atom('')