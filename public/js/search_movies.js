$(document).on('keyup', '#searchInput', () => {
    const content = $("#searchInput").val().trim();
    $('#searchBtn').prop('disabled', content === '');
});

$('#searchBtn').on('click', (e) => {
    const $searchBtn = $(e.target);
    $searchBtn.html($loader);
    $searchBtn.attr('disabled', true);
    $movieListContainer.html('');

    $.ajax({
        type: 'GET',
        url: '/v1/movies/search',
        data: {
            Title: $("#searchInput").val().trim()
        },
        success: (data => {
            console.log('Data:', data);
            $.each(data['data'], (_idx, movie) => {
                const movieItemHtml = getMovieItemHtml(movie);
                $movieListContainer.append(movieItemHtml);
            });
        }),
        error: (error) => {
            const errorMsg = error.responseJSON['message'];
            alert(errorMsg);
        },
        complete: () => {
            console.log('Completed');
            $searchBtn.text('Search');
            $searchBtn.attr('disabled', false);
        }
    });
});

$(document).on('click', '.fav-btn', (e) => {
    const favBtn = $(e.target).closest('.fav-btn');
    const movieItem = $(e.target).closest('.movie-item');
    const movieId = movieItem.attr('data-id');
    const temp = favBtn.html();
    favBtn.html($loader);

    $.ajax({
        type: 'POST',
        url: `/v1/movies/${movieId}/favorite/toggle`,
        success: (({ favorited }) => {
            console.log(favorited ? $favoriteIcon : $unfavoriteIcon);
            favBtn.html(favorited ? $favoriteIcon : $unfavoriteIcon);
        }),
        error: (error) => {
            favBtn.html(temp);
            const errorMsg = error.responseJSON['message'];
            alert(errorMsg);
        },
        complete: () => {
            console.log('Completed');
        }
    });
});
