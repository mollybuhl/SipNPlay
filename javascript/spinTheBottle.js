"use strict";

let playerSTBIndex = 0;

function setSTBPlayerIndex(index) {
    playerSTBIndex = index;
}

function getSTBPlayerIndex() {
    return playerSTBIndex;
}

async function spinTheBottleHandle(gameId) {
    // Fetch current players
    let requestData = {
        action: "getPlayers",
        gameId: gameId
    }

    let players = await handleGameFetch(requestData);

    let index;
    if (players.length - 1 < getSTBPlayerIndex()) {
        setSTBPlayerIndex(0);
        index = getSTBPlayerIndex();
    } else {
        index = getSTBPlayerIndex();
    }

    let player = players[index];
    console.log(player);
    console.log(index);

    // Update player in question
    let updatePlayerData = {
        action: "updatePlayerInQuestion",
        gameId: gameId,
        player: player
    }

    await handleGameFetch(updatePlayerData);

    const main = document.querySelector("main");
    main.removeAttribute("class");

    let checkPlayer;
    if (player === localStorage.getItem("playerName")) {
        // The HTML structure of Spin The Bottle includes 7 svgs imported from FIGMA file
        main.innerHTML = `
            <div id="spinTheBottleWrapper">
                <h1>Spin The Bottle</h1>
                <h2>It's <span>${player}</span>'s turn</h2>
                <div id="circle">
                    <div class="challenge" style="--i:1;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="26" viewBox="0 0 28 26" fill="none">
                            <path d="M21.3175 2.67871L14.0178 9.70803L6.71814 2.67871H21.3175Z" fill="#131313" stroke="#131313" stroke-width="5"/>
                            <mask id="path-2-inside-1_289_1675" fill="white">
                                <path d="M13.8255 20.4968C13.9487 20.4454 14.0873 20.4454 14.2105 20.4968L20.2748 23.0265C20.7791 23.2368 20.6287 23.9879 20.0823 23.9879H7.9537C7.40727 23.9879 7.2569 23.2368 7.7612 23.0265L13.8255 20.4968Z"/>
                            </mask>
                            <path d="M13.8255 20.4968C13.9487 20.4454 14.0873 20.4454 14.2105 20.4968L20.2748 23.0265C20.7791 23.2368 20.6287 23.9879 20.0823 23.9879H7.9537C7.40727 23.9879 7.2569 23.2368 7.7612 23.0265L13.8255 20.4968Z" fill="#131313"/>
                            <path d="M20.2748 23.0265L18.7348 26.7182L20.2748 23.0265ZM14.2105 20.4968L15.7504 16.8051L14.2105 20.4968ZM13.8255 20.4968L12.2855 16.8051L13.8255 20.4968ZM12.6705 24.1885L18.7348 26.7182L21.8147 19.3348L15.7504 16.8051L12.6705 24.1885ZM20.0823 19.9879H7.9537V27.9879H20.0823V19.9879ZM9.30116 26.7182L15.3655 24.1885L12.2855 16.8051L6.22125 19.3348L9.30116 26.7182ZM7.9537 19.9879C11.7787 19.9879 12.8313 25.2456 9.30116 26.7182L6.22125 19.3348C1.68255 21.2281 3.03584 27.9879 7.9537 27.9879V19.9879ZM18.7348 26.7182C15.2047 25.2456 16.2573 19.9879 20.0823 19.9879V27.9879C25.0001 27.9879 26.3535 21.2281 21.8147 19.3348L18.7348 26.7182ZM15.7504 16.8051C14.6418 16.3426 13.3942 16.3426 12.2855 16.8051L15.3655 24.1885C14.5032 24.5482 13.5328 24.5482 12.6705 24.1885L15.7504 16.8051Z" fill="#131313" mask="url(#path-2-inside-1_289_1675)"/>
                            <rect x="13.499" y="10.6979" width="1.03846" height="10.9615" fill="#131313" stroke="#131313" stroke-width="1.03846"/>
                        </svg>
                    </div>
                    <div class="challenge" style="--i:2;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M3.66081 1.125L17.5897 1.125C18.8242 1.125 19.764 2.2325 19.563 3.4506L17.088 18.4506C16.9286 19.4164 16.0936 20.125 15.1147 20.125H6.13581C5.1569 20.125 4.32185 19.4164 4.16249 18.4506L1.68749 3.4506C1.4865 2.2325 2.42624 1.125 3.66081 1.125Z" stroke="#131313" stroke-width="2"/>
                            <path d="M2.55522 7.60165C2.35884 6.44364 3.45716 5.48805 4.57688 5.84271L6.05723 6.3116C7.69009 6.8288 9.4664 6.62031 10.9351 5.73907V5.73907C12.6195 4.72845 14.693 4.61035 16.4812 5.42318L18.0281 6.12632C18.6722 6.41905 19.0327 7.11402 18.9012 7.80913L16.8795 18.4967C16.7008 19.4412 15.8756 20.125 14.9144 20.125H6.36838C5.39285 20.125 4.55964 19.4212 4.39653 18.4594L2.55522 7.60165Z" fill="#131313"/>
                            <rect x="5.12524" y="19.125" width="11" height="1" fill="#131313"/>
                        </svg>
                    </div>
                    <div class="challenge" style="--i:3;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="27" viewBox="0 0 25 27" fill="none">
                            <path d="M4.64698 1.46436H19.5401C19.8601 1.46436 20.1302 1.70219 20.1707 2.0196L21.7676 14.5299C22.5081 20.3308 17.9882 25.4644 12.1401 25.4644C6.32335 25.4644 1.81294 20.3829 2.50312 14.6072L4.00563 2.03363C4.04444 1.70885 4.31989 1.46436 4.64698 1.46436Z" stroke="#131313" stroke-width="2"/>
                            <path d="M3.90126 7.46436H20.0645L21.1477 13.5729C22.155 19.253 17.7865 24.4644 12.0177 24.4644V24.4644C6.29035 24.4644 1.93254 19.3235 2.8705 13.6734L3.90126 7.46436Z" fill="#131313"/>
                        </svg>
                    </div>
                    <div class="challenge" style="--i:4;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="33" viewBox="0 0 44 33" fill="none">
                            <rect x="10.386" y="14.8296" width="1" height="8.72" fill="#131313" stroke="#131313"/>
                            <path d="M4.86249 10.5881L6.11126 2.28955H15.2505L16.6536 10.6817C16.7565 11.297 16.374 11.8895 15.7708 12.049C12.5635 12.8972 9.19216 12.9081 5.97935 12.0809L5.8241 12.0409C5.1786 11.8747 4.7633 11.2473 4.86249 10.5881Z" fill="#131313" stroke="#131313" stroke-width="4"/>
                            <mask id="path-3-inside-1_289_1706" fill="white">
                                <path d="M10.7064 22.9139C10.822 22.8694 10.95 22.8694 11.0656 22.9139L17.0353 25.2119C17.5525 25.411 17.4098 26.1786 16.8556 26.1786H4.91633C4.36214 26.1786 4.21951 25.411 4.7367 25.2119L10.7064 22.9139Z"/>
                            </mask>
                            <path d="M10.7064 22.9139C10.822 22.8694 10.95 22.8694 11.0656 22.9139L17.0353 25.2119C17.5525 25.411 17.4098 26.1786 16.8556 26.1786H4.91633C4.36214 26.1786 4.21951 25.411 4.7367 25.2119L10.7064 22.9139Z" fill="#131313"/>
                            <path d="M4.7367 25.2119L3.29967 21.479L4.7367 25.2119ZM17.0353 25.2119L15.5982 28.9449L17.0353 25.2119ZM11.0656 22.9139L12.5026 19.1809L11.0656 22.9139ZM10.7064 22.9139L9.26932 19.1809L10.7064 22.9139ZM9.62858 26.6468L15.5982 28.9449L18.4723 21.479L12.5026 19.1809L9.62858 26.6468ZM16.8556 22.1786H4.91633V30.1786H16.8556V22.1786ZM6.17373 28.9449L12.1434 26.6468L9.26932 19.1809L3.29967 21.479L6.17373 28.9449ZM4.91633 22.1786C8.79561 22.1786 9.79414 27.5512 6.17373 28.9449L3.29967 21.479C-1.35513 23.2709 -0.0713325 30.1786 4.91633 30.1786V22.1786ZM15.5982 28.9449C11.9779 27.5512 12.9762 22.1786 16.8556 22.1786V30.1786C21.8434 30.1786 23.127 23.2709 18.4723 21.479L15.5982 28.9449ZM12.5026 19.1809C11.4621 18.7804 10.3099 18.7804 9.26932 19.1809L12.1434 26.6468C11.3341 26.9584 10.4379 26.9584 9.62858 26.6468L12.5026 19.1809Z" fill="#131313" mask="url(#path-3-inside-1_289_1706)"/>
                            <rect x="29.8509" y="17.7127" width="1" height="8.72" transform="rotate(-14.5635 29.8509 17.7127)" fill="#131313" stroke="#131313"/>
                            <path d="M23.4383 14.9966L22.5602 6.6507L31.4058 4.35263L34.8741 12.1223C35.1284 12.692 34.9071 13.3616 34.3635 13.6676C31.4725 15.2951 28.2122 16.1534 24.8946 16.1606L24.7343 16.1609C24.0677 16.1624 23.508 15.6595 23.4383 14.9966Z" fill="#131313" stroke="#131313" stroke-width="4"/>
                            <mask id="path-7-inside-2_289_1706" fill="white">
                                <path d="M32.1936 25.4565C32.2943 25.3843 32.4182 25.3521 32.5413 25.3661L38.897 26.0893C39.4477 26.1519 39.5026 26.9307 38.9662 27.07L27.4105 30.0722C26.8742 30.2115 26.5431 29.5045 26.9936 29.1818L32.1936 25.4565Z"/>
                            </mask>
                            <path d="M32.1936 25.4565C32.2943 25.3843 32.4182 25.3521 32.5413 25.3661L38.897 26.0893C39.4477 26.1519 39.5026 26.9307 38.9662 27.07L27.4105 30.0722C26.8742 30.2115 26.5431 29.5045 26.9936 29.1818L32.1936 25.4565Z" fill="#131313"/>
                            <path d="M26.9936 29.1818L24.6641 25.9301L26.9936 29.1818ZM38.897 26.0893L38.4448 30.0636L38.897 26.0893ZM32.5413 25.3661L32.9935 21.3918L32.5413 25.3661ZM32.1936 25.4565L29.8641 22.2048L32.1936 25.4565ZM32.0891 29.3405L38.4448 30.0636L39.3492 22.1149L32.9935 21.3918L32.0891 29.3405ZM37.9604 23.1985L26.4047 26.2007L28.4163 33.9437L39.972 30.9415L37.9604 23.1985ZM29.3231 32.4334L34.5231 28.7081L29.8641 22.2048L24.6641 25.9301L29.3231 32.4334ZM26.4047 26.2007C30.1594 25.2252 32.4768 30.1742 29.3231 32.4334L24.6641 25.9301C20.6094 28.8349 23.5889 35.1978 28.4163 33.9437L26.4047 26.2007ZM38.4448 30.0636C34.5904 29.6251 34.2057 24.174 37.9604 23.1985L39.972 30.9415C44.7996 29.6873 44.3049 22.6788 39.3492 22.1149L38.4448 30.0636ZM32.9935 21.3918C31.8857 21.2657 30.7705 21.5554 29.8641 22.2048L34.5231 28.7081C33.8182 29.2132 32.9508 29.4385 32.0891 29.3405L32.9935 21.3918Z" fill="#131313" mask="url(#path-7-inside-2_289_1706)"/>
                        </svg>
                    </div>
                    <div class="challenge" style="--i:5;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="26" viewBox="0 0 28 26" fill="none">
                            <path d="M21.3175 2.67871L14.0178 9.70803L6.71814 2.67871H21.3175Z" fill="#131313" stroke="#131313" stroke-width="5"/>
                            <mask id="path-2-inside-1_289_1675" fill="white">
                                <path d="M13.8255 20.4968C13.9487 20.4454 14.0873 20.4454 14.2105 20.4968L20.2748 23.0265C20.7791 23.2368 20.6287 23.9879 20.0823 23.9879H7.9537C7.40727 23.9879 7.2569 23.2368 7.7612 23.0265L13.8255 20.4968Z"/>
                            </mask>
                            <path d="M13.8255 20.4968C13.9487 20.4454 14.0873 20.4454 14.2105 20.4968L20.2748 23.0265C20.7791 23.2368 20.6287 23.9879 20.0823 23.9879H7.9537C7.40727 23.9879 7.2569 23.2368 7.7612 23.0265L13.8255 20.4968Z" fill="#131313"/>
                            <path d="M20.2748 23.0265L18.7348 26.7182L20.2748 23.0265ZM14.2105 20.4968L15.7504 16.8051L14.2105 20.4968ZM13.8255 20.4968L12.2855 16.8051L13.8255 20.4968ZM12.6705 24.1885L18.7348 26.7182L21.8147 19.3348L15.7504 16.8051L12.6705 24.1885ZM20.0823 19.9879H7.9537V27.9879H20.0823V19.9879ZM9.30116 26.7182L15.3655 24.1885L12.2855 16.8051L6.22125 19.3348L9.30116 26.7182ZM7.9537 19.9879C11.7787 19.9879 12.8313 25.2456 9.30116 26.7182L6.22125 19.3348C1.68255 21.2281 3.03584 27.9879 7.9537 27.9879V19.9879ZM18.7348 26.7182C15.2047 25.2456 16.2573 19.9879 20.0823 19.9879V27.9879C25.0001 27.9879 26.3535 21.2281 21.8147 19.3348L18.7348 26.7182ZM15.7504 16.8051C14.6418 16.3426 13.3942 16.3426 12.2855 16.8051L15.3655 24.1885C14.5032 24.5482 13.5328 24.5482 12.6705 24.1885L15.7504 16.8051Z" fill="#131313" mask="url(#path-2-inside-1_289_1675)"/>
                            <rect x="13.499" y="10.6979" width="1.03846" height="10.9615" fill="#131313" stroke="#131313" stroke-width="1.03846"/>
                        </svg>
                    </div>
                    <div class="challenge" style="--i:6;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="78" height="27" viewBox="0 0 78 27" fill="none">
                            <path d="M4.13419 6.62604L17.3175 2.13C18.486 1.7315 19.7329 2.47638 19.9358 3.69415L22.4351 18.6901C22.596 19.6557 22.0344 20.5959 21.1079 20.9119L12.6096 23.8101C11.6831 24.1261 10.6641 23.725 10.2015 22.8623L3.01716 9.46412C2.43375 8.3761 2.9657 7.02454 4.13419 6.62604Z" stroke="#131313" stroke-width="2"/>
                            <path d="M5.17835 13.1127C4.61869 12.0801 5.34977 10.8211 6.52403 10.7954L8.07649 10.7613C9.78889 10.7238 11.4028 9.95306 12.5085 8.64491V8.64491C13.7765 7.1447 15.7009 6.36361 17.6558 6.55572L19.3468 6.7219C20.0509 6.79108 20.6165 7.33246 20.7164 8.0328L22.2527 18.8009C22.3884 19.7525 21.828 20.6661 20.9183 20.9763L12.8298 23.7349C11.9064 24.0498 10.8907 23.6526 10.4258 22.7949L5.17835 13.1127Z" fill="#131313"/>
                            <rect x="11.3303" y="23.1899" width="11" height="1" transform="rotate(-18.8315 11.3303 23.1899)" fill="#131313"/>
                            <path d="M32.6549 1.04248H46.5838C47.8184 1.04248 48.7581 2.14998 48.5571 3.36808L46.0821 18.3681C45.9228 19.3339 45.0877 20.0425 44.1088 20.0425H35.1299C34.151 20.0425 33.316 19.3339 33.1566 18.3681L30.6816 3.36808C30.4806 2.14998 31.4204 1.04248 32.6549 1.04248Z" stroke="#131313" stroke-width="2"/>
                            <path d="M31.5494 7.51913C31.353 6.36113 32.4513 5.40553 33.571 5.76019L35.0514 6.22908C36.6842 6.74628 38.4605 6.53779 39.9293 5.65655V5.65655C41.6136 4.64593 43.6872 4.52783 45.4754 5.34066L47.0223 6.0438C47.6663 6.33654 48.0269 7.0315 47.8954 7.72661L45.8736 18.4142C45.695 19.3587 44.8697 20.0425 43.9085 20.0425H35.3625C34.387 20.0425 33.5538 19.3387 33.3907 18.3769L31.5494 7.51913Z" fill="#131313"/>
                            <rect x="34.1194" y="19.0425" width="11" height="1" fill="#131313"/>
                            <path d="M60.7856 1.93626L74.2251 5.59585C75.4163 5.92021 76.0321 7.2357 75.5181 8.3582L69.189 22.181C68.7815 23.071 67.7896 23.5353 66.8451 23.2781L58.1817 20.919C57.2372 20.6618 56.6176 19.7588 56.7176 18.785L58.2706 3.6617C58.3967 2.43359 59.5944 1.6119 60.7856 1.93626Z" stroke="#131313" stroke-width="2"/>
                            <path d="M58.0173 7.89473C58.1321 6.72581 59.4429 6.09235 60.4301 6.72874L61.7352 7.57009C63.1748 8.49813 64.9435 8.76366 66.5922 8.29927V8.29927C68.4829 7.76669 70.5146 8.19752 72.0264 9.45162L73.3343 10.5365C73.8787 10.9881 74.0441 11.7534 73.7346 12.3896L68.9758 22.1705C68.5553 23.0349 67.5794 23.4778 66.6519 23.2253L58.4062 20.98C57.4649 20.7237 56.8459 19.8257 56.9412 18.8548L58.0173 7.89473Z" fill="#131313"/>
                            <rect x="57.4695" y="19.6885" width="11" height="1" transform="rotate(15.2323 57.4695 19.6885)" fill="#131313"/>
                        </svg>
                    </div>

                    <div id="pointerWrap">
                        <svg id="bottlePointer" xmlns="http://www.w3.org/2000/svg" width="102" height="190" viewBox="0 0 102 228" fill="none">
                            <path d="M61.9546 9.26523C62.2424 7.63355 63.7983 6.54404 65.43 6.83175L74.2933 8.39459C75.925 8.6823 77.0145 10.2383 76.7268 11.87L66.8288 68.004C66.5411 69.6357 64.9851 70.7252 63.3534 70.4375L54.4902 68.8746C52.8585 68.5869 51.769 67.031 52.0567 65.3993L61.9546 9.26523Z" stroke="#C1C1C1" stroke-width="4"/>
                            <mask id="path-2-inside-1_101_99" fill="white">
                                <rect x="56.9734" y="14.4795" width="23" height="11" rx="2" transform="rotate(20 92.1389 18.0938)"/>
                            </mask>
                            <rect x="56.9734" y="14.4795" width="23" height="11" rx="2" transform="rotate(10 56.9734 14.4795)" stroke="#C1C1C1" stroke-width="8" mask="url(#path-2-inside-1_101_99)"/>
                            <path d="M23.3301 95.8639C26.5952 77.3469 40.3713 62.4413 58.5742 57.7301L61.167 57.0591L62.9261 58.3021C78.1001 69.0242 85.7234 87.5405 82.497 105.838L62.7946 217.576C62.0274 221.927 57.8781 224.832 53.527 224.065L10.1954 216.425C5.84429 215.657 2.93895 211.508 3.70617 207.157L23.3301 95.8639Z" stroke="#C1C1C1" stroke-width="4"/>
                            <rect x="50.4343" y="63.0824" width="19" height="11" transform="rotate(10 50.4343 63.0824)" fill="#1B1B1B"/>
                            <rect x="63.0559" y="14.5366" width="11" height="50" transform="rotate(10 63.0559 14.5366)" fill="#1B1B1B"/>
                            <rect x="59.5806" y="16.9701" width="17" height="7" rx="1" transform="rotate(10 59.5806 16.9701)" fill="#1B1B1B"/>
                            <path d="M56.0529 60.0114L61.1951 60.9181L58.9377 73.7206L53.0289 72.6787L50.1601 63.034L56.0529 60.0114Z" fill="#1B1B1B"/>
                            <path d="M60.8035 61.8644L65.7275 62.7327L69.1458 66.3817L63.6437 74.5504L58.7197 73.6821L60.8035 61.8644Z" fill="#1B1B1B"/>
                            <rect x="58.1343" y="30.931" width="16" height="4" transform="rotate(10 58.1343 30.931)" fill="#C1C1C1"/>
                            <path d="M69.5807 88.2795C69.2352 86.7053 70.5044 85.2428 72.1117 85.3634C73.172 85.4429 74.0546 86.2089 74.2826 87.2475L75.2918 91.8455C75.6731 93.5824 75.7103 95.3771 75.4016 97.1282L74.6537 101.37C74.4139 102.729 73.1173 103.637 71.7575 103.398C70.3978 103.158 69.4899 101.861 69.7296 100.501L70.6535 95.2622C70.7887 94.495 70.7724 93.7086 70.6054 92.9477L69.5807 88.2795Z" fill="#C1C1C1"/>
                            <rect x="68.2251" y="111.914" width="5" height="95" rx="2.5" transform="rotate(10 68.2251 111.914)" fill="#C1C1C1"/>
                        </svg>
                    </div>
                </div>
            </div>
        `;

        // Event listener to add transition/animation to make bottle spin and point by randomly calculating an angle
        let angle = 0;
        const pointer = document.getElementById("bottlePointer");
        const spin = document.getElementById("pointerWrap");
        spin.addEventListener("click", () => {
            angle = angle + 4 * 360 + Math.random() * 360;

            // transform has an ease-in-out transition with duration 4000ms
            pointer.style.transform = `rotate(${angle}deg)`;

            setTimeout(() => {
                // deg calculates the angle between 0-360 since we added the previous angle to the new angle in our last calculation
                let deg = angle - 360 * 4;
                console.log(deg);

                if (deg >= 0 && deg <= 60) {
                    // Take a sip of someone else's drink
                    displaySpinTheBottleResult("Take a sip of someone else's drink", player, gameId);
                } else if (deg >= 60 && deg <= 120) {
                    // Take a shot
                    displaySpinTheBottleResult("Take a shot", player, gameId);
                } else if (deg >= 120 && deg <= 180) {
                    // Down the rest of your drink
                    displaySpinTheBottleResult("Down the rest of your drink", player, gameId);
                } else if (deg >= 180 && deg <= 240) {
                    // Pick a friend and take a sip together
                    displaySpinTheBottleResult("Pick a friend and take a sip together", player, gameId);
                } else if (deg >= 240 && deg <= 300) {
                    // Take a sip of someone else's drink
                    displaySpinTheBottleResult("Take a sip of your drink", player, gameId);
                } else if (deg >= 300 && deg <= 360) {
                    // Take 3 shots in a row
                    displaySpinTheBottleResult("Take 3 shots in a row", player, gameId);
                }
            }, 5000);
        })

    } else {
        main.innerHTML = `
            <div id="spinTheBottleWrapper">
                <h1>Spin The Bottle</h1>
                <h2>It's <span>${players[index]}</span>'s turn</h2>
            </div>
        `;

        // Check if next player 
        checkPlayer = setInterval(async () => {
            let requestPlayerInQuestion = {
                action: "getPlayerInQuestion",
                gameId: gameId
            };

            let playerInQuestion = await handleGameFetch(requestPlayerInQuestion);
            console.log(playerInQuestion);
            if (playerInQuestion === localStorage.getItem("playerName")) {
                setSTBPlayerIndex(getSTBPlayerIndex() + 1)
                clearInterval(checkPlayer)
                spinTheBottleHandle(gameId)
            }

        }, 2000);
    }

    let isHost = window.localStorage.getItem("host");
    let checkActiveGame;
    if (!isHost) {
        checkActiveGame = setInterval(async () => {
            checkIfGameExist(gameId, checkActiveGame, checkPlayer);

            let requestDataForCheckingActiveGame = {
                gameId: gameId,
                action: "checkActiveGame",
            }

            let activeGame = await handleGameFetch(requestDataForCheckingActiveGame);

            // If there is an active game return this information
            if (activeGame) {
                return "Active game";
            } else {
                console.log("No active game");

                let infoBox = document.createElement("div");
                infoBox.classList.add("infoBox");
                infoBox.innerHTML = `
                <div>
                    <p>Your host ended this round</p>
                    <p>You will be taken back to the waiting page</p>
                </div>
                `;

                document.querySelector("main").appendChild(infoBox);

                // Clear interval
                clearInterval(checkActiveGame);
                clearInterval(checkPlayer);

                setTimeout(() => {
                    renderWaitingForGame(gameId);
                }, 5000);
            }
        }, 1000);
    }

    // Footer html
    let footer = document.querySelector("footer");
    footer.removeAttribute("class");
    footer.innerHTML = `
        <div class="buttonQuit">
            <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
            <p>QUIT</p>
        </div>
    `;

    // When clicking quit leave game
    footer.querySelector(".buttonQuit").addEventListener("click", () => {
        // If user is host - ask to play another game or keep playing
        isHost = window.localStorage.getItem("host");

        if (isHost) {

            // Display pop up
            let gameId = parseInt(localStorage.getItem("gameId"));

            let popUp = document.createElement("div");
            popUp.setAttribute("id", "leaveGamePopUp");

            popUp.innerHTML = `
            <div>
                <p>Are you sure you want to end this round?</p>
                <div>   
                    <button class="leaveGame">End Round</button>
                    <button class="closePopup">Keep Playing</button>
                </div>
            </div>
            `;

            document.querySelector("main").appendChild(popUp);

            // Close pop up and keep playing
            popUp.querySelector(".closePopup").addEventListener("click", () => {
                popUp.remove();
            });

            // End round and go back to category display
            popUp.querySelector(".leaveGame").addEventListener("click", async () => {
                let requestDataForEndingRound = {
                    action: "endRound",
                    gameId: gameId
                }

                await handleGameFetch(requestDataForEndingRound);

                clearInterval(checkPlayer)

                // Go back to game display
                renderGameDisplay()
            })


        } else {
            // If user is not host - ask to leave game or keep playing
            if (localStorage.getItem("playerName") === player) {
                clearInterval(checkPlayer)
            }
            clearInterval(checkActiveGame)
            leaveGame();
        }
    })
}

