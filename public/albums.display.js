var titles = $("#titles").text().split(';,');  titles[titles.length - 1] = titles[titles.length - 1].replace(';', '');
var artists = $("#artists").text().split(';,');  artists[artists.length - 1] = artists[artists.length - 1].replace(';', '');
var covers = $("#covers").text().split(','); 
var ids = $("#ids").text().split(','); 

const token = $("#token").text();

for(var i = 0; i < titles.length; i++) {
    var $h5 = $('<h5>');
    $h5.html(titles[i]);
    
    var $a = $('<a>', { 'href': '/music/showPretty/' + ids[i] + '?access_token='+ token });
    
    var $img = $('<img>', { 'src': covers[i] });
    $a.append($img);
    var $h3 = $('<h3>');
    $h3.html(artists[i]);

    
    var $div_col = $('<div>', { 'class': 'col-4 py-3'});
    $div_col.append($h5, $a, $h3);
    $('.row').append($div_col); 
}