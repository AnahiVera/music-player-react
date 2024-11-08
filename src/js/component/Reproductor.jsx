import React, { useEffect, useRef, useState } from 'react'
import ObtenerApi from './ObtenerApi';
import retro from '../../img/retro-gaming.jpg'


const Reproductor = () => {

    const { soundtrack, error } = ObtenerApi();

    const [currentSongIndex, setCurrentSongIndex] = useState(0); //tracks song selected
    const [isPlaying, setIsPlaying] = useState(false); //tracks if song play or pause 
    const [volume, setVolume] = useState(0.7)
    const [repeat, setRepeat] = useState(false)
    const [isShuffle, setIsShuffle] = useState(false);
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const audioRef = useRef();  //<audio>

    const baseUrl = "https://playground.4geeks.com";

    const handleVolume = (e) => {
        const newVolume = e.target.value / 100;
        setVolume(newVolume)
        audioRef.current.volume = newVolume;
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

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    }

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime)
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying); // update state should flip the current state?
    }

    const handleNext = () => {
        let nextSong  = currentSongIndex + 1;
        if (isShuffle) {
            nextSong = Math.floor(Math.random() * soundtrack.length)  
            

        } else {
            let nextSong = currentSongIndex + 1;
            if (nextSong >= soundtrack.length) {  //superadn numero de pistas reinicia a 0
                nextSong = 0
               
            };
        }
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

        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
            audioRef.current.addEventListener('loadedmetadata', () => setDuration(audioRef.current.duration)); // Agrega el evento de actualización de tiempo

        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current.removeEventListener('loadedmetadata', handleTimeUpdate); // Limpia el evento al desmontar
            }
        };
    }, [soundtrack, volume,]);



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
                <div className='row'>
                    <div className='col-12'>
                        <div className='timeline-slider w-75'>
                            <div className='timeline'>
                                <small className='time'>{formatTime(currentTime)}</small>
                                <small className='fulltime'>{formatTime(duration)}</small>
                            </div>

                            <div className='range-slider'>
                                <input type="range" min="0" max="100"
                                    value={(currentTime / duration) * 100 || 0}
                                    onChange={handleSeek}
                                    className="slider" />

                            </div>
                        </div>

                    </div>
                </div>

                <div className="controls row">
                    <div className='col-4'>
                        <button onClick={() => setIsShuffle(!isShuffle)}>
                            <i className={`fa-solid ${isShuffle ? 'fa-random' : 'fa-arrows-alt-h'}`}></i>
                        </button>
                    </div>
                    <div className='col-4'>
                        <button onClick={handlePrevious}> <i className="fa-solid fa-backward"></i></button>
                        <button onClick={handlePlayPause}> {isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}</button>
                        <button onClick={handleNext}> <i className="fa-solid fa-forward"></i></button>
                    </div>
                    <div className='col-3'>
                        <div className='volume-slider'>
                            <div className='volume-icon'>
                                <span className='fa-solid fa-volume-high'> </span>
                                <input type="range" min="0" max="100" defaultValue="70" className='slider w-75' onChange={handleVolume} />
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}




export default Reproductor;
