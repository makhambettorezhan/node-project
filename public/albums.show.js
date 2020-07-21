document.addEventListener('play', function(e){
    var audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len;i++){
        if(audios[i] != e.target){
            audios[i].pause();
        }
    }
}, true);

const secToMin = (sec) => {
    var minute = 0;
    while(sec >= 60) {
                        
        if(Math.floor(sec / 60) > 0) {
            sec -= 60;
            minute++;
        }
    }
    if(sec < 10) return minute + ':0' + sec;
    return minute + ':' + sec; 
}



var tracks = $("#tracks").text().split(';,');  tracks[tracks.length - 1] = tracks[tracks.length - 1].replace(';', '');
var previews = $("#previews").text().split(','); 
var durations = $('#durations').text().split(',');

      
for(var i = 0; i < tracks.length; i++) {
    var $p = $('<p>');
    var $audio = $('<audio>', {
        'controls': '',
        'src': previews[i]    
    });
    var $div_tracks = $('<div>');
    var $div_col = $('<div>', { 'class': 'col-3 py-3'});

    $p.html(tracks[i] + ' ' + secToMin(durations[i]));
    $div_tracks.append($p);
    $div_tracks.append($audio);
    $div_col.append($div_tracks);
    $('#tracks-display').append($div_col); 
}