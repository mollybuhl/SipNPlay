"use strict";

function spinTheBottleHandle() {
    const main = document.querySelector("main");
    main.removeAttribute("class");

    // The HTML structure of Spin The Bottle includes 7 svgs imported from FIGMA file
    main.innerHTML = `
        <div id="spinTheBottleWrapper">
            <h1>Spin The Bottle</h1>
            <h2>It's <span>Lasse</span>'s turn</h2>
            <div id="circle">
                <div class="challenge" style="--i:1;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                        <mask id="path-1-inside-1_101_157" fill="white">
                            <path d="M1.3147 0C0.78563 0 0.305779 0.304688 0.100714 0.773438C-0.10435 1.24219 0.0104858 1.77734 0.383704 2.13672L9.18918 10.5195V17.5H6.56435C5.83843 17.5 5.25194 18.0586 5.25194 18.75C5.25194 19.4414 5.83843 20 6.56435 20H10.5016H14.4388C15.1648 20 15.7513 19.4414 15.7513 18.75C15.7513 18.0586 15.1648 17.5 14.4388 17.5H11.814V10.5195L20.6154 2.13281C20.9927 1.77344 21.1034 1.23828 20.8984 0.769531C20.6933 0.300781 20.2176 0 19.6885 0H1.3147ZM10.5016 8.23047L4.485 2.5H16.5182L10.5016 8.23047Z"/>
                        </mask>
                        <path d="M0.383704 2.13672L-5.85889 8.61977L-5.84044 8.63754L-5.82189 8.6552L0.383704 2.13672ZM9.18918 10.5195H18.1892V6.66132L15.3948 4.00105L9.18918 10.5195ZM9.18918 17.5V26.5H18.1892V17.5H9.18918ZM11.814 17.5H2.81401V26.5H11.814V17.5ZM11.814 10.5195L5.60539 4.00394L2.81401 6.6638V10.5195H11.814ZM20.6154 2.13281L14.4083 -4.38423L14.4068 -4.38278L20.6154 2.13281ZM10.5016 8.23047L4.29449 14.7475L10.5016 20.6594L16.7087 14.7475L10.5016 8.23047ZM4.485 2.5V-6.5H-18.0139L-1.72211 9.01704L4.485 2.5ZM16.5182 2.5L22.7253 9.01704L39.0171 -6.5L16.5182 -6.5V2.5ZM1.3147 -9C-2.61096 -9 -6.43611 -6.73955 -8.14479 -2.83373L8.34622 4.38061C7.04766 7.34893 4.18222 9 1.3147 9V-9ZM-8.14479 -2.83373C-9.92135 1.22725 -8.83293 5.75604 -5.85889 8.61977L6.6263 -4.34634C8.85391 -2.20135 9.71265 1.25713 8.34622 4.38061L-8.14479 -2.83373ZM-5.82189 8.6552L2.98359 17.038L15.3948 4.00105L6.5893 -4.38176L-5.82189 8.6552ZM0.189183 10.5195V17.5H18.1892V10.5195H0.189183ZM9.18918 8.5H6.56435V26.5H9.18918V8.5ZM6.56435 8.5C1.28613 8.5 -3.74806 12.6798 -3.74806 18.75H14.2519C14.2519 23.4374 10.3907 26.5 6.56435 26.5V8.5ZM-3.74806 18.75C-3.74806 24.8202 1.28613 29 6.56435 29V11C10.3907 11 14.2519 14.0626 14.2519 18.75H-3.74806ZM6.56435 29H10.5016V11H6.56435V29ZM10.5016 29H14.4388V11H10.5016V29ZM14.4388 29C19.7171 29 24.7513 24.8202 24.7513 18.75H6.75125C6.75125 14.0626 10.6125 11 14.4388 11V29ZM24.7513 18.75C24.7513 12.6798 19.7171 8.5 14.4388 8.5V26.5C10.6125 26.5 6.75125 23.4374 6.75125 18.75H24.7513ZM14.4388 8.5H11.814V26.5H14.4388V8.5ZM20.814 17.5V10.5195H2.81401V17.5H20.814ZM18.0226 17.0351L26.824 8.64841L14.4068 -4.38278L5.60539 4.00394L18.0226 17.0351ZM26.8225 8.64985C29.8786 5.73905 30.8999 1.17641 29.1439 -2.83764L12.6529 4.3767C11.307 1.30015 12.1068 -2.19218 14.4083 -4.38423L26.8225 8.64985ZM29.1439 -2.83764C27.429 -6.75755 23.5981 -9 19.6885 -9V9C16.837 9 13.9576 7.35911 12.6529 4.3767L29.1439 -2.83764ZM19.6885 -9H1.3147V9H19.6885V-9ZM16.7087 1.71343L10.6921 -4.01704L-1.72211 9.01704L4.29449 14.7475L16.7087 1.71343ZM4.485 11.5H16.5182V-6.5H4.485V11.5ZM10.3111 -4.01704L4.29449 1.71343L16.7087 14.7475L22.7253 9.01704L10.3111 -4.01704Z" fill="#1B1B1B" mask="url(#path-1-inside-1_101_157)"/>
                    </svg>
                </div>
                <div class="challenge" style="--i:2;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="22" viewBox="0 0 26 22" fill="none">
                        <path d="M18.197 1.29816C18.0118 0.995238 17.7011 0.779628 17.3412 0.704882C16.9813 0.630136 16.6001 0.694513 16.2928 0.895615L2.30348 9.91108C0.850634 10.8478 0.402999 12.6776 1.27689 14.1071L4.74331 19.7776C5.6172 21.2071 7.51299 21.7462 9.09069 21.0137L24.2785 13.9588C24.6128 13.8019 24.865 13.5265 24.9732 13.1894C25.0813 12.8523 25.0403 12.4927 24.8552 12.1898L18.197 1.29816ZM13.3904 5.81093L16.5982 3.74381L21.8249 12.2937L18.3424 13.9116L17.4013 13.3289C16.6469 12.8618 16.1725 12.0858 16.1196 11.2323C16.0608 10.3138 15.549 9.47647 14.738 8.97227C13.9836 8.50517 13.5092 7.72914 13.4563 6.87563L13.3904 5.81093Z" fill="#1B1B1B"/>
                    </svg>
                </div>
                <div class="challenge" style="--i:3;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="31" viewBox="0 0 33 31" fill="none">
                        <g clip-path="url(#clip0_101_241)">
                        <path d="M29.444 16.9676L29.4492 16.9691C29.5101 16.9877 29.5456 17.0218 29.5656 17.0586C29.5856 17.0955 29.5943 17.1427 29.5747 17.2006L28.2645 21.0838C28.244 21.1445 28.1969 21.2005 28.1239 21.2362C28.0508 21.2719 27.9754 21.2758 27.9114 21.2564C27.8037 21.2236 27.7597 21.1319 27.7794 21.0515L28.0561 19.9189L26.8928 19.5652L26.2855 19.3806L23.1661 18.4324C22.0557 18.0948 20.9986 18.4809 20.3024 19.0374L20.3011 19.0385C19.0854 20.0131 17.3913 20.3795 15.7849 19.8913C15.7848 19.8913 15.7847 19.8913 15.7847 19.8912L5.47049 16.7491L5.46973 16.7488C4.56226 16.473 4.07157 15.5683 4.3622 14.7069L6.16372 9.36753C6.46469 8.4755 7.48433 7.97721 8.42409 8.26289L8.42447 8.263L18.7453 11.3972C18.7454 11.3972 18.7455 11.3972 18.7457 11.3973C20.3424 11.8828 21.4606 13.0952 21.8457 14.5141C22.0813 15.3903 22.7439 16.3122 23.8583 16.651L26.9777 17.5993L27.585 17.7839L28.6681 18.1131L29.1055 17.12C29.1306 17.0629 29.1803 17.0119 29.2493 16.9814C29.3169 16.9516 29.3847 16.9493 29.444 16.9676ZM7.94298 10.5745L6.60412 14.5426C6.25604 15.5743 6.8668 16.7003 7.95368 17.0307L14.1797 18.9234C15.2343 19.244 16.354 18.6968 16.6917 17.6958L18.0306 13.7276C18.3787 12.696 17.7679 11.5699 16.681 11.2395L10.4551 9.34683C9.40047 9.02623 8.28073 9.57345 7.94298 10.5745Z" fill="#1B1B1B" stroke="#1B1B1B" stroke-width="2.5"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_101_241">
                                <rect width="23.2848" height="24.0901" fill="white" transform="matrix(0.434978 0.900441 -0.916915 0.399082 22.3887 0.088562)"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div class="challenge" style="--i:4;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="30" viewBox="0 0 37 30" fill="none">
                        <path d="M23.7916 22.5109C24.4146 22.0547 24.5651 21.2161 24.1392 20.5891L19.7821 14.198C17.9197 11.4651 14.2672 10.5441 11.2913 11.8474L8.40058 8.29142L10.2019 6.97207C10.8662 6.48556 10.9882 5.58247 10.475 4.95117C9.96182 4.31987 9.01056 4.2029 8.34632 4.68941L5.34408 6.88833L2.34185 9.08724C1.6776 9.57376 1.55557 10.4768 2.06876 11.1081C2.58195 11.7394 3.53321 11.8564 4.19745 11.3699L5.99879 10.0506L8.88658 13.603C6.8037 16.0048 6.81601 19.592 9.12873 21.9951L14.5367 27.6166C15.0705 28.1702 15.9633 28.2446 16.5862 27.7884L23.7916 22.5109ZM17.2312 15.7591L20.8327 21.0364L15.834 24.6976L11.3656 20.0552C9.89797 18.5297 10.1162 16.1393 11.8387 14.8777C13.5612 13.616 16.0525 14.0219 17.2312 15.7591Z" fill="#1B1B1B"/>
                        <path d="M34.8786 23.2772C35.6361 23.0751 36.1061 22.3508 35.9582 21.6181L34.4351 14.1441C33.7845 10.9484 30.7599 8.79767 27.4864 8.95009L26.2064 4.62603L28.3968 4.04182C29.2046 3.8264 29.6735 3.03215 29.4463 2.26449C29.2191 1.49683 28.3829 1.05067 27.5752 1.2661L23.9245 2.23978L20.2737 3.21346C19.466 3.42888 18.997 4.22313 19.2243 4.99079C19.4515 5.75845 20.2877 6.20461 21.0954 5.98918L23.2858 5.40497L24.5645 9.72469C21.6865 11.2129 20.2847 14.5442 21.4828 17.5939L24.2837 24.7271C24.5607 25.4301 25.3594 25.816 26.1169 25.614L34.8786 23.2772ZM31.4543 14.6864L32.7153 20.8593L26.6369 22.4804L24.3217 16.5888C23.5616 14.653 24.7057 12.5135 26.8003 11.9548C28.8949 11.3962 31.0455 12.6569 31.4543 14.6864Z" fill="#1B1B1B"/>
                    </svg>
                </div>
                <div class="challenge" style="--i:5;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                        <mask id="path-1-inside-1_101_157" fill="white">
                        <path d="M1.3147 0C0.78563 0 0.305779 0.304688 0.100714 0.773438C-0.10435 1.24219 0.0104858 1.77734 0.383704 2.13672L9.18918 10.5195V17.5H6.56435C5.83843 17.5 5.25194 18.0586 5.25194 18.75C5.25194 19.4414 5.83843 20 6.56435 20H10.5016H14.4388C15.1648 20 15.7513 19.4414 15.7513 18.75C15.7513 18.0586 15.1648 17.5 14.4388 17.5H11.814V10.5195L20.6154 2.13281C20.9927 1.77344 21.1034 1.23828 20.8984 0.769531C20.6933 0.300781 20.2176 0 19.6885 0H1.3147ZM10.5016 8.23047L4.485 2.5H16.5182L10.5016 8.23047Z"/>
                        </mask>
                        <path d="M0.383704 2.13672L-5.85889 8.61977L-5.84044 8.63754L-5.82189 8.6552L0.383704 2.13672ZM9.18918 10.5195H18.1892V6.66132L15.3948 4.00105L9.18918 10.5195ZM9.18918 17.5V26.5H18.1892V17.5H9.18918ZM11.814 17.5H2.81401V26.5H11.814V17.5ZM11.814 10.5195L5.60539 4.00394L2.81401 6.6638V10.5195H11.814ZM20.6154 2.13281L14.4083 -4.38423L14.4068 -4.38278L20.6154 2.13281ZM10.5016 8.23047L4.29449 14.7475L10.5016 20.6594L16.7087 14.7475L10.5016 8.23047ZM4.485 2.5V-6.5H-18.0139L-1.72211 9.01704L4.485 2.5ZM16.5182 2.5L22.7253 9.01704L39.0171 -6.5L16.5182 -6.5V2.5ZM1.3147 -9C-2.61096 -9 -6.43611 -6.73955 -8.14479 -2.83373L8.34622 4.38061C7.04766 7.34893 4.18222 9 1.3147 9V-9ZM-8.14479 -2.83373C-9.92135 1.22725 -8.83293 5.75604 -5.85889 8.61977L6.6263 -4.34634C8.85391 -2.20135 9.71265 1.25713 8.34622 4.38061L-8.14479 -2.83373ZM-5.82189 8.6552L2.98359 17.038L15.3948 4.00105L6.5893 -4.38176L-5.82189 8.6552ZM0.189183 10.5195V17.5H18.1892V10.5195H0.189183ZM9.18918 8.5H6.56435V26.5H9.18918V8.5ZM6.56435 8.5C1.28613 8.5 -3.74806 12.6798 -3.74806 18.75H14.2519C14.2519 23.4374 10.3907 26.5 6.56435 26.5V8.5ZM-3.74806 18.75C-3.74806 24.8202 1.28613 29 6.56435 29V11C10.3907 11 14.2519 14.0626 14.2519 18.75H-3.74806ZM6.56435 29H10.5016V11H6.56435V29ZM10.5016 29H14.4388V11H10.5016V29ZM14.4388 29C19.7171 29 24.7513 24.8202 24.7513 18.75H6.75125C6.75125 14.0626 10.6125 11 14.4388 11V29ZM24.7513 18.75C24.7513 12.6798 19.7171 8.5 14.4388 8.5V26.5C10.6125 26.5 6.75125 23.4374 6.75125 18.75H24.7513ZM14.4388 8.5H11.814V26.5H14.4388V8.5ZM20.814 17.5V10.5195H2.81401V17.5H20.814ZM18.0226 17.0351L26.824 8.64841L14.4068 -4.38278L5.60539 4.00394L18.0226 17.0351ZM26.8225 8.64985C29.8786 5.73905 30.8999 1.17641 29.1439 -2.83764L12.6529 4.3767C11.307 1.30015 12.1068 -2.19218 14.4083 -4.38423L26.8225 8.64985ZM29.1439 -2.83764C27.429 -6.75755 23.5981 -9 19.6885 -9V9C16.837 9 13.9576 7.35911 12.6529 4.3767L29.1439 -2.83764ZM19.6885 -9H1.3147V9H19.6885V-9ZM16.7087 1.71343L10.6921 -4.01704L-1.72211 9.01704L4.29449 14.7475L16.7087 1.71343ZM4.485 11.5H16.5182V-6.5H4.485V11.5ZM10.3111 -4.01704L4.29449 1.71343L16.7087 14.7475L22.7253 9.01704L10.3111 -4.01704Z" fill="#1B1B1B" mask="url(#path-1-inside-1_101_157)"/>
                    </svg>
                </div>
                <div class="challenge" style="--i:6;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="54" viewBox="0 0 37 54" fill="none">
                        <path d="M0.626692 50.136C0.59145 50.4846 0.711787 50.8316 0.95856 51.0913C1.20533 51.3509 1.55476 51.5093 1.92795 51.5156L18.8316 51.9166C20.5873 51.9579 22.0736 50.7176 22.2399 49.0724L22.8996 42.5464C23.0659 40.9012 21.8552 39.4152 20.1232 39.1389L3.4477 36.4816C3.07965 36.4243 2.70568 36.5088 2.41099 36.7232C2.11631 36.9375 1.92905 37.2525 1.89381 37.6011L0.626692 50.136ZM7.3026 49.1232L3.4266 49.0311L4.42129 39.1912L8.24502 39.8004L8.6528 40.7942C8.97969 41.5909 8.88941 42.484 8.40888 43.2072C7.89327 43.9864 7.79586 44.95 8.14595 45.8082C8.47285 46.6049 8.38257 47.498 7.90203 48.2211L7.3026 49.1232Z" fill="#1B1B1B"/>
                        <path d="M10.2036 12.2097C10.0079 12.5066 9.95212 12.868 10.0505 13.205C10.149 13.542 10.387 13.8319 10.7178 13.9959L25.649 21.5283C27.2 22.3104 29.1137 21.8317 30.0374 20.4306L33.7013 14.8732C34.625 13.4722 34.242 11.6292 32.8229 10.6469L19.1585 1.19316C18.8562 0.985772 18.4819 0.902679 18.1174 0.969313C17.7528 1.03595 17.437 1.23826 17.2412 1.53514L10.2036 12.2097ZM16.6522 14.1369L13.2286 12.4096L18.7531 4.03009L21.8864 6.19772L21.7831 7.25974C21.7002 8.1111 21.1988 8.87166 20.4283 9.31459C19.6001 9.79281 19.0591 10.6134 18.968 11.5296C18.8852 12.3809 18.3837 13.1415 17.6133 13.5844L16.6522 14.1369Z" fill="#1B1B1B"/>
                        <path d="M2.71258 30.7181C2.59783 31.0509 2.63526 31.4145 2.8162 31.7191C2.99713 32.0238 3.30159 32.2508 3.66428 32.3345L20.0658 36.2367C21.7695 36.6417 23.5057 35.7401 24.0473 34.1693L26.1953 27.9385C26.7369 26.3677 25.8981 24.6662 24.2717 24.0368L8.61287 17.9804C8.26694 17.8481 7.88255 17.853 7.5456 18.0009C7.20865 18.1488 6.95331 18.4173 6.83856 18.7501L2.71258 30.7181ZM9.46018 31.1164L5.69934 30.2215L8.93823 20.8266L12.5289 22.2152L12.6977 23.2697C12.833 24.115 12.539 24.9677 11.9034 25.5735C11.2207 26.2268 10.9035 27.1468 11.0473 28.0568C11.1826 28.9021 10.8886 29.7549 10.253 30.3607L9.46018 31.1164Z" fill="#1B1B1B"/>
                    </svg>
                </div>
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
            
            <div id="spin">SPIN</div>
        </div>
    `;

    // Footer html
    let footer = document.querySelector("footer");
    footer.removeAttribute("class");
    footer.innerHTML = `
        <div class="buttonQuit">
            <i class="fa-solid fa-chevron-left" style="color: #747474;"></i>
            <p>QUIT</p>
        </div>
    `;

    // Event listener to add transition/animation to make bottle spin and point by randomly calculating an angle
    let angle = 0;
    const pointer = document.getElementById("bottlePointer");
    const spin = document.getElementById("spin");
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
                displaySpinTheBottleResult("Take a sip of someone else's drink", "Lasse");
            } else if (deg >= 60 && deg <= 120) {
                // Take a shot
                displaySpinTheBottleResult("Take a shot", "Lasse");
            } else if (deg >= 120 && deg <= 180) {
                // Down the rest of your drink
                displaySpinTheBottleResult("Down the rest of your drink", "Lasse");
            } else if (deg >= 180 && deg <= 240) {
                // Pick a friend and take a sip together
                displaySpinTheBottleResult("Pick a friend and take a sip together", "Lasse");
            } else if (deg >= 240 && deg <= 300) {
                // Take a sip of someone else's drink
                displaySpinTheBottleResult("Take a sip of your drink", "Lasse");
            } else if (deg >= 300 && deg <= 360) {
                // Take 3 shots in a row
                displaySpinTheBottleResult("Take 3 shots in a row", "Lasse");
            }
        }, 5000);
    })
}

