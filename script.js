let team = {
    qb: null,
    rb: null,
    wr: [],
    te: null,
    ol: null,
    defense: null
};


let databases = {
    qb: [],
    rb: [],
    wr: [],
    te: [],
    ol: [],
    defense: [],
    seasons: []
};


let currentStep = "qb";
let currentSeason = null;



// LOAD DATABASES

async function loadPlayers(){

    databases.qb = await fetch("data/quarterbacks.json")
        .then(r => r.json());

    databases.rb = await fetch("data/runningbacks.json")
        .then(r => r.json());

    databases.wr = await fetch("data/receivers.json")
        .then(r => r.json());

    databases.te = await fetch("data/tightends.json")
        .then(r => r.json());

    databases.ol = await fetch("data/offensive_lines.json")
        .then(r => r.json());

    databases.defense = await fetch("data/defenses.json")
        .then(r => r.json());

    databases.seasons = await fetch("data/seasons.json")
        .then(r => r.json());


    showStep();

}



// UPDATE PROGRESS

function updateProgress(){

    let steps = [
        {id:"qb", name:"QB"},
        {id:"rb", name:"RB"},
        {id:"wr", name:"WR"},
        {id:"te", name:"TE"},
        {id:"ol", name:"OL"},
        {id:"defense", name:"DEF"}
    ];


    let html = "";


    let currentIndex = steps.findIndex(
        step => step.id === currentStep
    );


    steps.forEach((step,index)=>{

        if(index < currentIndex){

            html += `
            <span class="complete">
            ✅ ${step.name}
            </span>
            `;

        }

        else if(index === currentIndex){

            html += `
            <span class="current">
            🟧 ${step.name}
            </span>
            `;

        }

        else{

            html += `
            <span class="locked">
            🔒 ${step.name}
            </span>
            `;

        }

    });


    document.getElementById("progress").innerHTML = html;

}



// SHOW CURRENT SCREEN

function showStep(){

    updateProgress();


    let title = document.getElementById("step-title");

    let players = document.getElementById("players");


    players.innerHTML = "";


    if(currentStep === "qb"){
        title.innerHTML = "Choose Your Quarterback";
        createCards(databases.qb,"qb");
    }


    if(currentStep === "rb"){
        title.innerHTML = "Choose Your Running Back";
        createCards(databases.rb,"rb");
    }


    if(currentStep === "wr"){
        title.innerHTML = "Choose Your Wide Receivers (Pick 3)";
        createCards(databases.wr,"wr");
    }


    if(currentStep === "te"){
        title.innerHTML = "Choose Your Tight End";
        createCards(databases.te,"te");
    }


    if(currentStep === "ol"){
        title.innerHTML = "Choose Your Offensive Line";
        createCards(databases.ol,"ol");
    }


    if(currentStep === "defense"){
        title.innerHTML = "Choose Your Defense";
        createCards(databases.defense,"defense");
    }

}



// CREATE PLAYER CARDS

function createCards(list,type){

    let div = document.getElementById("players");


    list.forEach(player=>{


        let card = document.createElement("div");

        card.className = "player-card";


        card.innerHTML = `

        <div class="rating">
        ${player.overall}
        </div>

        <h3>${player.name}</h3>

        <p>${player.years}</p>

        `;


        card.onclick=function(){

            selectPlayer(player,type,card);

        };


        div.appendChild(card);


    });

}



// SELECT PLAYER

function selectPlayer(player,type,card){


    if(type === "wr"){


        if(team.wr.includes(player)){

            team.wr =
            team.wr.filter(x => x !== player);

            card.classList.remove("selected");

        }


        else if(team.wr.length < 3){

            team.wr.push(player);

            card.classList.add("selected");

        }


        if(team.wr.length === 3){

            setTimeout(()=>{

                nextStep();

            },700);

        }


        return;

    }



    team[type] = player;


    card.classList.add("selected");


    setTimeout(()=>{

        nextStep();

    },700);


}
// MOVE TO NEXT POSITION

function nextStep(){


    if(currentStep === "qb"){

        currentStep = "rb";

    }

    else if(currentStep === "rb"){

        currentStep = "wr";

    }

    else if(currentStep === "wr"){

        currentStep = "te";

    }

    else if(currentStep === "te"){

        currentStep = "ol";

    }

    else if(currentStep === "ol"){

        currentStep = "defense";

    }

    else if(currentStep === "defense"){

        showFinalTeam();

        return;

    }


    showStep();

}




// FINAL TEAM SCREEN

