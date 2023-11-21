"use strict";
TruthORDareHandle()

function TruthORDareHandle() {
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
    if (type === "truth") {

    } else {

    }
}
