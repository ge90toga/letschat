// friend service
var app = angular.module('chatlover.services.friendService', []);

app.service('FriendService', function ($firebaseArray, $rootScope) {

  //users
  var self = {
    _loaded: false,
    _messagesRef: firebase.database().ref(),

    load: function () {
      if (!self._loaded) {
        console.log("FriendService::initialise...");
        var query = self._messagesRef.child("users").orderByChild('username');
        self.users = $firebaseArray(query);
        self._loaded = true;

        self.users.$loaded().then(function () {
          console.log("FriendService::Users ",self.users);
        });
      }
    },

    _destroy: function () {
      self._loaded = false;
      if(self.users){
        self.users.$destroy();
      }
    }

  };

  $rootScope.$on('logout', function () {
    self._destroy();
  });

  return self;
});

