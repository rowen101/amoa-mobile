app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state("app", {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: "AppCtrl"
    })

    .state("app.home", {
      url: "/home",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/home.html",
          controller: "HomeCtrl"
        }
      }
    })

    .state("app.login", {
      url: "/login",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/login.html",
          controller: "LoginCtrl"
        }
      }
    })







/********** GEO FENCING AND TRACKING SAMPLE ************/

.state("app.637241966375904213", {
  url: "/geo",
  cache: false,
  views: {
    menuContent: {
      templateUrl: "templates/geo.html",
      controller: "GeoTrackingController"
    }
  }
})

/********** RECEIVING MODULE ************/






.state("app.637316309364997277", {
  url: "/receivinglist",
  cache: false,
  views: {
    menuContent: {
      templateUrl: "templates/receiving/receiving.html",
      controller: "ReceivingController"
    }
  }
})



.state("app.637316308924523191", {
  url: "/receivingcrte",
  cache: false,
  views: {
    menuContent: {
      templateUrl: "templates/receiving/createreceiving.html",
      controller: "CreateReceivingCtrl"
    }
  }
})



//View Receiving
//RRNumb
.state("app.637492666324933840", {
  url: "/view/rr",
  cache: false,
  views: {
    menuContent: {
      templateUrl: "templates/receiving/View/rrnumb.html",
      controller: "ViewRcvRRnumbListCtrl"
    }
  }
})


//Batch
.state("app.637492677466440923", {
  url: "/view/batch",
  cache: false,
  views: {
    menuContent: {
      templateUrl: "templates/receiving/View/batch.html",
      controller: "ViewRcvBatchListCtrl"
    }
  }
})

/* //Checker
.state("app.637492666324933840", {
  url: "/view/checker",
  cache: false,
  views: {
    menuContent: {
      templateUrl: "templates/receiving/View/checker.html",
      controller: "ViewRcvCheckerListCtrl"
    }
  }
})

.state("app.checkerbatch", {
  url: "/view/checker/batch",
  cache: false,
  views: {
    menuContent: {
      templateUrl: "templates/receiving/View/batch.html",
      controller: "ViewRcvCheckerBatchListCtrl"
    }
  }
})*/

//Item
.state("app.637492679440369323", {
  url: "/view/item",
  cache: false,
  views: {
    menuContent: {
      templateUrl: "templates/receiving/View/item.html",
      controller: "ViewRcvItemListCtrl"
    }
  }
})

.state("app.itembatch", {
  url: "/view/item/batch",
  cache: false,
  views: {
    menuContent: {
      templateUrl: "templates/receiving/View/batchperitem.html",
      controller: "ViewRcvItemBatchListCtrl"
    }
  }
})





/********** Random Cycle Count ************/

.state("app.637278022204291271", {
  url: "/rcyclecount",
  cache: false,
  views: {
    menuContent: {
      templateUrl: "templates/rcyclecount.html",
      controller: "RCycleCountCtrl"
    }
  }
})


