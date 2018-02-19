$(document).ready( ()=>{

	$(function () {
  $('[data-toggle="tooltip"]').tooltip()
	})

	$("#home").click( () => {
		location.reload();	
	})
	
	$("#trueFalse").click( () => {
		$("#trueFalse p").append(`<i class="fas fa-check-square"></i> 
															<span>GO ! </span>`)
		setTimeout( () =>{
			let url = 'https://opentdb.com/api.php?amount=20&type=boolean'; 
			trueFalse(url)
		}, 2500)	
	})

	$("#multiple").click( () =>{
	$("#multiple p").append(`<i class="fas fa-check-square"></i>
														<span> GO ! </span>`)
		setTimeout( () =>{
			let url = 'https://opentdb.com/api.php?amount=20&type=multiple';
			multiple(url);
		}, 2500)
	})

});

let cont_buenas= 0;
let cont_malas = 0; 

function trueFalse(url){
	$(".presentation").hide(); 
	$(".preguntas").removeClass("escondida"); 
	fetch(url)
		.then((response) =>{
			return response.json()
		})
		.then( (data) =>{
			console.log(data.results)
			printQuestion(data.results)
		})
}

function multiple(url){
	$(".presentation").hide(); 
	$(".preguntas").removeClass("escondida"); 
	fetch(url)
		.then((response) =>{
			return response.json()
		})
		.then( (data) =>{
			console.log(data.results)
			printMultiple(data.results)
		})
}

/*FUNCIONES */
function printMultiple(data){
	const results = data;
	const i=results.length -1; 
	const category = results[i].category;
	const difficulty = results[i].difficulty; 
	const question = results[i].question;
	const correct= results[i].correct_answer; 
	const inc_0=results[i].incorrect_answers[0]; 
	const inc_1=results[i].incorrect_answers[1]; 
	const inc_2=results[i].incorrect_answers[2]; 

	$(".preguntas").append(`
					<p id="category" class='quesInfo'><span class="la"><i class="fas fa-certificate"></i><b>Category :</b> </span>${category}</p>
					<p id="difficulty" class='quesInfo'><span class="la"><i class="fas fa-certificate"></i>Difficulty :</span> ${difficulty}</p>
					<p id="question">${question}</p>
					<ul id="response" class="la">
						<li id="ans_1" class="checkAns answer">${inc_0}</li>
						<li id="ans_2" class="checkAns answer">${correct}</li>
						<li id="ans_3" class="checkAns answer">${inc_1}</li>
						<li id="ans_4" class="checkAns answer">${inc_2}</li>
					</ul>`)

	$(document).on('click', '.answer', (e) => {
		const event = e.target;
		const respuesta = $(event).text();
		if( respuesta == correct ){
			cont_buenas++
			console.log("buenas" + cont_buenas)
			console.log(cont_buenas)
			$(".preguntas").empty(); 
			$(".preguntas").append(`<div class="dibujoCorrecto col-xs-8 col-xs-offset-2 col-lg-8 col-lg-offset-2">
						<p><i class="far fa-check-circle"></i></p>
						<p id="msg">Correct !!!</p>
					</div>
					<div>
						<button class="btn next">NEXT QUESTION</button>
					</div>`)
		}else{
			cont_malas++
			console.log("malas" + cont_malas)
			$(".preguntas").empty()
			$(".preguntas").append(`<div class="dibujoCorrecto col-xs-8 col-xs-offset-2 col-lg-8 col-lg-offset-2">
						<p><i class="far fa-times-circle"></i></p>
						<p id="msg-inc"> Aww wrong!!!</p>
					</div>
					<div>
						<button class="btn next">NEXT QUESTION</button>
					</div>`)
		}
	})

	$(document).on('click', '.next', (e)=>{
		results.pop(); 
		console.log(results)
		$(".checkAns").css({'background-color' : 'white'})
		$(".dibujoCorrecto").addClass('escondida'); 
		$(".dibujoIncorrecto").addClass('escondida');
		$(".preguntas").empty();
		if(results.length<1){
			$("#endGame").removeClass('escondida')
			$(".preguntas").addClass('escondida')
		}else {
			printMultiple(results)
		}
	})

	if (cont_buenas>=3){
		$("#final").html(` Haz ganado :)  !!! `)
	}else{
		$("#final").html(` Haz perdido :(  !!! `)
	}
	$("#respuestas_correctas").html(`Respuestas Correctas: ${cont_buenas}`)
	$("#respuestas_incorrectas").html(`Respuestas Incorrectas: ${5- cont_buenas}`) 
	}

function printQuestion(data){
	const i=0; 
	const category = data[i].category; 
	const difficulty = data[i].difficulty;
	const correct = data[i].correct_answer;
	const question = data[i].question; 
	$(".preguntas").empty(); 
	$(".preguntas").append(`
					<p id="category" class='quesInfo'><span class="la"><i class="fas fa-certificate"></i><b>Category :</b> </span>${category}</p>
					<p id="difficulty" class='quesInfo'><span class="la"><i class="fas fa-certificate"></i>Difficulty :</span> ${difficulty}</p>
					<p id="question">${question}</p>
					<div class="col-lg-4 col-lg-offset-2 divans btn answer"><p>True</p></div>
					<div class="col-lg-4 col-lg-offset-2 divans btn answer"><p>False</p></div>`)

	$(document).on('click', '.answer', (e) => {
		const event = e.target;
		const respuesta = $(event).text(); 
		if( respuesta == correct ){
			cont_buenas++
			console.log("buenas" + cont_buenas)
			$(".preguntas").empty(); 
			$(".preguntas").append(`<div class="dibujoCorrecto col-xs-8 col-xs-offset-2 col-lg-8 col-lg-offset-2">
						<p><i class="far fa-check-circle"></i></p>
						<p id="msg">Correct !!!</p>
					</div>
					<div>
						<button class="btn next">NEXT QUESTION</button>
					</div>`)
		}else{
			cont_malas++
			console.log("malas: " + cont_malas)
			$(".preguntas").empty()
			$(".preguntas").append(`<div class="dibujoCorrecto col-xs-8 col-xs-offset-2 col-lg-8 col-lg-offset-2">
						<p><i class="far fa-times-circle"></i></p>
						<p id="msg-inc"> Wrong !!!</p>
					</div>
					<div>
						<button class="btn next">NEXT QUESTION</button>
					</div>`)
		}
	})

	$(document).on('click', '.next', (e)=>{
			data.shift();
			console.log(data)
			$(".checkAns").css({'background-color' : 'white'})
			$(".dibujoCorrecto").addClass('escondida'); 
			$(".dibujoIncorrecto").addClass('escondida');
			$(".preguntas").empty();
			if(data.length<1){
				$("#endGame").removeClass('escondida')
				$(".preguntas").addClass('escondida')
			}else {
				printQuestion(data)
			}	 
	})
	if (cont_buenas>=3){
		$("#final").html(` Haz ganado :)  !!! `)
	}else{
		$("#final").html(` Haz perdido :(  !!! `)
	}
	return cont_buenas; 
	return cont_malas
	$("#respuestas_correctas").html(`Respuestas Correctas: ${cont_buenas}`)
	$("#respuestas_incorrectas").html(`Respuestas Incorrectas: ${cont_malas}`)

}