let currFolder;
let currentSong = new Audio();
let songs;
async function getSongs(folder) {

    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`);
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    console.log(as);
    songs = [];
    document.querySelector(".songlist").getElementsByTagName("ul")[0].innerHTML="";
    for (let i = 0; i < as.length; i++) {
        const ele = as[i];
        if (ele.href.endsWith(".mp3")) {
            songs.push(ele.href.split(`/${folder}/`)[1]);
        }
    }
    currentSong.src = `${currFolder}/` + songs[0];
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + ` <li>
                            <div><img src="music.svg"></div>
                            <div class="info">
                                <div>${song}</div>
                                <div>Iman</div>
                            </div>
                            <div class="playy">
                            <img src="pause.svg" alt="play">
                            </div>

                        </li>`;
    }
    document.querySelector("#previous").addEventListener("click", () => {
        console.log("previos button was clicked");
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        let length = songs.length;
        if (index - 1 >= 0) {
            playMusic(songs[index - 1]);
        }
    })
    document.querySelector("#next").addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        console.log(index);
        let length = songs.length;
        if (index + 1 < length) {
            playMusic(songs[index + 1]);
        }
    })
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            console.log("cliked")
            currentSong.play();
            play.src = "pause.svg"
        }
        else {
            currentSong.pause();
            play.src = "play.svg";
        }
    }

    )
    main();

}
const playMusic = (track) => {
    // let audio = new Audio("/songs/"+track);
    currentSong.src = `/${currFolder}/` + track;

    currentSong.play();
    play.src = "pause.svg";

    play.src = "pause.svg";
    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "";
}
function secoundsToMinutesSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(0);

    // Add leading zeros if needed
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function main() {
    // let currentSong = new Audio();
    // songs = await getSongs("songs/darkside");
    // console.log(songs);
    
    let lis = document.querySelector(".songlist").getElementsByTagName("li");
    for (let li of lis) {
        li.addEventListener("click", () => {
            console.log("cliked")
            let song = li.querySelector(".info").firstElementChild.innerHTML;
            console.log(song);
            playMusic(song, true);
        })

    }
    // currentSong.src=songs[0];
    
    currentSong.addEventListener("timeupdate", function () {
        // console.log(currentSong.currentTime,currentSong.duration)
        document.querySelector(".songtime").innerHTML = secoundsToMinutesSeconds(currentSong.currentTime) + `/${secoundsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime) / (currentSong.duration) * 100 + "%";
    })
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;

    })
    document.querySelector(".hambargar").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    })
    
    let rangee = document.querySelector(".volume").querySelector("#rn");
    rangee.addEventListener("change", (e) => {
        // console.log(e);
        // console.log(e.target.value);
        currentSong.volume = parseInt(e.target.value) / 100;
    })
    // Array.from(documents.querySelector(".card")).forEach(e=>{
    //     console.log(e);
    // })
    Array.from(document.querySelectorAll(".card")).forEach((e) => {
        // console.log(e);
        e.addEventListener("click", async item => {
            console.log(item.currentTarget.dataset.folder);
            document.querySelector(".songlist").getElementsByTagName("ul")[0].innerHTML = " ";
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
            
        })
    });


}
// let audio = new Audio(songs[1]);
// audio.play();

// audio.addEventListener("loadeddata", () => {
// let duration = audio.duration;
// console.log(audio.duration);
// console.log(audio.currentTime=100);
// The duration variable now holds the duration (in seconds) of the audio clip
//     });

// }
console.log(currFolder);
main();