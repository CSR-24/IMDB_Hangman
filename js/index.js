var solution = ["_"], movie = [], strikeCount = 1, movieIndex = 0, checkCount = 0;

function eventFuncKeyDown(){
  return function(event){
    var regTest = new RegExp(/[A-Z]/);
    //if(regTest.test(_.toUpper(event.key))){
      document.getElementById(_.toUpper(event.key)).style.transform = 'scale(3,3)';
      document.getElementById(_.toUpper(event.key)).style.background = 'blue';
    //}
  }
}

function eventFuncKeyUp(){
  return function(event){
    var regTest = new RegExp(/[A-Z]/);
    //if(regTest.test(_.toUpper(event.key))){
      checkMatches(_.toUpper(event.key));
      document.getElementById(_.toUpper(event.key)).style.transform = 'scale(1,1)';
      document.getElementById(_.toUpper(event.key)).style.background = 'black';
   // }
  }
}

function stopListners(id){
  if (!id){
    $('.key').off('mouseup');
    $('.key').off('mousedown');
  } else {
    $('#'+id).off('mouseup');
    $('#'+id).off('mousedown');
    $('#'+id).style.background = 'red';
  }
  document.removeEventListener('keydown', eventFuncKeyDown());
  document.removeEventListener('keyup', eventFuncKeyUp()); 
}

function startListners(){
  $('.key').on('mouseup', function(){
    checkMatches(this.id);
    this.style.background = 'black';
    this.style.transform = 'scale(1,1)';
    stopListners(this.id);
  });

  $('.key').on('mousedown', function(){
    this.style.background = 'blue';
    this.style.transform = 'scale(3,3)';
  });

document.addEventListener('keydown', eventFuncKeyDown());
  document.addEventListener('keyup', eventFuncKeyUp()); 
}
function checkMatches(word){
  
   var match =  _.map(movie, function(value){
      if (value === word){
        checkCount++;
        return word;
      } else if (value === ' '){
        checkCount++;
        return '&nbsp;&nbsp;';
      } else {
        return '_';
      }
    });
  
  if((_.intersection(['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'], match)).length){
    document.getElementById(word).style.borderColor = 'yellow';
  } else {
    document.getElementById(word).style.borderColor = 'red';
    document.getElementById('strike'+strikeCount++).style.backgroundColor = 'red';
    if(strikeCount === 6){
      //getImdbMovies(); not working the ned logic!
    }
  }
  
    for(i =0; i< solution.length; i++){
      if (match[i] != '_'){  
        solution[i] = match[i];
      }
    }
  
    document.getElementById('game').innerHTML = '<h2>'+solution.join(' ')+'</h2>';
    checkSolution();
}

function checkSolution(){
  if(checkCount === movie.length){
    //getImdbMovies();
  }
}

function getImdbMovies(){
  var titleID = ['tt2082197','tt0109830', 'tt0112573', 'tt0119217', 'tt0111161', 'tt0468569', 'tt1375666', 'tt0816692', 'tt1049413', 'tt0892769', 'tt0758758', 'tt0075148'];
    $.ajax({
        url: "https://www.omdbapi.com/?i="+titleID[movieIndex++]+"&y=2012&r=json",
        crossDomain: true,
        dataType: "jsonp",
        success: function(data) {
/*             if (data.imdbRating < 7 ||data.Type != 'movie'){
              getImdbMovies();
            } */
            movie = _.toUpper(data.Title);
            document.getElementById('gameHint').innerHTML = '<h4>Plot:  '+data.Plot+'<br>Genre:  '+data.Genre+'<br>Release On:  '+data.Released+'</h4>';
            start();
        }
    });
}

function start(){
  startListners();
  for(i =1; i< movie.length;i++){
    if(movie[i] === ' '){
    //solution = solution.concat('&nbsp;&nbsp;');
      solution.push('&nbsp;&nbsp;');
    } else {
    //solution = solution.concat(' _');
      solution.push(' _');
    }
  }
  document.getElementById('game').innerHTML = '<h2>'+solution.join(' ')+'</h2>';
}

getImdbMovies();