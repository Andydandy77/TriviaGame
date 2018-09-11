$(document).ready(function() {

    var question1 = {

        question: "Which household possesses the banner of a moon and a falcon?",
        answers: ["House Greyjoy", "House Arryn", "House Lannister", "Karstark"],
        answer: "House Arryn",
        image: "assets/images/q1.jpg"


    }

    var question2 = {
        question: "What were the names of Aegon Targaryen's three dragons that Dany named her ships after?",
        answers: ["Balerion, Drogon, and Viserion", "Meraxes, Rhaegal, and Vhagar", "Rhaegal, Drogon, and Viserion", "Meraxes, Vhagar, and Balerion"],
        answer: "Rhaegal, Drogon, and Viserion",
        image: "assets/images/q2.jpg"

    }

    var question3 = {
        question: "What was the name of Ned Stark's Valyrian steel sword?",
        answers: ["Ice", "Longclaw", "Hearteater", "Needle"],
        answer: "Ice",
        image: "assets/images/q3.jpg"
    }

    var question4 = {
        question: "What was the name of Arya's direwolf?",
        answers: ["Lady", "Grey Wind", "Summer", "Nymeria", "Snow"],
        answer: "Nymeria",
        image: "assets/images/q4.png"

    }

    var question5 = {
        question: "How did Daenerys Targaryen eventually hatch her dragon eggs?",
        answers: ["In a lightning storm", "In a funeral pyre", "In a fireplace", "In a frozen cave"],
        answer: "In a funeral pyre",
        image: "assets/images/q5.png"

    }

    var question6 = {
        question: "The phrase 'Valar Morghulis' or 'all men must die' is usually responded with:",
        answers: ["Valar Dohaeris or 'all men must serve'", "Valar Rohnas or 'all men must live'", "Valar GoGo or 'all men must dance'", "Valar Donaris or 'all men must struggle"],
        answer: "Valar Dohaeris or 'all men must serve'",
        image: "assets/images/q6.jpg"
    }

    var question7 = {
        question: "Besides dragonglass, what is the only other substance capable of defeating White Walkers?",
        answers: ["Weirdwood", "Wildfire", "Valyrian Steel", "Snowballs"],
        answer: "Valyrian Steel",
        image: "assets/images/q7.jpg"
    }

    var question8 = {
        question: "How many arrows does Ramsay Bolton let loose at Rickon Stark?",
        answers: ["Three", "Five", "Two", "Four"],
        answer: "Four",
        image: "assets/images/q8.jpg"

    } 

    var question9 = {
        question: "Dead creatures revived by White Walkers are known as:",
        answers: ["Walkers", "Wights", "Zombie", "Claws"],
        answer: "Wights",
        image: "assets/images/q9.jpg"
    } 


    var question10 = {
        question: "Why was Jorah Mormont exiled from Westeros?",
        answers: ["For trading slaves", "For killing his wife", "For buying slaves", "For being a slave"],
        answer: "For trading slaves",
        image: "assets/images/q10.jpg"

    }

    var timer = {
        time : 0,
        clockRunning: false,
        intervalId: null,
        secondary : false,
        

        start : function(time) {
            timer.time = time;
            console.log("start")
            if (!timer.clockRunning) {
                console.log("secondary" + timer.secondary);
                if (!timer.secondary) {
                    $("#timer").text("Time Remaining: " + timer.time);
                }


                timer.intervalId = setInterval(timer.count, 1000);
                
                clockRunning = true;
              }

        },

        stop : function() {
            clearInterval(timer.intervalId);
            timer.clockRunning = false;
        },

        reset : function() {
            this.start(31);

        },

        count : function() {
            console.log(timer.time);
            timer.time--;
            if (!timer.secondary) {
                $("#timer").text("Time Remaining: " + timer.time);
            }
            if(timer.time === 0 && !timer.secondary) {
                timer.stop();
                game.afterChoice(true, true);
                game.numberUnanswered++;
           } else if (timer.time === 0 && timer.secondary) {
               timer.stop();
               timer.reset();
               console.log(game.currentQuestion);
               $("#srcImg").hide();

            if (game.currentQuestion !== 2) {
                console.log("not done yet")
                game.displayQuestion(game.currentQuestion);
                timer.secondary = false;
            } else {
                timer.secondary = false;
                game.showResults();

            }
             
           }

        
        },
    }




    var game = {

        question : null,
        answer : null,
        numberCorrect : 0,
        numberWrong : 0,
        numberUnanswered : 0,
        currentQuestion: 0,
        

        questions: [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10],



        randomizeQuestions : function() {
            var currentIndex = this.questions.length, temporaryValue, randomIndex;

            while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = this.questions[currentIndex];
            this.questions[currentIndex] = this.questions[randomIndex];
            this.questions[randomIndex] = temporaryValue;

            }
        },


        displayQuestion : function(index) {
            this.question = this.questions[index];
            this.answer = this.question.answer;
            //console.log(this.question);
            //console.log(this.answer);
           $("#question").text(this.question.question);

            $("#a1").text(this.question.answers[0]);
            $("#a1").css("display","block");
            $("#a2").text(this.question.answers[1]);
            $("#a2").css("display","block");
            $("#a3").text(this.question.answers[2]);
            $("#a3").css("display","block");
            $("#a4").text(this.question.answers[3]);
            $("#a4").css("display","block");

        },

        submitAnswer : function(answer) {
            // console.log(answer);
            // console.log(this.answer);
            // console.log(answer === this.answer);

            var correct = (answer === this.answer);
            if (answer === this.answer) {
                this.numberCorrect++;
                console.log(this.numberCorrect);


            } else {
                this.numberWrong++;
                console.log(this.numberWrong);

            }

            this.afterChoice(correct,false);
        },

        afterChoice : function(correct, timeOut) {
            //console.log("I was called");
            if (!timeOut) {
                if (correct) {

                    $("#question").text("Correct!");
                    
                } else {
                    $("#question").text("Incorrect! The correct answer was " + this.answer + "!");
                }

            } else {
                $("#question").text("You ran out of time! Godspeed!");

            }
            $("#srcImg").attr("src", this.question.image);
                $("#srcImg").css("display", "block");
                $("#a1").css("display", "none");
                $("#a2").css("display", "none");
                $("#a3").css("display", "none");
                $("#a4").css("display", "none");
                timer.secondary = true;
                timer.start(1);
                console.log("updating question number")
                game.currentQuestion++;

        },

        showResults : function() {
            timer.stop();
            var variableText = "";
            if (game.numberCorrect >= 5) {
                variableText = "You have brought great honor to your house and your family! Play again if you please, young apprentice!"
            } else {
                variableText = "However, you must be a bastard son to be so half-witted. Go home and study with Maester Aemon and try again."
            }
            $("#question").text("Congratulations Westerosi, you completed the test. " + variableText);

            var correct = $("<h2>Correct: </h2>");
            correct.append(game.numberCorrect);
            var incorrect = $("<h2>Incorrect: </h2>");
            incorrect.append(game.numberWrong);
            var unanswered = $("<h2>Unanswered: </h2>");
            unanswered.append(game.numberUnanswered);

            $("#question").append("<br>");
            $("#question").append(correct);
            $("#question").append(incorrect);
            $("#question").append(unanswered);

            var playAgain = $("button");
            playAgain.text("Play Again?");
            
            playAgain.show();
            playAgain.css("display", "block");
            
            console.log("button is " + playAgain);

            game.currentQuestion = 0;
            game.numberCorrect = 0;
            game.numberWrong = 0;
            game.numberUnanswered = 0;
            $("#question").append(playAgain);
            




        }



    }


    $("button").on("click", function() {
        console.log("play");
        $("button").hide();
        
        game.randomizeQuestions();

           
  
            game.displayQuestion(0);
            timer.start(30);
            

            $("#a1").unbind().on("click", function() {
                timer.stop();
                var answer = game.question.answers[0];
                console.log(answer);
                game.submitAnswer(answer);
    
            });

            $("#a2").unbind().on("click", function() {
                timer.stop();
                var answer = game.question.answers[1];
                console.log(answer);
                game.submitAnswer(answer);
        

            });

            $("#a3").unbind().on("click", function() {
                timer.stop();
                var answer = game.question.answers[2];
                console.log(answer);
                game.submitAnswer(answer);


            });

            $("#a4").unbind().on("click", function() {
                timer.stop();
                var answer = game.question.answers[3];
                console.log(answer);
                game.submitAnswer(answer);


            });


    });



























    
});