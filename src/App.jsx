import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Introduction } from './Introduction';
import { Quiz } from './Quiz';
import { Resultados } from './Resultados';

import './assets/style.css';

function App() {
    const [username, setUsername] = useState('');

    return (
        <div id="body-content" className="container">
            <Header username={username} />
            <Introduction setUsername={setUsername} />
            <div id='quiz'>
                <Quiz username={username}/>
            </div>
            <Footer />
        </div>
    );
}

export default App;