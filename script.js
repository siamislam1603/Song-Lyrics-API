const artistName=document.querySelector('input');
const button=document.querySelector('.search-bar');
button.onclick=loadTitle;
artistName.oninput=loadTitle;
const getLyricsContainer=document.querySelector('.search-result');
function loadTitle(){
    console.log(artistName.value.length);
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
    }
}
function displayTitle(data){
    getLyricsContainer.innerHTML='';
    data.map((x,index)=>{
        if(index<10){
            getLyricsContainer.innerHTML+=`
            <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${x.title}</h3>
                    <p class="author lead">Album by <span>${x.artist.name}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button id="${x.id}" class="get-lyrics btn btn-success">Get Lyrics</button>
                </div>
            </div>`;
        }
    });
}