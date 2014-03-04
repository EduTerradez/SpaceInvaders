(function() {
  'use strict';

  function End() {
	  this.GameOvertxt;
	  this.sconenum;
	  this.ScoreReached = null;
	  this.scoreText = null;
	  this.background;
	  this.title;
	  this.entertext;
  }

  End.prototype = {

    create: function () {
     var x = this.game.width / 2
        , y = this.game.height / 2;
     this.background = this.game.add.tileSprite(0, 0, 800, 900, 'background');
     
     this.title = this.game.add.sprite(150, 150, 'recuadro');
     
     
     
     this.GameOvertxt = this.add.text(230, 200, 'GAME OVER!!', { font: "50px Arial", fill: "#ffffff", align: "left" });;
     this.entertext =this.add.text(290, 600, 'Press enter to restart', { font: "20px Arial", fill: "#ffffff", align: "left" });;
     this.scoreText = this.add.text(340, 350, 'SCORE: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
     this.scoreText.content = 'YOUR SCORE:           ' + this.score;
     this.returnButton = this.add.button(250, 750, 'returnbutton', function() { this.game.state.start('menu') }, this, 1, 0, 2); 
    },

    update: function () {
    	this.scoreText.content = 'SCORE: ' + window.spaceinvaders.Global.score;
    	if( this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER) ) {
    		this.game.state.start('game');
        }
    },
  

    
  };

  window['spaceinvaders'] = window['spaceinvaders'] || {};
  window['spaceinvaders'].End = End;

}());