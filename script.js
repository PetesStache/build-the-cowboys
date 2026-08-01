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
    defense: []
};


let currentStep = "qb";


// LOAD ALL DATABASES

async function loadPlayers(){

    databases.qb = await fetch("data/quarterbacks.json").then(r=>r.json());

    databases.rb = await fetch("data/runningbacks.json").then(r=>r.json());

    databases.wr = await fetch("data/receivers.json").then(r=>r.json());

    databases.te = await fetch("data/tightends.json").then(r=>r.json());

    databases.ol = await fetch("data/offensive_lines.json").then(r=>r.json());

    databases.defense = await fetch("data/defenses.json").then(r=>r.json());


    showStep();

}



// PROGRESS BAR

function updateProgress(){

    let steps = [
        "QB",
        "RB",
        "WR",
        "TE",
        "OL",
        "DEF"
    ];


    let html="";


    steps.forEach(step=>{

        html += `<span style="margin:8px;">${step}</span>`;

    });


    document.getElementById("progress").innerHTML = html;

}



// SHOW CURRENT STEP

function showStep(){

    updateProgress();


    let title=document.getElementById("step-title");

    let players=document.getElementById("players");


    players.innerHTML="";


    if(currentStep==="qb"){

        title.innerHTML="Choose Your Quarterback";

        createCards(databases.qb,"qb");

    }


    if(currentStep==="rb"){

        title.innerHTML="Choose Your Running Back";

        createCards(databases.rb,"rb");

    }


    if(currentStep==="wr"){

        title.innerHTML="Choose Your Wide Receivers (Pick 3)";

        createCards(databases.wr,"wr");

    }


    if(currentStep==="te"){

        title.innerHTML="Choose Your Tight End";

        createCards(databases.te,"te");

    }


    if(currentStep==="ol"){

        title.innerHTML="Choose Your Offensive Line";

        createCards(databases.ol,"ol");

    }


    if(currentStep==="defense"){

        title.innerHTML="Choose Your Defense";

        createCards(databases.defense,"defense");

    }


}



// CREATE CARDS

function createCards(list,type){

    let div=document.getElementById("players");


    list.forEach(player=>{


        let card=document.createElement("div");


        card.className="player-card";


        card.innerHTML=`

        <div class="rating">
        ${player.overall}
        </div>

        <h3>${player.name}</h3>

        <p>${player.years}</p>

        <p>${player.tier}</p>

        `;


        card.onclick=function(){

            selectPlayer(player,type,card);

        };


        div.appendChild(card);


    });


}



// SELECT PLAYER

function selectPlayer(player,type,card){



    // WR SPECIAL CASE

    if(type==="wr"){


        if(team.wr.includes(player)){

            team.wr =
            team.wr.filter(x=>x!==player);

            card.classList.remove("selected");

        }


        else if(team.wr.length < 3){

            team.wr.push(player);

            card.classList.add("selected");

        }


        if(team.wr.length===3){

            setTimeout(()=>{

                nextStep();

            },500);

        }


        return;

    }



    team[type]=player;


    card.classList.add("selected");


    setTimeout(()=>{

        nextStep();

    },500);



}



// NEXT STEP

function nextStep(){


    if(currentStep==="qb"){

        currentStep="rb";

    }

    else if(currentStep==="rb"){

        currentStep="wr";

    }

    else if(currentStep==="wr"){

        currentStep="te";

    }

    else if(currentStep==="te"){

        currentStep="ol";

    }

    else if(currentStep==="ol"){

        currentStep="defense";

    }

    else if(currentStep==="defense"){

        showFinalTeam();

        return;

    }


    showStep();


}



// FINAL TEAM

function showFinalTeam(){


    document.getElementById("step-title").innerHTML=
    "🏈 YOUR OKLAHOMA STATE LEGEND TEAM";


    document.getElementById("players").innerHTML=`


    <h3>Quarterback</h3>
    <p>${team.qb.name} - ${team.qb.overall}</p>


    <h3>Running Back</h3>
    <p>${team.rb.name} - ${team.rb.overall}</p>


    <h3>Wide Receivers</h3>

    <p>
    ${team.wr[0].name}<br>
    ${team.wr[1].name}<br>
    ${team.wr[2].name}
    </p>


    <h3>Tight End</h3>
    <p>${team.te.name}</p>


    <h3>Offensive Line</h3>
    <p>${team.ol.name}</p>


    <h3>Defense</h3>
    <p>${team.defense.name}</p>


    <h2>
    Team Overall:
    ${calculateOverall()}
    </h2>


    <button onclick="buildTeam()">
    🎟 DRAW MY SEASON
    </button>


    `;


}



// TEAM RATING

function calculateOverall(){

    let total=0;
    let count=0;


    total += team.qb.overall;
    total += team.rb.overall;
    total += team.te.overall;
    total += team.ol.overall;
    total += team.defense.overall;


    team.wr.forEach(w=>{

        total += w.overall;

    });


    count = 9;


    return Math.round(total/count);

}



// PLACEHOLDER SEASON DRAW

function buildTeam(){

    document.getElementById("result").innerHTML=`

    <h1>🎟 SEASON DRAW</h1>

    <h2>2011 Oklahoma State Schedule</h2>

    <p>
    Difficulty: ⭐⭐⭐⭐⭐
    </p>

    <p>
    Average Opponent Rating: 89.4
    </p>

    `;

}



// START

window.onload=function(){

    loadPlayers();

};
