var quote=null,
    img=[];


main();



function main(){
  for (var i = 0; i < 4; i++){
    img[i] = new Image();
    img[i].crossOrigin="anonymous";
  }
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
        //console.log(data);
        //console.log(quote);
        //document.getElementById('body').innerHTML=quote;
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
        //document.getElementById('body').innerHTML="<img src=" + img[i] + ">";
        switch(i) {
          case 0:
            ctx.drawImage(img[i], 0, 0);
            break;

          case 1:
            ctx.drawImage(img[i], 200, 0);
            break;

          case 2:
            ctx.drawImage(img[i], 200, 0);
            break;
          case 3:
            ctx.drawImage(img[i], 200, 200);
            break;
        }

      }             
   })
}
