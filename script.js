let team = {
    qb:null,
    rb:null,
    wr:[],
    te:null,
    ol:null,
    defense:null
};


const players = {

qb:[
let quarterbacks = [];

let team = {
    qb:null,
    rb:null,
    wr:[],
    te:null,
    ol:null,
    defense:null
};


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

            team.qb=player;

            console.log(team);

        };


        div.appendChild(card);

    });

}


loadQuarterbacks();

rb:[
"Barry Sanders",
"Thurman Thomas",
"Chuba Hubbard"
],

wr:[
"Justin Blackmon",
"James Washington",
"Dez Bryant",
"Rashaun Woods"
],

te:[
"Brandon Pettigrew",
"Charlie Moore"
],

ol:[
"2011 Offensive Line",
"1988 Offensive Line",
"2021 Offensive Line"
],

defense:[
"2011 Defense",
"2021 Defense",
"1984 Defense"
]

};


function createOptions(id,list,type){

let div=document.getElementById(id);

list.forEach(player=>{

let button=document.createElement("div");

button.className="option";
button.innerHTML=player;


button.onclick=function(){

if(type==="wr"){

if(team.wr.includes(player)){
team.wr=team.wr.filter(x=>x!==player);
button.classList.remove("selected");
}

else if(team.wr.length<3){
team.wr.push(player);
button.classList.add("selected");
}

}

else{

team[type]=player;
document.querySelectorAll("#"+id+" .option")
.forEach(x=>x.classList.remove("selected"));

button.classList.add("selected");

}

};

div.appendChild(button);

});

}


createOptions("qb",players.qb,"qb");
createOptions("rb",players.rb,"rb");
createOptions("wr",players.wr,"wr");
createOptions("te",players.te,"te");
createOptions("ol",players.ol,"ol");
createOptions("defense",players.defense,"defense");



function buildTeam(){

let seasons=[
"2011 Oklahoma State",
"2021 Oklahoma State",
"1988 Oklahoma State"
];

let season=seasons[Math.floor(Math.random()*seasons.length)];


document.getElementById("result").innerHTML=`

<h1>🎟 SEASON DRAW</h1>

<h2>${season} Schedule</h2>

<p>Difficulty: ⭐⭐⭐⭐☆</p>

<p>Average Opponent Rating: 87.5</p>

<button>BEGIN SEASON</button>

`;

console.log(team);

}
