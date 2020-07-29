const quoteContainer=document.querySelector(".quote-container")
const quoteText=document.querySelector("#quote")
const quoteAuthor=document.querySelector("#author")
const twitter=document.querySelector("#twitter")
const nextQuote=document.querySelector(".new-quote")
const loader=document.querySelector("#loader")
function showLoader(){
    loader.hidden=false
    quoteContainer.hidden=true

}
function removeLoader(){
    if(!loader.hidden){
        quoteContainer.hidden=false
        loader.hidden=true
    }
}

let count=0;
//func to get Quote
showLoader()
async function getQuote(){
    const proxy="https://polar-atoll-52907.herokuapp.com/";
    const api="http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"

    try{
      
    const response= await fetch(proxy + api);
    const data= await response.json();

    if(data.quoteAuthor===""){
        quoteAuthor.innerHTML="unknown"
    }else{
    quoteAuthor.innerHTML=data.quoteAuthor
    }
    if(data.quoteText.length>120){
        quoteText.classList.add("long-text")
        }else{  
            quoteText.classList.remove("long-text")  
        }
        quoteText.innerHTML=data.quoteText
        removeLoader()
    console.log(data)
} catch (error)  {
   
   count++;
   if(count<5){
   getQuote()
   }else{
    console.log("error has occured ",error)
   }
   }
}
// tweet function
function openTwitter(){
    const text=quoteText.innerHTML
    const author=quoteAuthor.innerHTML
    const tweet=`https://twitter.com/intent/tweet?text=${text} - ${author}`
    window.open(tweet,"_blank")
}
//Event Listners
nextQuote.addEventListener("click",getQuote)
twitter.addEventListener("click",openTwitter)

// onload
getQuote()