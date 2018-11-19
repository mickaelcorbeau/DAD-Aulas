@extends('master')

@section('title', 'Tic Tac Toe')

@section('content')

<div>
    <h3 class="text-center">TITULO</h3>
    <br>
    <h2>Current Player : JOGADOR @{{ currentPlayer }}</h2>
    <br>
</div>
<div class="game-zone-content">       
    <div class="alert alert-success" v-if="showSuccess" >
        <button type="button" class="close-btn" >&times;</button>
        <strong>
            @{{ successMessage }} &nbsp;&nbsp;&nbsp;&nbsp;
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


@endsection
@section('pagescript')
    <script src="js/tictactoe.js"></script>
@stop