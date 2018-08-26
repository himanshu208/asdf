angular.module('sspf.factories', [])

        .factory('FeedLoader', function ($resource) {
            return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
                fetch: {method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'}}
            });
        })// DB wrapper
        .factory('DB', function ($q) {
            var self = this;
            self.db = null;

            self.init = function () {
                // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production        // 
                //self.db = window.sqlitePlugin.openDatabase({name: "mySQLite.db", location: 'default'});

                //self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);
                self.db = window.openDatabase("mySQLite.db", '1', 'my', -1);

                var query = "CREATE TABLE IF NOT EXISTS [tornament_school_nomination] ('id' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 'tournam_id' INTEGER NOT NULL, 'school_id' INTEGER NOT NULL, 'hos_id' INTEGER NOT NULL, 'adm_no' TEXT NOT NULL, 'first_name' TEXT NOT NULL, 'last_name' TEXT NOT NULL, 'blood_group' TEXT NOT NULL, 'fa_name' TEXT NOT NULL, 'photo' TEXT NOT NULL, 'mo_name' TEXT NOT NULL, 'dob' DATETIME, 'certificate' TEXT NOT NULL, 'aadhar_number' TEXT NOT NULL, 'addre_proof' TEXT NOT NULL, 'clas' TEXT NOT NULL, 'section' TEXT NOT NULL, 'adm_date' DATETIME, 'email' TEXT NOT NULL, 'mobself' TEXT NOT NULL, 'mob_father' TEXT NOT NULL, 'mob_mother' TEXT NOT NULL, 'phy_name' TEXT NOT NULL, 'phy_email' TEXT NOT NULL, 'phy_mob' TEXT NOT NULL, 'home_address' TEXT NOT NULL, 'status' TEXT NOT NULL, 'official_selection_status' INTEGER NOT NULL, 'score_by_official' INTEGER NOT NULL, 'nomination_date' DATETIME, 'rejection_reason' TEXT NOT NULL, 'sel_status' TEXT NOT NULL, 'payment_status' TEXT NOT NULL, 'reg_id' TEXT NOT NULL, 'state_id' INTEGER NOT NULL, 'district_id' INTEGER NOT NULL, 'district_trial' TEXT NOT NULL, 'district_camp' TEXT NOT NULL, 'district_team' TEXT NOT NULL, 'dirstict_team_role' TEXT NOT NULL, 'verified' INTEGER NOT NULL, 'state_trial' TEXT NOT NULL, 'state_camp' TEXT NOT NULL, 'state_team' TEXT NOT NULL, 'state_team_role' TEXT NOT NULL, 'School_Name' TEXT NOT NULL, 'state_name' TEXT NOT NULL, 'district_name' TEXT NOT NULL)";
                self.query(query);
                console.log('Table tornament_school_nomination initialized');

            };

            self.query = function (query, bindings) {
                bindings = typeof bindings !== 'undefined' ? bindings : [];
                var deferred = $q.defer();

                self.db.transaction(function (transaction) {
                    transaction.executeSql(query, bindings, function (transaction, result) {
                        deferred.resolve(result);
                    }, function (transaction, error) {
                        deferred.reject(error);
                    });
                });

                return deferred.promise;
            };

            self.fetchAll = function (result) {
                var output = [];

                for (var i = 0; i < result.rows.length; i++) {
                    output.push(result.rows.item(i));
                }

                return output;
            };

            self.fetch = function (result) {
                return result.rows.item(0);
            };

            return self;
        })
