var app = angular.module('chatlover.services.userService', []);


app.service('UserService', function ($q, $rootScope, $localstorage, $ionicPopup, ngFB, $firebaseAuth, $firebaseArray,FriendService) {
  //userId
	var self = {
		/* This contains the currently logged in user */
		current: {},

		/*
		 Makes sure the favorites property is preset on the current user.
		 firebase REMOVES any empty properties on a save. So we can't
		 bootstrap the user object with favorites: {}.
		 */
		ensureFavorite: function () {
			if (!self.current.favorites) {
				self.current.favorites = {};
			}
		},

		/*
		 If adds or removes a show from the users favorites list
		 */
		toggleFavorite: function (show) {
			// Toggles the favorite setting for a show for the current user.
			self.ensureFavorite();
			if (self.current.favorites[show.showid]) {
				self.removeFavorite(show)
			} else {
				self.addFavorite(show)
			}
			self.current.$save();
		},
		/*
		 Adds a show to the users favorites shows list
		 */
		addFavorite: function (show) {
			self.ensureFavorite();
			self.current.favorites[show.showid] = show;
		},
		/*
		 Removes a show from the users favorites shows list
		 */
		removeFavorite: function (show) {
			self.ensureFavorite();
			self.current.favorites[show.showid] = null;
		},
		/*
		 Logout the user
		 */
		logoutUser: function () {
		  console.log("UserService::Logout");
      $rootScope.$broadcast('logout');
		  self.current = {};
		  var auth = $firebaseAuth();
			return auth.$signOut();
		},
		/*
		 Login the user
		 */
		/*
		 Login the user
		 */
		loginUser: function () {
			var d = $q.defer();

			//
			// Initiate the facebook login process
			//
			console.log('Calling facebook login');
			ngFB.login({scope: 'email'}).then(
				function (response) {
					if (response.status === 'connected') {
						console.log('Facebook login succeeded');
						var token = response.authResponse.accessToken;
						//
						// We are logged in so now authenticate via firebase
						//

						console.log('Authenticating with firebase');
						var auth = $firebaseAuth();
						var credential = firebase.auth.FacebookAuthProvider.credential(token);
						auth.$signInWithCredential(credential)
							.then(function (firebaseUser) {
								//
								// All good, resolve the promise and lets rock!
								//
								console.log("Signed in as:", firebaseUser.uid);
                self.current.userId = firebase.auth().currentUser.uid;

                var user = {
                  uid:self.current.userId,
                  username: firebase.auth().currentUser.displayName,
                  profilePic: firebase.auth().currentUser.photoURL
                };

                self.makeSureRegistered(self.current.userId,user);

								d.resolve();
							})
							.catch(function (error) {
								console.error(error);
								$ionicPopup.alert({
									title: "Facebook Error",
									template: 'Failed to login with facebook'
								});
								d.reject(error);
							});

					} else {
						//
						// There was an error authenticating with facebook
						// Show the user an error message
						//
						console.error('Facebook login failed');
						d.reject(error);
					}
				});

			return d.promise;
		},

    registerUser: function (user) {
      var userRef =  firebase.database().ref().child("users");
      var query = $firebaseArray(userRef);
      query.$add(user);
    },

    makeSureRegistered: function (uid,user) {
      var messagesRef = firebase.database().ref();
      var query = messagesRef
        .child("users")
        .orderByChild("uid")
        .equalTo(uid)
        .limitToLast(1);

      var data = $firebaseArray(query);

      data.$loaded().then(function (data) {
        if(data.length !== 1){
          console.log("Registering user...");
          self.registerUser(user);
        }else{console.log("Already Registered");}
        // Destory binding...
        data.$destroy();
      })

    }

	};

	return self;
})
;
