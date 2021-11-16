const artistName=document.querySelector('input');
const button=document.querySelector('.search-bar');
button.onclick=loadTitle;
artistName.oninput=loadTitle;
const getLyricsContainer=document.querySelector('.search-result');
const singleLyric=document.getElementById('single-lyric');
const singleAlbum=document.getElementById('single-album');
function loadTitle(){
    if(artistName.value.length>0){
        fetch(`https://api.lyrics.ovh/suggest/${artistName.value}`)
        .then(res=>res.json())
        .then(json=>{
            displayTitle(json['data']);
        })
        .catch(error=>console.log(error));
    }
    else{
        getLyricsContainer.innerHTML='';
        singleLyric.innerText='';
        singleAlbum.innerText='';
    }
}
function displayTitle(data){
    getLyricsContainer.innerHTML='';
    data.map((x,index)=>{
        if(index<10){
            getLyricsContainer.innerHTML+=`
            <div class="single-result row align-items-center my-3 p-3" id='lyrics-${x.id}'>
                <div class="col-md-9">
                    <h3 class="lyrics-name">${x.title}</h3>
                    <p class="author-lead">Album by <span>${x.artist.name}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button class="get-lyrics btn btn-success" onclick='getLyricsHandler(event)'>Get Lyrics</button>
                </div>
            </div>`;
        }
    });
}
function getLyricsHandler(event){
    const element=event.target;
    const parentId="#"+element.parentNode.parentNode.id;
    const lyricsName=document.querySelector(parentId+" div h3").innerText;
    const leadAuthor=document.querySelector(parentId+" div p span").innerText;
    fetch(`https://api.lyrics.ovh/v1/${leadAuthor}/${lyricsName}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.lyrics);
        element.setAttribute('href','#single-lyric');
        singleAlbum.innerText=lyricsName+' - '+leadAuthor;
        singleLyric.innerText=data.lyrics;
    })
    .catch(error=>console.log(error));
}