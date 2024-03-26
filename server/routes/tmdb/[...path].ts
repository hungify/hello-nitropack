import { hash } from 'ohash'

const TMDB_API_URL = 'https://api.themoviedb.org/3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const params = event.context.params
  const url = getRequestURL(event).href

  console.log('Fetching TMDB API', {
    url,
    query,
    params,
  })

  const config = useRuntimeConfig()
  if (!config.tmdb.apiKey) throw new Error('TMDB API key is not set')
  const hashKey = hash([url, params])
  try {
    return $fetch(event.context.params!.path, {
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
  } catch (e) {
    const status = e?.response?.status || 500
    setResponseStatus(event, status)
    return {
      error: String(e)?.replace(config.tmdb.apiKey, '***'),
    }
  }
})
