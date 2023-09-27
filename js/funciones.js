const EXTRAIDO = "extraido";
const EXTRAER = "extraer";
const BORRAR = "borrar";

function formarFiguraDental(numeroDePiezaDental)
{
  return `<div data-name="value" id="pieza_dental_cuadrante${numeroDePiezaDental}" class="pieza_dental">
            <span class="numero_etiqueta">cuadrante${numeroDePiezaDental}</span>
            <div id="parte_id_superior_cuadrante${numeroDePiezaDental}" class="plano_lateral parte_clase_superior" onclick="pintarSegunEleccion(event)"> 
            </div>
            <div id="parte_id_izquierdo_cuadrante${numeroDePiezaDental}" class="plano_lateral parte_clase_izquierda" onclick="pintarSegunEleccion(event)">
            </div>
            <div id="parte_id_inferior_cuadrante${numeroDePiezaDental}" class="plano_lateral parte_clase_inferior" onclick="pintarSegunEleccion(event)">
            </div>
            <div id="parte_id_derecho_cuadrante${numeroDePiezaDental}" class="plano_lateral parte_clase_derecha" onclick="pintarSegunEleccion(event)">
            </div>
            <div id="cara_incisal_cuadrante${numeroDePiezaDental}" class="cara_incisal" onclick="pintarSegunEleccion(event)">
            </div>
          </div>`;
}


function buscarYRemplazarTodas(cadena, remplazos) 
{
  let resultado = cadena;
  for (const [buscado, remplazo] of remplazos) { // Cada posición de remplazos tiene un array clave de valorlos tomo y creo una constante con ellos
    resultado = resultado.replace(new RegExp(buscado, 'g'), remplazo); // en "new RegExp(buscado, 'g')" el 'g' es para que remplaze todas las apariciones
  }
  return resultado;
}

function determinarYTraerArrayDeRemplazos(numeroDeCuadrante, figuraSuperior, figuraIzquierda, figuraInferior, figuraDerecha) 
{ 
  var idParteSuperior = extraerParteDelId(figuraSuperior);
  var idParteIzquierdo = extraerParteDelId(figuraIzquierda);
  var idParteDerecho = extraerParteDelId(figuraDerecha);
  var idParteInferior = extraerParteDelId(figuraInferior);

  return [
    ['cuadrante', numeroDeCuadrante],
    ['parte_id_superior', idParteSuperior],
    ['parte_id_izquierdo', idParteIzquierdo],
    ['parte_id_inferior', idParteInferior],
    ['parte_id_parte_id_derecho', idParteDerecho],
    ['parte_clase_superior', figuraSuperior],
    ['parte_clase_izquierda', figuraIzquierda],
    ['parte_clase_inferior', figuraInferior],
    ['parte_clase_derecha', figuraDerecha]
  ];

}

function extraerParteDelId(cadena) 
{
  var exprRegularBuscada = /_en_cuadrante_/;
  // Si la cadena contiene la expresión regular se la divide (como array) donde está la expresión regular y si está mal solo la primera posición
  return exprRegularBuscada.test(cadena)? cadena.split('_en_cuadrante_')[0]: cadena;
}

function crearYTraerPiezasDentalesDefintivasNumeradas() 
{
  var definitivosIzquierda = "", definitivosDerecha = "";
  
  for (var i = 1; i < 9; i++) {
      definitivosIzquierda = definitivosIzquierda + formarFiguraDental(9-i); /* Definitivos de los cuandrantes 1 y 3 (son los de la izquierda superior e inferior) */
      definitivosDerecha = definitivosDerecha + formarFiguraDental(i);  /* Definitivos de los cuandrantes 2 y 4 (son los de la derecha superior e inferior) */
  }
  return {'definitivosIzquierda': definitivosIzquierda, 'definitivosDerecha': definitivosDerecha}
}

function establecerClasesEIdACadaCuadrante(definitivosIzquierda, definitivosDerecha) 
{
  var remplazos = determinarYTraerArrayDeRemplazos('1', 'vestibular_superior', 'distal_en_cuadrante_1', 'palatina', 'mesial_en_cuadrante_1');
  $("#contenido_cuadrante_1").append(buscarYRemplazarTodas(definitivosIzquierda, remplazos));

  
  remplazos = determinarYTraerArrayDeRemplazos('2', 'vestibular_superior', 'mesial_en_cuadrante_2', 'palatina', 'distal_en_cuadrante_2');
  $("#contenido_cuadrante_2").append(buscarYRemplazarTodas(definitivosDerecha, remplazos));


  remplazos = determinarYTraerArrayDeRemplazos('3', 'lingual', 'mesial_en_cuadrante_3', 'vestibular_inferior', 'distal_en_cuadrante_3');
  $("#contenido_cuadrante_3").append(buscarYRemplazarTodas(definitivosDerecha, remplazos));
  
  remplazos = determinarYTraerArrayDeRemplazos('4', 'lingual', 'distal_en_cuadrante_4', 'vestibular_inferior', 'mesial_en_cuadrante_4');
  $("#contenido_cuadrante_4").append(buscarYRemplazarTodas(definitivosIzquierda, remplazos));

}

function pintarSegunEleccion(event)
{
  var idDelInput = $("input[type='radio']:checked")[0].id;
  var label = $(`label[for='${idDelInput}']`);
  
  colorDeFondo = label.css("background-color"); // Obtengo el color con el se va pintar

  var divPlanoDental = event.target; // div en que se hizo clic

  var parteComunDelId = divPlanoDental.id.match(/\d{2}$/); // Utiliza una expresión regular para obtener los dos números al final (número de cuadrante y número de pieza dental). 

  if (idDelInput == EXTRAER || idDelInput == EXTRAIDO) { // En el caso de que haya que extraer o que ya esté extraído, se marca toda la pieza dental 
    $(`div[id$='_${parteComunDelId}']`).not("[id^='pieza_dental']").css("background-color", colorDeFondo); // Establecer un color de fondo en los div que terminan con "_x" en su ID, excepto los que comienzan con "pieza_dental"
    $(`#pieza_dental_${parteComunDelId}`).attr("data-extraido-o-a-extraer", "true"); // Agrego el atributo data-* y un valor para saber que la fue o será extraida (el fin es saber que se pintó toda la pieza)
  } 
  else if (idDelInput == BORRAR){
    if ($(`#pieza_dental_${parteComunDelId}`).attr("data-extraido-o-a-extraer") == "true") {
      $(`div[id$='_${parteComunDelId}']`).not("[id^='pieza_dental']").css("background-color", "#FFFFFF"); // Establecer un color de fondo en los div que terminan con "_x" en su ID, excepto los que comienzan con "pieza_dental"
      $(`#pieza_dental_${parteComunDelId}`).removeAttr("data-extraido-o-a-extraer");
    } else {
      $(divPlanoDental).css("background-color", "#FFFFFF");
    }
  } else {
    $(divPlanoDental).css("background-color", colorDeFondo);
  }
}

function crearOdontograma() 
{
  var definitivos = crearYTraerPiezasDentalesDefintivasNumeradas();
  var definitivosIzquierda = definitivos['definitivosIzquierda'];
  var definitivosDerecha = definitivos['definitivosDerecha'];

  establecerClasesEIdACadaCuadrante(definitivosIzquierda, definitivosDerecha);

}


$(document).ready(function() {

  crearOdontograma();

});
