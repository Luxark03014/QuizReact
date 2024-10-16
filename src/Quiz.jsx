import { useState, useEffect } from 'react';
import { BotonComprobar } from './BotonComprobar';
export const Quiz = () => {
    const [preguntasQuiz, setPreguntasQuiz] = useState([]);
    const [preguntas, setPreguntas] = useState([]);
    const [indicePregunta, setIndicePregunta] = useState(0);
    const [numeroRespuestasCorrectas, setNumeroRespuestasCorrectas] = useState(0)
    const [respuesta, setRespuesta] = useState({})
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

    const validarPregunta = () => {
       
    
       const respuestaSeleccionada = document.querySelectorAll('input:checked')
       const allInputs = document.querySelectorAll('input[type="radio"]');
       allInputs.forEach((radio) => {
        radio.setAttribute('disabled', true); 
    });
       respuestaSeleccionada.forEach((input) => {
        const preguntaIndex = parseInt(input.name.split('-')[1]); 
        const respuestaValue = input.value;
        console.log(preguntaIndex)
        
        if (respuestaValue === preguntas[preguntaIndex].respuesta_correcta) {
            console.log(`Pregunta ${preguntaIndex + 1}: CORRECTO`);
            setNumeroRespuestasCorrectas(numeroRespuestasCorrectas + 1)
            
        } else {
            console.log(`Pregunta ${preguntaIndex + 1}: INCORRECTO`);
        }
       
        
    
    }
    
)
input.setAttribute('disabled', true)
;
    }

    return (
        <div>
            <h2>Quiz</h2>

            <div>
                {preguntasQuiz.map((pregunta, index) => (
                    <div key={index}>
                        <label>{pregunta.pregunta}</label>
                        <form>

                            <input type="radio" name={`pregunta-${index}`} value="A" />
                            <label > {pregunta.opciones.A}</label>

                            <input type="radio"name={`pregunta-${index}`} value="B" />
                            <label >{pregunta.opciones.B}</label>

                            <input type="radio"name={`pregunta-${index}`} value="C" />
                            <label > {pregunta.opciones.C}</label>

                            <input type="radio"name={`pregunta-${index}`} value="D" />
                            <label> {pregunta.opciones.D}</label>


                        </form>

                    </div>

                ))}
                 <button type='submit' onClick={validarPregunta}>COMPROBAR</button>
                <button onClick={añadirPreguntas}>Siguiente</button>
            </div>
        </div>
    );
};
