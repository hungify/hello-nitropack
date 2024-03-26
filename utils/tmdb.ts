import { hash } from 'ohash'
import { QueryObject } from 'ufo'

const TMDB_API_URL = 'https://api.themoviedb.org/3'

export const cachedTMDB = defineCachedFunction(
  async ({ path, query }: { path: string; query: QueryObject }) => {
    const config = useRuntimeConfig()

    return $fetch(path, {
      baseURL: TMDB_API_URL,
      params: {
        api_key: config.tmdb.apiKey,
        language: 'en-US',
        ...query,
      },
      headers: {
        Accept: 'application/json',
      },
    })
  },
  {
    maxAge: 60 * 60,
    name: 'tmdb',
    getKey: ({ path, query }) => hash({ path, query }),
  },
)
