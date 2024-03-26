import { hash } from 'ohash'
import { cachedTMDB } from '../../../utils/tmdb'

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
  try {
    return cachedTMDB({
      path: params.path,
      query,
    }).catch(() => 0)
  } catch (e) {
    const status = e?.response?.status || 500
    setResponseStatus(event, status)
    return {
      error: String(e)?.replace(config.tmdb.apiKey, '***'),
    }
  }
})
