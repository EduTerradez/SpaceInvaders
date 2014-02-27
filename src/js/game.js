(function() {
  'use strict';

  function Game() {
	this.aliens = null;
	this.enemyBullet;
    this.player = null;
    this.bullets = null;
    this.bulletTime = 0;
  }

  Game.prototype = {

    create: function () {
      var x = 100
        , y = 100;
      
      this.background = this.game.add.tileSprite(0, 0, 800, 900, 'background');

      this.player = this.add.sprite(x, y, 'battleship');
      this.player.anchor.setTo(0.5, 0.5);
      this.player.frame = 0;
      this.player.x = 400;
      this.player.y = 650;
      this.input.onDown.add(this.onDown, this);
      
      
      
      this.bullets = this.add.group();
      this.bullets.createMultiple(10, 'bullet');
      this.bullets.setAll('anchor.x', 0.5);
      this.bullets.setAll('anchor.y', 1);
      this.bullets.setAll('outOfBoundsKill', true);
      
      
      this.enemyBullets = this.game.add.group();
      this.enemyBullets.createMultiple(40, 'enemyBullet');
      this.enemyBullets.setAll('anchor.x', 0.5);
      this.enemyBullets.setAll('anchor.y', 1);
      this.enemyBullets.setAll('outOfBoundsKill', true);
      
      this.aliens = this.add.group();
      this.aliens.createMultiple(10, 'marcianito');
      
      this.aliens.setAll('outOfBoundsKill', true);
    },

    update: function () {
    	this.background.tilePosition.y += 5;
    	
      var x, y, cx, cy, dx, dy, angle, scale;

      x = this.input.position.x;
      y = this.input.position.y;
      cx = this.world.centerX;
      cy = this.world.centerY;

      

      dx = x - cx;
      dy = y - cy;
      
      this.player.frame = 2;
      
      if( this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ) {
    	  if(this.player.x >= 17){
    		  this.player.frame = 1;
    		  this.player.x -=7;
    	  }
      }
      
      if( this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) {
    	  if(this.player.x <= 783){
    		  this.player.frame = 3;
    		  this.player.x += 7;
    	  }
      }
      
      if( this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)
       && this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) {
    	  this.player.frame = 0;
      }
      
      
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP) ) {
    	  if(this.player.y > 150){
    		  this.player.frame = 2;
    		  this.player.y -= 7;
    	  }  
      }
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) ){
    	  this.player.frame = 0;
    	  if(this.player.y < 875){
    		  this.player.y += 7;
    	  }    	  
      }
      
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
    	  this.fireBullet();
    	  
      }
      
      this.enemigos = this.aliens.getFirstExists(false);
      if (this.enemigos)
          {
              //  And fire it
              this.enemigos.reset(Math.random()*800, -100);
              this.enemigos.body.velocity.y = 400;
              var dir = (Math.floor(Math.random()*2));
              if(dir === 1){
            	  this.enemigos.body.velocity.x = 100;
          		}
      			else{
      				this.enemigos.body.velocity.x = -100;
      				
      			}
              this.enemigos.animations.add('fly', [ 0, 1], 40, true); 
              this.enemigos.play('fly');

        }
      /*this.enemigos = this.aliens.getFirstExists(false);
      if (this.enemigos)
          {
              //  And fire it
              this.enemigos.reset(Math.random()*800, 0);
              this.enemigos.body.velocity.y = 400;
              this.enemigos.body.velocity.x = -100;

        }*/
      this.physics.overlap(this.bullets, this.aliens, function (bullet,enemigos){enemigos.kill(); bullet.kill()}, null, this);
      //this..physics.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
    },
    
    fireBullet: function(){
      if(this.game.time.now > this.bulletTime){
    	 
    	  this.bullet = this.bullets.getFirstExists(false);
          if(this.bullet){
              
              this.bullet.reset(this.player.x, this.player.y + 8);
              this.bullet.body.velocity.y = -400;
              this.bulletTime = this.game.time.now + 500;
          }
          
      }
      },
       resetBullet: function(bullet) {

    	    //  Called if the bullet goes out of the screen
    	    bullet.kill();

    	},


    onDown: function () {
      this.game.state.start('menu');
    }
    
    
  };

  window['spaceinvaders'] = window['spaceinvaders'] || {};
  window['spaceinvaders'].Game = Game;

}());
