class Game{
    constructor(name){
        this.name = name;
        this.players = [];
    }
    addPlayer(player){
        this.players.push(player);
    }
}