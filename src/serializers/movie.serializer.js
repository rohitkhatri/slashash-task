/**
 * Serialize movie response
 */
module.exports = (item) => {
    return {
        id: item.imdbID,
        title: item.Title,
        year: item.Year,
        type: item.Type,
        poster_url: item.Poster,
        is_favorite: item.isFavorite,
    };
};
