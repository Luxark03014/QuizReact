import { useState, useEffect } from 'react';
import { Resultados } from './Resultados';

export const Quiz = ( { username }) => {
    const [preguntasQuiz, setPreguntasQuiz] = useState([]);
    const [preguntas, setPreguntas] = useState([]);
    const [indicePregunta, setIndicePregunta] = useState(0);
    const [numeroRespuestasCorrectas, setNumeroRespuestasCorrectas] = useState(0);
    const [mostrarResultados, setMostrarResultados] = useState(false);
    const [mostrarComprobar, setMostrarComprobar] = useState(false);
    const [resultados, setResultados] = useState([]);
    const [buttonText, setButtonText] = useState('Generar Preguntas');
    const [respuestasEstilo, setRespuestasEstilo] = useState({});


    useEffect(() => {
        const cargarPreguntas = async () => {
            const response = await fetch("./preguntas.json");
            const data = await response.json();
            setPreguntas(data.concurso);
        };

        cargarPreguntas();
    }, []);

    const añadirPreguntas = () => {
        setButtonText('Siguiente');
        setMostrarComprobar(true);
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
        const respuestaSeleccionada = document.querySelectorAll('input:checked');
        const allInputs = document.querySelectorAll('input[type="radio"]');
        allInputs.forEach((radio) => {
            radio.setAttribute('disabled', true); // Deshabilitar todas las opciones después de seleccionar una respuesta
        });
    
        const nuevasRespuestas = [];
        const nuevasEstilos = {}; 
    
        respuestaSeleccionada.forEach((input) => {
            const preguntaIndex = parseInt(input.name.split('-')[1]); // Índice de la pregunta en la lista
            const respuestaValue = input.value;
    
            const yaGuardada = resultados.some((resultado) => resultado.pregunta === preguntas[preguntaIndex].pregunta);
    
            // Solo sumar respuestas que aún no se hayan guardado
            if (!yaGuardada) {
                const esCorrecta = respuestaValue === preguntas[preguntaIndex].respuesta_correcta;
                nuevasRespuestas.push({
                    pregunta: preguntas[preguntaIndex].pregunta,
                    respuesta: respuestaValue,
                    correcta: esCorrecta
                });
    
               
                if (esCorrecta) {
                    setNumeroRespuestasCorrectas(prevCorrectas => prevCorrectas + 1);
                }
    
                
                nuevasEstilos[preguntaIndex] = {
                    backgroundColor: esCorrecta ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)',
                    padding: '10px', 
                    borderRadius: '5px', 
                    marginBottom: '10px'
                };
            }
        });
    
       
        setResultados((prevResultados) => [...prevResultados, ...nuevasRespuestas]);
    
       
        setRespuestasEstilo(prevEstilos => ({ ...prevEstilos, ...nuevasEstilos }));
    
        console.log("Respuestas validadas:", nuevasRespuestas);
    };
    
    

    const mostrarResultadosQuiz = () => {
        setMostrarResultados(true);
    };

    useEffect(() => {
        console.log("Resultados finales:", resultados);
    }, [resultados, mostrarResultados]);

    return (
        <div className="quiz-container">
        <h2>Quiz de { username }</h2>
    
        {!mostrarResultados && (
            <div className="preguntas-quiz">
                {preguntasQuiz.map((pregunta, index) => (
                    <div className='pareja-preguntas' key={index} style={respuestasEstilo[index] || {}}>
                        <label id="preguntas-quiz-pregunta"><strong>{pregunta.pregunta}</strong></label>
                        <div className="preguntas-quiz-contenedor">
                            <form>
                                {Object.entries(pregunta.opciones).map(([key, value]) => (
                                    <div key={key}>
                                        <input type="radio" name={`pregunta-${index}`} value={key} />
                                        <label id="preguntas-quiz-respuestas">{value}</label>
                                    </div>
                                ))}
                            </form>
                        </div>
                    </div>
                ))}
    
                {mostrarComprobar && <button type="submit" onClick={validarPregunta} className="button-comprobar">Comprobar</button>}
                <button onClick={añadirPreguntas} className="button">{buttonText}</button>
            </div>
        )}
    
        {indicePregunta >= 12 && !mostrarResultados && (
            <button onClick={mostrarResultadosQuiz} className="button mostrar-resultados">Mostrar Resultados</button>
        )}
    
        {mostrarResultados && <Resultados username={username} numeroRespuestasCorrectas={numeroRespuestasCorrectas} />}
    </div>
    
    );
};