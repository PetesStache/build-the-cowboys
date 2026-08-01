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

        title.innerHTML =
        "Choose Your Quarterback";

        createCards(databases.qb,"qb");

    }


    if(currentStep === "rb"){

        title.innerHTML =
        "Choose Your Running Back";

        createCards(databases.rb,"rb");

    }


    if(currentStep === "wr"){

        title.innerHTML =
        "Choose Your Wide Receivers (Pick 3)";

        createCards(databases.wr,"wr");

    }


    if(currentStep === "te"){

        title.innerHTML =
        "Choose Your Tight End";

        createCards(databases.te,"te");

    }


    if(currentStep === "ol"){

        title.innerHTML =
        "Choose Your Offensive Line";

        createCards(databases.ol,"ol");

    }


    if(currentStep === "defense"){

        title.innerHTML =
        "Choose Your Defense";

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


}// SELECT PLAYER

function selectPlayer(player,type,card){


    // WIDE RECEIVER LOGIC

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



// SEASON DRAW PLACEHOLDER

function buildTeam(){


    let seasons = [

        "1988 Oklahoma State",
        "2011 Oklahoma State",
        "2021 Oklahoma State"

    ];


    let season =
    seasons[Math.floor(Math.random()*seasons.length)];



    document.getElementById("result").innerHTML = `


    <h1>🎟 SEASON DRAW</h1>

    <h2>${season} Schedule</h2>


    <p>
    Difficulty:
    ⭐⭐⭐⭐⭐
    </p>


    <p>
    Average Opponent Rating:
    89.4
    </p>


    <button>
    BEGIN SEASON
    </button>


    `;


}



// START APP

window.onload=function(){

    loadPlayers();

};
