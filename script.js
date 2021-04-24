
$(document).ready(function(){
  var timer = 0;
  var time;
  var interval = 1000;
  var ctime;
 
var x; 
var set_1 = 0;
var set_2 = 0;
var id_1 = 0;
var id_2 = 0;
var set_value_1 = 0;
var set_value_2 = 0;
var result = 0;
var error = 0;  

function all_black(a,b){
  $("#box-"+a).addClass("black");
  $("#box-"+b).addClass("black");
  return 0;
}
function remove(a,b){
  $("#box-"+a).off("click");
  $("#box-"+b).off("click");
  return 0;
}
function reset(){
      id_1 = 0;
      id_2 = 0;
      set_value_1 = 0;
      set_value_2 = 0;
      set_1 = 0;
      set_2 = 0;
  return 0 ;
}
function check(a,b){
  if (set_1 == 0) {
    set_1 = 1;
    id_1 = b;
    set_value_1 = a;
  }
  else if(set_2 == 0 && b!= id_1){
    set_value_2 = a;
    set_2 =1;
    id_2 = b;
    if(set_value_1 === set_value_2){
      result++;
      if(result === x){
        result = 0;
        
        setTimeout(function() {
          clearInterval(ctime);
          resultBoard();
          }, 1000);
        
      }
      remove(id_1,id_2);
      reset();
    }
    else{
      error++;
      //document.getElementById("myAudioError").play();
      //$("#myAudioError").play();
      all_black(id_1,id_2);
      reset();      
    }
  }
  return 1;
}
function generate_handler(i){
    return function(event){
      $(`#box-${i}`).toggleClass("black");
      check($("#box-"+i).text(),i);
    }
  }
  function addNumber(r,a1){ 
    $(`#box-${a1}`).text(r);
    return 1;
  }
   function startGame(x){
    ctime = setInterval(function(){
      time = Math.floor(timer/60) ? Math.floor(timer/60) + " min " + timer%60 + " sec" :  timer%60 + " sec";
      $(".score-container h2 span").text(time);
      timer = timer + 1;
      
    },interval); 
     for(var i=1;i<=x*2;i++){
     $(`#box-${i}`).bind("click",generate_handler(i));
    }
  //  // Creating x random numbers to store in an array
     var random_array = [];
     var number_assign = [];
     for(var i=0; i<x;i++){
       var a = Math.floor((Math.random() * 10) + 1);
       var b = Math.floor((Math.random() * 10) + 1);
       random_array[i] = a*b; 
     }
     //Assigned numbers
   for(var i=0; i<x; i++){
        number_assign[i*2] = random_array[i];
        number_assign[i*2+1] = random_array[i];
     }
     //Shuffled Duplicate Numbers
     for (let index = 0; index < x*2 - 1; index++) {
      let maxIndex = x*2 - 1;
      let minIndex = index + 1;
      let swapIndex = Math.floor(Math.random() * (maxIndex - minIndex)) + minIndex;
      let tmp = number_assign[index];
      number_assign[index] = number_assign[swapIndex];
      number_assign[swapIndex] = tmp;
    }
    for(var i=0; i<x*2; i++){
      addNumber(number_assign[i],i+1);
   }
 }
   function createBox(x){
     for(var i=1;i<=x*2;i++){
     var newElement = `<div class='box black unselectable' id='box-${i}'></div>`;  
     $(".game-container-1").append(newElement);
   }
     return 0;
   }
   function game(){
     
    $(".start-game").css("display","none");
    x = Math.floor((Math.random() * 10) + 1);
    createBox(x);
    startGame(x);
   }
   function resultBoard(){
    $('.end-game').css("display","flex");
    $('.total_time').text("Your total time is "+time);
    $('.reload').click(()=>{
      clearInterval(ctime);
      timer = 0;
      $('.end-game').css("display","none");
      $('.game-container-1').remove();
      var newElement = `<div class='game-container-1'></div>`;
      
      $('.container').append(newElement);
      reset();
      game();
    });
}
  $(".start-game .button").click(function(){
    game();
  });
});