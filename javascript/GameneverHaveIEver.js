
async function renderNeverHaveIEver(category){

    let main =document.querySelector("main");
    main.removeAttribute("class");
    main.classList.add("neverHaveIEver");

    let footer = document.querySelector("footer");
    footer.removeAttribute("class");
    footer.classList.add("neverHaveIEver");

    main.innerHTML=`
    <h1>Never Have I Ever</h1>
    <div class="cards">
        <div class="currentCard"></div>
    </div>
    <div class=swipeNextCard>
        <div>
            <div></div>
            <p>Swipe up</p>
        </div>
    </div>
    `;

    footer.innerHTML=`
    <div class="buttonQuit">
        <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
        <p>QUIT</p>
    </div>
    `

    //Fetch card information
   // let question = await fetchNeverHaveIEverQuestion(category);
   // console.log(question);

};

function renderNewCard(){

}


async function fetchNeverHaveIEverQuestion(category){

    let requestParameters = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            category: category,
        })
    }

    let request = new Request("php/neverHaveIEver.php", requestParameters);

    try{
        let response = await fetch(request);
        let resource = await response.json();
        
        if(response.ok){
            console.log("Here");
            return resource;
        }else{
            console.log("Not ok");
            console.log("resource error");
        }
    }catch(error){
        console.log("Something went wrong");
    }

    
    
}