import defaultPoster from "./assets/defaultPoster.jpg";

export const createImgURL = (url) => {
  return url ? "https://image.tmdb.org/t/p/w500" + url : defaultPoster;
};
