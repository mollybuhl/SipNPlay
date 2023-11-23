"use strict";

// Function handles when the client chooses truth or dare
function truthORDareHandle() {
    let main = document.querySelector("main");
    main.innerHTML = `
        <div id="truthORDareWrapper">
            <h1>Truth OR Dare?</h1>
            <h2>It's <span>Lasse</span>'s turn</h2>

            <section>
                <button id="truth">Truth</button>
                <div>OR</div>
                <button id="dare">Dare</button>
            </section>
        </div>
    `;

    // Add footer with quit button and next button
    let footer = document.querySelector("footer");
    footer.innerHTML = `
        <div class="buttonQuit">
            <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
            <p>QUIT</p>
        </div>
        <button id="nextButton">NEXT</button>
    `;

    // Next-button should not be displayed when choosing truth or dare options
    document.getElementById("nextButton").style.opacity = "0";

    // Assigns an event listener to truth or dare buttons and calls renderTruthORDareQuestion function to generate a question
    document.querySelectorAll("section>button").forEach(button => {
        button.addEventListener("click", (e) => {
            // e.target.attributes.id.value will be either truth or dare
            renderTruthORDareQuestion(e.target.attributes.id.value)
            console.log(e.target.attributes.id.value);
        })
    });
}

// Function fetches a random question from PHP depending on type and category
async function renderTruthORDareQuestion(type) {
    let data = {
        type: type,
        category: "The Basic Version",
    };

    // POST-request to truthORDare.php
    const request = new Request("php/truthORDare.php", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(data)
    });

    const response = await fetch(request);

    // If response is OK, render new innerHTML that displays the question
    if (response.status === 200) {
        let data = await response.json();
        let section = document.querySelector("#truthORDareWrapper>section");
        // Change first letter in string to uppercase
        section.innerHTML = `
            <section id="questionHolder">
            <article>
                <h2>${type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                <h3>${data.question}</h3>
            </article>
                <p>${data.category}</p>
            </section>
        `;

        // h2 can be either green or pink depending on type
        if (type === "truth") {
            document.querySelector("#questionHolder > article h2").style.color = "var(--green)";
        } else {
            document.querySelector("#questionHolder > article h2").style.color = "var(--pink)";
        }

        // The Next-button should now be displayed to repeat truth or dare
        document.getElementById("nextButton").style.opacity = "100%";
        document.getElementById("nextButton").addEventListener("click", truthORDareHandle);

    } else {
        let error = await response.json();
        feedback(error.message);
    }

}
