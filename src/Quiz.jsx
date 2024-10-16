import { useState, useEffect } from 'react';
import { BotonComprobar } from './BotonComprobar';
export const Quiz = () => {
    const [preguntasQuiz, setPreguntasQuiz] = useState([]);
    const [preguntas, setPreguntas] = useState([]);
    const [indicePregunta, setIndicePregunta] = useState(0);


    useEffect(() => {
        const cargarPreguntas = async () => {
            const response = await fetch("./preguntas.json");
            const data = await response.json();
            setPreguntas(data.concurso);
        };

        cargarPreguntas();
    }, []);

    useEffect(() => {
        console.log("Preguntas agregadas al quiz:", preguntasQuiz);
    }, [preguntasQuiz]);

    const añadirPreguntas = () => {
        const nuevasPreguntas = [];


        for (let i = 0; i < 2; i++) {
            if (indicePregunta + i < preguntas.length) {
                const numeroPregunta = preguntas[indicePregunta + i];
                const nuevaPregunta = {
                    pregunta: numeroPregunta.pregunta,
                    opciones: numeroPregunta.opciones,
                    respuesta_correcta: numeroPregunta.respuesta_correcta
                };
                nuevasPreguntas.push(nuevaPregunta);
            }
        }

        setPreguntasQuiz([...preguntasQuiz, ...nuevasPreguntas]);
        setIndicePregunta(indicePregunta + 2);
    };
    let numeroRespuestasCorrectas = 0
    const validarPregunta = (value, index, e) => {

        const respuestaCorrecta = preguntasQuiz[index].respuesta_correcta
        const botones = document.querySelectorAll(" .boton-opcion");
        botones.forEach((boton) => {
            boton.style.backgroundColor = "white"; 
        });

        e.target.style.backgroundColor = "grey"; 
        if (value == respuestaCorrecta) {
            console.log("MUY BIEN")
            numeroRespuestasCorrectas++
        }
        else if (value != respuestaCorrecta) {
            console.log("HAS FALLADO")
        }

    }
    
    return (
        <div>
            <h2>Quiz</h2>
            
            <div>
                {preguntasQuiz.map((pregunta, index) => (
                    <div key={index}>
                        <h3>{pregunta.pregunta}</h3>
                        <ul>
                            <li>
                                <button onClick={(e) => validarPregunta("A", index, e)} className="boton-opcion" value="A">A</button>
                                {pregunta.opciones.A}
                            </li>
                            <li>
                                <button onClick={(e) => validarPregunta("B", index, e)} className="boton-opcion" value="B">B</button>
                                {pregunta.opciones.B}
                            </li>
                            <li>
                                <button onClick={(e) => validarPregunta("C", index, e)} className="boton-opcion" value="C">C</button>
                                {pregunta.opciones.C}
                            </li>
                            <li>
                                <button onClick={(e) => validarPregunta("D", index, e)} className="boton-opcion" value="D">D</button>
                                {pregunta.opciones.D}
                            </li>

                        </ul>

                    </div>

                ))}
                <BotonComprobar />
                <button onClick={añadirPreguntas}>Siguiente</button>
            </div>
        </div>
    );
};
