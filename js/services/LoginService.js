app.service("LoginService", [
  "$q",
  "$rootScope",
  "$http",
  "HttpProviderService",
  "StorageService",
  "$cordovaToast",
  function(
    $q,
    $rootScope,
    $http,
    HttpProviderService,
    StorageService,
    $cordovaToast
  ) {
    //Bro dont forget to make promise when you already get the API, You got this aleady
    var LoginService = this;

    LoginService.userProfile = {};
    LoginService.userProfile.isLogged = false;
    LoginService.wcList = [];
    LoginService.searchStockList = [];

    LoginService.ClearWarehouse = function() {
      console.log(LoginService.wcList.length);
      LoginService.wcList = [];
    };

    LoginService.GetWarehouse = function(user) {
      var defer = $q.defer();
      $http
        .get($rootScope.server + "get-user-access/?param=" + user)
        .then(
          function(res) {
            console.log(res.data);
            LoginService.userAccess = res.data;
            defer.resolve(res);
          },
          function(res) {
            defer.reject(res);
            console.log(res);
          }
        );
      return defer.promise;
    };

    LoginService.GetMenu = function() {};

    LoginService.PutProfile = function(
      user,
      pw,
      serverwarehouseId,
      warehousecode,
      description,
      servername,
      serverid,
      storageidentity
    ) {
      var login = { loginname: user, password: pw, syscode: "AMOA" };
      LoginService.userProfile = {}; // reset
      var defer = $q.defer();
      console.log(serverid);
      console.log(storageidentity);
      LoginService.userProfile.warehouseId = serverwarehouseId;
      LoginService.userProfile.warehouseDescription = description;
      LoginService.userProfile.warehouseCode = warehousecode;
      LoginService.userProfile.serverName = servername;
      LoginService.userProfile.serverId = serverid;
      LoginService.userProfile.storageIdentity = storageidentity;

      $http.post($rootScope.server + "LoginUser", login).then(
        function(res) {
          StorageService.setUsername(user);
          StorageService.setServerWarehouseId(serverwarehouseId);
          console.log(res.data);
          var indexOf = user.indexOf("@");
          var u = user.substring(0, indexOf);

          if (res.data.status == "SUCCESS") {
            var info = res.data.objParam1;

            //console.log("LoginSerice:"+res.data);
            $rootScope.menuList = res.data.objParam2;

            
            $rootScope.parentList = _.findWhere($rootScope.menuList, {
              stage: "2017072710333515"
            })
              ? _.findWhere($rootScope.menuList, { stage: "2017072710333515" })
                  .pages
              : [];
            $rootScope.orderpickingList = _.findWhere($rootScope.menuList, {
              stage: "2017072709422221"
            })
              ? _.findWhere($rootScope.menuList, { stage: "2017072709422221" })
                  .pages
              : [];
            $rootScope.voicepickingList = _.findWhere($rootScope.menuList, {
              stage: "636480926105328781"
            })
              ? _.findWhere($rootScope.menuList, {
                  stage: "636480926105328781"
                }).pages
              : [];
            $rootScope.ordercheckingList = _.findWhere($rootScope.menuList, {
              stage: "2017072710032812"
            })
              ? _.findWhere($rootScope.menuList, { stage: "2017072710032812" })
                  .pages
              : [];
            $rootScope.inquiryMenuList = _.findWhere($rootScope.menuList, {
              stage: "2017080110463913"
            })
              ? _.findWhere($rootScope.menuList, { stage: "2017080110463913" })
                  .pages
              : [];
            $rootScope.locationpickingList = _.findWhere($rootScope.menuList, {
              stage: "2017081411361242"
            })
              ? _.findWhere($rootScope.menuList, { stage: "2017081411361242" })
                  .pages
              : [];
            $rootScope.wavepickingList = _.findWhere($rootScope.menuList, {
              stage: "2017081611284586"
            })
              ? _.findWhere($rootScope.menuList, { stage: "2017081611284586" })
                  .pages
              : [];
            $rootScope.itempickingList = _.findWhere($rootScope.menuList, {
              stage: "636385896124797119"
            })
              ? _.findWhere($rootScope.menuList, {
                  stage: "636385896124797119"
                }).pages
              : [];
            $rootScope.vpLocationlist = _.findWhere($rootScope.menuList, {
              stage: "636480948536392146"
            })
              ? _.findWhere($rootScope.menuList, {
                  stage: "636480948536392146"
                }).pages
              : [];

              $rootScope.stagingList = _.findWhere($rootScope.menuList, {
                stage: "637481216950697984"
              })
                ? _.findWhere($rootScope.menuList, { stage: "637481216950697984" })
                    .pages
                : [];

            $rootScope.orderreleasingList = _.findWhere($rootScope.menuList, {
                stage: "636877125490025276"
              })
                ? _.findWhere($rootScope.menuList, { stage: "636877125490025276" })
                    .pages
                : [];
                
                  $rootScope.receiveList = _.findWhere($rootScope.menuList, {
                    stage: "637311262925995106"
                  })
                    ? _.findWhere($rootScope.menuList, { stage: "637311262925995106" })
                        .pages
                    : [];
                    $rootScope.myzonepickingList = _.findWhere($rootScope.menuList, {
                      stage: "637474456413227577"
                    })
                      ? _.findWhere($rootScope.menuList, {
                          stage: "637474456413227577"
                        }).pages
                      : [];

                      $rootScope.scanpicking = _.findWhere($rootScope.menuList, {
                        stage: "637469366253816551"
                      })
                        ? _.findWhere($rootScope.menuList, { stage: "637469366253816551" })
                            .pages
                        : [];

                        $rootScope.scanstaging = _.findWhere($rootScope.menuList, {
                          stage: "637483036831001002"
                        })
                          ? _.findWhere($rootScope.menuList, { stage: "637483036831001002" })
                              .pages
                          : [];

                          $rootScope.scanreleasing = _.findWhere($rootScope.menuList, {
                            stage: "637483037915871938"
                          })
                            ? _.findWhere($rootScope.menuList, { stage: "637483037915871938" })
                                .pages
                            : [];

                            $rootScope.validationparent = _.findWhere($rootScope.menuList, {
                              stage: "637479429475823432"
                            })
                              ? _.findWhere($rootScope.menuList, { stage: "637479429475823432" })
                                  .pages
                              : [];

                              $rootScope.scanparent = _.findWhere($rootScope.menuList, {
                                stage: "637483781787139216"
                              })
                                ? _.findWhere($rootScope.menuList, { stage: "637483781787139216" })
                                    .pages
                                : [];

                                
                                $rootScope.admin = _.findWhere($rootScope.menuList, {
                                  stage: "637488383903310316"
                                })
                                  ? _.findWhere($rootScope.menuList, {
                                      stage: "637488383903310316"
                                    }).pages
                                  : [];

                                  

                                  $rootScope.zonelist = _.findWhere($rootScope.menuList, {
                                    stage: "637488397445030644"
                                  })
                                    ? _.findWhere($rootScope.menuList, {
                                        stage: "637488397445030644"
                                      }).pages
                                    :[];


                                    $rootScope.loadplanpick = _.findWhere($rootScope.menuList, {
                                      stage: "637497869413760487"
                                    })
                                      ? _.findWhere($rootScope.menuList, {
                                          stage: "637497869413760487"
                                        }).pages
                                      :[];

                                   


                                    $rootScope.viewreceivinglist = _.findWhere($rootScope.menuList, {
                                      stage: "637492662542820597"
                                    })
                                      ? _.findWhere($rootScope.menuList, {
                                          stage: "637492662542820597"
                                        }).pages
                                      :[];
                                      
                                      for (var i = 0; i < $rootScope.receiveList.length; i++) {
            
                                        if($rootScope.receiveList[i].stage == "637492662542820597"){
                                            
                                          $rootScope.receiveList.splice(i,1);
                                          break;
                                        }else{
                                            
                                        }
                                      
                                      
                                    } 
      
    
  

                              
            LoginService.userProfile.isLogged = true;
            LoginService.wcList = LoginService.userAccess.list;
            console.log(LoginService.wcList);
            LoginService.userProfile.email = info.emailaddress;
            LoginService.userProfile.firstname = info.firstname;
            LoginService.userProfile.lastname = info.lastname;
            LoginService.userProfile.alias = info.emailAlias;
            LoginService.userProfile.userrole = info.userrole;
            LoginService.userProfile.emailAlias = info.emailaddress.split(
              "@"
            )[0];
            
            LoginService.userProfile.userId = info.userId;
            LoginService.userProfile.emplId = info.emplId;
            //$http.defaults.headers.common['SERVERID'] = LoginService.userProfile.s; // FOR Header of server
            LoginService.Token =
              "MTMwMzgzMDo4ODkyZDgyNS1jZTQyLTQ0OGEtOTNlOS04ZTI1MWI4YWU3ZDd0c2Fm";
            HttpProviderService.SetProviders(
              LoginService.Token,
              LoginService.userProfile.warehouseId
            );
            $rootScope.userid = LoginService.userProfile.user;
            console.log(LoginService.userProfile);
            LoginService.GetSearchList();
          } else {
            LoginService.userProfile.isLogged = false;
          }
          defer.resolve(res);
          console.log(LoginService.userProfile); //print userprofile
        },
        function(err) {
          defer.reject(err);
        }
      );
      return defer.promise;
    };

    LoginService.LogOut = function() {
      /*Logic RN
                  username find = clear login userprofile
                  Clear WC list*/
      LoginService.userProfile = {};
      console.log(LoginService.wcList.length);
      LoginService.wcList = [];
      console.log(LoginService.wcList);
      LoginService.userProfile.isLogged = false;
    };

    LoginService.getProfile = function() {
      return LoginService.userProfile;
    };

    LoginService.changeWarehouse = function(wid) {
      LoginService.userProfile.warehouseId = wid;
      var war = _.findWhere(LoginService.wcList, { serverwarehouseId: wid });
      LoginService.userProfile.warehouseCode = war.warehousecode;
      LoginService.userProfile.warehouseDescription = war.description;
      LoginService.userProfile.serverName = war.servername;
      LoginService.userProfile.serverId = war.serverId;
      LoginService.userProfile.storageIdentity = war.storageidentity;

      StorageService.setServerUrl(war.api);
      $rootScope.setServer(war.api);

      StorageService.setServerWarehouseId(wid);
      HttpProviderService.SetWarehouseProvider(wid);

      LoginService.getDashboard(LoginService.userProfile.warehouseCode);
      LoginService.GetSearchList();

      console.log(LoginService.userProfile);
      // return LoginService.userProfile;
    };

    // LoginService.changeServer = function (sr) {
    //     LoginService.userProfile.s = sr;
    //     LoginService.userProfile.s = _.findWhere(LoginService.srList, { ServerName: sr }).ServerName;
    //     LoginService.getDashboard(LoginService.userProfile.w);
    //     HttpProviderService.SetServerProvider(sr);//set server pin httpprovider
    //     return LoginService.userProfile;
    // }

    LoginService.getDashboard = function(warCode) {
      var defer = $q.defer();
      $http
        .get($rootScope.url + "tm-get-dashboard-v2", {
          params: { wc: warCode }
        })
        .then(
          function(res) {
            console.log(res);
            LoginService.DashBoardData = res.data;
            defer.resolve(res);
          },
          function(res) {
            console.log(res);
            defer.reject(res);
          }
        );
      return defer.promise;
    };

    LoginService.getDashboardTrend = function(warCode, transName) {
      var defer = $q.defer();
      $http
        .get($rootScope.url + "tm-get-trans-trend", {
          params: { wc: warCode, transName: transName }
        })
        .then(
          function(res) {
            console.log(res);
            LoginService.DashBoardDataTrend = res.data;
            defer.resolve(res);
          },
          function(res) {
            console.log(res);
            defer.reject(res);
          }
        );
      return defer.promise;
    };

    LoginService.GetSearchList = function() {
      var srv = StorageService.getServer();
      console.log("lc srv" + srv);
      StorageService.delSearchList();
      console.log("deleted search");
      console.log(LoginService.userProfile.serverId);
      StorageService.setServer(LoginService.userProfile.serverId);
      console.log("Current srv" + StorageService.getServer());
      LoginService.SetSearchList();
    };

    LoginService.SetSearchList = function() {
      var defer = $q.defer();
      $http
        .get(
          $rootScope.url +
            "tm-get-stock-search-list?wc=" +
            LoginService.userProfile.warehouseCode
        )
        .then(
          function(res) {
            console.log("set new list");
            LoginService.searchStockList = res.data;
            StorageService.setSearchlist(LoginService.searchStockList);
            defer.resolve(res);
            $cordovaToast.show(
              "Successfully updated search list",
              "short",
              "bottom"
            );
          },
          function(res) {
            defer.reject(res);
            $cordovaToast.show(
              "Cannot get searchlist. Please try again.",
              "short",
              "bottom"
            );
          }
        );
      return defer.promise;
    };

    LoginService.ResetSearchList = function() {
      StorageService.delSearchList();
      LoginService.GetSearchList();
    };

    LoginService.TestServer = function(param) {
      var defer = $q.defer();
      $http.get(param + "/api/addon/CheckConenction").then(
        function(res) {
          defer.resolve(res);
        },
        function(res) {
          defer.reject(res);
        }
      );
      return defer.promise;
    };

    /*
                             LoginService.SetItemMaster = function(){
                                 var defer = $q.defer();
                                 $http.get($rootScope.url + 'tm-get-item-master')
                                     .then(function (res) {
                                     LoginService.ItemList = res.data;
                                     StorageService.setItems(LoginService.ItemList);
                                     LoginService.ItemList = _.where(StorageService.getItems,{'StorageIdentity' : LoginService.userProfile.storageIdentity});   
                                     defer.resolve(res);
                                 }, function (res) {
                                     defer.reject(res);
                                 });
                                 return defer.promise;
            
                             }*/

    return LoginService;
  }
]);
