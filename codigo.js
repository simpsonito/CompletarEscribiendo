$(function(){
	//alert("cargado");
	iniciar();
});

function iniciar(){
	var caja;
	$($("#completable input")).each(function(index){
		caja = $(this);
		caja.attr("class", "" );
		caja.attr("size", caja.attr("respuesta").length + 2);
		caja.focus(function(e){
			console.log($(this).attr("respuesta"));
			$(this).attr("class", "");
		});
	});
}

function revisar(){
	var caja;
	var buenas = 0;
	var total = $("#completable input").length;
	var mensajeFinal = "";
	$($("#completable input")).each(function(index){
		caja = $(this);
		if(caja.val() != ""){
			if(quitarAcentos(caja.attr("respuesta")) == quitarAcentos(caja.val())){
				caja.attr("class", "correcto" );
				caja.prop('disabled', true);
				caja.val(caja.attr("respuesta"));
				++buenas;
			} else {
				caja.attr("class", "incorrecto" );
			}
		} else {
			mensajeFinal = "Por favor llena todos los campos de texto";
		}
	});
	if(mensajeFinal == ""){
		switch (buenas) {
		case 10:
			mensajeFinal = "Felicidades, has logrado una comprensión integral de los temas.";
			break;
		case 9:
		case 8:
			mensajeFinal = "Tienes un buen manejo de los temas, pero aún puedes mejorar.";
			break;
		case 7:
		case 6:
			mensajeFinal = "Manejas algunos aspectos importantes, pero es necesario fortalecer el estudio de los temas.";
			break;
		default://Cualquier otro (5 ó menos)
			mensajeFinal = "Revisa nuevamente los contenidos de la unidad.";
		}
		retroalimentar(mensajeFinal+"<br/>Obtuviste <b>"+buenas+"</b> de <b>"+total+"</b>.");
	} else {
		retroalimentar(mensajeFinal);
	}
	
}
function retroalimentar(cadena){
	$('#retroalimentacion').html(cadena);
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
function reiniciar(){
	var caja;
	$($("#completable input")).each(function(index){
		caja = $(this);
		caja.val("");
		caja.attr("class", "" );
		caja.prop('disabled', false);
	});
	retroalimentar("");
}