"use strict";

document.addEventListener("DOMContentLoaded", (event) => {

    // Check if the animation has been shown before
    const hasAnimationBeenShown = sessionStorage.getItem("animationShown");

    // If not shown before, proceed with the animation
    if (!hasAnimationBeenShown) {
        const body = document.querySelector("body");

        let shotOutline = document.createElement("div");
        shotOutline.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="50" viewBox="0 0 100 115" fill="none">
                <path d="M4.11321 11.0652C3.46474 6.5455 6.97123 2.5 11.5372 2.5H88.4628C93.0288 2.5 96.5353 6.5455 95.8868 11.0652L82.2564 106.065C81.7265 109.758 78.563 112.5 74.8324 112.5H25.1676C21.437 112.5 18.2735 109.758 17.7436 106.065L4.11321 11.0652Z"
                stroke="#C1C1C1" stroke-width="5"/>
                <path d="M16.9445 35.157C16.4738 31.8398 19.3349 29.0075 22.6471 29.5115L31.6516 30.8818C36.4776 31.6162 41.4099 31.1618 46.0205 29.5581L54.2114 26.7091C59.3093 24.9359 64.7911 24.5709 70.079 25.6525L79.3907 27.5572C81.9804 28.0869 83.7104 30.5409 83.3391 33.1581L74.3947 96.2023C74.045 98.6677 71.9344 100.5 69.4443 100.5H30.5557C28.0656 100.5 25.955 98.6677 25.6053 96.2023L16.9445 35.157Z"
                fill="url(#paint0_linear_145_8887)" />
                <rect x="24" y="44.9175" width="4.60314" height="44" rx="2.30157" transform="rotate(-8 24 44.9175)" fill="#131313" />
                <rect x="19" y="107" width="62" height="5" fill="#C1C1C1" />
                <defs>
                    <linearGradient id="paint0_linear_145_8887" x1="50.5" y1="101" x2="50.5" y2="19" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#B1C871" />
                        <stop offset="0.484375" stop-color="#E9A072" />
                        <stop offset="1" stop-color="#E7538C" />
                    </linearGradient>
                </defs>
            </svg>
        `;

        setTimeout(() => {
            shotOutline.style.transform = "translateX(130px) rotate(5deg)";
            shotOutline.style.transition = "transform 1000ms";
        }, 2200)

        let logo = document.createElement("h1");
        logo.innerHTML = `SipNPlay`;

        let introWrapper = document.createElement("div");
        introWrapper.setAttribute("id", "intro");

        body.append(introWrapper);

        introWrapper.append(shotOutline);

        setTimeout(() => {
            introWrapper.append(logo);
        }, 1000);

        let getStarted = document.createElement("div");
        getStarted.classList.add("getStarted")
        getStarted.innerHTML = `
            <h3>GET STARTED</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                <path d="M17.1821 19.674C17.1921 19.662 17.1961 19.646 17.2061 19.634L24.1881 11.92C24.5781 11.486 24.5781 10.782 24.1881 10.348C24.1841 10.344 24.1801 10.342 24.1761 10.34C24.0893 10.2349 23.9806 10.15 23.8577 10.0913C23.7347 10.0326 23.6004 10.0014 23.4641 10H9.49809C9.35932 10.0022 9.22273 10.0349 9.09797 10.0958C8.97321 10.1566 8.86333 10.2441 8.77609 10.352L8.77209 10.348C8.58335 10.5664 8.47949 10.8454 8.47949 11.134C8.47949 11.4226 8.58335 11.7016 8.77209 11.92L15.7701 19.674C15.8572 19.7761 15.9654 19.8581 16.0873 19.9144C16.2092 19.9706 16.3419 19.9997 16.4761 19.9997C16.6103 19.9997 16.743 19.9706 16.8648 19.9144C16.9867 19.8581 17.095 19.7761 17.1821 19.674Z" fill="#E7538C"/>
            </svg>
        `;

        setTimeout(() => {
            introWrapper.append(getStarted);
        }, 2500);

        getStarted.addEventListener("click", () => {
            introWrapper.style.opacity = "0";
            introWrapper.style.transition = "opacity 500ms";
            introWrapper.remove();
        });

        // Set a flag in sessionStorage to indicate that the animation has been shown
        sessionStorage.setItem("animationShown", "true");
    }
}); 