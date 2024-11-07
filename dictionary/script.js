const url="https://api.dictionaryapi.dev/api/v2/entries/en/";
const result= document.getElementById("result");
const sound=document.getElementById("sound");
const searchbutton=document.getElementById("searchbutton");

let audioUrl = null;

searchbutton.addEventListener("click",()=>{
    let searchinput = document.getElementById("searchinput").value;
    fetch(`${url}${searchinput}`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            const synonyms = data[0].meanings[0].synonyms;
            const phonetic = data[0].phonetics.find(p => p.audio);
            audioUrl = phonetic ? phonetic.audio : null;
            let synonymText = '';
            if (synonyms.length === 1) {
                synonymText = `Synonym: ${synonyms[0]}`;
            } else if (synonyms.length > 1) {
                synonymText = `Synonyms: ${synonyms.join(', ')}`;
            }
            result.innerHTML=`
            <div class="word">
                    <h3>${searchinput}</h3>
                    <button onclick="playSound()">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>${data[0].phonetics[1]?.text || ''}</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${synonymText}
                </p>`;
                sound.setAttribute("src",audioUrl || '');
        })
        .catch(()=>{
            result.innerHTML=`<h3 class="error">Couldn't Find The Word</h3>`;
        });
})
function playSound(){
    if(audioUrl){
        sound.play();
    }else{
        alert("No audio available for this word.");
    }
}

