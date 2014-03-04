(function() {
  'use strict';

  function Menu() {
	this.player = null;
	this.title = null;
    this.titleTxt = null;
    this.startTxt = null;
    this.startButton=null;
    this.direc = null;
  }

  Menu.prototype = {

    create: function () {
     var x = this.game.width / 2
        , y = this.game.height / 2;
     
      this.background = this.game.add.tileSprite(0, 0, 800, 900, 'background');
      this.startButton = this.add.button(255, 495, 'startbutton', function() { this.game.state.start('game') }, this, 1, 0, 2);
      this.scoreButton = this.add.button(255, 595, 'scorebutton', function() { this.game.state.start('highscore') }, this, 1, 0, 2);
      this.developersText = this.add.text(550, 880, 'Created by: EDU & IÑIGO', { font: "20px Arial", fill: "#ffffff", align: "left" });
      
      this.title = this.game.add.sprite(15, 150, 'Titulo');
      this.direc = 1;
      this.player = this.add.sprite(x, y, 'battleship');
      this.player.anchor.setTo(0.5, 0.5);
      this.player.frame = 0;
      this.player.x = 400;
      this.player.y = 750;
      
      
      
    },

    update: function () {
    	if(this.player.x > 600){
    		this.direc = 0;
    		
    	}
    	else if(this.player.x < 200){
    		
    		this.direc = 1;
    	}
    	
    	if(this.direc === 1){
    		this.player.x += 5;
    		this.player.frame = 3;
    		
    	}
    	if(this.direc === 0){
    		this.player.frame = 1;
    		this.player.x -= 5;
    	}
    	
    },
  

   
  };

  window['spaceinvaders'] = window['spaceinvaders'] || {};
  window['spaceinvaders'].Menu = Menu;

}());
