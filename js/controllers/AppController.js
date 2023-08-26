app.controller("AppCtrl", [
  "$scope",
  "LoginService",
  "$rootScope",
  "$state",
  "$ionicHistory",
  function($scope, LoginService, $rootScope, $state, $ionicHistory) {
    $scope.init = function() {
      $scope.isLogged = false;
      $scope.orderPicking = false;
      $scope.orderChecking = false;
      $scope.inquiryMenu = false;
    };
    $scope.$on("isLoggedChecker", function(event, res) {
      $scope.isLogged = res;
      console.log("isLogged " + $scope.isLogged);
    });

    $scope.checkParentAccess = function(menucode) {
      var parentMenuList = _.findWhere($rootScope.menuList, {
        stage: "2017072710333515"
      }).pages;
      var ans = _.findWhere(parentMenuList, { stage: menucode });
      
      if (ans) {
        return true;
      } else {
        return false;
      }
    };

    $scope.redirectMe = function(param, querystring = "") {
      if (param == "2017072709431691") {
        $state.go("app.2017072709431691"); // picklist
      } else if (param == "home") {
        $state.go("app.home");
      } else if (param == "2017072709440502") {
        $state.go("app.2017072709440502"); // zone
      } else if (param == "2017072709444923") {
        $state.go("app.2017072709444923"); // location
      } else if (param == "2017072710003665") {
        $state.go("app.2017072710003665"); // my piked item (view pick)
      } else if (param == "2017072709550338") {
        $state.go("app.2017072709550338"); //Item COde ( Item List)
      } else if (param == "2017072709453400") {
        $state.go("app.2017072709453400"); // issuance rquest
      } else if (param == "2017072710121074") {
        $state.go("app.2017072710121074"); //stock transfer
      } else if (param == "2017072710084086") {
        $state.go("app.2017072710084086"); //item master (Item Maintenane)
      } else if (param == "2017072710191419") {
        $state.go("app.2017072710191419"); //location inquiry ( batch inventory)
      } else if (param == "2017080103000928") {
        $state.go("app.2017080103000928"); //batch inquiry ( batch inventory)
      } else if (param == "2017080110594401") {
        $state.go("app.2017080110594401"); //Batch labeling (rr view)
      }else if (param == "637472460995972752") {
        $state.go("app.637472460995972752"); //Batch labeling w/ unit (rr view)
      } else if (param == "2017072710071521") {
        $state.go("app.2017072710071521"); //stock replenishemnt
      } else if (param == "636457478960510000") {
        $state.go("app.636457478960510000"); //Cycle count
      } else if (param == "2017072710045099") {
        $state.go("app.2017072710045099"); //checker picklist
      } else if (param == "2017072710052679") {
        $state.go("app.2017072710052679"); //checker issuance
      } else if (param == "2017072710060339") {
        $state.go("app.2017072710060339"); // checker view pick
      } else if (param == "2017080202394075") {
        $state.go("app.2017080202394075"); // item barcode update
      } else if (param == "2017081411380794") {
        $state.go("app.2017081411380794"); // location picking picklist
      } else if (param == "2017081411391246") {
        $state.go("app.2017081411391246"); // location ir picklist
      } else if (param == "2017081411402009") {
        $state.go("app.2017081411402009"); // location zone picklist
      } else if (param == "2017081611352024") {
        $state.go("app.2017081611352024"); // Wave loc picklist
      } else if (param == "2017081611344384") {
        $state.go("app.2017081611344384"); // Wave item picklist
      } else if (param == "636385912977506719") {
        $state.go("app.636385912977506719"); // Item picklist
      } else if (param == "636385913371875412") {
        $state.go("app.636385913371875412"); // Item IR
      } else if (param == "636385913675607946") {
        $state.go("app.636385913675607946"); // Item Zone
      } else if (param == "636396878334420000") {
        $state.go("app.636396878334420000"); // Put away
      }else if (param == "637178057385481936") {
        $state.go("app.637178057385481936"); // Put away2
      }else if (param == "637188308371552377") {
        $state.go("app.637188308371552377"); // Put away Confirmation
      }else if (param == "636464406381329700") {
        $state.go("app.636464406381329700"); //Cycle count
      } else if (param == "636480928199957093") {
        $state.go("app.636480928199957093"); //Vp loc Pick list
      } else if (param == "636480928580666167") {
        $state.go("app.636480928580666167"); //Vp loc Issuance list
      } else if (param == "636480929393162472") {
        $state.go("app.636480929393162472"); //Vp loc zone list
      } else if(param =="636835634628185842"){
        $state.go("app.636835634628185842");//order release
      } else if(param == "637241966375904213"){
        $state.go("app.637241966375904213");//GEO FENCING AND TRACKING EXAMPLE
      }else if(param == "637278022204291271"){
        $state.go("app.637278022204291271");//Random Cycle Count
      }/*else if(param == "637311262925995106"){
        $state.go("app.637311262925995106");//Receiving
      }*/else if(param == "637316309364997277"){
        $state.go("app.637316309364997277");//Receiving List
      }else if(param == "637316308924523191"){
        $state.go("app.637316308924523191");//Create Receiving
      }else if(param == "637372448981538963"){
        $state.go("app.637372448981538963");//Stock Replenishment Confirmation
      }else if(param == "637462976703659162"){
        $state.go("app.637462976703659162");//stock transfer auto
      }else if(param == "637474458499882116"){
        $state.go("app.637474458499882116");//my zone Item
      }else if(param == "637474459353671305"){
        $state.go("app.637474459353671305");//my zone Location
      }else if(param == "637474456413227577"){
        $state.go("app.637474456413227577");//by zone picking
      }else if(param == "637478994066410066"){
        $state.go("app.637478994066410066");//by customer picking
      }else if(param == "637481161681677075"){
        $state.go("app.637481161681677075");//by ir staging
      }else if(param == "637481162215917880"){
        $state.go("app.637481162215917880");//by location staging
      }else if(param == "637514030934773920"){
        $state.go("app.637514030934773920");//by confirm staging to releasing
      }else if(param == "637540908821993060"){
        $state.go("app.637540908821993060");//by add to staging
      }else if(param == "637481254972213314"){
        $state.go("app.637481254972213314");//by ir releasing
      }else if(param == "637481255445146222"){
        $state.go("app.637481255445146222");//by loc releasing
      }

      else if(param == "637488385161864835"){
        $state.go("app.637488385161864835");//admin Zone Access
      }


      else if(param == "637492677466440923"){
        $state.go("app.637492677466440923");//Receiving batch list
      }else if(param == "637492666324933840"){
        $state.go("app.637492666324933840");//Receiving User list
      }else if(param == "637492679440369323"){
        $state.go("app.637492679440369323");//Receiving Item list
      }

      else if(param == "637650602361975612"){
        $state.go("app.637650602361975612");//Stock Replenishment Confirmation
      }



      

    };

    $scope.toggleDropdown = function(param) {
      console.log("toggleDropdown"+ param);
      $scope.dropdown = $scope.dropdown == param ? "" : param;
    };

    $scope.toggleSubDropdown = function(param) {
      console.log("toggleSubDropdown"+ param);
      $scope.subDropdown = $scope.subDropdown == param ? "" : param;
    };

    $scope.LogOut = function() {
      LoginService.LogOut();
      $scope.loginData = LoginService.getProfile();
      $rootScope.$broadcast("isLoggedChecker", $scope.loginData.isLogged);
      $ionicHistory.clearHistory();
      $state.go("app.login");
    };

    $scope.init();
  }
]);
