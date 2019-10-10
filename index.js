/*

 Generate button  => field of n lis where n is max elements fit in window x y 

 how many fit? 
 x = (innerX - padding) / li width .floor
 y = (inner)y - nav+padding) li height .floor
 n = x*y
 
    test: 
        innerHeight = 667
        18 px on top 
        nav = 47 + 20 pad + 20 margin
        105 top 
        innerWidth = 1027
        body margin+padding = 18 ( x 2 for each side)
        ul width - 991 body 1011  ?

        li w x h = 110 x 110   
        w 48px font, 7 top btm padding, 10 margin 

        x = ( 1027 - 18(*2 ?) ) / 110  = 9
        y = (667 - 105) / 110 = 5.1
        x = Math.floor(( window.innerWidth - 36 )/110)
        y = Math.floor(( window.innerHeight - 105 )/110)

 gameplay:
    poopDestroy()
    touch poop destroys the poop and one bomb, 
    bombDestroy()
    touch bomb destroys all poop and itself 

    fieldCondition() ?
    if poop and bombs - playing
    if no poop but bombs - lose 
    if no bombs but poop - lose
    if nothing - win 

*/

//GENERATE 
let generateButton = document.getElementById("newGame")
let fieldUL = document.querySelector("#field")

generateButton.addEventListener("click", makeField)

makeField();

function makeField(){
  // delete current:
  while (fieldUL.firstChild) {
    fieldUL.removeChild(fieldUL.firstChild);
  };

  //solve for n
  x = Math.floor(( window.innerWidth - 36 )/110)
  y = Math.floor(( window.innerHeight - 105 )/110)
  let times = x*y;

  //make new
  for(let i=0; i < times; i++){
      let newLi = document.createElement("li")
      let test = Math.random()
      if (test > 0.2) {
          newLi.innerText = "💩";
          newLi.classList.add("poop");
      } else {
          newLi.innerText = "💣";
          newLi.classList.add("bomb");
      }
      fieldUL.append(newLi);
    };
  
  };

  //POOP + BOMB DESTROY 

  fieldUL.addEventListener("click", function(evt){
    if (evt.target.innerText === "💣") {
      evt.target.remove();
      poops = fieldUL.querySelectorAll(".poop");
      poops.forEach(e => {
          e.remove();
      });
      fieldCondition()
    } else if (evt.target.innerText === "💩") {
      evt.target.remove();
      bombs = fieldUL.getElementsByClassName("bomb");
      place = Math.floor(Math.random()*bombs.length);
      bombs[place].remove();
      fieldCondition()
    } else {};

  })

  //FIELD CONDITION

  function fieldCondition() {
    bombs = fieldUL.getElementsByClassName("bomb");
    poops = fieldUL.getElementsByClassName("poop");
    if (bombs.length > 0 && poops.length > 0) {
        // keep playing
    } else if (poops.length == 0 && bombs.length > 0) {
        Lose()
    } else if (bombs.length == 0 && poops.length > 0) {
        Lose()
    } else {
        Win()
    };
  }

  //DISPLAY WIN / LOSE

  function Lose() {
    over = document.getElementById("overlay");
    text = document.getElementById("text");
    text.innerText = "You really mucked this one up.";
    over.style.display = 'block';
    // alert("You failed.")
  }

  function Win() {
    over = document.getElementById("overlay");
    text = document.getElementById("text");
    text.innerText = "MUCK YEAH!";
    over.style.display = 'block';
    // alert("MUCK YEAH!")
  }

  function off() {
    makeField()
    document.getElementById("overlay").style.display = "none";

  }