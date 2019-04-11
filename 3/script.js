var quote=null,
    img=[],
    countImg = 0;
    quoteDone = false;


main();



function main(){
  for (var i = 0; i < 4; i++){
    img[i] = new Image();
    img[i].crossOrigin="anonymous";
  }
  canvasCreate();
  getQuote(); 
  getImg(); 
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
        quote.onload = function(){
          quoteDone = true;
        }
      }
  )
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
        img[i].src = data[i].urls.raw + "&fit=crop&w=200&h=200";
        img[i].onload = function(){
          countImg++;
        };
      }             
   })
}

function canvasCreate(){
    if (countImg == 4){
      for (var i = 0; i < 4; i++) {
        switch(i) {
          case 0:
            var  canvas = document.createElement('canvas');
            canvas.id = 'canvas'
            canvas.width = 400;
            canvas.height = 400;
            ctx=canvas.getContext('2d');
            ctx.drawImage(img[i], 0, 0);
            break;
          case 1:
            ctx.drawImage(img[i], 0, 200);
            break;
          case 2:
            ctx.drawImage(img[i], 200, 0);
            break;
          case 3:
            ctx.drawImage(img[i], 200, 200);
            ctx.fillStyle = "rgba(0,0,0,0.25)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            document.getElementById("body").appendChild(canvas);
            break;
        }
      } 
 
  } else{
      setTimeout(canvasCreate, 1);  
    }
}  

