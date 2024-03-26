//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  routeRules: {
    "/**": { cors: true },
    // TODO: enable when Nitro on Vercel missing query bug is fixed
    // '/tmdb/**': { swr: true },
  },
  runtimeConfig: {
    tmdb: {
      apiKey: process.env.TMDB_API_KEY || "",
    },
  },
});
