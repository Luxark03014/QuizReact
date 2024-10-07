import { useState } from "react";

export function Introduction( { setUsername }) {
    
   

    const handleSubmit = () => {
        const inputValue = document.getElementById('inputUsername').value;
        setUsername(inputValue); 
        document.getElementById('inputUsername').value = ''; 
        document.getElementById('quiz').style.display = 'block';
        document.getElementById('introduction').style.display = 'none';
    };

    return (
        <>
                <div id="introduction" >
                    <h1>Escribe tu nombre de usuario:</h1>
                    <input id="inputUsername" type="text" />
                    <button onClick={handleSubmit}>INICIAR</button>
                </div>
            
        </>
    );
}
