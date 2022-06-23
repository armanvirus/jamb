module.exports = (ramdomQuest,allQuest)=>{
    let randomIndext;
    for(let i = 0; i <= 2; i++){
         randomIndext = Math.floor(Math.random()*allQuest.length);
         ramdomQuest.push(allQuest[randomIndext]);
    }
        return ramdomQuest;
}