window.onload = function () {
  'use strict';

  var game
    , ns = window['spaceinvaders'];

  game = new Phaser.Game(800, 900, Phaser.AUTO, 'spaceinvaders-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);
  game.state.add('end', ns.End);

  game.state.start('boot');
};
