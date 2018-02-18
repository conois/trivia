$(document).ready( ()=>{
	
	$("#trueFalse").click( () => {
		$("#trueFalse p").append(`<i class="fas fa-check-square"></i> 
															<span>GO ! </span>`)
		setTimeout( () =>{
			let url = 'https://opentdb.com/api.php?amount=10&type=boolean'; 
			trueFalse(url)
		}, 2500)	
	})

	$("#multiple").click( () =>{
	$("#multiple p").append(`<i class="fas fa-check-square"></i>
														<span> GO ! </span>`)
		setTimeout( () =>{
			let url = 'https://opentdb.com/api.php?amount=10&type=multiple';
			multiple(url);
		}, 2500)
	})

});


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
	let results = data;
	let i=0; 
	let category = results[i].category;
	let difficulty = results[i].difficulty; 
	let question = results[i].question;
	let correct= results[i].correct_answer; 
	let inc_0=results[i].incorrect_answers[0]; 
	let inc_1=results[i].incorrect_answers[1]; 
	let inc_2=results[i].incorrect_answers[2]; 

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
		let event = e.target;
		let respuesta = $(event).text();

		if( respuesta == correct ){
			$(".preguntas").empty(); 
			$(".preguntas").append(`<div class="dibujoCorrecto col-xs-8 col-xs-offset-2 col-lg-8 col-lg-offset-2">
						<p><i class="far fa-check-circle"></i></p>
						<p id="msg">Correct !!!</p>
					</div>
					<div>
						<button class="btn next">NEXT QUESTION</button>
					</div>`)
		}else{
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
		results.shift(); 
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
	}


function printQuestion(data){
	let i=0; 
	let category = data[i].category; 
	let difficulty = data[i].difficulty;
	let correct = data[i].correct_answer;
	let question = data[i].question; 

	$(".preguntas").append(`
					<p id="category" class='quesInfo'><span class="la"><i class="fas fa-certificate"></i><b>Category :</b> </span>${category}</p>
					<p id="difficulty" class='quesInfo'><span class="la"><i class="fas fa-certificate"></i>Difficulty :</span> ${difficulty}</p>
					<p id="question">${question}</p>
					<div class="col-lg-4 col-lg-offset-2 divans btn answer"><p>True</p></div>
					<div class="col-lg-4 col-lg-offset-2 divans btn answer"><p>False</p></div>`)

	$(document).on('click', '.answer', (e) => {
		let event = e.target;
		let respuesta = $(event).text();

		if( respuesta == correct ){
			$(".preguntas").empty(); 
			$(".preguntas").append(`<div class="dibujoCorrecto col-xs-8 col-xs-offset-2 col-lg-8 col-lg-offset-2">
						<p><i class="far fa-check-circle"></i></p>
						<p id="msg">Correct !!!</p>
					</div>
					<div>
						<button class="btn next">NEXT QUESTION</button>
					</div>`)
		}else{
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
}