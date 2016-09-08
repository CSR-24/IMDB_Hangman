var moves = 1, winStreak = 1;// totalGames = 1;
function startListners(){
  $('.box').on('click', checkRule);
  $('#shuffle').on('click', function(){
    shuffleBoard();
  });
}

function refreshGrid(target, text){
  $(target).text(text);
}

function isValidPattern(pattern){
  var inversion = 0;
  for (i=0; i<9;i++){
    for (j=i+1;j<9;j++){
      if(pattern[i]!='-' && pattern[j]!= '-' && parseInt(pattern[i]) > parseInt(pattern[j])){
        inversion++;
      }
    }
  }
  if(inversion%2 === 0){ 
    return true;
  } else {
    return false;
  }
}


function shuffleBoard(){
  //$('#winStreak').text('Wins: '+winStreak+'/'+totalGames);
  $('#shuffle').css('background', 'white');
  $('#shuffle').css('color', 'black');
  $('#shuffle').html('<b>Shuffle Board</b>');
  var newBoardPattern = _.shuffle(['1', '2' , '3', '4', '5', '6', '7', '8', '-']);
  if(isValidPattern(newBoardPattern)){
    //totalGames++;
    $('.box').each(function(){
      var id = '#'+this.id;
      if ($(id).text() === '-'){
        $(id).css('background-color', 'steelBlue');
      }
    });
    $('#s1').text(newBoardPattern[0]);
    $('#s2').text(newBoardPattern[1]);
    $('#s3').text(newBoardPattern[2]);
    $('#s4').text(newBoardPattern[3]);
    $('#s5').text(newBoardPattern[4]);
    $('#s6').text(newBoardPattern[5]);
    $('#s7').text(newBoardPattern[6]);
    $('#s8').text(newBoardPattern[7]);
    $('#s9').text(newBoardPattern[8]);
    $('.box').each(function(){
      var id = '#'+this.id;
      if ($(id).text() === '-'){
        $(id).css('background-color', 'lightblue');
      }
    });
  startListners();
  checkGoal();
  $('#msg').text('Game Messages');
  $('#movesInc').text('Number Of Moves : 0');
  moves = 1;
  } else {
    shuffleBoard();
  }
}

function checkGoal() {
  var count = 0, loop = 1;
  $('.box').each(function(){
    var id = '#'+this.id, sid='#s'+this.id;
    if (parseInt($(id).text()) === loop++){
      $(id).css('color', 'yellow');
       $(sid).css('background', 'lightgreen');
      count++;
    } else {
      $(id).css('color', 'white');
       $(sid).css('background', 'white');
    }
  });
  if (count === 8){
     return true;
  } else {
     return false;
  }
}

function checkRule(){
  var sourceId = '#'+this.id;
  var sourceText =  $(sourceId).text();
  var targetText = '-';
  $('.box').each(function(){
    var id = '#'+this.id;
    if ($(id).text() === '-'){
      if (ruleEngine(sourceId, id)){
        refreshGrid(id, sourceText);
        $(id).css('background-color', 'steelBlue');
        refreshGrid(sourceId, targetText);
        $(sourceId).css('background-color', 'lightblue');
        updateMessage('Vaid Move : '+sourceText, 'darkBlue');
        if (checkGoal()){
          updateMessage('Puzzle Solved!', 'green');
          $('#winStreak').text('Wins: '+winStreak++);
          $('.box').off('click');
          $('#shuffle').css('background', 'red');
          $('#shuffle').css('color', 'white');
          $('#shuffle').html('<b>Press Me!</b>');
        }
        $('#movesInc').text('Number Of Moves : '+moves++);
      } else if (sourceId != id) {
        updateMessage('Invaid Move!', 'Red');
      }
      return false;
    } 
  });
}

function ruleEngine(sourceId, targetId){
  switch(targetId){
    case '#s9':
      if (sourceId === '#s8' || sourceId === '#s6'){
        return true;
      } else {
        return false;
      }
    case '#s8':
      if (sourceId === '#s7' || sourceId === '#s9' || sourceId === '#s5'){
        return true;
      } else {
        return false;
      }
    case '#s7':
      if (sourceId === '#s8' || sourceId === '#s4'){
        return true;
      } else {
        return false;
      }
    case '#s6':
      if (sourceId === '#s3' || sourceId === '#s5' || sourceId === '#s9'){
        return true;
      } else {
        return false;
      }
    case '#s5':
      if (sourceId === '#s2' || sourceId === '#s4' || sourceId === '#s8' || sourceId === '#s6'){
        return true;
      } else {
        return false;
      }
    case '#s4':
      if (sourceId === '#s1' || sourceId === '#s7' || sourceId === '#s5'){
        return true;
      } else {
        return false;
      }
    case '#s3':
      if (sourceId === '#s2' || sourceId === '#s6'){
        return true;
      } else {
        return false;
      }
    case '#s2':
      if (sourceId === '#s1' || sourceId === '#s3' || sourceId === '#s5'){
        return true;
      } else {
        return false;
      }
    case '#s1':
      if (sourceId === '#s2' || sourceId === '#s4'){
        return true;
      } else {
        return false;
      }
  }
}

function startGame(){
  startListners();
  shuffleBoard();
  checkGoal();
  $('#msg').text('Game Messages');
  $('#movesInc').text('Number Of Moves : 0');
  moves = 1;
}

function updateMessage(msg, color){
  $('#msg').html(msg);
  $('#msg').css('color', color);  
}

startGame();