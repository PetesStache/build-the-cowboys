let team = {
    qb: null,
    rb: null,
    wr: [],
    te: null,
    ol: null,
    defense: null
};


let quarterbacks = [];
let runningbacks = [];
let receivers = [];


// LOAD DATABASES

async function loadPlayers(){

    const qbResponse = await fetch("data/quarterbacks.json");
    quarterbacks = await qbResponse.json();


    const rbResponse = await fetch("data/runningbacks.json");
    runningbacks = await rbResponse.json();


    const wrResponse = await fetch("data/receivers.json");
    receivers = await wrResponse.json();


    createQBcards();
    createRBcards();
    createWRcards();

}



// CREATE QB CARDS

function createQBcards(){

    let div = document.getElementById("qb");


    quarterbacks.forEach(player => {

        let card = document.createElement("div");

        card.className = "player-card";


        card.innerHTML = `

        <div class="rating">
            ${player.overall}
        </div>

        <h3>${player.name}</h3>

        <p>${player.years}</p>

        <p>${player.tier}</p>

        <div class="stat">
            Arm Talent
            <b>${player.visible.armTalent}</b>
        </div>

        <div class="stat">
            Accuracy
            <b>${player.visible.accuracy}</b>
        </div>

        <div class="stat">
            Playmaking
            <b>${player.visible.playmaking}</b>
        </div>

        <div class="stat">
            Clutch
            <b>${player.visible.clutch}</b>
        </div>

        `;


        card.onclick = function(){

            document
            .querySelectorAll("#qb .player-card")
            .forEach(x => x.classList.remove("selected"));


            card.classList.add("selected");


            team.qb = player;


            console.log(team);

        };


        div.appendChild(card);

    });

}



// CREATE RB CARDS

function createRBcards(){

    let div = document.getElementById("rb");


    runningbacks.forEach(player => {

        let card = document.createElement("div");


        card.className = "player-card";


        card.innerHTML = `

        <div class="rating">
            ${player.overall}
        </div>

        <h3>${player.name}</h3>

        <p>${player.years}</p>

        <p>${player.tier}</p>


        <div class="stat">
            Speed
            <b>${player.visible.speed}</b>
        </div>


        <div class="stat">
            Vision
            <b>${player.visible.vision}</b>
        </div>


        <div class="stat">
            Elusiveness
            <b>${player.visible.elusiveness}</b>
        </div>


        <div class="stat">
            Power
            <b>${player.visible.power}</b>
        </div>

        `;


        card.onclick = function(){

            document
            .querySelectorAll("#rb .player-card")
            .forEach(x => x.classList.remove("selected"));


            card.classList.add("selected");


            team.rb = player;


            console.log(team);

        };


        div.appendChild(card);

    });

}



// CREATE WR CARDS

function createWRcards(){

    let div = document.getElementById("wr");


    receivers.forEach(player => {


        let card = document.createElement("div");


        card.className = "player-card";


        card.innerHTML = `

        <div class="rating">
            ${player.overall}
        </div>


        <h3>${player.name}</h3>


        <p>${player.years}</p>


        <p>${player.tier}</p>


        <div class="stat">
            Hands
            <b>${player.visible.hands}</b>
        </div>


        <div class="stat">
            Speed
            <b>${player.visible.speed}</b>
        </div>


        <div class="stat">
            Route Running
            <b>${player.visible.routeRunning}</b>
        </div>


        <div class="stat">
            Playmaking
            <b>${player.visible.playmaking}</b>
        </div>


        `;



        card.onclick = function(){


            if(team.wr.includes(player)){


                team.wr = team.wr.filter(
                    x => x !== player
                );


                card.classList.remove("selected");


            }


            else if(team.wr.length < 3){


                team.wr.push(player);


                card.classList.add("selected");


            }


            console.log(team);


        };


        div.appendChild(card);


    });

}



// BUILD TEAM

function buildTeam(){

    let seasons = [

        "2011 Oklahoma State",
        "2021 Oklahoma State",
        "1988 Oklahoma State"

    ];


    let season = seasons[
        Math.floor(Math.random()*seasons.length)
    ];


    document.getElementById("result").innerHTML = `

    <h1>🎟 SEASON DRAW</h1>

    <h2>${season} Schedule</h2>

    <p>Difficulty: ⭐⭐⭐⭐☆</p>

    <p>Average Opponent Rating: 87.5</p>

    <button>
        BEGIN SEASON
    </button>

    `;


    console.log(team);

}



// START APP

window.onload = function(){

    loadPlayers();

};
