var quote;


main();



function main(){
  getQuote();  
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