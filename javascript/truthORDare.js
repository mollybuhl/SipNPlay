"use strict";
TruthORDareHandle()

function TruthORDareHandle() {

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

    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", (e) => {
            renderTruthORDareQuestion(e.target.attributes.id.value)
            console.log(e.target.attributes.id.value);
        })
    });
}

async function renderTruthORDareQuestion(type) {
    let data = {
        type: type,
        category: "The Basic Version",
    };

    const request = new Request("php/truthORDare.php", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(data)
    });

    const response = await fetch(request);
    console.log(response);
    if (response.status === 200) {
        let data = await response.json();
        let section = document.querySelector("#truthORDareWrapper>section");
        section.innerHTML = `
            <section id="questionHolder">
                <h2>${type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                <h3>${data.question}</h3>
                <p>${data.category}</p>
            </section>
        `;

        if (type === "truth") {
            document.querySelector("#questionHolder>h2").style.color = "var(--green)";
        } else {
            document.querySelector("#questionHolder>h2").style.color = "var(--pink)";
        }

    } else {
        let error = await response.json();
        feedback(error.message);
    }

}
