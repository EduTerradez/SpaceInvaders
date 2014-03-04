(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      
      this.load.spritesheet('startbutton' , 'assets/START.png', 285,90);
      this.load.spritesheet('scorebutton' , 'assets/SCORES.png', 285,90);
      this.load.spritesheet('returnbutton' , 'assets/RETURN.png', 285,90);
      this.load.spritesheet('boom', 'assets/boom.png', 128,128);
      this.load.image('bullet', 'assets/bullet1.png');
      this.load.image('background', 'assets/FondoFinal.png');
      this.load.image('Titulo' , 'assets/TituloFinal.png');
      this.load.spritesheet('marcianito', 'assets/MarcianitosFinal.png',56,35);
      this.load.spritesheet('battleship', 'assets/Navesfuego.png',33,47);
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
    },

    create: function () {
      this.asset.cropEnabled = false;
      
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
      
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['spaceinvaders'] = window['spaceinvaders'] || {};
  window['spaceinvaders'].Preloader = Preloader;

}());
