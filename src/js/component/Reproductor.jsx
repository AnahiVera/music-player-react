import React, { useEffect, useRef, useState } from 'react'
import ObtenerApi from './ObtenerApi';
import retro from '../../img/retro-gaming.jpg'


const Reproductor = () => {

    const { soundtrack, error } = ObtenerApi();

    const [currentSongIndex, setCurrentSongIndex] = useState(0); //tracks song selected
    const [isPlaying, setIsPlaying] = useState(false); //tracks if song play or pause 
    const [volume, setVolume] = useState(1)
    const audioRef = useRef();  //<audio>

    const baseUrl = "https://playground.4geeks.com";

    const increaseVolume = () => {
        setVolume(prevVolume => Math.min(1, prevVolume + 0.1))
    }

    const decreaseVolume = () => {
        setVolume(prevVolume => Math.max(0, prevVolume - 0.1))
    }

    const loadSong = (index) => {
        if (soundtrack && soundtrack[index]) {
            const songUrl = baseUrl + soundtrack[index].url;
            audioRef.current.src = songUrl;
            setCurrentSongIndex(index) //not 0 or will restart always
            setIsPlaying(false);
            audioRef.current.play();
        }
    }

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying); // update state should flip the current state?
    }

    const handleNext = () => {
        let nextSong = currentSongIndex + 1;
        if (nextSong >= soundtrack.length) {  //superadn numero de pistas reinicia a 0
            nextSong = 0
        };
        loadSong(nextSong);
    }

    const handlePrevious = () => {
        let previousSong = currentSongIndex - 1;
        if (previousSong <= 0) {
            previousSong = soundtrack.length - 1;
        }
        loadSong(previousSong);

    }


    useEffect(() => {
        if (soundtrack && soundtrack.length > 0) {
            loadSong();
        }

        if (audioRef.current) audioRef.current.volume = volume;

    }, [soundtrack, volume]);





    return (
        <div className='container-fluid m-0 p-0'>
            <img src={retro} alt="retro-gaming-wallpaper" className='bg-img ' />

            <div className="reproductor  w-100">
                <div className="reproductor-canciones">
                    <audio ref={audioRef} />

                    <div className='listado-canciones'>
                        {error && <p>Error: {error}</p>}
                        <ul className='row'>
                            {soundtrack && soundtrack.map((cancion, index) => (
                                <li key={cancion.id} className='col-6 col-md-3 col-xl-2'>
                                    <button onClick={() => {
                                        loadSong(index);
                                        setIsPlaying(true);
                                    }}>

                                        {cancion.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
                <div className="controls row">
                    <div className='col-4'>
                        botones de volumen
                    </div>
                    <div className='col-4'>
                        <button onClick={handlePrevious}> <i className="fa-solid fa-backward"></i></button>
                        <button onClick={handlePlayPause}> {isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}</button>
                        <button onClick={handleNext}> <i className="fa-solid fa-forward"></i></button>
                    </div>
                    <div className='col-3'>
                        botones de volumen
                    </div>



                </div>
            </div>
        </div>
    )
}




export default Reproductor;