// Resource service example
        .factory('Document', function (DB) {
            var self = this;

            self.all = function () {
                return DB.query('SELECT * FROM tornament_school_nomination')
                        .then(function (result) {
                            return DB.fetchAll(result);
                        });
            };

            self.getById = function (id) {
                return DB.query('SELECT * FROM tornament_school_nomination WHERE id = ? LIMIT 1', [id])
                        .then(function (result) {
                            return DB.fetch(result);
                        });
            };
            self.insertPlayers = function (id, tournam_id, school_id, hos_id, adm_no, first_name, last_name, blood_group, fa_name, photo, mo_name, dob, certificate, aadhar_number, addre_proof, clas, section, adm_date, email, mobself, mob_father, mob_mother, phy_name, phy_email, phy_mob, home_address, status, official_selection_status, score_by_official, nomination_date, rejection_reason, sel_status, payment_status, reg_id, state_id, district_id, district_trial, district_camp, district_team, dirstict_team_role, verified, state_trial, state_camp, state_team, state_team_role, School_Name, state_name, district_name) {
                var executeQuery = "INSERT OR REPLACE  INTO [tornament_school_nomination] ('id','tournam_id','school_id','hos_id','adm_no','first_name','last_name','blood_group','fa_name','photo','mo_name','dob','certificate','aadhar_number','addre_proof','clas','section','adm_date','email','mobself','mob_father','mob_mother','phy_name','phy_email','phy_mob','home_address','status','official_selection_status','score_by_official','nomination_date','rejection_reason','sel_status','payment_status','reg_id','state_id','district_id','district_trial','district_camp','district_team','dirstict_team_role','verified','state_trial','state_camp','state_team','state_team_role', 'School_Name', 'state_name', 'district_name') VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14,?15,?16,?17,?18,?19,?20,?21,?22,?23,?24,?25,?26,?27,?28,?29,?30,?31,?32,?33,?34,?35,?36,?37,?38,?39,?40,?41,?42,?43,?44,?45,?46,?47,?48);";
                return DB.query(executeQuery,[id, tournam_id, school_id, hos_id, adm_no, first_name, last_name, blood_group, fa_name, photo, mo_name, dob, certificate, aadhar_number, addre_proof, clas, section, adm_date, email, mobself, mob_father, mob_mother, phy_name, phy_email, phy_mob, home_address, status, official_selection_status, score_by_official, nomination_date, rejection_reason, sel_status, payment_status, reg_id, state_id, district_id, district_trial, district_camp, district_team, dirstict_team_role, verified, state_trial, state_camp, state_team, state_team_role, School_Name, state_name, district_name])
                        .then(function (result) {
                            log(result);
                        });
            };
            return self;
        })
//        .factory('dbFactory', function ($q) {
//            return {
//                PlayerProfileDetail : function (id) {
//                        var deferred = $q.defer();
//                        myDB.transaction(function (transaction) {
//                            var executeQuery = "SELECT * FROM tornament_school_nomination WHERE id = ?  LIMIT 1";
//                            
//                            transaction.executeSql(executeQuery, [id],
//                                    function (tx, result) {
//                                        deferred.resolve(result.rows[0]);
//                                        log("datafrom websql:-" + JSON.stringify(result.rows[0].School_Name));
//                                    },
//                                    function (tx, e) {
//                                        console.log(e);
//                                    });
//                        });
//                        return deferred.promise;
//                    }
//            };
//        })

