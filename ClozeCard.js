//this file will define a node module that exports a constror for creating a cloze-deletion flashcard. 
//the construcor will accept two arguments: text, cloze. 


exports.Cloze= function(full, cloze) {

this.full=full;  //full text
this.cloze=cloze; //part removed
this.partial=function(full, cloze) {
if (!((this.full).includes(this.cloze))){
      console.log("error: cloze deletion does not appear in the input text...  Try again");
      
    }
    else{
var a=this.cloze.length;
var b=this.full.indexOf(this.cloze);
var pre=this.full.slice(0, b);
var post=this.full.slice(a+b);
this.partial=pre+"..."+post; //what remains
return this.partial;
  }
}
}

//Pre-set Question/Answers

exports.QA = [{
  full: "Trump is the current president",
  cloze: "Trump"
  }, 
  {
    full: "The last president was Obama", 
    cloze: "Obama"
  }];

// module.exports= ClozeCard;
