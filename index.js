import data from "./data.js";


const startBtn = document.querySelector('#startBtn');
const roundSelect = document.querySelector('#roundSelect');
const startForm = document.querySelector('.startForm');
const inGame = document.querySelector('.inGame');
const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const title1 = document.querySelector('#title1');
const title2 = document.querySelector('#title2');
const worldcupTitle = document.querySelector('#worldcupTitle');
const ending = document.querySelector('.ending');
const winnerImg = document.querySelector('.winnerImg');
const winnerTitle = document.querySelector('#winnerTitle');



let round = 0;
let options = [];
let nextRound = [];
let curRound = 0;
let winner = {};
let canClick = true;

startBtn.addEventListener('click', (e) => {
    round = roundSelect.value;
    startForm.classList.add('hidden');
    inGame.classList.remove('hidden');
    let shuffledData = shuffle(data);
    for (let i = 0; i < round; i++) {
        options.push(shuffledData[i]);
    }
    changeImage();
})

img1.addEventListener('click', () => {
    selectOption(0);
})

img2.addEventListener('click', () => {
    selectOption(1);
})


function shuffle(array) {
    let copy = [...array]
    copy.sort(() => {
        return Math.random() - 0.5;
    });
    return copy;
}

function changeImage() {
    img1.style.backgroundImage = `url(${options[curRound * 2].image})`;
    img2.style.backgroundImage = `url(${options[curRound * 2 + 1].image})`;
    title1.innerHTML = options[curRound * 2].name;
    title2.innerHTML = options[curRound * 2 + 1].name
    worldcupTitle.innerHTML = `복소수 월드컵 ${round == 2 ? '결승전':`${round}강` } ${round==2?'':`(${curRound}/${round / 2})`}`

}

function selectOption(num) {
    if (canClick) {
        canClick = false;
        nextRound.push(options[curRound * 2 + num]);

        if (num == 0) {
            img1.classList.add('seleted');
            img2.classList.add('hidden');
        } else {
            img2.classList.add('seleted');
            img1.classList.add('hidden');
        }

        setTimeout(() => {
            if (curRound < round / 2 - 1) {
                curRound++;
                changeImage();
            } else if (round == 2) {
                winner = options[curRound * 2 + num];
                inGame.classList.add('hidden');
                ending.classList.remove('hidden');
                winnerImg.style.backgroundImage = `url(${winner.image})`;
                winnerTitle.innerHTML = winner.name;
                worldcupTitle.innerHTML = '복소수 월드컵'

            } else {
                curRound = 0;
                round /= 2;
                options = shuffle([...nextRound]);
                nextRound = [];
                changeImage();

            }

            img1.classList.remove('seleted');
            img2.classList.remove('seleted');
            img1.classList.remove('hidden');
            img2.classList.remove('hidden');

            canClick = true;
        }, 1000);



    }
}
