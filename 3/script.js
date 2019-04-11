var quote=null,
    img=[],
    countImg = 0;
    imgDrawDone = false;


main();



function main(){
  for (var i = 0; i < 4; i++){
    img[i] = new Image();
    img[i].crossOrigin="anonymous";
  }
  getImg();
  canvasCreate();
  getQuote();
  drawQuote();  
}

function getQuote(){
  $.ajax({
    url: "https://api.forismatic.com/api/1.0/",
    jsonp: "jsonp",
    dataType: "jsonp",
    data: {
      method: "getQuote",
      lang: "ru",
      format: "jsonp"
    }
  })
  .done(
      function(data) {
        quote = data.quoteText;
      }
  )
}
function drawQuote(){ 
  if (quote != null && imgDrawDone == true){
    var textBlock = canvas.getContext('2d'),
    x=100,
    y=100;
    textBlock.fillStyle = 'white';
    textBlock.font = "italic 22pt cursive";
    textBlock.textAlign = "center";
    textBlock.textBaseline = "middle";
    cutQuote(textBlock, quote, canvas.height / 2, 20, 40);
    //console.log(quote);
  }
  else{
     setTimeout(drawQuote, 1);  
  }
}
function cutQuote(textBlock, text, y, maxLength, lineHeight){
  var word = text.split(" "),
      wordsInArray = [];
      line=word[0];
      lineCount = 0;
  for (var i = 1; i < word.length; i++) {
    if ((line+word[i]).length<=maxLength) {
      line=line + " " + word[i];
    }
    else {
      wordsInArray[lineCount]=line;
      lineCount+=1;
      line=word[i];
    } 
  }
  x=y;
  y=y-((lineCount+1)/2)*lineHeight+lineHeight/2;
  wordsInArray[lineCount]=line;
  for (var i = 0; i <= lineCount; i++) {
    textBlock.fillText(wordsInArray[i],x,y);
    y+=lineHeight
  }
}
function getImg(){
  $.ajax({
    url: "https://api.codetabs.com/v1/proxy",
    data: {
      quest : 'https://api.unsplash.com/photos/random?' + 
              'client_id=933465127d14ea46669c666551d0beff366330c281578b65618f3a5be6b8869d' + '&count=4'
    }
  })
  .done(
    function(data) {
      for (var i = 0; i < 4; i++) {
        img[i].src = data[i].urls.raw + "&fit=crop&w=300&h=300";
        img[i].onload = function(){
          countImg++;
        };
      }             
   })
}

function canvasCreate(){
  if (countImg == 4){
    var  canvas = document.createElement('canvas');
    canvas.id = 'canvas'
    canvas.width = 600;
    canvas.height = 600;
    ctx=canvas.getContext('2d');
    ctx.drawImage(img[0], 0, 0);
    ctx.drawImage(img[1], 0, 300);
    ctx.drawImage(img[2], 300, 0);
    ctx.drawImage(img[3], 300, 300);
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.getElementById("body").appendChild(canvas);
    imgDrawDone = true; 
  } else{
      setTimeout(canvasCreate, 1);  
    }
}  

