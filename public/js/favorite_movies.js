const $loadmoreBtn = $('#loadmoreBtn');

$(document).ready(function () {
    loadFavorites();
});

$loadmoreBtn.on('click', () => {
    $loadmoreBtn.html($loader);
    $loadmoreBtn.attr('disabled', true);

    loadFavorites();
});

$(document).on('click', '.fav-btn', (e) => {
    const favBtn = $(e.target).closest('.fav-btn');
    const movieItem = $(e.target).closest('.movie-item');
    const movieId = movieItem.attr('data-id');
    const temp = favBtn.html();
    favBtn.html($loader);

    $.ajax({
        type: 'DELETE',
        url: `/v1/movies/favorites/${movieId}`,
        success: (() => {
            movieItem.remove();
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

function loadFavorites() {
    $.ajax({
        type: 'GET',
        url: '/v1/movies/favorites',
        data: {
            next_page_token: $movieListContainer.attr('data-nextPageToken')
        },
        success: (data => {
            console.log('Data:', data);
            $.each(data['data'], (_idx, movie) => {
                const movieItemHtml = getMovieItemHtml(movie);
                $movieListContainer.append(movieItemHtml);
            });

            $movieListContainer.attr('data-nextPageToken', data['next_page_token']);

            if (data['next_page_token']) {
                $loadmoreBtn.removeClass('d-none');
            } else {
                $loadmoreBtn.addClass('d-none');
            }
        }),
        error: (error) => {
            const errorMsg = error.responseJSON['message'];
            alert(errorMsg);
        },
        complete: () => {
            console.log('Completed');
            $loadmoreBtn.attr('disabled', false);
            $loadmoreBtn.html('Loadmore');
        }
    });
}
