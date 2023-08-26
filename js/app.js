// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular
  .module("starter", [
    "ionic",
    "ngCordova",
    "ngStorage",
    "ionic-datepicker",
    "highcharts-ng",
  ])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .config(function($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {
      "Content-Type": "application/json"
    };
    $httpProvider.defaults.headers.put = {
      "Content-Type": "application/json"
    };
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.get = {};

    $httpProvider.interceptors.push(function($q, HttpProviderService) {
      return {
        request: function(config) {
          // config.headers['Token'] = HttpProviderService.Token;
          config.headers["Token"] =
            "MTMwMzgzMDo4ODkyZDgyNS1jZTQyLTQ0OGEtOTNlOS04ZTI1MWI4YWU3ZDd0c2Fm";
          config.headers["serverwarehouseId"] =
            HttpProviderService.serverwarehouseId;
          return config;
        }
      };
    });
  })
  .config(function(ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      titleLabel: "Select a Date",
      setLabel: "Set",
      todayLabel: "Today",
      closeLabel: "Close",
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
      ],
      templateType: "popup",
      showTodayButton: true,
      dateFormat: "MM/dd/yyyy",
      closeOnSelect: false,
      disableWeekdays: [],
      selectMode: "day"
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })
  .run(function($rootScope) {
    //Local
    //$rootScope.url = 'http://localhost:59293/api/picklist/';
    //$rootScope.server = 'http://localhost:59293/api/';
    //$rootScope.webmrs = 'http://localhost:59293/api/picklist/';
    //AquilaHo
    $rootScope.validServer = false;
    // $rootScope.server = '';
    //$rootScope.url = '';
    // $rootScope.server = 'http://aquila.fastgroup.biz/api/';

    //Live default
   // $rootScope.url = "http://coreapi.fastlogistics.com.ph/api/picklist/";
   //$rootScope.server = "http://coreapi.fastlogistics.com.ph/api/";
   //$rootScope.added = "http://apps.fastlogistics.com.ph/amoaapi/api/picklist/";
   //$rootScope.webmrs = "http://apps.fastlogistics.com.ph/mrscore/api/AMOA/";
   
   //Local host new API
   
//$rootScope.url = "http://localhost:53208/api/Main/"; $rootScope.server = "http://localhost:53208/api/Access/";



   //Live new API

    

$rootScope.url = "https://apps.fastlogistics.com.ph/amoaapi/api/Main/"; $rootScope.server = "https://apps.fastlogistics.com.ph/amoaapi/api/Access/";


  
    $rootScope.zone = "";

    /* back confirm */
    $rootScope.menuList = [];
    $rootScope.parentList = [];
    $rootScope.orderpickingList = [];
    $rootScope.ordercheckingList = [];
    $rootScope.locationpickingList = [];
    $rootScope.stagingList = [];
    $rootScope.orderreleasingList = [];
    $rootScope.receiveList = [];
    $rootScope.receiveList = [];

    $rootScope.scanparent = [];
    $rootScope.scanpicking = [];
    $rootScope.scanstaging = [];
    $rootScope.scanreleasing = [];
    
    $rootScope.validationparent = [];

    $rootScope.admin  = [];
    
    $rootScope.zonelist = [];

    $rootScope.viewreceivinglist = [];
    $rootScope.loadplanpick = [];
    
    $rootScope.hasScanner = false;

    $rootScope.setServer = function(param) {
      // $rootScope.server = param + '/api/';
      // $rootScope.url = param + '/api/picklist/';
    };

    $rootScope.setValidServer = function(param) {
      {
        $rootScope.validServer = param;
      }
    };
  })

  .run(function($ionicPlatform, $ionicPopup, $ionicHistory, $state) {
    $ionicPlatform.registerBackButtonAction(function(e) {
      e.preventDefault();

      function showConfirm() {
        var confirmPopup = $ionicPopup.show({
          title: "Exit Amoa?",
          template: "Are you sure you want to exit Amoa?",
          buttons: [
            {
              text: "Cancel",
              type: "button-positive button-outline"
            },
            {
              text: "Ok",
              type: "button-positive",
              onTap: function() {
                ionic.Platform.exitApp();
              }
            }
          ]
        });
      }

      // Is there a page to go back to?
      if ($ionicHistory.backView()) {
        // Go back in history
        $ionicHistory.backView().go();
      } else if ($state.current.name == "login") {
        showConfirm();
      } else {
        // This is the last page: Show confirmation popup
        showConfirm();
      }

      return false;
    }, 101);
  });
