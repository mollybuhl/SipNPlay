"use strict";

chooseTruthORDare()

async function chooseTruthORDare() {
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
}