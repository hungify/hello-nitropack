export default eventHandler((event) => {
  return {
    status: 200,
    body: {
      message: 'Hello Nitro!, This is a TMDB API proxy.',
    },
  }
})
