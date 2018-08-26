angular.module('sspf.controllers', ['sspf.config'])

        .controller('AuthCtrl', function ($scope, $ionicConfig) {

        })
        .controller('TodaysMachesCtrl', function ($scope, $ionicConfig) {

        })

        .controller('UpcommingMachesCtrl', function ($scope, $ionicConfig) {

        })
        .controller('ResultCtrl', function ($scope, $ionicConfig) {

        })
        .controller('PointTableCtrl', function ($scope, $ionicConfig) {

        })
        .controller('AttendanceCtrl', function ($scope, $ionicConfig) {

        })
        .controller('DownloadsCtrl', function ($scope, $ionicConfig) {

        })
        // APP
        .controller('AppCtrl', function ($scope, $ionicConfig) {
            var fullname = (localStorage.fullname === null) ? "" : localStorage.fullname;
            var usertype = (localStorage.usertype === null) ? "" : localStorage.usertype;

            $scope.welcome = (fullname === "") ? usertype : fullname;
            $scope.sports_select = true;
            $scope.options = [{name: "Cricket", value: 1, id: 1}, {name: "Football", value: 2, id: 2}];
            var sports_id = (localStorage.sports_id === null) ? 1 : localStorage.sports_id;
            if (sports_id == 2) {
                sports_id = 1;
            } else {
                sports_id = 0;
            }
            $scope.selectedOption = $scope.options[sports_id];

        })

        //LOGIN
        .controller('LoginCtrl', function ($scope, $http, $state, $ionicLoading, $templateCache, $q, $rootScope, API_URL, PushNotificationsService, $ionicPlatform) {
            $scope.apiUrl = API_URL;
            $scope.doLogIn = function () {
                if (isset(navigator.network)) {
                    if (navigator.network.connection.type == Connection.NONE) {
                        $ionicLoading.show({
                            template: "No Internet Connection",
                            noBackdrop: true,
                            duration: 3000
                        });
                        return false;
                    }
                }
                $ionicLoading.show({
                    template: 'Loading...'
                });
                $http.post($scope.apiUrl + '/login', {
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                        .success(function (response) {
                            // alert(JSON.stringify(response)); 
                            if (response.error === false) {
                                window.localStorage.setItem("api_key", response.data.access_token);
                                window.localStorage.setItem("address", response.data.address);
                                window.localStorage.setItem("alternate_no", response.data.alternate_no);
                                window.localStorage.setItem("c_date", response.data.c_date);
                                window.localStorage.setItem("contact", response.data.contact);
                                window.localStorage.setItem("dob", response.data.dob);
                                window.localStorage.setItem("email", response.data.email);
                                window.localStorage.setItem("emergency_no", response.data.emergency_no);
                                window.localStorage.setItem("form_filled", response.data.form_filled);
                                window.localStorage.setItem("fullname", response.data.fullname);
                                window.localStorage.setItem("id", response.data.id);
                                window.localStorage.setItem("selection", response.data.selection);
                                window.localStorage.setItem("status", response.data.status);
                                window.localStorage.setItem("up_date", response.data.up_date);
                                window.localStorage.setItem("valid_id_photo_proof", response.data.valid_id_photo_proof);
                                window.localStorage.setItem("user_id", response.data.id);
                                console.log(JSON.stringify(response));
                                $ionicPlatform.on("deviceready", function () {
                                    console.log("PushNotificationsService register on start");
                                    PushNotificationsService.register();
                                });
                                $ionicPlatform.on("resume", function () {
                                    console.log("PushNotificationsService register on Resume");
                                    PushNotificationsService.register();
                                });
                                $state.go('app.feeds-categories');

                            } else {
                                $ionicLoading.show({
                                    template: response.message,
                                    noBackdrop: true,
                                    duration: 3000
                                });
                                // alert("Username or password is incorrect"); 
                            }
                            $ionicLoading.hide();
                        });
            };
            $scope.doRegister = function () {
                if (isset(navigator.network)) {
                    if (navigator.network.connection.type == Connection.NONE) {
                        $ionicLoading.show({
                            template: "No Internet Connection",
                            noBackdrop: true,
                            duration: 3000
                        });
                        return false;
                    }
                }
                $ionicLoading.show({
                    template: 'Loading...'
                });
                $http.post($scope.apiUrl + '/register', {
                    name: $scope.user.name,
                    email: $scope.user.email,
                    phone: $scope.user.phone,
                    phone2: $scope.user.phone2,
                    dob: $scope.user.dob,
                    password: $scope.user.password
                })
                        .success(function (response) {
                            alert(JSON.stringify(response));
                            if (response.error === false) {
                                window.localStorage.setItem("api_key", response.data.access_token);
                                window.localStorage.setItem("address", response.data.address);
                                window.localStorage.setItem("alternate_no", response.data.alternate_no);
                                window.localStorage.setItem("c_date", response.data.c_date);
                                window.localStorage.setItem("contact", response.data.contact);
                                window.localStorage.setItem("dob", response.data.dob);
                                window.localStorage.setItem("email", response.data.email);
                                window.localStorage.setItem("emergency_no", response.data.emergency_no);
                                window.localStorage.setItem("form_filled", response.data.form_filled);
                                window.localStorage.setItem("fullname", response.data.fullname);
                                window.localStorage.setItem("id", response.data.id);
                                window.localStorage.setItem("selection", response.data.selection);
                                window.localStorage.setItem("status", response.data.status);
                                window.localStorage.setItem("up_date", response.data.up_date);
                                window.localStorage.setItem("valid_id_photo_proof", response.data.valid_id_photo_proof);
                                window.localStorage.setItem("user_id", response.data.id);
                                console.log(JSON.stringify(response));
                                $ionicPlatform.on("deviceready", function () {
                                    console.log("PushNotificationsService register on start");
                                    PushNotificationsService.register();
                                });
                                $ionicPlatform.on("resume", function () {
                                    console.log("PushNotificationsService register on Resume");
                                    PushNotificationsService.register();
                                });
                                $state.go('app.feeds-categories');

                            } else {
                                $ionicLoading.show({
                                    template: response.message,
                                    noBackdrop: true,
                                    duration: 3000
                                });
                                // alert("Username or password is incorrect"); 
                            }
                            $ionicLoading.hide();
                        });
            };
            $scope.user = {};

            $scope.user.email = "himanshu.208@gmail.com";
            $scope.user.password = "123456";

            // We need this for the form validation
            $scope.selected_tab = "";

            $scope.$on('my-tabs-changed', function (event, data) {
                $scope.selected_tab = data.title;
            });

        })
        .controller('LogOutCtrl', function ($scope, $state, DB) {
            var executeQuery = "DROP TABLE IF EXISTS tornament_school_nomination ";
            DB.query(executeQuery, []);
            //  myDB.transaction(function (transaction) {

//                transaction.executeSql(executeQuery, [],
//                        function (tx, result) {
//                            log('LogOutCtrl:Deleted table');
//                        },
//                        function (tx, error) {
//                            log('LogOutCtrl::Error occurred on delete table:' + error);
//                        });
            //  });
            localStorage.removeItem("api_key");
            localStorage.removeItem("fullname");
            localStorage.removeItem("email");
            localStorage.removeItem("status");
            localStorage.removeItem("user_id");
            localStorage.removeItem("usertype");
            $state.go('auth.login');
            location.reload();
        })
        .controller('SignupCtrl', function ($scope, $state) {
            $scope.user = {};

            $scope.user.email = "john@doe.com";

            $scope.doSignUp = function () {
                $state.go('app.feeds-categories');
            };
        })

        .controller('ForgotPasswordCtrl', function ($scope, $state) {
            $scope.recoverPassword = function () {
                $state.go('app.feeds-categories');
            };

            $scope.user = {};
        })

        .controller('RateApp', function ($scope) {
            $scope.rateApp = function () {
                if (ionic.Platform.isIOS()) {
                    //you need to set your own ios app id
                    AppRate.preferences.storeAppURL.ios = '1234555553>';
                    AppRate.promptForRating(true);
                } else if (ionic.Platform.isAndroid()) {
                    //you need to set your own android app id
                    AppRate.preferences.storeAppURL.android = 'market://details?id=ionFB';
                    AppRate.promptForRating(true);
                }
            };
        })

        .controller('SendMailCtrl', function ($scope) {
            $scope.sendMail = function () {
                cordova.plugins.email.isAvailable(
                        function (isAvailable) {
                            // alert('Service is not available') unless isAvailable;
                            cordova.plugins.email.open({
                                to: 'envato@startapplabs.com',
                                cc: 'hello@startapplabs.com',
                                // bcc:     ['john@doe.com', 'jane@doe.com'],
                                subject: 'Greetings',
                                body: 'How are you? Nice greetings from IonFullApp'
                            });
                        }
                );
            };
        })

        .controller('MapsCtrl', function ($scope, $ionicLoading) {

            $scope.info_position = {
                lat: 43.07493,
                lng: -89.381388
            };

            $scope.center_position = {
                lat: 43.07493,
                lng: -89.381388
            };

            $scope.my_location = "";

            $scope.$on('mapInitialized', function (event, map) {
                $scope.map = map;
            });

            $scope.centerOnMe = function () {

                $scope.positions = [];

                $ionicLoading.show({
                    template: 'Loading...'
                });

                // with this function you can get the user’s current position
                // we use this plugin: https://github.com/apache/cordova-plugin-geolocation/
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    $scope.current_position = {
                        lat: pos.G,
                        lng: pos.K
                    };
                    $scope.my_location = pos.G + ", " + pos.K;
                    $scope.map.setCenter(pos);
                    $ionicLoading.hide();
                });
            };
        })

        .controller('AdsCtrl', function ($scope, $ionicActionSheet, AdMob, iAd) {

            $scope.manageAdMob = function () {

                // Show the action sheet
                var hideSheet = $ionicActionSheet.show({
                    //Here you can add some more buttons
                    buttons: [
                        {
                            text: 'Show Banner'
                        },
                        {
                            text: 'Show Interstitial'
                        }
                    ],
                    destructiveText: 'Remove Ads',
                    titleText: 'Choose the ad to show',
                    cancelText: 'Cancel',
                    cancel: function () {
                        // add cancel code..
                    },
                    destructiveButtonClicked: function () {
                        console.log("removing ads");
                        AdMob.removeAds();
                        return true;
                    },
                    buttonClicked: function (index, button) {
                        if (button.text == 'Show Banner')
                        {
                            console.log("show banner");
                            AdMob.showBanner();
                        }

                        if (button.text == 'Show Interstitial')
                        {
                            console.log("show interstitial");
                            AdMob.showInterstitial();
                        }

                        return true;
                    }
                });
            };

            $scope.manageiAd = function () {

                // Show the action sheet
                var hideSheet = $ionicActionSheet.show({
                    //Here you can add some more buttons
                    buttons: [
                        {
                            text: 'Show iAd Banner'
                        },
                        {
                            text: 'Show iAd Interstitial'
                        }
                    ],
                    destructiveText: 'Remove Ads',
                    titleText: 'Choose the ad to show - Interstitial only works in iPad',
                    cancelText: 'Cancel',
                    cancel: function () {
                        // add cancel code..
                    },
                    destructiveButtonClicked: function () {
                        console.log("removing ads");
                        iAd.removeAds();
                        return true;
                    },
                    buttonClicked: function (index, button) {
                        if (button.text == 'Show iAd Banner')
                        {
                            console.log("show iAd banner");
                            iAd.showBanner();
                        }
                        if (button.text == 'Show iAd Interstitial')
                        {
                            console.log("show iAd interstitial");
                            iAd.showInterstitial();
                        }
                        return true;
                    }
                });
            };
        })

        // FEED
        //brings all feed categories
        .controller('FeedsCategoriesCtrl', function ($scope, $state, $http, DashboardData) {

            $scope.data = function () {
                return DashboardData.dataContainer;
            };
            //$scope.feeds_categories = [];
            isLogedin($state);
//        $http.get('feeds-categories.json').success(function(response) {
//            $scope.feeds_categories = response;
//        });
//            $scope.data = {
//                fullname: localStorage.fullname,
//                email: localStorage.email,
//                status: localStorage.status,
//                user_id: localStorage.user_id,
//                usertype: localStorage.usertype
//            }

//            $scope.fullname = localStorage.fullname;
//            window.localStorage.setItem("api_key", response.api_key);
//            window.localStorage.setItem("fullname", response.fullname);
//            window.localStorage.setItem("email", response.email);
//            window.localStorage.setItem("status", response.status);
//            window.localStorage.setItem("user_id", response.user_id);
//            window.localStorage.setItem("usertype", response.usertype);
        })
        .controller('HireCtrl', function ($scope, $state, $http, $stateParams) {

            //$scope.feeds_categories = [];
            //isLogedin($state);

        })
        .controller('CaregiverCtrl', function ($scope, $state, $http, $stateParams) {

            $scope.ShowHide = function () {
                $scope.IsVisible = $scope.IsVisible = true;
            }

        })
        .controller('TeamCtrl', function ($scope, $state, $timeout, $http, $q, Document, $stateParams, API_URL, $ionicLoading, $cordovaSQLite) {
            $scope.apiUrl = API_URL;
            $scope.selectPlayers = function ($q) {
                log('selectPlayers:Start');
                var deferred = $q.defer();
                var tournam_id = (localStorage.sports_id === null) ? "" : localStorage.sports_id;
                myDB.transaction(function (transaction) {
                    var executeQuery = "SELECT * FROM tornament_school_nomination WHERE tournam_id = ?";
                    transaction.executeSql(executeQuery, [tournam_id],
                            function (tx, result) {
                                deferred.resolve(result.rows);
                                log("datafrom websql:-" + JSON.stringify(result.rows));
                            },
                            function (tx, e) {
                                console.log(e);
                            });
                });

                return deferred.promise;
            };

            $scope.documents = [];
            $scope.teamList = function (DB) {
                console.log('TeamCtrl:teamList');
                if (isset(navigator.network)) {
                    if (navigator.network.connection.type == Connection.NONE) {
                        $ionicLoading.show({
                            template: "No Internet Connection",
                            noBackdrop: true,
                            duration: 3000
                        });
                        return false;
                    }
                }
                $ionicLoading.show({
                    template: 'Loading...'
                });
                var api_key = (localStorage.api_key === null) ? "" : localStorage.api_key;
                var school_id = (localStorage.school_id === null) ? "" : localStorage.school_id;
                var tournam_id = (localStorage.sports_id === null) ? "" : localStorage.sports_id;
                // Create a random userid to store with it
                var data = {
                    tournam_id: tournam_id,
                    school_id: school_id
                };

                console.log("TeamCtrl: Post data " + JSON.stringify(data));
                var now1 = new Date();
                var teamplayer_updatetime = (localStorage.teamplayer_updatetime === null) ? (now1.setMinutes(now1.getMinutes() - 30)) : localStorage.teamplayer_updatetime;
                var diff = getMinutesBetweenDates(teamplayer_updatetime, new Date());
                log("diff:" + diff + "now time:" + now1 + "::" + teamplayer_updatetime);
                // if ((diff >= 1) || (diff === 0)) {
                $http.post($scope.apiUrl + '/tmplayerlist', JSON.stringify(data), {headers: {'Content-Type': 'application/json', 'X-Authorization': api_key}})
                        .success(function (data, status) {
                            console.log(data);
                            console.log("tmplayerlist recived suscessfully.");
                            //alert(data.players);
                            angular.forEach(data.players, function (item) {
                                console.log(item);
                                Document.insertPlayers(item.id, item.tournam_id, item.school_id, item.hos_id, item.adm_no, item.first_name, item.last_name, item.blood_group, item.fa_name, item.photo, item.mo_name, item.dob, item.certificate, item.aadhar_number, item.addre_proof, item.clas, item.section, item.adm_date, item.email, item.mobself, item.mob_father, item.mob_mother, item.phy_name, item.phy_email, item.phy_mob, item.home_address, item.status, item.official_selection_status, item.score_by_official, item.nomination_date, item.rejection_reason, item.sel_status, item.payment_status, item.reg_id, item.state_id, item.district_id, item.district_trial, item.district_camp, item.district_team, item.dirstict_team_role, item.verified, item.state_trial, item.state_camp, item.state_team, item.state_team_role, item.School_Name, item.state_name, item.district_name);

                            });
                            window.localStorage.setItem("teamplayer_updatetime", new Date());
                            //$scope.players = data.players;
                            // Get all the documents
                            Document.all().then(function (documents) {
                                $scope.documents = documents;
                            });
                        })
                        .error(function (data, status) {
                            console.log("Error storing device token." + data + " " + status);
                        });
//                } else {
//                    Document.all().then(function (documents) {
//                        $scope.documents = documents;
//                    });
//                }
                $timeout(function () {
                    $ionicLoading.hide();
                }, 2500);

            };

        })
        .controller('ProfileCtrl', function ($scope, $state, $http, $stateParams, Document, API_URL, $ionicLoading, $location, $q) {

            var profileType = $stateParams.profileType,
                    id = $stateParams.id;
            $scope.profile = function () {
                if (profileType == "myself") {
                    $scope.MyProfile = true;
                    $scope.PlayerProfile = false;
                    $scope.profileTitle = "My Profile";
                    var fullname = (localStorage.fullname === null) ? "" : localStorage.fullname;
                    var usertype = (localStorage.usertype === null) ? "" : localStorage.usertype;

                    $scope.fullname = (fullname === "") ? usertype : fullname;
                } else if (profileType == "myteam") {
                    $scope.MyProfile = false;
                    $scope.PlayerProfile = true;
                    $scope.profileTitle = "Player Profile";
                    $scope.documents = [];
                    $scope.document = null;
                    $scope.uploadImage = function (id) {
                        var photo = document.getElementById('photo').value;
                        var dobproof = document.getElementById('dobproof').value;
                        var aadharcard = document.getElementById('aadharcard').value;
                        if (isset(navigator.network)) {
                            if (navigator.network.connection.type == Connection.NONE) {
                                $ionicLoading.show({
                                    template: "No Internet Connection",
                                    noBackdrop: true,
                                    duration: 3000
                                });
                                return false;
                            }
                        }
                        $ionicLoading.show({
                            template: 'Loading...'
                        });
                        var api_key = (localStorage.api_key === null) ? "" : localStorage.api_key;
                        $http.post($scope.apiUrl + '/playerphotoupload', {
                            userid: id,
                            photo: photo,
                            dobproof: dobproof,
                            aadharcard: aadharcard,
                        }, {headers: {'Content-Type': 'application/json', 'X-Authorization': api_key}}).success(function (response) {
                            //alert(JSON.stringify(response));
                            if (response.error === false) {
                                $ionicLoading.show({
                                    template: response.message,
                                    noBackdrop: true,
                                    duration: 3000
                                });
                                $state.go('app.team');
                            } else {
                                $ionicLoading.show({
                                    template: response.message,
                                    noBackdrop: true,
                                    duration: 3000
                                });
                                // alert("Username or password is incorrect"); 
                            }
                            $ionicLoading.hide();
                        });

                    };
                    Document.getById(id).then(function (document) {
                        $scope.document = document;
                    });
                    $scope.apiUrl = API_URL;

                    $scope.capturePhoto = function (id, type) {

                        $scope.test = "test 1";
                        var defer = $q.defer();
                        defer.promise.then(function (imageData) {
                            if (type == "photo") {
                                var image = document.getElementById('myImage');
                                image.src = "data:image/jpeg;base64," + imageData;
                                var image2 = document.getElementById('myImage2');
                                image2.src = "data:image/jpeg;base64," + imageData;
                                //
                                var photo = document.getElementById('photo');
                                photo.value = "data:image/jpeg;base64," + imageData;
                            } else if (type == "dobproof") {
                                var image3 = document.getElementById('myImage3');
                                image3.src = "data:image/jpeg;base64," + imageData;
                                var dobproof = document.getElementById('dobproof');
                                dobproof.value = "data:image/jpeg;base64," + imageData;
                            } else if (type == "aadharcard") {
                                var image4 = document.getElementById('myImage4');
                                image4.src = "data:image/jpeg;base64," + imageData;
                                var aadharcard = document.getElementById('aadharcard');
                                aadharcard.value = "data:image/jpeg;base64," + imageData;
                            }
                        },
                                function (error) {
                                    log(error);
                                }
                        );

                        navigator.camera.getPicture(defer.resolve, defer.reject, {quality: 20,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.CAMERA,
                            allowEdit: true,
                            encodingType: Camera.EncodingType.PNG,
                            targetWidth: 100,
                            targetHeight: 100,
                            saveToPhotoAlbum: true});

                    };
                }
            };
            $scope.profile();

        })
        //bring specific category providers
        .controller('CategoryFeedsCtrl', function ($scope, $http, $stateParams) {
            $scope.category_sources = [];

            $scope.categoryId = $stateParams.categoryId;

            $http.get('feeds-categories.json').success(function (response) {
                var category = _.find(response, {
                    id: $scope.categoryId
                });
                $scope.categoryTitle = category.title;
                $scope.category_sources = category.feed_sources;
            });
        })

        //this method brings posts for a source provider
        .controller('FeedEntriesCtrl', function ($scope, $stateParams, $http, FeedList, $q, $ionicLoading, BookMarkService) {
            $scope.feed = [];

            var categoryId = $stateParams.categoryId,
                    sourceId = $stateParams.sourceId;

            $scope.doRefresh = function () {

                $http.get('feeds-categories.json').success(function (response) {

                    $ionicLoading.show({
                        template: 'Loading entries...'
                    });

                    var category = _.find(response, {
                        id: categoryId
                    }),
                            source = _.find(category.feed_sources, {
                                id: sourceId
                            });

                    $scope.sourceTitle = source.title;

                    FeedList.get(source.url)
                            .then(function (result) {
                                $scope.feed = result.feed;
                                $ionicLoading.hide();
                                $scope.$broadcast('scroll.refreshComplete');
                            }, function (reason) {
                                $ionicLoading.hide();
                                $scope.$broadcast('scroll.refreshComplete');
                            });
                });
            };

            $scope.doRefresh();

            $scope.bookmarkPost = function (post) {
                $ionicLoading.show({
                    template: 'Post Saved!',
                    noBackdrop: true,
                    duration: 1000
                });
                BookMarkService.bookmarkFeedPost(post);
            };
        })

        // SETTINGS
        .controller('SettingsCtrl', function ($scope, $ionicActionSheet, $state) {
            $scope.airplaneMode = true;
            $scope.wifi = false;
            $scope.bluetooth = true;
            $scope.personalHotspot = true;

            $scope.checkOpt1 = true;
            $scope.checkOpt2 = true;
            $scope.checkOpt3 = false;

            $scope.radioChoice = 'B';

            // Triggered on a the logOut button click
            $scope.showLogOutMenu = function () {

                // Show the action sheet
                var hideSheet = $ionicActionSheet.show({
                    //Here you can add some more buttons
                    // buttons: [
                    // { text: '<b>Share</b> This' },
                    // { text: 'Move' }
                    // ],
                    destructiveText: 'Logout',
                    titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
                    cancelText: 'Cancel',
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        //Called when one of the non-destructive buttons is clicked,
                        //with the index of the button that was clicked and the button object.
                        //Return true to close the action sheet, or false to keep it opened.
                        return true;
                    },
                    destructiveButtonClicked: function () {
                        //Called when the destructive button is clicked.
                        //Return true to close the action sheet, or false to keep it opened.
                        $state.go('auth.login');
                    }
                });

            };
        })

        // TINDER CARDS
        .controller('TinderCardsCtrl', function ($scope, $http) {

            $scope.cards = [];


            $scope.addCard = function (img, name) {
                var newCard = {
                    image: img,
                    name: name
                };
                newCard.id = Math.random();
                $scope.cards.unshift(angular.extend({}, newCard));
            };

            $scope.addCards = function (count) {
                $http.get('http://api.randomuser.me/?results=' + count).then(function (value) {
                    angular.forEach(value.data.results, function (v) {
                        $scope.addCard(v.user.picture.large, v.user.name.first + " " + v.user.name.last);
                    });
                });
            };

            $scope.addFirstCards = function () {
                $scope.addCard("https://dl.dropboxusercontent.com/u/30675090/envato/tinder-cards/left.png", "Nope");
                $scope.addCard("https://dl.dropboxusercontent.com/u/30675090/envato/tinder-cards/right.png", "Yes");
            };

            $scope.addFirstCards();
            $scope.addCards(5);

            $scope.cardDestroyed = function (index) {
                $scope.cards.splice(index, 1);
                $scope.addCards(1);
            };

            $scope.transitionOut = function (card) {
                console.log('card transition out');
            };

            $scope.transitionRight = function (card) {
                console.log('card removed to the right');
                console.log(card);
            };

            $scope.transitionLeft = function (card) {
                console.log('card removed to the left');
                console.log(card);
            };
        })


        // BOOKMARKS
        .controller('BookMarksCtrl', function ($scope, $rootScope, BookMarkService, $state) {

            $scope.bookmarks = BookMarkService.getBookmarks();

            // When a new post is bookmarked, we should update bookmarks list
            $rootScope.$on("new-bookmark", function (event) {
                $scope.bookmarks = BookMarkService.getBookmarks();
            });

            $scope.goToFeedPost = function (link) {
                window.open(link, '_blank', 'location=yes');
            };
            $scope.goToWordpressPost = function (postId) {
                $state.go('app.post', {
                    postId: postId
                });
            };
        })

        // WORDPRESS
        .controller('WordpressCtrl', function ($scope, $http, $ionicLoading, PostService, BookMarkService) {
            $scope.posts = [];
            $scope.page = 1;
            $scope.totalPages = 1;

            $scope.doRefresh = function () {
                $ionicLoading.show({
                    template: 'Loading posts...'
                });

                //Always bring me the latest posts => page=1
                PostService.getRecentPosts(1)
                        .then(function (data) {
                            $scope.totalPages = data.pages;
                            $scope.posts = PostService.shortenPosts(data.posts);

                            $ionicLoading.hide();
                            $scope.$broadcast('scroll.refreshComplete');
                        });
            };

            $scope.loadMoreData = function () {
                $scope.page += 1;

                PostService.getRecentPosts($scope.page)
                        .then(function (data) {
                            //We will update this value in every request because new posts can be created
                            $scope.totalPages = data.pages;
                            var new_posts = PostService.shortenPosts(data.posts);
                            $scope.posts = $scope.posts.concat(new_posts);

                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        });
            };

            $scope.moreDataCanBeLoaded = function () {
                return $scope.totalPages > $scope.page;
            };

            $scope.bookmarkPost = function (post) {
                $ionicLoading.show({
                    template: 'Post Saved!',
                    noBackdrop: true,
                    duration: 1000
                });
                BookMarkService.bookmarkWordpressPost(post);
            };

            $scope.doRefresh();
        })

        // WORDPRESS POST
        .controller('WordpressPostCtrl', function ($scope, post_data, $ionicLoading) {

            $scope.post = post_data.post;
            $ionicLoading.hide();

            $scope.sharePost = function (link) {
                window.plugins.socialsharing.share('Check this post here: ', null, null, link);
            };
        })


        .controller('ImagePickerCtrl', function ($scope, $rootScope, $cordovaCamera) {

            $scope.images = [];

            $scope.selImages = function () {

                window.imagePicker.getPictures(
                        function (results) {
                            for (var i = 0; i < results.length; i++) {
                                console.log('Image URI: ' + results[i]);
                                $scope.images.push(results[i]);
                            }
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }, function (error) {
                    console.log('Error: ' + error);
                }
                );
            };

            $scope.removeImage = function (image) {
                $scope.images = _.without($scope.images, image);
            };

            $scope.shareImage = function (image) {
                window.plugins.socialsharing.share(null, null, image);
            };

            $scope.shareAll = function () {
                window.plugins.socialsharing.share(null, null, $scope.images);
            };
        })

        ;
function isLogedin($state) {
    var isLogedin = window.localStorage.getItem("api_key"); //alert(isLogedin);
    if (isLogedin === null || isLogedin === "") {
        $state.go('auth.login');
    } else {
        $state.go('app.feeds-categories');
    }
}
function takephoto()
{
    navigator.camera.getPicture(onSuccess, onFail, {quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });
}
function onSuccess(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
    document.getElementById("text1").innerHTML = imageData;
    document.getElementById("text1").style.display = "block";
}
function onFail(message) {
    alert('Failed because: ' + message);
}
function isset(object) {
    return (typeof object !== 'undefined');
}