// Factory for node-pushserver (running locally in this case), if you are using other push notifications server you need to change this
        .factory('NodePushServer', function ($http, API_URL) {
            // Configure push notifications server address
            // 		- If you are running a local push notifications server you can test this by setting the local IP (on mac run: ipconfig getifaddr en1)
            var push_server_address = API_URL + "/gcm";

            return {
                // Stores the device token in a db using node-pushserver
                // type:  Platform type (ios, android etc)
                storeDeviceToken: function (type, regId) {
                    var logedInUserId = (localStorage.user_id === null) ? Math.floor((Math.random() * 10000000) + 1) : localStorage.user_id;
                    var api_key = (localStorage.api_key === null) ? Math.floor((Math.random() * 10000000) + 1) : localStorage.api_key;
                    // Create a random userid to store with it
                    var user = {
                        type: type,
                        regId: regId,
                        userId: logedInUserId
                    };
                    console.log("Post token for registered device with data " + JSON.stringify(user));

                    $http.post(push_server_address, JSON.stringify(user), {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Authorization': api_key
                        }
                    })
                            .success(function (data, status) {
                                console.log("Token stored, device is successfully subscribed to receive push notifications.");
                            })
                            .error(function (data, status) {
                                console.log("Error storing device token." + data + " " + status);
                            });
                },
                // CURRENTLY NOT USED!
                // Removes the device token from the db via node-pushserver API unsubscribe (running locally in this case).
                // If you registered the same device with different userids, *ALL* will be removed. (It's recommended to register each
                // time the app opens which this currently does. However in many cases you will always receive the same device token as
                // previously so multiple userids will be created with the same token unless you add code to check).
                removeDeviceToken: function (token) {
                    var tkn = {"token": token};
                    $http.post(push_server_address + '/unsubscribe', JSON.stringify(tkn))
                            .success(function (data, status) {
                                console.log("Token removed, device is successfully unsubscribed and will not receive push notifications.");
                            })
                            .error(function (data, status) {
                                console.log("Error removing device token." + data + " " + status);
                            });
                }
            };
        })


        .factory('AdMob', function ($window) {
            var admob = $window.AdMob;

            if (admob)
            {
                // Register AdMob events
                // new events, with variable to differentiate: adNetwork, adType, adEvent
                document.addEventListener('onAdFailLoad', function (data) {
                    console.log('error: ' + data.error +
                            ', reason: ' + data.reason +
                            ', adNetwork:' + data.adNetwork +
                            ', adType:' + data.adType +
                            ', adEvent:' + data.adEvent); // adType: 'banner' or 'interstitial'
                });
                document.addEventListener('onAdLoaded', function (data) {
                    console.log('onAdLoaded: ' + data);
                });
                document.addEventListener('onAdPresent', function (data) {
                    console.log('onAdPresent: ' + data);
                });
                document.addEventListener('onAdLeaveApp', function (data) {
                    console.log('onAdLeaveApp: ' + data);
                });
                document.addEventListener('onAdDismiss', function (data) {
                    console.log('onAdDismiss: ' + data);
                });

                var defaultOptions = {
                    // bannerId: admobid.banner,
                    // interstitialId: admobid.interstitial,
                    // adSize: 'SMART_BANNER',
                    // width: integer, // valid when set adSize 'CUSTOM'
                    // height: integer, // valid when set adSize 'CUSTOM'
                    position: admob.AD_POSITION.BOTTOM_CENTER,
                    // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
                    bgColor: 'black', // color name, or '#RRGGBB'
                    // x: integer,		// valid when set position to 0 / POS_XY
                    // y: integer,		// valid when set position to 0 / POS_XY
                    isTesting: true, // set to true, to receiving test ad for testing purpose
                    // autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
                };
                var admobid = {};

                if (ionic.Platform.isAndroid())
                {
                    admobid = {// for Android
                        banner: 'ca-app-pub-6869992474017983/9375997553',
                        interstitial: 'ca-app-pub-6869992474017983/1657046752'
                    };
                }

                if (ionic.Platform.isIOS())
                {
                    admobid = {// for iOS
                        banner: 'ca-app-pub-6869992474017983/4806197152',
                        interstitial: 'ca-app-pub-6869992474017983/7563979554'
                    };
                }

                admob.setOptions(defaultOptions);

                // Prepare the ad before showing it
                // 		- (for example at the beginning of a game level)
                admob.prepareInterstitial({
                    adId: admobid.interstitial,
                    autoShow: false,
                    success: function () {
                        console.log('interstitial prepared');
                    },
                    error: function () {
                        console.log('failed to prepare interstitial');
                    }
                });
            }
            else
            {
                console.log("No AdMob?");
            }

            return {
                showBanner: function () {
                    if (admob)
                    {
                        admob.createBanner({
                            adId: admobid.banner,
                            position: admob.AD_POSITION.BOTTOM_CENTER,
                            autoShow: true,
                            success: function () {
                                console.log('banner created');
                            },
                            error: function () {
                                console.log('failed to create banner');
                            }
                        });
                    }
                },
                showInterstitial: function () {
                    if (admob)
                    {
                        // If you didn't prepare it before, you can show it like this
                        // admob.prepareInterstitial({adId:admobid.interstitial, autoShow:autoshow});

                        // If you did prepare it before, then show it like this
                        // 		- (for example: check and show it at end of a game level)
                        admob.showInterstitial();
                    }
                },
                removeAds: function () {
                    if (admob)
                    {
                        admob.removeBanner();
                    }
                }
            };
        })

        .factory('iAd', function ($window) {
            var iAd = $window.iAd;

            // preppare and load ad resource in background, e.g. at begining of game level
            if (iAd) {
                iAd.prepareInterstitial({autoShow: false});
            }
            else
            {
                console.log("No iAd?");
            }

            return {
                showBanner: function () {
                    if (iAd)
                    {
                        // show a default banner at bottom
                        iAd.createBanner({
                            position: iAd.AD_POSITION.BOTTOM_CENTER,
                            autoShow: true
                        });
                    }
                },
                showInterstitial: function () {
                    // ** Notice: iAd interstitial Ad only supports iPad.
                    if (iAd)
                    {
                        // If you did prepare it before, then show it like this
                        // 		- (for example: check and show it at end of a game level)
                        iAd.showInterstitial();
                    }
                },
                removeAds: function () {
                    if (iAd)
                    {
                        iAd.removeBanner();
                    }
                }
            };
        })

        ;
