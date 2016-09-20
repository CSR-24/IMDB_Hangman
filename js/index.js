var movieIndex = 0, 
    queryCount = 0,
    matchIndex = 0, 
    movie = "", 
    strikeCount = 0, 
    movieIndex = 0, 
    checkCount = 0, 
    match = "", 
    spaceCount = 0,
    scoreCount = 0,
    matched =  false,
    posImage = undefined,
    poster = "",
    movieCount,
    titleIDHolly;

$('.country').on('click', function(){
  if (this.value === 'us') {
    titleIDHolly = _.shuffle(['tt1596363','tt1386697','tt3110958','tt4196776','tt2674426','tt0816692', 'tt0111161', 'tt0110912', 'tt1375666', 'tt0133093', 'tt0118799', 'tt0120815', 'tt0816692', 'tt0407887','tt0088763', 'tt0482571', 'tt0435761', 'tt0086250', 'tt0119217', 'tt0758758', 'tt1392190', 'tt2024544','tt2278388', 'tt0083987', 'tt1663202']);
  } else {
   titleIDHolly = _.shuffle(['tt5165344','tt4387040','tt4559046','tt5074352',
  'tt3863552','tt5713232','tt1188996','tt4900716','tt4814290','tt1954470',
  'tt0422091','tt2350496','tt0315642','tt1375789','tt4399594',
  'tt5255710','tt4430212','tt5943306','tt1187043', 'tt3767372', 'tt2882328', 'tt2077833', 'tt0292490', 'tt1821480', 'tt5005684', 'tt0405508', 'tt3322420', 'tt0367110', 'tt1280558', 'tt1438298', 'tt0449951', 'tt0073707', 'tt2224317', 'tt3495030', 'tt0800956']);
  }
    movieCount = titleIDHolly.length;
    $('#startScreen').hide();
    getImdbMovies();
});

function up(id){
  document.getElementById(id).style.transform = 'scale(1,1)';
  if (checkMatches(id) === true){
    document.getElementById(id).style.background = 'green';
  } else {
    document.getElementById(id).style.background = 'red';
  }
  $('#'+id).off('mousedown');
  $('#'+id).off('mouseup');
  checkGoal();
}

function down(id){
    document.getElementById(id).style.background = 'blue';
    document.getElementById(id).style.transform = 'scale(3,3)';
}

function startListners(){
  $('.key').off('mouseup').on('mouseup', function(){
    up(this.id);
  });
  
  $('.key').off('mousedown').on('mousedown', function(){
    down(this.id);
  });

  $('#confirmNext').off('click').on('click', function(){
    restore();
    getImdbMovies(); 
  });
  
  $('#confirmGameOver').off('click').on('click', function(){
     location.reload();
  });
  
  document.addEventListener('keydown', function(event){
    down(_.upper(event.key));
  });
  
  document.addEventListener('keyup', function(event){
    up(_.upper(event.key));
  });
}

function checkMatches(letter){
  if (_.includes(movie, letter)){
     for (index = 0; index < movie.length; index++){
       if(movie[index] === letter){
          match[index] = letter;
          matchIndex++;
          document.getElementById('game').innerHTML = '<h2>'+match.join(' ')+'</h2>';
       }
     }
     return true;
  } else {
    if (strikeCount === 3){
      document.getElementById("gameMsg").innerHTML = "<h4>Wrong Guess !</h4>";
      document.getElementById('strike'+strikeCount).style.backgroundColor = 'red';
      $('#confirmNext').show();
      document.getElementById('confirmNext').innerHTML = "You've Guessed it Wrong. <h4>Movie <h5>"+movie+"</h4><h5>(Click to Guess Next)</h5>";
      $('.key').off('mouseup');
      $('.key').off('mousedown');
    } else {
      document.getElementById("gameMsg").innerHTML = "<h5>Read the plot and guess the movie in "+(3-strikeCount)+" attempt(s)</h5>";
      document.getElementById('strike'+strikeCount++).style.backgroundColor = 'red';
    }
    
    if (movieCount === movieIndex){
      document.getElementById("gameMsg").innerHTML = "<h4>Game Over !</h4>";
      $('#confirmGameOver').show();
      gameOver();
    }
    
    return false;
  }
}

