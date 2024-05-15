const globalModel = {
    leaderboard: [{name: "Kid", score: 3}],

    paginated: 10,


    clearLeaderBoard() {
        this.leaderboard = [{name: "Kid", score: 3}];
    },
    
    setLeaderboard(board) {
        if(board){
            this.leaderboard = board;
        } else{
            this.leaderboard = [{name: "temp", score: 0}]
        }
    }
}

export { globalModel };
