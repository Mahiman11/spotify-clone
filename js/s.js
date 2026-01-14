let index = 0;
let audioElement = new Audio('assets/songs/1.mp3');
let playb = document.querySelector('#playbutton')
let range = document.querySelector('#rg')
let gif = document.getElementById('giff')

// 1. Created an array that contains all songs and cover images
let songItem = Array.from(document.querySelectorAll('.songItems'))

let songs = [
    {songName:"Song A", filePath:"assets/songs/1.mp3", coverPath:"assets/covers/cover5.jpg"},
    {songName:"Song B", filePath:"assets/songs/2.mp3", coverPath:"assets/covers/cover2.jpg"},
    {songName:"Song C", filePath:"assets/songs/3.mp3", coverPath:"assets/covers/cover3.jpg"},
    {songName:"Song D", filePath:"assets/songs/4.mp3", coverPath:"assets/covers/cover6.jpg"},
    {songName:"Song E", filePath:"assets/songs/5.mp3", coverPath:"assets/covers/cover7.jpg"}
]

// 1.1 Here i initialized songs and cover images to each song 
songItem.forEach((Element, i)=>{
    Element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    Element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

// 2. Adding functionality to my main play button
playb.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        playb.classList.remove('fa-circle-play');
        playb.classList.add('fa-circle-pause');
        gif.style.opacity= 1;
    }
    else{
        audioElement.pause();
        playb.classList.remove('fa-circle-pause');
        playb.classList.add('fa-circle-play');
        gif.style.opacity= 0;
    }
});

// 3. Adding functionality that represents the song progress on my used Range bar at Bottom , But no physical update in percentage
audioElement.addEventListener('timeupdate', ()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    range.value= progress;
});

// 3.1 Physical update on my bar
range.addEventListener('change', () => {
    audioElement.currentTime = range.value * audioElement.duration/100;
});

// 4. Repreneting song is playing by changing small pause icons into play ones
const makeAllPlays = () => {
    Array.from(document.querySelectorAll('.songplayer')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

    
// 5. Adding functionality to Play and Pause songs from small play icons in front of them
Array.from(document.querySelectorAll('.songplayer')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        makeAllPlays(); // reset all icons
        index = i; // set current song index
        audioElement.src = songs[index].filePath; // switch audio
        audioElement.currentTime = 0;
        audioElement.play();

        // change this icon to pause
        element.classList.remove('fa-circle-play');
        element.classList.add('fa-circle-pause');

        // also sync main play button
        playb.classList.remove('fa-circle-play');
        playb.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

        highlightCurrentSong();

    });
});

// 6. Created a function that i can use where i want to sync the UI after changing or playing songs
const syncUIAfterPlay = () => {
    makeAllPlays();

    document.getElementsByClassName('songplayer')[index]
        .classList.remove('fa-circle-play');
    document.getElementsByClassName('songplayer')[index]
        .classList.add('fa-circle-pause');

    playb.classList.remove('fa-circle-play');
    playb.classList.add('fa-circle-pause');
    gif.style.opacity = 1;

    highlightCurrentSong();
};


// 7. Adding function to play prev and next song using forward and backward arrrows that are present on left and right of my play button
let nextSong = document.getElementById('next')  //next button
nextSong.addEventListener('click', () => {
    index = (index + 1) % songs.length;
    audioElement.src = songs[index].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

//To update small play buttons + Highlight current songh  
syncUIAfterPlay();


});
let prevSong = document.getElementById('prev')  //prev button
prevSong.addEventListener('click', () => {
    index = (index - 1);
    if(index < 0){
        index = songs.length - 1;
    }
    audioElement.src = songs[index].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

//To update small play buttons + Highlight current song  
syncUIAfterPlay();


})

// 8. Adding functionality of auto play next song and i merged it with UI sync
audioElement.addEventListener( 'ended', () => {
    index++;

    if(index >= songs.length){   //if last songs ends it will automatically starts from first song
        index = 0;
    }

    audioElement.src = songs[index].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    // 8.1 Adding functionality of (UI sync) , all play icon will get reset into playback state + Highlight current song
    syncUIAfterPlay();

})

// 9. Created a fuction that highlights the currently playing song
const highlightCurrentSong = () => {
    songItem.forEach(item => item.classList.remove('active'));
    songItem[index].classList.add('active');
};


