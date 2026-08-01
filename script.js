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
    "🏈 YOUR OKLAHOMA STATE LEGEND TEAM";


    document.getElementById("players").innerHTML = `


    <div class="team-summary">


        <h2>🟧 OFFENSE</h2>



        <div class="team-card">

            <h3>QB</h3>

            <p>
            <strong>${team.qb.overall}</strong>
            ${team.qb.name}
            <br>
            <small>${team.qb.years}</small>
            </p>

        </div>




        <div class="team-card">

            <h3>RB</h3>

            <p>
            <strong>${team.rb.overall}</strong>
            ${team.rb.name}
            <br>
            <small>${team.rb.years}</small>
            </p>

        </div>




        <div class="team-card">

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




        <div class="team-card">

            <h3>TE</h3>

            <p>

            <strong>${team.te.overall}</strong>
            ${team.te.name}

            <br>

            <small>${team.te.years}</small>

            </p>

        </div>




        <div class="team-card">

            <h3>OFFENSIVE LINE</h3>

            <p>

            <strong>${team.ol.overall}</strong>
            ${team.ol.name}

            </p>

        </div>




        <h2>⚫ DEFENSE</h2>




        <div class="team-card">

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

        🎟 DRAW MY SEASON

        </button>



    </div>


    `;


}




// CALCULATE TEAM OVERALL

function calculateOverall(){


    let total = 0;


    total += team.qb.overall;
    total += team.rb.overall;
    total += team.te.overall;
    total += team.ol.overall;
    total += team.defense.overall;


    team.wr.forEach(player=>{

        total += player.overall;

    });


    return Math.round(total / 9);


}
// SEASON DRAW

function buildTeam(){

    let season = databases.seasons[
        Math.floor(Math.random() * databases.seasons.length)
    ];


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
        🎟 SEASON DRAW
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
        ${"⭐".repeat(season.difficulty)}
        </p>



        <p>
        Average Opponent Rating:
        ${season.averageOpponentRating}
        </p>




        <h2>
        Schedule
        </h2>



        ${scheduleHTML}




        <button onclick='startSeason(${JSON.stringify(season)})'>

        🏈 BEGIN SEASON

        </button>



    </div>


    `;


}
// START SEASON SIMULATION

function startSeason(season){

    let teamOverall = calculateOverall();


    let wins = 0;
    let losses = 0;


    let results = "";



    season.games.forEach((game,index)=>{


        let advantage = teamOverall - game.difficulty;


        let winChance = 50 + advantage;



        // Keep games competitive

        if(winChance > 85){

            winChance = 85;

        }


        if(winChance < 15){

            winChance = 15;

        }



        let won = Math.random() * 100 < winChance;



        let teamScore;
        let opponentScore;




        if(won){


            wins++;


            teamScore = Math.floor(
                28 + Math.random() * 14
            );


            opponentScore = Math.floor(
                10 + Math.random() * 17
            );



            results += `

            <div class="team-card">

            <h3>
            ✅ Week ${index + 1}
            </h3>


            <p>
            vs ${game.opponent}
            </p>


            <h2>
            ${teamScore} - ${opponentScore}
            </h2>


            </div>

            `;


        }



        else{


            losses++;


            opponentScore = Math.floor(
                24 + Math.random() * 20
            );


            teamScore = Math.floor(
                10 + Math.random() * 17
            );



            results += `

            <div class="team-card">

            <h3>
            ❌ Week ${index + 1}
            </h3>


            <p>
            vs ${game.opponent}
            </p>


            <h2>
            ${teamScore} - ${opponentScore}
            </h2>


            </div>

            `;


        }


    });




    document.getElementById("result").innerHTML = `


    <div class="team-card">


        <h1>
        🏆 SEASON RESULTS
        </h1>



        <h2>
        ${season.season}
        </h2>




        <h1>
        ${wins}-${losses}
        </h1>



        <h3>
        Team Overall:
        ${teamOverall}
        </h3>



        ${results}



        <button onclick="location.reload()">

        🔄 BUILD NEW TEAM

        </button>



    </div>


    `;


}





// START APP

window.onload=function(){

    loadPlayers();

};