.state("app.rcyclecountloc", {
  url: "/rcyclecountloc",
  cache: false,
  views: {
    menuContent: {
      templateUrl: "templates/rcyclecountloc.html",
      controller: "RCycleCountLocCtrl"
    }
  }
})


    /********** Inquiry **********/
    .state("app.2017072710084086", {
      url: "/iteminquiry",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/inquiry/iteminquiry.html",
          controller: "ItemInquiryCtrl"
        }
      }
    })

    .state("app.iteminquiryinfo", {
      url: "/iteminquiry/info",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/inquiry/iteminventoryinfo.html",
          controller: "ItemInfoCtrl"
        }
      }
    })

    .state("app.itembatchinventory", {
      url: "/iteminquiry/itembatchinventory",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/inquiry/itembatchinventory.html",
          controller: "ItemInvCtrl"
        }
      }
    })

    .state("app.2017072710191419", {
      cache: false,
      url: "/locationinquiry",
      views: {
        menuContent: {
          templateUrl: "templates/inquiry/locationinquiry.html", //location
          controller: "LocationInquiryCtrl"
        }
      }
    })

    .state("app.locationinquiryinfo", {
      url: "/locationinquiry/info",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/inquiry/locationinquiryinfo.html",
          controller: "LocInqInfoCtrl"
        }
      }
    })

    .state("app.locationbatchinventory", {
      url: "/locationinquiry/locbatchinventory",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/inquiry/locationbatchinventory.html",
          controller: "LocInqBatchInvCtrl"
        }
      }
    })

    .state("app.2017080103000928", {
      cache: false,
      url: "/batchinquiry",
      views: {
        menuContent: {
          templateUrl: "templates/inquiry/batchinquiry.html", //location
          controller: "BatchInquiryCtrl"
        }
      }
    })

    /********** Order Picking **********/

    .state("app.2017072710003665", {
      url: "/viewpicked",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/orderpicking/viewpicked.html",
          controller: "ViewPickedCtrl"
        }
      }
    })

    .state("app.viewpalletelist", {
      url: "/viewpicked/viewpalletelist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/orderpicking/viewpalletelist.html",
          controller: "ViewPalleteCtrl"
        }
      }
    })

    /********** Staging **********/
    .state("app.637540908821993060", {
      url: "/addtostagingIR",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/staging/AddToStaging/ListIr.html",
          controller: "IRListCtrl"
        }
      }
    })

    .state("app.addtostagingloc", {
      url: "/addtostagingIR/addtostagingloc",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/staging/AddToStaging/ListLoc.html",
          controller: "LocListCtrl"
        }
      }
    })


    // Feb 05,2021
    .state("app.637481161681677075", {
      url: "/stagingIR",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/staging/stagingIR.html",
          controller: "IRListCtrl"
        }
      }
    })



    .state("app.stagingloc", {
      url: "/stagingIR/locIR",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/staging/stagingIRtoLoc.html",
          controller: "StagingIRtoLocCtrl"
        }
      }
    })

    .state("app.637481162215917880", {
      url: "/stagingLoc",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/staging/stagingLoc.html",
          controller: "StagingLocCtrl"
        }
      }
    })

    .state("app.stagingIR", {
      url: "/stagingIR/IR",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/staging/stagingLoctoIR.html",
          controller: "StagingLoctoIRCtrl"
        }
      }
    })

    .state("app.637514030934773920", {
      url: "/stagingConfirm",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/staging/Confirmation/StoRconfirmation.html",
          controller: "StoRConfirmCtrl"
        }
      }
    })






    /********** Order Checking **********/

    .state("app.2017072710045099", {
      url: "/checkerpicklist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/orderchecking/checkerpicklist.html",
          controller: "CheckerPicklistCtrl"
        }
      }
    })

    .state("app.checkerpalleteitemlist", {
      url: "/checkerpicklist/checkerpalleteitemlist",
      cache: false, // fixed the problem of $scope.$on(Gire init() and calling it at the end of the fucntion)
      views: {
        menuContent: {
          templateUrl: "templates/orderchecking/checkerpalleteitemlist.html",
          controller: "CheckerPalleteItemListCtrl"
        }
      }
    })

    .state("app.checkerpalletelist", {
      url: "/checkerpicklist/checkerpalleteitemlist/checkerpalletelist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/orderchecking/checkerpalletelist.html",
          controller: "CheckerPalletelistCtrl"
        }
      }
    })

    .state("app.2017072710052679", {
      url: "/checkerissuancelist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/orderchecking/checkerissuancelist.html",
          controller: "CheckerIssuanceListCtrl"
        }
      }
    })

    .state("app.checkerissuanceitemlist", {
      url: "/checkerissuancelist/checkerissuanceitemlist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/orderchecking/checkerissuanceitemlist.html",
          controller: "CheckerIssuanceItemListCtrl"
        }
      }
    })

    .state("app.checkerissuancepicklist", {
      url: "/checkerissuancelist/checkerissuancepicklist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/orderchecking/checkerissuancepicklist.html",
          controller: "CheckerIssuancePickListCtrl"
        }
      }
    })

    .state("app.checkerissuancepalletelist", {
      url:
        "/checkerissuancelist/checkerissuancepicklist/checkerissuancepalletelist",
      cache: false,
      views: {
        menuContent: {
          templateUrl:
            "templates/orderchecking/checkerissuancepalletelist.html",
          controller: "CheckerIssuancePalleteListCtrl"
        }
      }
    })

    .state("app.2017072710060339", {
      url: "/checkerviewpicked",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/orderchecking/checkerview.html",
          controller: "CheckerViewPickedCtrl"
        }
      }
    })

    .state("app.checkerviewpalletelist", {
      url: "/checkerviewpicked/viewpalletelist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/orderchecking/checkerviewpallete.html",
          controller: "CheckerViewPalleteCtrl"
        }
      }
    })

