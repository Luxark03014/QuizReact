export const Resultados = ({ numeroRespuestasCorrectas , username}) => {
    const resultadosUsuario = {
        username: username,
        resuestasCorrectas: numeroRespuestasCorrectas,
        respuestasFalladas: 12 - numeroRespuestasCorrectas,
        haAprobado: numeroRespuestasCorrectas >= 6 ? true : false
    }
    console.log("Resultados Usuario" + resultadosUsuario)
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('introduction').style.display = 'none';
    const totalPreguntas = 12; 
    const mensaje = numeroRespuestasCorrectas >= 6 ? "¡Has aprobado! 😁" : "Has suspendido. 😢";
    return (
        <div className="resultados">
            <center><h2>Resultados</h2></center>
            <div>
                <center>Has acertado {numeroRespuestasCorrectas} de 12 preguntas</center>
                <center><h3>{mensaje}</h3></center>
            </div>
        </div>
    );
};