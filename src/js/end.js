(function() {
  'use strict';

  function End() {
	  this.ScoreReached = null;
  }

  End.prototype = {

    create: function () {
     var x = this.game.width / 2
        , y = this.game.height / 2;
     
      

      
    },

    update: function () {

    },
  

    
  };

  window['spaceinvaders'] = window['spaceinvaders'] || {};
  window['spaceinvaders'].End = End;

}());