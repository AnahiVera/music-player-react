import React, { useEffect, useState } from 'react'

const ObtenerApi = () => {

    const [soundtrack, setSoundtrack] = useState(null)
    const [error, setError] = useState(null)
    

    useEffect(() => {
        obtenerSoundtrack()
        
    }, [])

    const obtenerSoundtrack = () => {
        fetch('https://playground.4geeks.com/sound/songs', {
            method: 'GET'
        })
            .then((response) => {  //traer info
                if (response.ok){
                    return response.json();//algo
                }  else {
                    throw new Error ("There is a network problem");
                }
            })

            .then((responseJson) => {  //establecer uso info
                console.log(responseJson)
                setError(null);
                setSoundtrack(responseJson.songs)
                
            })
            .catch((error) => {
                console.log("Problem with fetch operation:", error)
                setError(error.message);
            })
    }


    return {soundtrack,error};
}

export default ObtenerApi