//This file will define a Node module that exports a construor for creating basic flashcards.
//The constructor should accept two arguments
//front - contains text for front of card
//back - for back of card

exports.BasicCard = function(front, back) {
  this.front = front;
  this.back = back;
  // this.answer = answer;
}

// function Answer(name) {
// 	this.name;
// }

exports.QA = [
  {
    q: "What is one plus one?",
    a: "two"
  },
  {
    q: "What is five plus five?",
    a: "ten"
  }
];

// module.exports = BasicCard;




 