function gameOver(){
document.getElementById('confirmGameOver').innerHTML = "<h3>Game Over!</h3><h4>You've guessed "+scoreCount+" of "+(titleIDHolly.length)+" Movies.<ul class='share'><li>Share On: </li><li><a href='https://www.facebook.com/sharer/sharer.php?u=http://codepen.io/CSR-89/pen/EgjNKr' title='Share on Facebook' target='_blank'><img class='share-btn' src='http://vafopoulos.org/sites/default/files/imageblock/facebook.png'></a></li><li><a href='https://plus.google.com/share?url=http://codepen.io/CSR-89/pen/EgjNKr' target='_blank' title='Share on Google+'><img class='share-btn' src='http://www.beaconplumbing.net/images/Plumbers-Seattle.png'></a></li></ul></h4>";
}

function restore(){
  
  spaceCount = 0;
  matchIndex = 0; 
  movie = [];
  strikeCount = 0; 
  checkCount = 0;
  match = [];
  
  $('.key').each(function(){
    if (this.style.background != 'black'){
      this.style.background = 'black';
    }
  });
  
  $('.strike').each(function(){
    if (this.style.background != 'lightgreen'){
      this.style.background = 'lightgreen';
    }
  });
}

function checkGoal(){
  if (!_.includes(match, ' _')){
    if (!matched){
      scoreCount++;
      matched = true;
    }
    $('#confirmNext').show();
    document.getElementById('confirmNext').innerHTML = "Well Done! You've Guessed it Right. <h4>Movie <h5>"+movie+"</h4><h5>(Click to Guess Next)</h5>";
    
/* //Tried this but failed!

    posImage = document.createElement("img");
    posImage.setAttribute("src", poster);
    posImage.setAttribute("height", "100");
    posImage.setAttribute("width", "100");
    document.getElementById("poster").appendChild(posImage); */
    /* document.getElementById("posterHolder").innerHTML = "<img src='"+poster+"' height='100' width='100'>"; */
    document.getElementById("gameMsg").innerHTML = "<h4>Correct Guess!</h4>";
  }
}

function getImdbMovies(){
    $('#confirmNext').hide();
    $('#confirmGameOver').hide();
    if (posImage) {
      document.getElementById("poster").removeChild(posImage);
    }
    document.getElementById("gameMsg").innerHTML = "<h5>Read the plot and guess the movie in 4 attempt(s)</h5>";
    document.getElementById('game').innerHTML = '<h2>Loading...</h2>';
    document.getElementById('gameHint').innerHTML = '<h4>Loading...</h4>';
    $.ajax({
        url: "https://www.omdbapi.com/?i="+titleIDHolly[movieIndex++]+"&r=json",
        crossDomain: true,
        dataType: "jsonp",
        success: function(data) {
          poster = data.Poster;
          queryCount++;
          movie = _.toUpper(data.Title);
          document.getElementById('gameHint').innerHTML = '<h4>Plot:</h4><h5> '+data.Plot+'</h5>';
          start();
        },
        error: function(){
             document.getElementById('game').innerHTML = '<h2>Network Error</h2><h3>. Check your Internet Connection - Refresh the Page.</h3><h4>Your Score so far:'+scoreCount+"/"+(titleIDHolly.length)+'</h4>';
        }
    });
}
  
  
function start(){
  match = [];
  matched = false;
  startListners();
  for(i =0; i< movie.length;i++){
    if(movie[i] === ' '){
      spaceCount++;
      match.push('&nbsp;&nbsp;');
    } else {
      match.push(' _');
    }
  }
  document.getElementById('game').innerHTML = '<h2>'+match.join(' ')+'</h2>';
  document.getElementById('scoreCard').innerHTML = "<h3>Score: "+scoreCount+"/"+(titleIDHolly.length)+"</h3>";
}