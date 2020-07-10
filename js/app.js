document.addEventListener('DOMContentLoaded', function () {

	// Format question
	function FormatQuestion(text, options, answer) {
		this.text = text;
		this.options = options;
		this.answer = answer;
	}
	// If option is correct answer then return true
	FormatQuestion.prototype.correctAnswer = function (option) {
		return this.answer === option;
	};
	// Format questionnaire
	function Questionnaire(questions) {
		// Array of questions
		this.questions = questions;
		// Start quiz with the first question
		this.questionIndex = 0;
		this.score = 0;
	}
	Questionnaire.prototype.currentQuestion = function () {
		return this.questions[this.questionIndex];
	};
	Questionnaire.prototype.checkAnswer = function (answer) {
		if (this.currentQuestion().correctAnswer(answer)) {
			this.score++;
		}
		this.questionIndex++;
	};
	// Check if quiz end is reached
	Questionnaire.prototype.isOver = function () {
		// Return TRUE only after last question
		return this.questionIndex >= this.questions.length;
	};
	// Format questionnaire
	var QuestionnaireFormat = {
		displayNext: function () {
			if (quiz.isOver()) {
				this.showResults();
			} else {
				this.displayQuestion();
				this.displayOptions();
				this.displayState();
				this.displayScore();
			}
		},
		displayQuestion: function () {
			this.fillingWithText('table', quiz.currentQuestion().text);
		},
		displayOptions: function () {
			var options = quiz.currentQuestion().options;
			// Display all options
			for (var i = 0; i < options.length; i++) {
				var optionId = 'option' + i;
				var optionText = options[i];
				this.fillingWithText(optionId, optionText);
				this.checkAnswerOrganizer(optionId, optionText);
			}
		},
		checkAnswerOrganizer: function (id, guess) {
			var button = document.getElementById(id);
			button.onclick = function () {
				quiz.checkAnswer(guess);
				QuestionnaireFormat.displayNext();
			}
		},
		displayScore: function () {
			var scoreText = 'Score: ' + quiz.score;
			this.fillingWithText('score', scoreText);
		},
		displayState: function () {
			var questionNumber = quiz.questionIndex + 1;
			var totalQuestions = quiz.questions.length;
			var showState = 'Page ' + questionNumber + ' of ' + totalQuestions;
			this.fillingWithText('page', showState);
		},
		showResults: function () {
			var grade = quiz.score / quiz.questions.length;
			var results = '<h1>';

			results += '<h1>Final score: <br><br>' + quiz.score + ' points</h1>';
			if (grade >= 0.8) {
				results += '<h2><br>Congratulations!<br>The result shows that you know how to repair your car!</h2>';
			} else if (grade < 0.8 && grade > 0.5) {
				results += '<h2><br>The result shows that you need to read more about car maintenance!</h2>';
			} else {
				results += '<h2><br>The result shows that you have not read anything about car maintenance!</h2>';
			}
			results += '<br><button id="reset">Try Again?</button>';
			this.fillingWithText('questionnaire', results);
			this.resetQuestionnaire();
		},
		resetQuestionnaire: function () {
			var resetBtn = document.getElementById('reset');
			// Restart from the beginning
			resetBtn.onclick = function () {
				window.location.reload(false);
			}
		},
		fillingWithText: function (id, content) {
			var element = document.getElementById(id);
			element.innerHTML = content;
		}
	};
	// Create questions
	var questions = [
		new FormatQuestion('Who has the role of lubricating the engine?', ['Oil', 'Petrol', 'Water', 'Ethanol'], 'Oil'),
		new FormatQuestion('What is the name of the system which gets a car started?', ['Transmission', 'Ignition', 'Exhaust', 'Cooling'], 'Ignition'),
		new FormatQuestion('Which car part converts mechanical energy into electricity?', ['Compressor', 'Carburettor', 'Alternator', 'Fan'], 'Alternator'),
		new FormatQuestion('Which part of the car sprays fuel into the combustion chamber?', ['Filter', 'Piston', 'Pump', 'Injector'], 'Injector'),
		new FormatQuestion('What is the purpose of using the muffler to a car?', ['Reduce noise', 'Convert toxins', 'Eliminates toxins', 'Cools gases'], 'Reduce noise'),
		new FormatQuestion('What is the cause for vibration during light braking?', ['Faulty brake pedal', 'Warped rotors', 'Defective brake pads', 'Sticking caliper'], 'Warped rotors'),
		new FormatQuestion('What device has the role of cooling the engine?', ['Heater', 'Compressor', 'Radiator', 'Sunroof'], 'Radiator'),
		new FormatQuestion('What are the main ingredients for running an engine?', ['Belt, fuse, compressor', 'Pivot, tire, suspension', 'Ethanol, light bulb, fan', 'Fuel, oil, cooling liquid'], 'Fuel, oil, cooling liquid'),
		new FormatQuestion('What should we disconnect when a short circuit occurs?', ['Battery', 'Alternator', 'Pump', 'Starter'], 'Battery'),
		new FormatQuestion('Which is the fluid to be replaced after every 10,000 km?', ['Brake fluid', 'Motor oil', 'Petrol', 'Gearbox oil'], 'Motor oil')
	];
	// Questionnaire initialization
	var quiz = new Questionnaire(questions);
	QuestionnaireFormat.displayNext();

});