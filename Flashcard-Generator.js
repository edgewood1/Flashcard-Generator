var Basic = require("./BasicCard"); //basiccard is the filename
var Cloze = require("./ClozeCard");

// dependency for inquirer npm package
var inquirer = require("inquirer");
var fs = require("fs");
var DisplayCard = new Cloze.Cloze(Cloze.QA[0].full, Cloze.QA[0].cloze);

var cardType;
var questionType;
var cloze1 = [];
var marker = 0;
var read = 0;


//////////////////////////////////Collect initial data: Game type and Question Type

inquirer
  .prompt([
    {
      type: "list",
      message: "Which study method do you prefer?",
      choices: ["Basic Card", "Cloze Card"],
      name: "cardType"
    },

    {
      type: "list",
      message: "Would you like to create your own questions or use ours?",
      choices: ["create your own questions", "use some of our questions"],
      name: "questionType"
    }
  ])
  .then(function(answers) {
    cardType = answers.cardType;
    questionType = answers.questionType;
    console.log(
      "So you've decided to use the " +
        cardType +
        " method in order to " +
        questionType
    );

    marker++;
    if (questionType[0]==="c") { 
    create();
      }
      else {
        use();
      }
  });

////////////////////////////////////////////////// CREATE YOUR OWN QUESTIONS

var count = 0;
function create() {
  if (marker == 1 && count < 2) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Type in a question to use",
          name: "full"
        },
        {
          type: "input",
          message: "Type in the portion of this statement that you would like to guess",
          name: "cloze"
        }
      ])
      .then(function(answers) {
        var obj = new Cloze.Cloze(answers.full, answers.cloze);
        cloze1.push(obj);
        create();
      });

    count++;
  } /// end if

  else if (count>=2){
    write();
  }
} // end create


/////////////////////////////////////////////////////////////////WRITE AND READ CREATED QUESTIONS
function write() {
  fs.writeFile("questions.json", JSON.stringify(cloze1), function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("questions saved!");
    console.log("Saved material:  "+cloze1);
    read1();
  });
}

function read1() {
  fs.readFile("questions.json", "utf8", function(error, data) {
    if (error) {
      return console.log("error: " + error);
    }
  
  obj = JSON.parse(data);

  console.log("Read material:    "+obj);
    });
    
  
}

//////////////////////////////////////////////////////////////////////USE OUR QUESTIONS

function use() {
 if (cardType[0]=="B")
 {
     console.log("Basic card chosen!")
      var count = 0;
      function basic() {

        if (count < 2) {
         var DisplayCard = new Basic.BasicCard(Basic.QA[count].q, Basic.QA[count].a);
          inquirer
            .prompt([
              {
                name: "name",
                message: DisplayCard.front
              }
            ])
            .then(function(answers) {
              if (answers.name === DisplayCard.back) {
                console.log("correct!");

                count++;
                // run the askquestion function again so as to either end the loop or ask the questions again
                basic();
              } 
                else {
                  console.log("wrong answer");
                  basic();
                    }
            });//functionanswers
        } //if count
        // else {
        //  end();

        // }
      }; // basic ends

      basic();
    } //if card type b 
    else {

/////////////////////////////////////////////////////////////////////////////////////// USE THEIR CREATED QUESTIONS

      console.log("Cloze card chosen!");
      var count = 0;
      function cloze () {

        if (count < 2) {

        var DisplayCard = new Cloze.Cloze(Cloze.QA[count].full, Cloze.QA[count].cloze);

        /// else oif cloze then new cloze card
          inquirer
            .prompt([
              {
                name: "name",
                message: DisplayCard.partial()
              }
            ])
            .then(function(answers) {
              if (answers.name === DisplayCard.cloze) {
                console.log("correct!");
                // DisplayCard.partial();

                count++;
                // run the askquestion function again so as to either end the loop or ask the questions again
                cloze();
              } else {
                console.log("wrong answer");
                console.log("the correct answer is: " + DisplayCard.cloze)
                cloze();
              }
            });
        } //if count
        // else {
        //  end();
        // }
      }; // cloze()

      cloze();

    }//if cloze card

  ////////////////////////////////
  
    } //ends use your own 


// /////////////////////////////////////////////////////////CLOZE

// function end() {
//  console.log("game over");
// };
