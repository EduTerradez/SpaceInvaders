(function() {
  'use strict';

  function highscore() {
	 
  }

  highscore.prototype = {

    create: function () {
     var x = this.game.width / 2
        , y = this.game.height / 2;
     this.background = this.game.add.tileSprite(0, 0, 800, 900, 'background');
     
     this.title = this.game.add.sprite(150, 150, 'recuadro');
     
     
     
     this.TitleOvertxt = this.add.text(230, 200, 'HIGHSCORES', { font: "50px Arial", fill: "#ffffff", align: "left" });;
    
     this.EDUText = this.add.text(190, 310, '1-EDU:            346', { font: "20px Arial", fill: "#ffffff", align: "left" });
     this.IñigoText = this.add.text(190, 330, '2-IÑIGO:            345', { font: "20px Arial", fill: "#ffffff", align: "left" });
     this.SeanText = this.add.text(190, 350, '3-SEAN:            234', { font: "20px Arial", fill: "#ffffff", align: "left" });
     this.returnButton = this.add.button(250, 750, 'returnbutton', function() { this.game.state.start('menu') }, this, 1, 0, 2);
      
    },

    update: function () {
    	
    	if( this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER) ) {
    		this.game.state.start('game');
        }
    },
  

    
  };

  window['spaceinvaders'] = window['spaceinvaders'] || {};
  window['spaceinvaders'].highscore = highscore;

}());