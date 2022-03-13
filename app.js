// https://api.lyrics.ovh/suggest/let-her-go

// https://api.lyrics.ovh/v1/Passenger/let-her-go
document.getElementById('searchInput').addEventListener('keypress', function(event){
    if(event.keyCode === 13){
        document.getElementById('button-addon2').click();
    }
})

function searchBtn(){
    const searchInput = document.getElementById('searchInput').value;

    const url = `https://api.lyrics.ovh/suggest/${searchInput}`

    fetch(url)
    .then(res => res.json())
    .then(data => showSongs(data.data))

    const showSongs = (songs) =>{
        
        const contentDiv = document.querySelector('.content-sectin');
        // contentDiv.innerHTML = '';
        let content = '';
        songs.map(song =>{
            content += `
            <div id="cotent-box">
        <h1>${song.title}</h1>
    <div class="content">
        <div class="left">
            <h6>Artist Name: <span>${song.artist.name}</span></h6>
            <h6>Album Name: <span>${song.album.title}</span></h6>
            <audio src="${song.preview}" controls></audio>
        </div>
        <div class="right">
            <button onclick="searchLyric('${song.artist.name}', '${song.title}')" type="button" class="btn btn-danger" id="lyric-button">Get Lyrics</button>
        </div>
    </div>

    </div>

      ` 
            contentDiv.innerHTML = content;
        })
    }
}


function searchLyric(artist, song){

    document.querySelector('.lyricsDiv').style.display = 'block'

    const url =`https://api.lyrics.ovh/v1/${artist}/${song}`

    fetch(url)
    .then(res => res.json())
    .then(data => showLyrics(data.lyrics))

    const showLyrics = (lyric) =>{
        if(lyric != undefined){
            const contentDiv = document.querySelector('.lyricsDiv');
        let content = `
        <div class="lyricsDisplay">
            <div class="lyrics">
                <i onclick="cross()" class="bi bi-x-square-fill " id="cross"></i>
                <p>${lyric}</p>
            </div>
        </div>
        `
         contentDiv.innerHTML = content;
        }
        else{
            alert("Not Found")
        }
    }

}


function cross(){
    document.querySelector('.lyricsDiv').style.display = 'none';
}