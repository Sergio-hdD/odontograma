function formarFiguraDental(numeroDePiezaDental)
{
  return `<div data-name="value" id="pieza_dental_cuadrante${numeroDePiezaDental}" class="pieza_dental">
            <span class="numero_etiqueta">cuadrante${numeroDePiezaDental}</span>
            <div id="parte_id_superior_cuadrante${numeroDePiezaDental}" class="plano_lateral parte_clase_superior"> 
            </div>
            <div id="parte_id_izquierdo_cuadrante${numeroDePiezaDental}" class="plano_lateral parte_clase_izquierda">
            </div>
            <div id="parte_id_inferior_cuadrante${numeroDePiezaDental}" class="plano_lateral parte_clase_inferior">
            </div>
            <div id="parte_id_derecho_cuadrante${numeroDePiezaDental}" class="plano_lateral parte_clase_derecha">
            </div>
            <div id="cara_incisal_cuadrante${numeroDePiezaDental}" class="cara_incisal">
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
