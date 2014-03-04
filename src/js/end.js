(function() {
  'use strict';

  function End() {
	  this.ScoreReached = null;
	  this.scoreText = null;
  }

  End.prototype = {

    create: function () {
     var x = this.game.width / 2
        , y = this.game.height / 2;
     this.scoreText = this.add.text(32, 32, 'SCORE: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
     this.scoreText.content = 'SCORE: ' + this.score;

      
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