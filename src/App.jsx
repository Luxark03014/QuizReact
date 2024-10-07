import React, { useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Introduction } from './Introduction'
import { Quiz } from './Quiz'

import './assets/style.css';

 function App(){
    const [username, setUsername] = useState('');

    return(
        <>
        <Header username={username} />
        <Introduction setUsername={setUsername} /> 
        <div id='quiz' >
        <Quiz />
        </div>
        <Footer />
        </>
    )

}

export default App;