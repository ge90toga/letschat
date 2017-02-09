var app = angular.module('chatlover.services.chatService', []);
/**
 * ChatService
 * Should call ChatService.destroy() when leave a conversation!
 */
app.service('ChatService', function ($q, $rootScope, $firebaseArray) {

  var self = {

    _loaded: false,
    loading: true,
    uid_1: null,
    uid_2: null,
    messages: null,
    _firebaseRef: firebase.database().ref(),

    load: function (uid_1, uid_2, onUpdate) {
      var defer = $q.defer();

      if (!self._loaded) {
        // Make sure lower string comes first by swap vars
        if (uid_1 > uid_2) {
          [uid_1, uid_2] = [uid_2, uid_1];
        }

        self.uid_1 = uid_1;
        self.uid_2 = uid_2;

        var query = self._firebaseRef
          .child("conversations")
          .orderByChild('uid_pair')
          .equalTo(uid_1 + ' ' + uid_2);

        self.messages = $firebaseArray(query);
        self._loaded = true;

        self.messages.$loaded().then(function () {
          console.log("ChatService::message loaded");
          defer.resolve();
          self.loading = false;
        }).catch(function(error) {
          defer.reject(error);
          console.log("ChatService::loadMessage Error:", error);
        });

        self.messages.$watch(function () {
          onUpdate();
        });

      }else{
        defer.resolve();
      }

      return defer.promise;

    },

    sendMessage: function (messageObj) {
      // add pair_id
      messageObj.uid_pair = self.uid_1 + ' ' + self.uid_2;
      messageObj.timestamp = new Date().getTime();

      self.messages.$add(messageObj).then(function () {
        console.log("ChatService::Message add success!!!");
      });

    },

    getMessages: function () {
      return self.messages;
    },

    destroy: function () {
      self._loaded = false;
      self.uid_1 = null;
      self.uid_2 = null;
      if (self.messages) {
        self.messages.$destroy();
      }

    }

  };

  // des
  $rootScope.$on('logout', function () {
    self.destroy();
  });


  return self;
})
;