function displaySpinTheBottleResult(challenge, name, gameId) {

    // Results should display different svgs using switch
    let svg;
    switch (challenge) {
        case "Take a sip of someone else's drink":
        case "Take a sip of your drink":
            svg = `
                <svg xmlns="http://www.w3.org/2000/svg" width="139" height="158" viewBox="0 0 139 158" fill="none">
                    <path d="M67.4455 69.3277L12.6903 10.0535C10.0279 7.17133 12.0721 2.5 15.9958 2.5L122.568 2.5C126.492 2.5 128.536 7.17133 125.874 10.0535L71.1183 69.3277C70.1285 70.3992 68.4353 70.3992 67.4455 69.3277Z" stroke="#C1C1C1" stroke-width="5"/>
                    <path d="M70.6652 133.973L89.1699 143.588C91.9565 145.036 90.927 149.25 87.7866 149.25H50.7773C47.6369 149.25 46.6074 145.036 49.3941 143.588L67.8987 133.973C68.7659 133.522 69.7981 133.522 70.6652 133.973Z" stroke="#C1C1C1" stroke-width="4"/>
                    <rect x="64.282" y="67" width="10" height="68" stroke="#C1C1C1" stroke-width="4"/>
                    <rect x="66.282" y="58" width="6" height="28" fill="#1B1B1B"/>
                    <rect x="66.282" y="125" width="6" height="19" fill="#1B1B1B"/>
                    <path d="M70.282 24H76.282L77.282 51L70.782 59L70.282 24Z" fill="#1B1B1B"/>
                    <path d="M62.282 43H68.282L66.782 57.5L61.282 51L62.282 43Z" fill="#1B1B1B"/>
                    <path d="M70.7572 57.3894C69.9644 58.2551 68.6001 58.2551 67.8073 57.3894L32.5137 18.8507C31.3387 17.5677 32.2488 15.5 33.9886 15.5L104.576 15.5C106.316 15.5 107.226 17.5677 106.051 18.8508L70.7572 57.3894Z" fill="url(#paint0_linear_449_875)"/>
                    <rect x="47.282" y="27.3779" width="5" height="30.0415" rx="2.5" transform="rotate(-42.4954 47.282 27.3779)" fill="#1B1B1B"/>
                    <defs>
                        <linearGradient id="paint0_linear_449_875" x1="14.2822" y1="85.5" x2="11.7822" y2="0.999999" gradientUnits="userSpaceOnUse">
                            <stop offset="0.187716" stop-color="#B1C871"/>
                            <stop offset="0.54924" stop-color="#E9A072"/>
                            <stop offset="1" stop-color="#E16AB7"/>
                        </linearGradient>
                    </defs>
                </svg>
            `;
            break;
        case "Take a shot":
            svg = `
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="115" viewBox="0 0 100 115" fill="none">
                    <path d="M11.5372 2.5H88.4628C93.0288 2.5 96.5353 6.5455 95.8868 11.0652L82.2563 106.065C81.7265 109.758 78.563 112.5 74.8324 112.5H25.1676C21.437 112.5 18.2735 109.758 17.7436 106.065L4.11321 11.0652C3.46474 6.5455 6.97123 2.5 11.5372 2.5Z" stroke="#C1C1C1" stroke-width="5"/>
                    <path d="M16.9445 35.157C16.4738 31.8398 19.3349 29.0075 22.6471 29.5115L31.6516 30.8818C36.4776 31.6162 41.4099 31.1618 46.0205 29.5581L54.2114 26.7091C59.3093 24.9359 64.7911 24.5709 70.079 25.6525L79.3907 27.5572C81.9804 28.0869 83.7104 30.5409 83.3391 33.1581L74.3947 96.2023C74.045 98.6677 71.9344 100.5 69.4443 100.5H30.5557C28.0656 100.5 25.955 98.6677 25.6053 96.2023L16.9445 35.157Z" fill="url(#paint0_linear_449_1051)"/>
                    <rect x="24" y="44.918" width="4.60314" height="44" rx="2.30157" transform="rotate(-8 24 44.918)" fill="#1B1B1B"/>
                    <rect x="19" y="107" width="62" height="5" fill="#C1C1C1"/>
                    <defs>
                        <linearGradient id="paint0_linear_449_1051" x1="50" y1="101" x2="50" y2="24" gradientUnits="userSpaceOnUse">
                            <stop offset="0.0743588" stop-color="#B1C871"/>
                            <stop offset="0.484375" stop-color="#E9A072"/>
                            <stop offset="1" stop-color="#E16AB7"/>
                        </linearGradient>
                    </defs>
                </svg>
            `;
            break;
        case "Down the rest of your drink":
            svg = `
                <svg xmlns="http://www.w3.org/2000/svg" width="140" height="161" viewBox="0 0 140 161" fill="none">
                    <path d="M24.5941 3H114.237C116.517 3 118.436 4.70452 118.706 6.96807L130.362 104.885C133.726 133.145 111.654 158 83.1949 158H56.3817C28.0649 158 6.03764 133.382 9.17393 105.239L20.1218 7.00158C20.3757 4.72328 22.3017 3 24.5941 3Z" stroke="#C1C1C1" stroke-width="5"/>
                    <path d="M26.1346 48.0674C26.3494 46.5932 27.6135 45.5 29.1033 45.5H109.899C111.377 45.5 112.636 46.5775 112.863 48.0386L121.316 102.348C125.091 126.6 106.336 148.5 81.7923 148.5H57.7511C33.364 148.5 14.6526 126.865 18.1691 102.732L26.1346 48.0674Z" fill="url(#paint0_linear_181_1613)"/>
                    <path d="M31.7928 64.481C31.9624 63.1108 33.2108 62.1375 34.581 62.3071V62.3071C35.9513 62.4768 36.9246 63.7251 36.7549 65.0953L32.2689 101.332C32.0993 102.702 30.851 103.675 29.4807 103.505V103.505C28.1105 103.336 27.1372 102.087 27.3068 100.717L31.7928 64.481Z" fill="#131313"/>
                    <defs>
                    <linearGradient id="paint0_linear_181_1613" x1="70" y1="45.5" x2="70" y2="148.5" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#B1C871"/>
                        <stop offset="0.484375" stop-color="#E9A072"/>
                        <stop offset="1" stop-color="#E7538C"/>
                    </linearGradient>
                    </defs>
                </svg>
            `;
            break;
        case "Pick a friend and take a sip together":
            svg = `
                <svg xmlns="http://www.w3.org/2000/svg" width="190" height="178" viewBox="0 0 190 178" fill="none">
                <rect x="40" y="86" width="10" height="54" stroke="#C1C1C1" stroke-width="4"/>
                    <path d="M22.0292 2H66.0733C68.5971 2 70.7252 3.88075 71.0354 6.38534L78.4967 66.62C79.2688 72.8533 75.6098 78.7871 69.6935 80.8961C53.4018 86.7035 35.5325 86.6801 19.2371 80.8713C13.3475 78.7719 9.65282 72.8878 10.3445 66.684L17.06 6.44601C17.3422 3.91465 19.4822 2 22.0292 2Z" stroke="#C1C1C1" stroke-width="4"/>
                    <path d="M46.3833 139.973L64.8879 149.588C67.6746 151.036 66.6451 155.25 63.5046 155.25H26.4954C23.3549 155.25 22.3254 151.036 25.1121 149.588L43.6167 139.973C44.4839 139.522 45.5161 139.522 46.3833 139.973Z" stroke="#C1C1C1" stroke-width="4"/>
                    <rect x="42" y="127" width="6" height="19" fill="#1B1B1B"/>
                    <rect x="42" y="81" width="6" height="9" fill="#1B1B1B"/>
                    <path d="M21.6898 24.6514C21.8667 23.1397 23.1475 22 24.6695 22H63.8562C65.3672 22 66.6424 23.1238 66.8324 24.6228L72.1909 66.8983C72.6584 70.5871 70.4023 74.0767 66.8466 75.1643V75.1643C52.282 79.6196 36.6812 79.6083 22.1165 75.153V75.153C18.5799 74.0712 16.3123 70.6128 16.7421 66.9396L21.6898 24.6514Z" fill="url(#paint0_linear_457_1501)"/>
                    <rect x="26.4756" y="29" width="5" height="30.0415" rx="2.5" transform="rotate(6.64325 26.4756 29)" fill="#1B1B1B"/>
                    <rect x="126.326" y="93.3757" width="10" height="54" transform="rotate(-10 126.326 93.3757)" stroke="#C1C1C1" stroke-width="4"/>
                    <path d="M94.0417 13.7729L137.417 6.12472C139.902 5.68648 142.324 7.16912 143.065 9.58179L160.873 67.6057C162.715 73.6102 160.142 80.0892 154.682 83.1935C139.646 91.7418 122.044 94.8217 104.988 91.9308C98.8233 90.886 94.1629 85.7329 93.7667 79.5032L89.9201 19.0143C89.7584 16.4724 91.5334 14.2152 94.0417 13.7729Z" stroke="#C1C1C1" stroke-width="4"/>
                    <path d="M141.985 145.42L161.878 151.676C164.874 152.618 164.592 156.947 161.499 157.492L125.052 163.919C121.959 164.464 120.214 160.493 122.707 158.583L139.26 145.9C140.036 145.306 141.053 145.127 141.985 145.42Z" stroke="#C1C1C1" stroke-width="4"/>
                    <rect x="135.415" y="133.406" width="6" height="19" transform="rotate(-10 135.415 133.406)" fill="#1B1B1B"/>
                    <rect x="127.427" y="88.1045" width="6" height="9" transform="rotate(-10 127.427 88.1045)" fill="#1B1B1B"/>
                    <path d="M97.6409 36.1387C97.5526 34.6193 98.616 33.2745 100.115 33.0102L138.706 26.2055C140.194 25.9431 141.645 26.8283 142.093 28.2716L154.711 68.9744C155.812 72.5259 154.196 76.3543 150.883 78.0428V78.0428C137.313 84.9595 121.948 87.6575 106.831 85.799V85.799C103.16 85.3478 100.326 82.3357 100.112 78.6436L97.6409 36.1387Z" fill="url(#paint1_linear_457_1501)"/>
                    <rect x="103.109" y="39.5903" width="5" height="30.0415" rx="2.5" transform="rotate(-3.35675 103.109 39.5903)" fill="#1B1B1B"/>
                    <defs>
                        <linearGradient id="paint0_linear_457_1501" x1="16" y1="52.7317" x2="78.5551" y2="52.7317" gradientUnits="userSpaceOnUse">
                            <stop offset="0.0743588" stop-color="#B1C871"/>
                            <stop offset="0.484375" stop-color="#E9A072"/>
                            <stop offset="1" stop-color="#E16AB7"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_457_1501" x1="96.9137" y1="64.7804" x2="158.518" y2="53.9179" gradientUnits="userSpaceOnUse">
                            <stop offset="0.0743588" stop-color="#B1C871"/>
                            <stop offset="0.484375" stop-color="#E9A072"/>
                            <stop offset="1" stop-color="#E16AB7"/>
                        </linearGradient>
                    </defs>
                </svg>
            `;
            break;
        case "Take 3 shots in a row":
            svg = `
                <svg xmlns="http://www.w3.org/2000/svg" width="218" height="71" viewBox="0 0 218 71" fill="none">
                    <path d="M5.74128 1H53.9356C56.3632 1 58.2311 3.14489 57.8976 5.54948L49.4378 66.5495C49.1635 68.5274 47.4726 70 45.4757 70H14.2011C12.2043 70 10.5133 68.5274 10.239 66.5495L1.77921 5.54949C1.44572 3.14489 3.31367 1 5.74128 1Z" stroke="#C1C1C1" stroke-width="2"/>
                    <path d="M10.4295 24.0209C9.9905 20.8199 12.7632 18.1018 15.9548 18.6042L16.4438 18.6812C20.9249 19.3867 25.5116 18.9513 29.7799 17.4154V17.4154C34.4996 15.717 39.5991 15.3675 44.5064 16.4059L45.5782 16.6327C48.1428 17.1754 49.8528 19.6066 49.4967 22.2037L44.2696 60.3195C44.1338 61.3098 43.2877 62.0478 42.2882 62.0478H17.3888C16.3892 62.0478 15.5431 61.3098 15.4073 60.3195L10.4295 24.0209Z" fill="url(#paint0_linear_457_1500)"/>
                    <rect x="11" y="66" width="38" height="3" fill="#C1C1C1"/>
                    <rect width="2.74888" height="27.1479" rx="1.37444" transform="matrix(0.989594 -0.143885 0.13461 0.990899 14.3218 27.731)" fill="#2A2A2A"/>
                    <path d="M84.9029 1H133.097C135.525 1 137.393 3.14489 137.059 5.54948L128.599 66.5495C128.325 68.5274 126.634 70 124.637 70H93.3627C91.3659 70 89.675 68.5274 89.4006 66.5495L80.9408 5.54949C80.6073 3.14489 82.4753 1 84.9029 1Z" stroke="#C1C1C1" stroke-width="2"/>
                    <path d="M89.5911 24.0209C89.1521 20.8199 91.9248 18.1018 95.1165 18.6042L95.6054 18.6812C100.087 19.3867 104.673 18.9513 108.942 17.4154V17.4154C113.661 15.717 118.761 15.3675 123.668 16.4059L124.74 16.6327C127.304 17.1754 129.014 19.6066 128.658 22.2037L123.431 60.3195C123.295 61.3098 122.449 62.0478 121.45 62.0478H96.5504C95.5508 62.0478 94.7047 61.3098 94.5689 60.3195L89.5911 24.0209Z" fill="url(#paint1_linear_457_1500)"/>
                    <rect x="90" y="66" width="38" height="3" fill="#C1C1C1"/>
                    <rect width="2.74888" height="27.1479" rx="1.37444" transform="matrix(0.989594 -0.143885 0.13461 0.990899 93.4834 27.731)" fill="#2A2A2A"/>
                    <path d="M164.065 1H212.259C214.686 1 216.554 3.14489 216.221 5.54948L207.761 66.5495C207.487 68.5274 205.796 70 203.799 70H172.524C170.528 70 168.837 68.5274 168.562 66.5495L160.102 5.54949C159.769 3.14489 161.637 1 164.065 1Z" stroke="#C1C1C1" stroke-width="2"/>
                    <path d="M168.753 24.0209C168.314 20.8199 171.086 18.1018 174.278 18.6042L174.767 18.6812C179.248 19.3867 183.835 18.9513 188.103 17.4154V17.4154C192.823 15.717 197.922 15.3675 202.83 16.4059L203.901 16.6327C206.466 17.1754 208.176 19.6066 207.82 22.2037L202.593 60.3195C202.457 61.3098 201.611 62.0478 200.611 62.0478H175.712C174.712 62.0478 173.866 61.3098 173.731 60.3195L168.753 24.0209Z" fill="url(#paint2_linear_457_1500)"/>
                    <rect x="169" y="66" width="38" height="3" fill="#C1C1C1"/>
                    <rect width="2.74888" height="27.1479" rx="1.37444" transform="matrix(0.989594 -0.143885 0.13461 0.990899 172.645 27.731)" fill="#2A2A2A"/>
                    <defs>
                        <linearGradient id="paint0_linear_457_1500" x1="29.8387" y1="62.6471" x2="29.8387" y2="14.6177" gradientUnits="userSpaceOnUse">
                            <stop offset="0.0743588" stop-color="#B1C871"/>
                            <stop offset="0.484375" stop-color="#E9A072"/>
                            <stop offset="1" stop-color="#E16AB7"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_457_1500" x1="109" y1="62.6471" x2="109" y2="14.6177" gradientUnits="userSpaceOnUse">
                            <stop offset="0.0743588" stop-color="#B1C871"/>
                            <stop offset="0.484375" stop-color="#E9A072"/>
                            <stop offset="1" stop-color="#E16AB7"/>
                        </linearGradient>
                        <linearGradient id="paint2_linear_457_1500" x1="188.162" y1="62.6471" x2="188.162" y2="14.6177" gradientUnits="userSpaceOnUse">
                            <stop offset="0.0743588" stop-color="#B1C871"/>
                            <stop offset="0.484375" stop-color="#E9A072"/>
                            <stop offset="1" stop-color="#E16AB7"/>
                        </linearGradient>
                    </defs>
                </svg>
            `;
            break;
    }

    // Change innerHTML for main to display result
    const main = document.querySelector("main");
    main.removeAttribute("class");
    main.innerHTML = `
        <div id="spinTheBottleResult">
            <div class="resultName">${name}</div>
            <h2 class="prompt">${challenge}</h2>
            <div class="svgWrapper">${svg}</div>
        </div>
    `;

    let isHost = window.localStorage.getItem("host");
    let checkActiveGame;
    if (!isHost) {
        checkActiveGame = setInterval(async () => {
            console.log("hej");
            checkIfGameExist(gameId, checkActiveGame);

            let requestDataForCheckingActiveGame = {
                gameId: gameId,
                action: "checkActiveGame",
            }

            let activeGame = await handleGameFetch(requestDataForCheckingActiveGame);

            // If there is an active game return this information
            if (activeGame) {
                return "Active game";
            } else {
                console.log("No active game");

                let infoBox = document.createElement("div");
                infoBox.classList.add("infoBox");
                infoBox.innerHTML = `
                <div>
                    <p>Your host ended this round</p>
                    <p>You will be taken back to the waiting page</p>
                </div>
                `;

                document.querySelector("main").appendChild(infoBox);
                // Clear interval
                clearInterval(checkActiveGame);

                setTimeout(() => {
                    renderWaitingForGame(gameId);
                }, 5000);
            }
        }, 1000);
    }

    let footer = document.querySelector("footer");
    // Structure of footer
    footer.innerHTML = `
        <div class="buttonQuit">
            <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
            <p>QUIT</p>
        </div>
        <button class="nextButton">NEXT</button>
    `;

    // When clicking quit leave game
    footer.querySelector(".buttonQuit").addEventListener("click", () => {

        // If user is host - ask to play another game or keep playing
        if (isHost) {
            // Display pop up
            let gameId = parseInt(localStorage.getItem("gameId"));

            let popUp = document.createElement("div");
            popUp.setAttribute("id", "leaveGamePopUp");

            popUp.innerHTML = `
        <div>
            <p>Are you sure you want to end this round?</p>
            <div>   
                <button class="leaveGame">End Round</button>
                <button class="closePopup">Keep Playing</button>
            </div>
        </div>
        `;

            document.querySelector("main").appendChild(popUp);

            // Close pop up and keep playing
            popUp.querySelector(".closePopup").addEventListener("click", () => {
                popUp.remove();
            });

            // End round and go back to category display
            popUp.querySelector(".leaveGame").addEventListener("click", async () => {
                let requestDataForEndingRound = {
                    action: "endRound",
                    gameId: gameId
                }

                await handleGameFetch(requestDataForEndingRound);

                // Go back to game display
                renderGameDisplay()
            })
        } else {
            // If user is not host - ask to leave game or keep playing
            clearInterval(checkActiveGame)
            leaveGame();
            setSTBPlayerIndex(getSTBPlayerIndex() + 1)
            spinTheBottleHandle(gameId)
        }
    })

    // Render new round of Spin The Bottle
    document.querySelector(".nextButton").addEventListener("click", () => {
        setSTBPlayerIndex(getSTBPlayerIndex() + 1)
        spinTheBottleHandle(gameId)
    });
}