function showFinalTeam(){

    updateProgress();


    document.getElementById("step-title").innerHTML =
    " YOUR OKLAHOMA STATE TEAM";


    document.getElementById("players").innerHTML = `


    <div class="team-summary">


        <h2> OFFENSE</h2>



        <div class="player-card">

            <h3>QB</h3>

            <div class="rating">
    ${team.qb.overall}
</div>

<h3>${team.qb.name}</h3>

<p>${team.qb.years}</p>

        </div>




        <div class="player-card">

            <h3>RB</h3>

            <div class="rating">
    ${team.rb.overall}
</div>

<h3>${team.rb.name}</h3>

<p>${team.rb.years}</p>

        </div>




        <div class="player-card">

            <h3>WR</h3>

            <p>

            <strong>${team.wr[0].overall}</strong>
            ${team.wr[0].name}

            <br>

            <strong>${team.wr[1].overall}</strong>
            ${team.wr[1].name}

            <br>

            <strong>${team.wr[2].overall}</strong>
            ${team.wr[2].name}

            </p>

        </div>




        <div class="player-card">

            <h3>TE</h3>

            <p>

            <strong>${team.te.overall}</strong>
            ${team.te.name}

            <br>

            <small>${team.te.years}</small>

            </p>

        </div>




        <div class="player-card">

            <h3>OFFENSIVE LINE</h3>

            <p>

            <strong>${team.ol.overall}</strong>
            ${team.ol.name}

            </p>

        </div>




        <h2> DEFENSE</h2>




        <div class="player-card">

            <h3>DEFENSE</h3>

            <p>

            <strong>${team.defense.overall}</strong>
            ${team.defense.name}

            <br>

            <small>${team.defense.years}</small>

            </p>

        </div>





        <div class="overall-box">

            <h1>
            TEAM OVERALL
            </h1>


            <h2>
            ${calculateOverall()}
            </h2>

        </div>




        <button onclick="buildTeam()">

        DRAW MY SEASON

        </button>



    </div>


    `;


}




// CALCULATE TEAM OVERALL

function calculateOverall(){

    let total = 0;

    total += team.qb.overall * 2;
    total += team.rb.overall;
    
    team.wr.forEach(player=>{
    total += player.overall || 0;
});

    total += team.te.overall;
    total += team.ol.overall * 2 || 0;
total += team.defense.overall * 2 || 0;


    let weight = 2 + 1 + 3 + 1 + 2 + 2;

    return Math.round(total / weight);

}
// SEASON DRAW

function buildTeam(){

    let season = databases.seasons[
        Math.floor(Math.random() * databases.seasons.length)
    ];

    currentSeason = season;


    let scheduleHTML = "";


    season.games.forEach((game,index)=>{


        scheduleHTML += `

        <div class="team-card">

            <h3>
            Week ${index + 1}
            </h3>

            <p>
            Opponent:
            ${game.opponent}
            </p>

            <p>
            Opponent Rating:
            ${game.difficulty}
            </p>

        </div>

        `;


    });



    document.getElementById("result").innerHTML = `


    <div class="team-card">


        <h1>
        SEASON DRAW
        </h1>



        <h2>
        ${season.season}
        </h2>




        <p>
        Coach:
        ${season.coach}
        </p>



        <p>
        Historical Record:
        ${season.record}
        </p>



        <p>
        Conference:
        ${season.conference}
        </p>



        <p>
        Difficulty:
        ${"⭐".repeat(Math.ceil(season.difficulty / 2))}
        </p>



        <p>
        Average Opponent Rating:
        ${season.averageOpponentRating}
        </p>




        <h2>
        Schedule
        </h2>





${scheduleHTML}

<button onclick="startSeason(currentSeason)">
BEGIN SEASON
</button>

</div>

`;
}

function startSeason(season){

    let teamOverall = calculateOverall();

    let offense =
        Math.round(
            (team.qb.overall +
            team.rb.overall +
            team.wr[0].overall +
            team.wr[1].overall +
            team.wr[2].overall +
            team.te.overall +
            team.ol.overall) / 7
        );


    let defense = team.defense.overall;


    let wins = 0;
    let losses = 0;

    let results = "";


    season.games.forEach((game,index)=>{


        // Overall team advantage

        let ratingDifference =
            teamOverall - game.difficulty;


        // Offense/defense impact

        let offensiveEdge =
            offense - game.difficulty;


        let defensiveEdge =
            defense - game.difficulty;



        let winChance =
            50
            + (ratingDifference * 2.25)
            + (offensiveEdge * .75)
            + (defensiveEdge * .75);



        // Prevent ridiculous outcomes

        if(winChance > 95){
            winChance = 95;
        }


        if(winChance < 5){
            winChance = 5;
        }



        let roll = Math.random()*100;


        let won = roll < winChance;



        let teamScore;
        let opponentScore;



        if(won){

            wins++;


            teamScore =
            Math.floor(
                24 + Math.random()*20
            );


            opponentScore =
            Math.floor(
                10 + Math.random()*17
            );


            results += `

            <p>

            ✅ Week ${index+1}

            <br>

            ${teamScore}-${opponentScore}

            <br>

            vs ${game.opponent}

            </p>

            `;


        }


        else{


            losses++;


            opponentScore =
            Math.floor(
                21 + Math.random()*21
            );


            teamScore =
            Math.floor(
                10 + Math.random()*17
            );



            results += `

            <p>

            ❌ Week ${index+1}

            <br>

            ${teamScore}-${opponentScore}

            <br>

            vs ${game.opponent}

            </p>

            `;


        }


    });



    document.getElementById("result").innerHTML = `


    <div class="team-card">


    <h1>
     SEASON RESULTS
    </h1>


    <h2>
    ${season.season}
    </h2>


    <h1>
    Record:
    ${wins}-${losses}
    </h1>


    <h3>
    Team Overall:
    ${teamOverall}
    </h3>


    <h3>
    Offense:
    ${offense}
    </h3>


    <h3>
    Defense:
    ${defense}
    </h3>


    <h2>
    Games
    </h2>


    ${results}



    <button onclick="location.reload()">

     BUILD NEW TEAM

    </button>


    </div>


    `;


}





// START APP

window.onload=function(){

    loadPlayers();

};