/********** Releasing **********/
    // Feb 05,2021
    
    .state("app.637481254972213314", {
      url: "/releasing/ir",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/releasing/releasingIR.html",
          controller: "ReIRListCtrl"
        }
      }
    })

    .state("app.releasingitem", {
      url: "/releasing/ir/releasingitem",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/releasing/releasingItem.html",
          controller: "ReItemCtrl"
        }
      }
    })


    .state("app.637481255445146222", {
      url: "/releasing/loc",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/releasing/releasingLoc.html",
          controller: "ReLocListCtrl"
        }
      }
    })

    .state("app.releaseIR", {
      url: "/releasing/loc/LocIR",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/releasing/releasingIR.html",
          controller: "ReLoctoIRListCtrl"
        }
      }
    })

    .state("app.releaseLoctoItem", {
      url: "/releasing/loc/LocIR/LocItem",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/releasing/releasingItem.html",
          controller: "ReItemCtrl"
        }
      }
    })



    


    // past
    .state("app.636835634628185842", {
      url: "/order/releasing",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/releasing/orderpicklist.html",
          controller: "ReleasingPicklistCtrl"
        }
      }
    })

    .state("app.orderreleasepalleteitemlist", {
      url: "/releasing/orderreleasepalleteitemlist",
      cache: false, // fixed the problem of $scope.$on(Gire init() and calling it at the end of the fucntion)
      views: {
        menuContent: {
          templateUrl: "templates/releasing/orderreleasepalleteitemlist.html",
          controller: "OrderReleasePalleteItemListCtrl"
        }
      }
    })

    .state("app.orderreleasepalletelist", {
      url: "/releasing/orderreleasepalleteitemlist/orderreleasepalletelist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/releasing/orderpalletelist.html",
          controller: "ReleasePalletelistCtrl"
        }
      }
    })

    /********** Main Menu **********/

    .state("app.2017072710121074", {
      url: "/stocktransfer",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/stocktransfer.html",
          controller: "StockTransferCtrl"
        }
      }
    })

    .state("app.637462976703659162", {
      url: "/stocktransferauto",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/stocktransferauto.html",
          controller: "StockTransferAutoCtrl"
        }
      }
    })

    .state("app.637372448981538963", {
      url: "/stocktransferconfirmation",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/stocktransferconfirmation.html",
          controller: "StockTransferConfirmationCtrl"
        }
      }
    })


    .state("app.2017080110594401", {
      url: "/rrview",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/rrview.html",
          controller: "RRViewCtrl"
        }
      }
    })


    .state("app.637472460995972752", {
      url: "/rrviewunit",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/rrviewunit.html",
          controller: "RRViewWithUnitCtrl"
        }
      }
    })


    .state("app.createbatch", {
      url: "/createbatch",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/createbatch.html",
          controller: "CreateBatchCtrl"
        }
      }
    })

    .state("app.createbatchunit", {
      url: "/createbatchunit",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/createbatchunit.html",
          controller: "CreateBatchunitCtrl"
        }
      }
    })

    .state("app.2017072710071521", {
      url: "/stockreplenishmentlist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/stockreplenishmentlist.html",
          controller: "StockReplenishmentListCtrl"
        }
      }
    })

    .state("app.stockreplenishment", {
      url: "/stockreplenishment",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/stockreplenishment.html",
          controller: "StockReplenishmentCtrl"
        }
      }
    })

    .state("app.637650602361975612", {
      url: "/stockreplenconfirm",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/stockreplenishconfirmation.html",
          controller: "StockReplenCfrmCtrl"
        }
      }
    })
    

    .state("app.2017080202394075", {
      url: "/itembarcodeupdate",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/itemmaintenance.html",
          controller: "ItemCtrl"
        }
      }
    })

    /********** Location Picking **********/

    .state("app.2017081411380794", {
      url: "/locationpicklist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/locpicking/locpicklist.html",
          controller: "LocPPickListCtrl"
        }
      }
    })

    .state("app.locationpicklistitem", {
      url: "/locationpicklist/picking",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/locpicking/locpickpickinglist.html",
          controller: "LocationPickPickingCtrl"
        }
      }
    })
    .state("app.2017081411391246", {
      url: "/locationissuancerequest",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/locpicking/locissuance.html",
          controller: "LocPickIRCtrl"
        }
      }
    })

    .state("app.locissuacepicking", {
      url: "/locationissuancerequest/picking",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/locpicking/locissuancepicking.html",
          controller: "LocPickIRPickingCtrl"
        }
      }
    })

    .state("app.2017081411402009", {
      url: "/locationzonelist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/locpicking/loczonelist.html",
          controller: "LocPickZoneCtrl"
        }
      }
    })

    .state("app.637474456413227577", {
      url: "/locationzonelist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/locpicking/loczonelist.html",
          controller: "LocPickZoneCtrl"
        }
      }
    })


    .state("app.myzonelocpicklist", {
      url: "/locationzonelist/myzonelocpicklist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/myzonepick/myzonelocpicklist.html",
          controller: "LocPickMyZoneLocListCtrl"
        }
      }
    })

    .state("app.myzonelocpickinglist", {
      url: "/locationzonelist/myzonelocpicklist/myzonepicklocpicking",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/myzonepick/myzonepicklocpicking.html",
          controller: "MyZoneLocPickCtrl"
        }
      }
    })


    .state("app.loczonepicking", {
      url: "/locationzonepicking",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/locpicking/loczonepicking.html",
          controller: "LocPickZonePickingCtrl"
        }
      }
    })

    .state("app.2017081611344384", {
      url: "/wavepickingitem",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/wavepicking/wavepickitem.html",
          controller: "WaveItemListCtrl"
        }
      }
    })

    .state("app.waveitempicking", {
      url: "/wavepickingitem/picking",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/wavepicking/wavepickitempicking.html",
          controller: "WaveItemPickingCtrl"
        }
      }
    })

    .state("app.2017081611352024", {
      url: "/wavepickingloc",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/wavepicking/wavepickloc.html",
          controller: "WaveLocListCtrl"
        }
      }
    })

    .state("app.wavelocationpicking", {
      url: "/wavepickingloc/picking",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/wavepicking/wavepicklocpicking.html",
          controller: "WavLocPickingCtrl"
        }
      }
    })

    // item picking

    .state("app.636385912977506719", {
      url: "/itempicklist",
      cache: false, // fixed the problem of $scope.$on(Gire init() and calling it at the end of the fucntion)
      views: {
        menuContent: {
          templateUrl: "templates/itempicking/itempickpicklist.html",
          controller: "ItemPickListCtrl"
        }
      }
    })

    .state("app.itempickitemlist", {
      url: "/itempicklist/items",
      cache: false, // fixed the problem of $scope.$on(Gire init() and calling it at the end of the fucntion)
      views: {
        menuContent: {
          templateUrl: "templates/itempicking/itempickpalleteitemlist.html",
          controller: "ItemPickPalleteItemListCtrl"
        }
      }
    })

    .state("app.itempickitempalletelist", {
      url: "/itempicklist/items/picking",
      cache: false, // fixed the problem of $scope.$on(Gire init() and calling it at the end of the fucntion)
      views: {
        menuContent: {
          templateUrl: "templates/itempicking/itempickpalletelist.html",
          controller: "ItemPickPalleteListCtrl"
        }
      }
    })

    .state("app.636385913371875412", {
      url: "/itemissuanceList",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/itempicking/itemissuancelist.html",
          controller: "ItemPickIssuanceListCtrl"
        }
      }
    })

    .state("app.itempickissuancepicklist", {
      url: "/itemissuanceList/issuancePicklist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/itempicking/itemissuancepicklist.html",
          controller: "ItemPickIssuancePickListCtrl"
        }
      }
    })

    .state("app.itempickissuanceitemlist", {
      url: "/itemissuanceList/issuanceItemlist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/itempicking/itemissuanceitemlist.html",
          controller: "ItemPickIssuanceItemListCtrl"
        }
      }
    })

    .state("app.itempickissuancepalletelist", {
      url: "/itemissuanceList/issuanceItemlist/picking",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/itempicking/itemissuancepalletelist.html",
          controller: "ItemPickIssuancePalleteListCtrl"
        }
      }
    })

    .state("app.636385913675607946", {
      url: "/itempickzonelist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/itempicking/itempickzonelist.html",
          controller: "ItemPickZoneListCtrl"
        }
      }
    })

    .state("app.637474458499882116", {
      url: "/itempickzonelist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/itempicking/itempickzonelist.html",
          controller: "ItemPickZoneListCtrl"
        }
      }
    })

    .state("app.myzoneitempicklist", {
      url: "/itempickzonelist/myzoneitempicklist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/myzonepick/myzoneitempicklist.html",
          controller: "ItemPickMyZoneItemListCtrl"
        }
      }
    })

    .state("app.myzoneitempickinglist", {
      url: "/itempickzonelist/myzoneitempicklist/myzonepickitempicking",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/myzonepick/myzonepickitempicking.html",
          controller: "MyZoneItemPickCtrl"
        }
      }
    })

    .state("app.itempickzonepicklist", {
      url: "/itempickzonelist/picklist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/itempicking/itempickzonepicklist.html",
          controller: "ItemPickZonePickListCtrl"
        }
      }
    })

    .state("app.itempickzonepalletelist", {
      url: "/itempickzonelist/picklist/picking",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/itempicking/itempickzonepalletelist.html",
          controller: "ItemPickZonePalleteCtrl"
        }
      }
    })

