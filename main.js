'use strict';

function loadPage (){
    var stage='';
    var gameParent = document.querySelector('#gui');
    var gamePreview;
    var buttonStartGame; 
    var gameSession; // used to store game instance
    var player;

    //---------------- Reset of start page and load of game
    var startNewGame = function() { // assign to variable to remove event listener
        removeWelcomePage();
        runGame();
    };


    //------------------ START PAGE ---------------
    function buildWelcomePage ()  {
        stage='intro';
    
        gamePreview=document.createElement('div'); // create container
        gamePreview.setAttribute('id','game-preview');

        var imgContainer=document.createElement('div'); // create container
        imgContainer.setAttribute('id','game-img');

        var image =document.createElement('img'); // append Image
        image.setAttribute('src',' http://contenidos.enter.co/custom/uploads/2013/07/kr.jpg');
        imgContainer.appendChild(image);
        gamePreview.appendChild(imgContainer);

        buttonStartGame =document.createElement('button'); //append start button
        buttonStartGame.setAttribute('class','start-game');
        buttonStartGame.innerText='Start your journey HERE!';
        gamePreview.appendChild(buttonStartGame);

        document.querySelector('#gui').appendChild(gamePreview); // load html to page
        // start listener for start button
        buttonStartGame.addEventListener('click',startNewGame);
    }

    // ------- helper function for start page reset---
    function removeWelcomePage () { 
        // remove eventListener on Start Button
        buttonStartGame.removeEventListener('click',startNewGame);

        // remove HTML elements for pre-launch
        document.querySelector('#game-preview').remove();

     
    }

    // ------- initialize game build-----
    function runGame() {
        // build game canvas
        stage = 'game session';
        gameSession=new Game(gameParent);
        //player =
        var canvas =gameSession.canvasElement;
        canvas.addEventListener('mousedown',trackMousePosition, false);    //   mouse listener for click on tower class
        
    }
    
    function closeGameSession () {
        gameSession.canvasElement.removeEventListener('mousedown',trackMousePosition, false);  
        gameSession.destroy();
    }


    // track mouse on canvas >game?
    function trackMousePosition (event) {
        var mousePos = getMousePos(gameSession.canvasElement, event);
        //  if allowed style.cursor = 'move';
        console.log ('Mouse position: ' + mousePos.x + ',' + mousePos.y);
        // if no tower selected + paid > no action
        // if area not allowed or occupied > change mouse color to style.cursor = 'pointer';
        if(gameSession.map.checkPositionTower(mousePos.x,mousePos.y)) {
           gameSession.pushTower(mousePos.x,mousePos.y);
        }
    }

    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
        };
    }
    //-----



    // ------- build Game Over page
    var restartGame = function () {
        removeGameOverPage ();
        runGame();
    }

    function showGameOver () {
        var playAgainButton=

        gamePreview=document.createElement('div'); // create container
        gamePreview.setAttribute('id','game-preview');

        var header=document.createElement('h2'); 
        header.innerText='GAME OVER!'
        gamePreview.appendChild(header);


        var imgContainer=document.createElement('div'); 
        imgContainer.setAttribute('id','game-img');

        var image =document.createElement('img'); // append Image
        image.setAttribute('src','https://pre00.deviantart.net/0dc4/th/pre/i/2015/182/0/0/defeated_by_m_hugo-d8zjha8.jpg');
        imgContainer.appendChild(image);
        gamePreview.appendChild(imgContainer);

        buttonStartGame =document.createElement('button'); //append start button
        buttonStartGame.setAttribute('class','start-game');
        buttonStartGame.innerText='Retry?';
        gamePreview.appendChild(buttonStartGame);

        document.querySelector('#gui').appendChild(gamePreview); // load html to page
        // start listener for start button
        buttonStartGame.addEventListener('click',restartGame);

    }

    function removeGameOverPage () {
        // remove eventListener on Start Button
        buttonStartGame.removeEventListener('click',restartGame);

        // remove HTML elements for pre-launch
        document.querySelector('#game-preview').remove();

    }

    buildWelcomePage ()     



}




window.onload = loadPage;
