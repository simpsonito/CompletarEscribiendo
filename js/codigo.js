$(function(){
	//alert("cargado");
	iniciar();
});

function iniciar(){
    var secciones = $(".completable");
    //var inputs2 = secciones.find("input");
    secciones.each(function(index, seccion){
        //console.log("secciones", index, seccion);
        seccion.inputs = $(seccion).find("input");
        seccion.inputs.each(function(indice, cajaElemento){
            var caja = $(cajaElemento);
            caja.attr("class", "" );
            caja.attr("size", caja.attr("data-respuesta").length + 2);
            caja.focus(function(e){
                console.log($(this).attr("data-respuesta"));
                $(this).attr("class", "");
            });
        });
        seccion.botonRevisar = $(seccion.parentElement).find(".botonCalificar");
        seccion.botonRevisar.click(function(){
            //console.log(seccion.inputs);
            revisar(seccion);
        });
        seccion.botonLimpiar = $(seccion.parentElement).find(".botonReset");
        seccion.botonLimpiar.click(function(){
            //console.log(seccion.inputs);
            reiniciar(seccion);
        });
    });

}

function revisar(seccion){
	var caja;
    var buenas = 0;
	var total = seccion.inputs.length;
	var isComplete = true;
    seccion.inputs.each(function(index, cajaElemento){
		caja = $(cajaElemento);
		if(caja.val() != ""){
			if(quitarAcentos(caja.attr("data-respuesta")) == quitarAcentos(caja.val())){
				caja.attr("class", "correcto" );
				caja.prop('disabled', true);
				caja.val(caja.attr("data-respuesta"));
				++buenas;
			} else {
				caja.attr("class", "incorrecto" );
			}
		} else {
			isComplete = false;
		}
	});
    retroalimentar(seccion, buenas, total, isComplete);
}
function retroalimentar(seccion, buenas, total, completo){
	//$($(seccion.parentElement).find('.retroalimentacion')[0]).html(cadena);
    var contenedor = $(seccion.parentElement);
    var retroTexto = "";
    if(completo){
        if(buenas === total){
            retroTexto = contenedor.find('.retro.bien').html();
        } else {
            retroTexto = contenedor.find('.retro.mal').html();
        }
    } else{
        retroTexto = "Por favor llena todos los campos de texto";
    }
    contenedor.find('.retroalimentacion').html(retroTexto);
}
function quitarAcentos(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();
  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes
  return str;
}
function reiniciar(seccion){
    seccion.inputs.each(function(index, elemento){
		var caja = $(elemento);
        caja.val("");
		caja.attr("class", "" );
		caja.prop('disabled', false);
	});
    $(seccion.parentElement).find('.retroalimentacion').html("");
}