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
