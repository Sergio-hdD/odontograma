function formarFiguraDental(numero_de_diente){
  return `<div data-name="value" id="pieza_dental_cuadrante${numero_de_diente}" class="pieza_dental">
            <span class="numero_etiqueta">cuadrante${numero_de_diente}</span>
            <div id="superior_cuadrante${numero_de_diente}" class="plano_lateral"> 
            </div>
            <div id="izquierdo_cuadrante${numero_de_diente}" class="plano_lateral izquierdo">
            </div>
            <div id="debajo_cuadrante${numero_de_diente}" class="plano_lateral debajo">
            </div>
            <div id="derecho_cuadrante${numero_de_diente}" class="plano_lateral derecha">
            </div>
            <div id="centro_cuadrante${numero_de_diente}" class="centro">
            </div>
          </div>`;
}

/* La función buscarYRemplazarTodas divide la "cadena" en una matriz de subcadenas utilizando split y el valor de "buscado" como separador. Luego, une todas las subcadenas de la matriz con join, utilizando "remplazo" como el nuevo separador */
function buscarYRemplazarTodas(buscado, remplazo, cadena) {
  return cadena.split(buscado).join(remplazo);
}


function crearOdontograma() {
  var definitivosIzquierda = "", definitivosDerecha = "";
  
  for (var i = 1; i < 9; i++) {
      definitivosIzquierda = definitivosIzquierda + formarFiguraDental(9-i); /* Definitivos de los cuandrantes 1 y 3 (son los de la izquierda superior e inferior) */
      definitivosDerecha = definitivosDerecha + formarFiguraDental(i);  /* Definitivos de los cuandrantes 2 y 4 (son los de la derecha superior e inferior) */
  }
  
  $("#contenido_cuadrante_1").append(buscarYRemplazarTodas('cuadrante', '1', definitivosIzquierda));
  $("#contenido_cuadrante_2").append(buscarYRemplazarTodas('cuadrante', '2', definitivosDerecha));

  $("#contenido_cuadrante_3").append(buscarYRemplazarTodas('cuadrante', '3', definitivosDerecha));
  $("#contenido_cuadrante_4").append(buscarYRemplazarTodas('cuadrante', '4', definitivosIzquierda));
}

$(document).ready(function() {
  crearOdontograma();
});
