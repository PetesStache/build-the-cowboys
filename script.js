let team = {
    qb:null,
    rb:null,
    wr:[],
    te:null,
    ol:null,
    defense:null
};

let quarterbacks = [];


async function loadQuarterbacks(){

    const response = await fetch("data/quarterbacks.json");

    quarterbacks = await response.json();

    createQBcards();

}


function createQBcards(){

    let div = document.getElementById("qb");

    quarterbacks.forEach(player=>{

        let card = document.createElement("div");

        card.className="player-card";

        card.innerHTML=`

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


        card.onclick=function(){

            document.querySelectorAll("#qb .player-card")
            .forEach(x=>x.classList.remove("selected"));

            card.classList.add("selected");

            team.qb = player;

            console.log(team);

        };


        div.appendChild(card);

    });

}


loadQuarterbacks();


function buildTeam(){

    document.getElementById("result").innerHTML=`

    <h1>🎟 SEASON DRAW</h1>

    <h2>2011 Oklahoma State Schedule</h2>

    <p>Difficulty: ⭐⭐⭐⭐☆</p>

    <p>Average Opponent Rating: 87.5</p>

    <button>BEGIN SEASON</button>

    `;

    console.log(team);

}
