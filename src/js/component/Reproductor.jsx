import React, { useEffect, useRef, useState } from 'react'


const Reproductor = () => {

    const [canciones] = useState([
        {
            "id": 1,
            "name": "Mario Castle",
            "url": "/sound/files/mario/songs/castle.mp3",
            "category": "category"
        },
        {
            "id": 2,
            "name": "Mario Star",
            "url": "/sound/files/mario/songs/hurry-starman.mp3",
            "category": "category"
        },
        {
            "id": 3,
            "name": "Mario Overworld",
            "url": "/sound/files/mario/songs/overworld.mp3",
            "category": "category"
        }
    ])



    const [currentSongIndex, setCurrentSongIndex] = useState(0); //tracks song selected
    const [isPlaying, setIsPlaying] = useState(false); //tracks if song play or pause 
    const audioRef = useRef();  //<audio>

    const baseUrl = "https://playground.4geeks.com";

    const loadSong = (index) => {
        const songUrl = baseUrl + canciones[index].url;
        audioRef.current.src = songUrl;
        setCurrentSongIndex(index) //not 0 or will restart always
        setIsPlaying(false);
        audioRef.current.play();
        
    }

    const handlePlayPause = () => {
        if (isPlaying){
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying); // update state should flip the current state?
    }

    const handleNext = () => {
        let nextSong = currentSongIndex +1;
        if (nextSong >= canciones.length) {  //superadn numero de pistas reinicia a 0
            nextSong =0
        };
        loadSong(nextSong);
    }

    const handlePrevious = () => {
        let previousSong = currentSongIndex -1;
        if (previousSong <= 0){
            previousSong = canciones.length -1;
        }
        loadSong(previousSong);

    }

    
    useEffect(() => {
        loadSong(0); 
    }, []);


    


    return (
        <div className="reproductor">
            <div className="reproductor-canciones">
                <audio ref={audioRef} />

                <div className='listado-canciones'>
                <ul>
                    {canciones.map((cancion, index) => (
                        <li key={cancion.id}>
                            <button onClick={() => loadSong(index)}>
                                {cancion.name}
                            </button>
                        </li>
                    ))}
                </ul>
                </div>

            </div>
            <div className="controls">

                <button onClick={handlePrevious}> <i class="fa-solid fa-backward"></i></button>
                <button onClick={handlePlayPause}> {isPlaying ? <i class="fa-solid fa-pause"></i> : <i class="fa-solid fa-play"></i>}</button>
                <button onClick={handleNext}> <i class="fa-solid fa-forward"></i></button>

            </div>
        </div>
    )
}




export default Reproductor;
