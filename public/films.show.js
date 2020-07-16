function doit() {
    var str_titles = document.querySelector('#titles').innerHTML;
    var str_years = document.querySelector('#years').innerHTML;
    var str_genres = document.querySelector('#genres').innerHTML;
    var str_posters = document.querySelector('#posters').innerHTML;

    var titles = str_titles.split(',');
    var years= str_years.split(',');
    var genres = str_genres.split(';,');
    var posters = str_posters.split(',');


    genres[genres.length - 1] = genres[genres.length - 1].replace(';', '');

   
    $('.row').css('visibility', 'visible');
   

    for(var i = 0; i < titles.length; i++) {
        var $div_col = $("<div>", {
            'class': 'col-3 py-4'
        });

        var $div_card = $("<div>", {
            'class': 'card',    
        });

        var $img_top = $('<img>', { 'class': 'card-img-top' });
        $img_top.attr('src', posters[i]);

        var $div_cardbody = $('<div>', { 'class': 'card-body'});

        var $h5 = $('<h5>', { 'class': 'card-title' });
        $h5.html(titles[i] + ' (' + years[i] + ')');


        var $p = $('<p>', { 'class': 'card-text' });
        $p.html(genres[i]);

        $div_cardbody.append($h5, $p);

        $div_card.append($img_top, $div_cardbody);

        $div_col.append($div_card);

        $('.row').append($div_col);

        $('#show').css('display', 'none');
    }

    
}


document.querySelector("#show").addEventListener("click", doit);