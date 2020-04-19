import axios from "axios";

const Params = {
  api_key: "844aae719266d28481b983a0d42e121e",
  language: "en-US",
};

const DetailParams = {
  api_key: "844aae719266d28481b983a0d42e121e",
  language: "en-US",
  append_to_response: "videos",
};

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export const tvApi = {
  topRated: () => api.get("tv/top_rated", { params: Params }),
  popular: () => api.get("tv/popular", { params: Params }),
  airingToday: () => api.get("/tv/airing_today", { params: Params }),
  getVideo: (id) => api.get(`tv/${id}/videos`, { params: Params }),
  tvDetail: (id) => api.get(`tv/${id}`, { params: DetailParams }),
  search: (term) =>
    api.get("search/tv", {
      params: {
        api_key: "844aae719266d28481b983a0d42e121e",
        language: "en-US",
        query: encodeURIComponent(term),
      },
    }),
};

export const movieApi = {
  nowPlaying: () => api.get("movie/now_playing", { params: Params }),
  upComing: () => api.get("movie/upcoming", { params: Params }),
  popular: () => api.get("movie/popular", { params: Params }),
  getVideo: (id) => api.get(`movie/${id}/videos`, { params: Params }),
  movieDetail: (id) => api.get(`movie/${id}`, { params: DetailParams }),
  search: (term) =>
    api.get("search/movie", {
      params: {
        api_key: "844aae719266d28481b983a0d42e121e",
        language: "en-US",
        query: encodeURIComponent(term),
      },
    }),
};
