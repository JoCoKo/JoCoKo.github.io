var quote=null;
var  img=[];
var  countImg = 0;
var  imgDrawDone = false;


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
    var textBlock = canvas.getContext('2d');
    var  x=100;
    var  y=100;
    textBlock.fillStyle = 'white';
    textBlock.font = "italic 22pt cursive";
    textBlock.textAlign = "center";
    textBlock.textBaseline = "middle";
    var params = {textBlock:textBlock, text:quote, y:canvas.height / 2, maxLength:27, lineHeight:38};
    cutQuote(params);
    //console.log(quote);
  }
  else{
     setTimeout(drawQuote, 1);  
  }
}
function cutQuote(p){
  var textBlock=p.textBlock, text=p.text, y=p.y, maxLength=p.maxLength, lineHeight=p.lineHeight;
  var word = text.split(" "),
      wordsInArray = [],
      line=word[0],
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
    canvas.style.position= 'absolute';
    canvas.style.top= '50%';
    canvas.style.left= '50%';
    canvas.style.margin= '-300px 0 0 -300px';
    var ctx=canvas.getContext('2d');
    ctx.drawImage(img[0], 0, 0);
    ctx.drawImage(img[1], 0, 300);
    ctx.drawImage(img[2], 300, 0);
    ctx.drawImage(img[3], 300, 300);
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.getElementById("body").appendChild(canvas);
    imgDrawDone = true;


    var download = document.createElement('button');
    download.id = 'save';
    download.innerHTML = 'Сохранить';
    download.style.backgroundColor = 'rgba(0,0,0,0.5)';
    download.style.border = 'none';
    download.style.color =  'white';
    download.style.padding = '10px 25px';
    download.style.fontSize = '16px';
    download.onclick = function(){
      dataURL = canvas.toDataURL("jpg");
      link = document.createElement("a");
      link.href = dataURL;
      link.download = "quote.jpg";
      link.click();
    };
    download.style.position= 'absolute';
    download.style.top= '50%';
    download.style.left= '50%';
    download.style.margin= '301px 0 0 -300px';
  document.getElementById("body").appendChild(download);     
  } else{
      setTimeout(canvasCreate, 1);  
    }
}  

