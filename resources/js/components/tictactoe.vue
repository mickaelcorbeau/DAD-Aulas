<template>
<div>
    <div>
        <h3 class="text-center">TITULO</h3>
        <br>
        <h2>Current Player : JOGADOR {{ currentPlayerName }}</h2>
        <br>
    </div>
    <div class="game-zone-content">       
        <div class="alert alert-success" v-if="showSuccess" >
            <button type="button" class="close-btn" >&times;</button>
            <strong>
                {{ successMessage }} &nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" @click.prevent="restart()">Restart</a>
            </strong>
        </div>

        <div class="board">
            <div v-for="(piece,index) in board" @click="play(index)">
                <img :src="'img/' + piece + '.png'">
            </div>
        </div>
        <hr>
    </div>  
</div>
</template>
<script>
module.exports = {
    data: function() {
        return {
            showSuccess: false,
            successMessage: '',
            gameEnded:false,
            board: [0,0,0,0,0,0,0,0,0],
            currentPlayer: 1
        }
    },
    methods: {
        // ----------------------------------------------------------------------------------------
        // GAME LOGIC - START
        // ----------------------------------------------------------------------------------------
        hasRow: function(value){
            return  ((this.board[0]==value) && (this.board[1]==value) && (this.board[2]==value)) || 
            ((this.board[3]==value) && (this.board[4]==value) && (this.board[5]==value)) || 
            ((this.board[6]==value) && (this.board[7]==value) && (this.board[8]==value)) || 
            ((this.board[0]==value) && (this.board[3]==value) && (this.board[6]==value)) || 
            ((this.board[1]==value) && (this.board[4]==value) && (this.board[7]==value)) || 
            ((this.board[2]==value) && (this.board[5]==value) && (this.board[8]==value)) || 
            ((this.board[0]==value) && (this.board[4]==value) && (this.board[8]==value)) || 
            ((this.board[2]==value) && (this.board[4]==value) && (this.board[6]==value));
        },
        checkGameEnded: function(){
            if (this.hasRow(1)) {
                this.successMessage = 'Player 1 won the Game';
                this.showSuccess = true;
                this.gameEnded = true;
                return;
            }
            if (this.hasRow(2)) {
                this.successMessage = 'Player 2 won the Game';
                this.showSuccess = true;
                this.gameEnded = true;
                return;
            }
            if (this.isBoardComplete()) {
                this.successMessage = 'The Game ended in a Tie';
                this.showSuccess = true;
                this.gameEnded = true;
            }
            return false;
        },
        isBoardComplete:function(){
            var returnValue = true;
            this.board.forEach(function(element) {
                if (element === 0) {
                    returnValue = false;
                    return;
                }
            });
            return returnValue;
        },

        // ----------------------------------------------------------------------------------------
        // GAME LOGIC - END
        // ----------------------------------------------------------------------------------------        
        play:function (index) {
            if(this.board[index] || this.gameEnded){
                return;
            }
            Vue.set(this.board, index, this.currentPlayer);
            if(this.currentPlayer == 1){
                this.currentPlayer = 2;
            } else {
                this.currentPlayer = 1;
            }
            this.checkGameEnded();
        },
        restart:function(){
            this.board = [0,0,0,0,0,0,0,0,0];
            this.gameEnded = false;
            this.currentPlayer = 1;
            this.showSuccess = false;
        }
    },
    computed:{
       currentPlayerName(){
            if(this.$root["player"+this.currentPlayer]){
               return this.$root["player" + this.currentPlayer];
            }
            return "Player " + this.currentPlayer;
       } 
    }
};
</script>