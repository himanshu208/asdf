// Ionic Starter App
var myDB = null;
angular.module('underscore', [])
        .factory('_', function () {
            return window._; // assumes underscore has already been loaded on the page
        });

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('sspf', [
    'ionic',
    'sspf.controllers',
    'sspf.directives',
    'sspf.filters',
    'sspf.services',
    'sspf.factories',
    'sspf.config',
    'sspf.views',
    'underscore',
    'ngCordova'
])

        .run(function ($ionicPlatform, PushNotificationsService, $rootScope, $ionicConfig, $timeout, DB, $cordovaSQLite) {
            DB.init();
            if (!window.cordova) {
//                myDB = window.openDatabase("mySQLite.db", '1', 'my', 1024 * 1024 * 100);
//            myDB.transaction(function (transaction) {
//                    transaction.executeSql("CREATE TABLE IF NOT EXISTS [tornament_school_nomination] ('id' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 'tournam_id' INTEGER NOT NULL, 'school_id' INTEGER NOT NULL, 'hos_id' INTEGER NOT NULL, 'adm_no' TEXT NOT NULL, 'first_name' TEXT NOT NULL, 'last_name' TEXT NOT NULL, 'blood_group' TEXT NOT NULL, 'fa_name' TEXT NOT NULL, 'photo' TEXT NOT NULL, 'mo_name' TEXT NOT NULL, 'dob' DATETIME, 'certificate' TEXT NOT NULL, 'aadhar_number' TEXT NOT NULL, 'addre_proof' TEXT NOT NULL, 'clas' TEXT NOT NULL, 'section' TEXT NOT NULL, 'adm_date' DATETIME, 'email' TEXT NOT NULL, 'mobself' TEXT NOT NULL, 'mob_father' TEXT NOT NULL, 'mob_mother' TEXT NOT NULL, 'phy_name' TEXT NOT NULL, 'phy_email' TEXT NOT NULL, 'phy_mob' TEXT NOT NULL, 'home_address' TEXT NOT NULL, 'status' TEXT NOT NULL, 'official_selection_status' INTEGER NOT NULL, 'score_by_official' INTEGER NOT NULL, 'nomination_date' DATETIME, 'rejection_reason' TEXT NOT NULL, 'sel_status' TEXT NOT NULL, 'payment_status' TEXT NOT NULL, 'reg_id' TEXT NOT NULL, 'state_id' INTEGER NOT NULL, 'district_id' INTEGER NOT NULL, 'district_trial' TEXT NOT NULL, 'district_camp' TEXT NOT NULL, 'district_team' TEXT NOT NULL, 'dirstict_team_role' TEXT NOT NULL, 'verified' INTEGER NOT NULL, 'state_trial' TEXT NOT NULL, 'state_camp' TEXT NOT NULL, 'state_team' TEXT NOT NULL, 'state_team_role' TEXT NOT NULL, 'School_Name' TEXT NOT NULL, 'state_name' TEXT NOT NULL, 'district_name' TEXT NOT NULL)", [],
//                            function (tx, result) {
//                                log("myDB:Table created successfully");
//                            },
//                            function (error) {
//                                log("myDB:Error occurred while creating the table.");
//                            });
//                });
//                log(myDB);
            }

            $ionicPlatform.on("deviceready", function () {
                log('$ionicPlatform:deviceready');
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
                //console.log("PushNotificationsService register on start");
                //PushNotificationsService.register();
//                myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", location: 'default'});
//                myDB.transaction(function (transaction) {
//                    transaction.executeSql("CREATE TABLE IF NOT EXISTS [tornament_school_nomination] ('id' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 'tournam_id' INTEGER NOT NULL, 'school_id' INTEGER NOT NULL, 'hos_id' INTEGER NOT NULL, 'adm_no' TEXT NOT NULL, 'first_name' TEXT NOT NULL, 'last_name' TEXT NOT NULL, 'blood_group' TEXT NOT NULL, 'fa_name' TEXT NOT NULL, 'photo' TEXT NOT NULL, 'mo_name' TEXT NOT NULL, 'dob' DATETIME, 'certificate' TEXT NOT NULL, 'aadhar_number' TEXT NOT NULL, 'addre_proof' TEXT NOT NULL, 'clas' TEXT NOT NULL, 'section' TEXT NOT NULL, 'adm_date' DATETIME, 'email' TEXT NOT NULL, 'mobself' TEXT NOT NULL, 'mob_father' TEXT NOT NULL, 'mob_mother' TEXT NOT NULL, 'phy_name' TEXT NOT NULL, 'phy_email' TEXT NOT NULL, 'phy_mob' TEXT NOT NULL, 'home_address' TEXT NOT NULL, 'status' TEXT NOT NULL, 'official_selection_status' INTEGER NOT NULL, 'score_by_official' INTEGER NOT NULL, 'nomination_date' DATETIME, 'rejection_reason' TEXT NOT NULL, 'sel_status' TEXT NOT NULL, 'payment_status' TEXT NOT NULL, 'reg_id' TEXT NOT NULL, 'state_id' INTEGER NOT NULL, 'district_id' INTEGER NOT NULL, 'district_trial' TEXT NOT NULL, 'district_camp' TEXT NOT NULL, 'district_team' TEXT NOT NULL, 'dirstict_team_role' TEXT NOT NULL, 'verified' INTEGER NOT NULL, 'state_trial' TEXT NOT NULL, 'state_camp' TEXT NOT NULL, 'state_team' TEXT NOT NULL, 'state_team_role' TEXT NOT NULL, 'School_Name' TEXT NOT NULL, 'state_name' TEXT NOT NULL, 'district_name' TEXT NOT NULL)", [],
//                            function (tx, result) {
//                                log("myDB:Table created successfully");
//                            },
//                            function (error) {
//                                log("myDB:Error occurred while creating the table.");
//                            });
//                });
//                log(myDB);

            });

            // This fixes transitions for transparent background views
            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                if (toState.name.indexOf('auth.walkthrough') > -1)
                {
                    // set transitions to android to avoid weird visual effect in the walkthrough transitions
                    $timeout(function () {
                        $ionicConfig.views.transition('android');
                        $ionicConfig.views.swipeBackEnabled(false);
                        console.log("setting transition to android and disabling swipe back");
                    }, 0);
                }
            });
            $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
                if (toState.name.indexOf('app.feeds-categories') > -1)
                {
                    // Restore platform default transition. We are just hardcoding android transitions to auth views.
                    $ionicConfig.views.transition('platform');
                    // If it's ios, then enable swipe back again
                    if (ionic.Platform.isIOS())
                    {
                        $ionicConfig.views.swipeBackEnabled(true);
                    }
                    console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
                }
            });

            $ionicPlatform.on("resume", function () {
                // console.log("PushNotificationsService register on Resume");
                //  PushNotificationsService.register();
            });

        })


        .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
            $stateProvider

                    //INTRO
                    .state('auth', {
                        url: "/auth",
                        templateUrl: "views/auth/auth.html",
                        abstract: true,
                        controller: 'AuthCtrl'
                    })

                    .state('auth.walkthrough', {
                        url: '/walkthrough',
                        templateUrl: "views/auth/walkthrough.html"
                    })

                    .state('auth.login', {
                        url: '/login',
                        templateUrl: "views/auth/login.html",
                        controller: 'LoginCtrl'
                    })
                    .state('auth.logout', {
                        url: '/logout',
                        templateUrl: "views/auth/login.html",
                        controller: 'LogOutCtrl'
                    })

                    .state('auth.signup', {
                        url: '/signup',
                        templateUrl: "views/auth/signup.html",
                        controller: 'SignupCtrl'
                    })

                    .state('auth.forgot-password', {
                        url: "/forgot-password",
                        templateUrl: "views/auth/forgot-password.html",
                        controller: 'ForgotPasswordCtrl'
                    })

                    .state('app', {
                        url: "/app",
                        abstract: true,
                        templateUrl: "views/app/side-menu.html",
                        controller: 'AppCtrl'
                    })

                    //MISCELLANEOUS
                    .state('app.miscellaneous', {
                        url: "/miscellaneous",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/miscellaneous/miscellaneous.html"
                            }
                        }
                    })

                    .state('app.maps', {
                        url: "/miscellaneous/maps",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/miscellaneous/maps.html",
                                controller: 'MapsCtrl'
                            }
                        }
                    })

                    .state('app.image-picker', {
                        url: "/miscellaneous/image-picker",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/miscellaneous/image-picker.html",
                                controller: 'ImagePickerCtrl'
                            }
                        }
                    })

                    //LAYOUTS
                    .state('app.layouts', {
                        url: "/layouts",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/layouts/layouts.html"
                            }
                        }
                    })

                    .state('app.tinder-cards', {
                        url: "/layouts/tinder-cards",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/layouts/tinder-cards.html",
                                controller: 'TinderCardsCtrl'
                            }
                        }
                    })

                    .state('app.slider', {
                        url: "/layouts/slider",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/layouts/slider.html"
                            }
                        }
                    })

                    //FEEDS
                    .state('app.feeds-categories', {
                        url: "/feeds-categories",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/feeds/feeds-categories.html",
                                controller: 'FeedsCategoriesCtrl'
                            }
                        },
                        resolve: {
                            LoginValidate: function ($state) {
                                var isLogedin = localStorage.api_key;
                                if (isLogedin === null) {
                                    $state.go('auth.login');
                                    return true;
                                }
                            }
                        }
                    })
                    .state('app.hire-careiver', {
                        url: "/hire/careiver",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/feeds/hire/careiver.html",
                                controller: 'CaregiverCtrl'
                            }
                        }
                    }).state('app.hire-babysitter', {
                        url: "/hire/babysitter",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/feeds/hire/babysitter.html",
                                controller: 'HireCtrl'
                            }
                        }
                    }).state('app.hire-cleaner', {
                        url: "/hire/cleaner",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/feeds/hire/cleaner.html",
                                controller: 'HireCtrl'
                            }
                        }
                    }).state('app.hire', {
                        url: "/hire",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/feeds/hire.html",
                                controller: 'HireCtrl'
                            }
                        }
                    })
                    .state('app.team', {
                        url: "/team",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/feeds/player_list.html",
                                controller: 'TeamCtrl'
                            }
                        }
                    })
                    .state('app.todaysmaches', {
                        url: "/todaysmaches",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/feeds/todaysmaches.html",
                                controller: 'TodaysMachesCtrl'
                            }
                        }
                    })
                    .state('app.upcommingmaches', {
                        url: "/upcommingmaches",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/feeds/upcommingmaches.html",
                                controller: 'UpcommingMachesCtrl'
                            }
                        }
                    })
                    .state('app.result', {
                        url: "/result",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/feeds/result.html",
                                controller: 'ResultCtrl'
                            }
                        }
                    })
                    .state('app.pointtable', {
                        url: "/pointtable",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/feeds/pointtable.html",
                                controller: 'PointTableCtrl'
                            }
                        }
                    })
                    .state('app.attendance', {
                        url: "/attendance",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/feeds/attendance.html",
                                controller: 'AttendanceCtrl'
                            }
                        }
                    })
                    .state('app.downloads', {
                        url: "/downloads",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/feeds/downloads.html",
                                controller: 'DownloadsCtrl'
                            }
                        }
                    })
                    .state('app.category-feeds', {
                        url: "/category-feeds/:categoryId",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/feeds/category-feeds.html",
                                controller: 'CategoryFeedsCtrl'
                            }
                        }
                    })

                    .state('app.feed-entries', {
                        url: "/feed-entries/:categoryId/:sourceId",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/feeds/feed-entries.html",
                                controller: 'FeedEntriesCtrl'
                            }
                        }
                    })

                    //WORDPRESS
                    .state('app.wordpress', {
                        url: "/wordpress",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/wordpress/wordpress.html",
                                controller: 'WordpressCtrl'
                            }
                        }
                    })

                    .state('app.post', {
                        url: "/wordpress/:postId",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/wordpress/wordpress_post.html",
                                controller: 'WordpressPostCtrl'
                            }
                        },
                        resolve: {
                            post_data: function (PostService, $ionicLoading, $stateParams) {
                                $ionicLoading.show({
                                    template: 'Loading post ...'
                                });

                                var postId = $stateParams.postId;
                                return PostService.getPost(postId);
                            }
                        }
                    })

                    //OTHERS
                    .state('app.settings', {
                        url: "/settings",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/settings.html",
                                controller: 'SettingsCtrl'
                            }
                        },
                        resolve: {
                            LoginValidate: function () {
                                var isLogedin = window.localStorage.getItem("api_key");
                                if (isLogedin === null) {
                                    $state.go('auth.login');
                                    return false;
                                }
                            }
                        }
                    })

                    .state('app.forms', {
                        url: "/forms",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/forms.html"
                            }
                        }
                    })

                    .state('app.profile', {
                        url: "/profile/:profileType/:id",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/profile.html",
                                controller: 'ProfileCtrl'
                            }
                        }
                    })

                    .state('app.bookmarks', {
                        url: "/bookmarks",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/bookmarks.html",
                                controller: 'BookMarksCtrl'
                            }
                        }
                    })

                    ;

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/auth/walkthrough');
        });
function log(m) {
    console.log(m);
}
function getMinutesBetweenDates(startDate, endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    var diff = endDate.getTime() - startDate.getTime();
    return getNum((diff / 60000));
}
function getNum(val) {
    if (isNaN(val)) {
        return 0;
    }
    return val;
}