/********** Customer Picking **********/
.state("app.637478994066410066", {
  url: "/customerpickinglist",
  cache: false,
  views: {
    menuContent: {
      templateUrl: "templates/customerpicking/customerpickinglist.html",
      controller: "CusPickListCtrl"
    }
  }
})

.state("app.cuspickbyassignzonelist", {
  url: "/customerpickinglist/cuspickbyassignzonelist",
  cache: false,
  views: {
    menuContent: {
      templateUrl: "templates/customerpicking/cuspickbyassignzonelist.html",
      controller: "CusPickByAssignZoneListCtrl"
    }
  }
})

.state("app.cuspickbyloclist", {
  url: "/customerpickinglist/cuspickbyassignzonelist/cuspickbyloclist",
  cache: false,
  views: {
    menuContent: {
      templateUrl: "templates/customerpicking/cuspickbyloclist.html",
      controller: "CusPickLocListCtrl"
    }
  }
})

.state("app.cuspickbyitemlist", {
  url: "/customerpickinglist/cuspickbyassignzonelist/cuspickbyloclist/cuspickbyitemlist",
  cache: false,
  views: {
    menuContent: {
      templateUrl: "templates/customerpicking/cuspickbyitemlist.html",
      controller: "CusPickItemListCtrl"
    }
  }
})





    /****** PUT AWAY ******/
    .state("app.636396878334420000", {
      url: "/putaway",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/putaway.html",
          controller: "PutAwayController"
        }
      }
    })

    .state("app.637178057385481936", {
      url: "/itemphoto",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/itemphoto.html",
          controller: "ItemPhotoController"
        }
      }
    })

    .state("app.637188308371552377", {
      url: "/putawayconfirmation",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/putawayconfirmation.html",
          controller: "PutAwayConfirmationCtrl"
        }
      }
    })

    

    /****** Cycle Count ******/
    .state("app.636457478960510000", {
      url: "/cyclecount",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/cyclecount.html",
          controller: "CycleCountController"
        }
      }
    })

    /****** Quick Transfer ******/
    .state("app.636464406381329700", {
      url: "/quicktransfer",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/quicktransfer.html",
          controller: "QuickTransferController"
        }
      }
    })

    /****** Voice Picking ******/

    .state("app.636480928199957093", {
      url: "/voicepicking/location/picklist",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/voicepicking/vplocpicklist.html",
          controller: "VpLocPicklistCtrl"
        }
      }
    })

    .state("app.vplocpicklistpicking", {
      url: "/voicepicking/location/picklist/picking",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/voicepicking/vplocpicklistpicking.html",
          controller: "VpLocPickPickingCtrl"
        }
      }
    })

    .state("app.636480928580666167", {
      url: "/voicepicking/location/issuancerequest",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/voicepicking/vplocissuance.html",
          controller: "VpLocPickIRCtrl"
        }
      }
    })

    .state("app.vplocirpicking", {
      url: "/voicepicking/location/issuancerequest/picking",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/voicepicking/vplocissuancepicking.html",
          controller: "VpLocIRPickingCtrl"
        }
      }
    })

    .state("app.636480929393162472", {
      url: "/voicepicking/location/zone",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/voicepicking/vploczonelist.html",
          controller: "VpLocPickZoneCtrl"
        }
      }
    })

    .state("app.vploczonepicking", {
      url: "/voicepicking/location/zone/picking",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/voicepicking/vploczonepicking.html",
          controller: "VpLocZonePickingCtrl"
        }
      }
    })




//Administration

//Zoning
.state("app.637488385161864835", {
  url: "/admin/zonelist",
  cache: false,
  views: {
    menuContent: {
      templateUrl: "templates/administration/Zoning/zonelist.html",
      controller: "ZoneListCtrl"
    }
  }
})

.state("app.zoneaccess", {
  url: "/admin/zonelist/zoneaccess",
  cache: false,
  views: {
    menuContent: {
      templateUrl: "templates/administration/Zoning/zone_access.html",
      controller: "ZoneAccessCtrl"
    }
  }
})



    // Card to Graph Routing
    .state("app.demograph", {
      url: "/demo/graph/",
      cache: false,
      views: {
        menuContent: {
          templateUrl: "templates/graph/demograph.html",
          controller: "GraphCtrl"
        },
        params: {
          transname: null
        }
      }
    });


    

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise("app/login");
});
