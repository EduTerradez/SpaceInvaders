(function() {
  'use strict';

  function Game() {
	this.aliens = null;
	this.alien = null;
	this.enemyBullet;
    this.player = null;
    this.bullets = null;
    this.bulletTime = 0;
    this.scoreText = null;
    this.levelText = null;
    this.explosion = null;
    
    this.level = null;
    this.score;
    this.lastScore;
    this.numEnemigos;
    this.auxiliar;
    
  }

  Game.prototype = {

    create: function () {
      var x = 100
        , y = 100;
      this.score = 0;
      this.lastScore = 0;
      this.level = 0;
      this.auxiliar =10;
      this.numEnemigos = 0;
      
      window.spaceinvaders.Global.score = 0;
      
      this.background = this.game.add.tileSprite(0, 0, 800, 900, 'background');

      this.player = this.add.sprite(x, y, 'battleship');
      this.player.anchor.setTo(0.5, 0.5);
      this.player.frame = 0;
      this.player.x = 400;
      this.player.y = 750;
      this.player.velocity = 8;
      
      
      
      
      this.bullets = this.add.group();
      this.bullets.createMultiple(20, 'bullet');
      this.bullets.setAll('anchor.x', 0.5);
      this.bullets.setAll('anchor.y', 1);
      this.bullets.setAll('outOfBoundsKill', true);
      
      
      this.enemyBullets = this.game.add.group();
      this.enemyBullets.createMultiple(40, 'enemyBullet');
      this.enemyBullets.setAll('anchor.x', 0.5);
      this.enemyBullets.setAll('anchor.y', 1);
      this.enemyBullets.setAll('outOfBoundsKill', true);
      
      this.aliens = this.add.group();
      
      this.explosions = this.game.add.group();
      this.explosions.createMultiple(1000, 'boom');
      this.explosions.forEach(function (alien) {
        alien.anchor.x = 0.5;
        alien.anchor.y = 0.5;
        alien.animations.add('boom'); 
        }, this);
      
      this.music = this.game.add.audio('music', 1, true);
      this.music.play('', 0, 1, true);


      this.lasersound = this.game.add.audio('shoot');
      
      this.scoreText = this.add.text(32, 32, 'SCORE: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
      this.levelText = this.add.text(200, 32, 'LEVEL: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    },

    update: function () {
    	this.background.tilePosition.y += 3;
    	//this.level = this.score % 15;
        var x, y, cx, cy, dx, dy, angle, scale;

      x = this.input.position.x;
      y = this.input.position.y;
      cx = this.world.centerX;
      cy = this.world.centerY;

      

      dx = x - cx;
      dy = y - cy;
      
      if(this.score > this.auxiliar || this.score === 0)
	  {
    	  this.numEnemigos += 1;
    	  this.aliens.createMultiple(1 + this.numEnemigos, 'marcianito');
    	  this.aliens.setAll('outOfBoundsKill', true);
    	  this.score +=5;
    	  
    	  this.level += 1;
    	  this.auxiliar += (5 * this.level);
    	  console.log("hola");
    	  this.levelText.content = 'LEVEL:  ' + this.level;
	  }
      
      
      this.player.frame = 2;
      
      if( this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ) {
    	  if(this.player.x >= 17){
    		  this.player.frame = 1;
    		  this.player.x -= this.player.velocity;
    	  }
      }
      
      if( this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) {
    	  if(this.player.x <= 783){
    		  this.player.frame = 3;
    		  this.player.x += this.player.velocity;
    	  }
      }
      
      if( this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)
       && this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) {
    	  this.player.frame = 0;
      }
      
      
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP) ) {
    	  if(this.player.y > 150){
    		  this.player.frame = 2;
    		  this.player.y -= this.player.velocity;
    	  }  
      }
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) ){
    	  this.player.frame = 0;
    	  if(this.player.y < 875){
    		  this.player.y += this.player.velocity;
    	  }    	  
      }
      
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
    	  this.fireBullet();+
    	  this.lasersound.play();
    	  
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
              
              this.enemigos.animations.add('fly', [ 0, 1, 2, 3], 1000, true); 
              this.enemigos.play('fly');

        }
      
      
      this.physics.overlap(this.bullets, this.aliens, function (bullet,enemigos){enemigos.kill();
      						bullet.kill(); this.score +=1; 
      						this.scoreText.content = 'SCORE: ' + this.score;
      						this.explosion = this.explosions.getFirstDead();
      						this.explosion.reset(enemigos.body.x, enemigos.body.y);
      						this.explosion.play('boom', 50, false, true);}, null, this);
      this.physics.overlap(this.player, this.aliens, function (player,enemigos){enemigos.kill();
      						player.kill();
      						window.spaceinvaders.Global.score = this.score; 
      						this.game.state.start('end');}, null, this);
      
    },
    
    fireBullet: function(){
      if(this.game.time.now > this.bulletTime){
    	 
    	  this.bullet = this.bullets.getFirstExists(false);
          if(this.bullet){
              
              this.bullet.reset(this.player.x, this.player.y + 8);
              this.bullet.body.velocity.y = -400;
              this.bulletTime = this.game.time.now + 200;
          }
          
      }
      },
       resetBullet: function(bullet) {

    	   
    	    bullet.kill();

    	},


    onDown: function () {
      this.game.state.start('menu');
    }
    
    
  };

  window['spaceinvaders'] = window['spaceinvaders'] || {};
  window['spaceinvaders'].Game = Game;

}());

//window.spaceinvaders.Global.score
