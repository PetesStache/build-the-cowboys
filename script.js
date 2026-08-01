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
"Brandon Weeden",
"Mason Rudolph",
"Zac Robinson",
"Mike Gundy"
],

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