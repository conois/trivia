$(document).ready( ()=>{
	
	$("#btnStart").click( () =>{ 
		$(".presentation").hide(); 
		$(".preguntas").removeClass("escondida"); 
		})

	$("#trueFalse").click( () => {
		console.log("true/false"); 
		let url = 'https://opentdb.com/api.php?amount=10&type=boolean'; 
		trueFalse(url)
	})

	$("#multiple").click( () =>{
		console.log(" multiple ")
		let url = 'https://opentdb.com/api.php?amount=10&type=multiple';
		multiple(url);
	})

})


function trueFalse(url){
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
					<p id="category" class="la"> ${category}</p>
					<p id="difficulty" class="la"> ${difficulty}</p>
					<p id="question" class="la">${question}</p>
					<ul id="response" class="la">
						<li id="ans_1" class="btn checkAns answer">${inc_0}</li>
						<li id="ans_2" class="btn checkAns answer">${correct}</li>
						<li id="ans_3" class="btn checkAns answer">${inc_1}</li>
						<li id="ans_4" class="btn checkAns answer">${inc_2}</li>
					</ul>

					<button class="btn next">Next</button>

					<div class="dibujoCorrecto escondida">
						<p>correcto</p>
					</div>

					<div class="dibujoIncorrecto escondida">
						<p>Incorrecto</p>
					</div>
				</div>`)

	$(".next").click( ()=>{
		$(".checkAns").css({'background-color' : 'white'})
		$(".dibujoCorrecto").addClass('escondida'); 
		$(".dibujoIncorrecto").addClass('escondida');
		results.shift();
		console.log(results);
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

	$(".preguntas").append(`<p id="category" class="la"> ${category}</p>
													<p id="difficulty" class="la"> ${difficulty}</p>
													<p id="question" class="la">${question}</p>
													<div class="col-lg-4 col-lg-offset-2 divans btn">TRUE</div>
													<div class="col-lg-4 col-lg-offset-2 divans btn">FALSE</div>
													<button class="btn next">Next</button>
													<div class="dibujoCorrecto escondida">
														<p>correcto</p>
													</div>

													<div class="dibujoIncorrecto escondida">
														<p>Incorrecto</p>
													</div>`)

$(".next").click( ()=>{
		
		$(".dibujoCorrecto").addClass('escondida'); 
		$(".dibujoIncorrecto").addClass('escondida');
		data.shift();
		console.log(data);
		$(".preguntas").empty();
		if(data.length<1){
			$("#endGame").removeClass('escondida')
			$(".preguntas").addClass('escondida')
		}else {
			printQuestion(data)
		}
		 
	})

}