function displaySpinTheBottleResult(challenge, name) {

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
                <svg xmlns="http://www.w3.org/2000/svg" width="87" height="165" viewBox="0 0 87 165" fill="none">
                    <path d="M13.7169 2H75.2319C77.7119 2 79.8171 3.81784 80.1785 6.27135L82.1535 19.6789C84.0094 32.278 83.3918 45.118 80.3354 57.4808L73.8413 83.7481C70.9824 95.3119 70.1712 107.287 71.4444 119.131L75.1417 153.523C75.4265 156.173 73.5833 158.58 70.9512 158.996L60.9583 160.577C50.9053 162.166 40.666 162.18 30.6087 160.618L19.819 158.942C17.2545 158.543 15.4211 156.249 15.5982 153.66L18.0075 118.442C18.7899 107.004 17.6386 95.5168 14.6018 84.462L8.29102 61.4884C4.1925 46.5684 3.68501 30.8899 6.81009 15.7361L8.81994 5.99013C9.29905 3.66684 11.3447 2 13.7169 2Z" stroke="#C1C1C1" stroke-width="4"/>
                    <path d="M13.5084 25.2773C13.6375 23.722 14.9375 22.5254 16.4981 22.5254H71.3707C72.7795 22.5254 73.9685 23.5729 74.1461 24.9704V24.9704C75.8273 38.2034 74.65 51.643 70.6937 64.3822L70.4012 65.324L65.7177 83.0546L63.8615 96.4014C62.882 103.445 62.6565 110.572 63.1889 117.663L65.5207 148.719C65.6331 150.216 64.6075 151.56 63.1342 151.847V151.847C50.987 154.212 38.5035 154.272 26.3344 152.022L25.3351 151.837C23.8204 151.557 22.7639 150.176 22.8906 148.64L25.3612 118.717C26.0041 110.93 25.7322 103.095 24.551 95.3713L24.0056 91.8051C23.1152 85.9828 21.7122 80.2505 19.8128 74.6752L18.171 69.856C13.7362 56.8381 12.0342 43.0455 13.1713 29.3401L13.5084 25.2773Z" fill="url(#paint0_linear_457_1368)"/>
                    <rect width="5.72368" height="10.5419" rx="2.86184" transform="matrix(0.999978 0.00657612 -0.00679341 0.999977 18.3872 30.4097)" fill="#1B1B1B"/>
                    <path d="M18.6479 48.9266C18.4578 47.4977 19.3702 46.1605 20.7709 45.8149V45.8149C22.4206 45.408 24.0678 46.5255 24.2977 48.2075L25.2212 54.9654C25.9572 60.3506 27.3308 65.6341 29.3132 70.7055V70.7055C31.1341 75.3635 32.4419 80.2018 33.2132 85.1349L33.9455 89.8179C34.173 91.2729 33.2913 92.6654 31.8783 93.0824V93.0824C30.1564 93.5907 28.371 92.461 28.0937 90.6879L27.3757 86.096C26.6796 81.6442 25.5538 77.267 24.014 73.0253L23.6277 71.961C21.6187 66.4266 20.2142 60.6962 19.4388 54.8695L18.6479 48.9266Z" fill="#1B1B1B"/>
                    <defs>
                        <linearGradient id="paint0_linear_457_1368" x1="11.4473" y1="90.5966" x2="83.0564" y2="90.5966" gradientUnits="userSpaceOnUse">
                            <stop offset="0.0743588" stop-color="#B1C871"/>
                            <stop offset="0.484375" stop-color="#E9A072"/>
                            <stop offset="1" stop-color="#E16AB7"/>
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

    // Add next button
    let footer = document.querySelector("footer");
    footer.innerHTML += `
        <button class="nextButton">NEXT</button>
    `;

    // Render new round of Spin The Bottle
    document.querySelector(".nextButton").addEventListener("click", () => {
        spinTheBottleHandle()
    });
}