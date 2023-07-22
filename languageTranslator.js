const fromText=document.querySelector(".from-text");
const toText=document.querySelector(".from-to");
const selectTag=document.querySelectorAll("select"),
exchangeIcon=document.querySelector(".exchange"),
translateBtn=document.querySelector("button"),
icons=document.querySelectorAll(".row i");

selectTag.forEach((tag,id) =>{
 for(const country in countries){
let selected;
if(id==0 && country=="en-GB"){
selected="selected";
}
else if(id==1 && country=="hi-IN"){
selected="selected";
}
    let options=`<option value="${country}" ${selected}>${countries[country]}</option>`;
    tag.insertAdjacentHTML("beforeend",options);
  }
});
exchangeIcon.addEventListener("click",()=>{
let tempText=fromText.value;
let templang=selectTag[0].value;
fromText.value=toText.value;
selectTag[0].value= selectTag[1].value;

toText.value=tempText;
selectTag[1].value=templang;
});

translateBtn.addEventListener("click",()=>{
let text=fromText.value,
translateFrom=selectTag[0].value,
translateTo=selectTag[1].value;
if(!text)
return;
toText.setAttribute("placeholder","translating....");
let apiUrl=`https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;
fetch(apiUrl).then(res=>res.json()).then(data=>{

toText.value=data.responseData.translatedText;
toText.setAttribute("placeholder","translation");
});
});
icons.forEach(icon=>{
icon.addEventListener("click",({target})=>{
if(target.classList.contains("fa-copy")){
  if(target.id=="from"){
navigator.clipboard.writeText(fromText.value);
}
else{
navigator.clipboard.writeText(toText.value);
 }
}
else{
let utterance;
if(target.id=="from"){
utterance=new SpeechSynthesisUtterance(fromText.value);
utterance.lang=selectTag[0].value;
}
else{
utterance=new SpeechSynthesisUtterance(toText.value);
utterance.lang=selectTag[1].value;
}
speechSynthesis.speak(utterance);
}
});
})

