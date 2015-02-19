// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params){
    this.set('currentSong', new SongModel());
    this.set('songQueue', new SongQueue());

    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the funciton (this.set('currentSong', song)) would
    end up refering to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */


    params.library.on('play', function(song){
      this.set('currentSong', song);
    }, this);

    params.library.on('enqueue', function(song){
      var queue = this.get('songQueue');
      queue.add(song);

      //add stuff here
      console.log(queue.length);

      if ( queue.length === 1 ) {
        this.set('currentSong', queue.models[0]);
        //queue.playFirst();
      }

      console.log(queue);

    }, this);

    params.library.on('dequeue ended', function(song){
      var queue = this.get('songQueue');
      queue.remove(song);

      }, this);

/*
    params.library.on('ended', function(song){
    }, this);
*/

/*
  this.get('songQueue').on('change', function(){
    this.set('currentSong', this.get('songQueue').first() )
    },
    this);
*/

  }

});
