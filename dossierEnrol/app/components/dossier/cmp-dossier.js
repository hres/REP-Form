/**
 * Created by Abdessamad on 6/29/2016.
 */


(function () {
    'use strict';

    var dependencies = [
        'expandingTable'
        ,'tabsModule'
        ,'contactList'
        ,'refProductListModule'
        ,'drugUseModule'
        ,'therapeuticClassModule'
        ,'scheduleAModule'
    ];

    angular
        .module('dossierModule', dependencies);
})();

(function () {
    'use strict';
    angular
        .module('dossierModule')
        .component('cmpDossier', {
        templateUrl: './components/dossier/tpl-dossier.html',
        controller: dossierCtrl,
        controllerAs: 'dos',
        bindings: {
            dossierRecordInput: '<',
            onUpdateDossier: '&',
            onDeleteDossier: '&'
            // selectedCountryChanged: '&'
        }
    });

    dossierCtrl.$inject = ['$scope'];


    function dossierCtrl($scope) {

        var self = this;



        /*

         "company_id": "A",
         "enrolment_version": "1.23",
         "date_saved": "1999-01-21",
         "application_type": "APPROVED",
         "software_version": "string",
         "data_checksum": "string",

         */

        self.$onInit = function(){
            self.dossierModel = {
                dossierID:"569522",
                enrolmentVersion: "1.23",
                dateSaved: "1999-01-21",
                applicationType: "New",
                softwareVersion: "1.0",
                dataChecksum: "kjsakdjas",
                drugProduct:{
                    thirdPartySigned:false,
                    humanDrugUse: false,
                    radiopharmDrugUse: false,
                    vetDrugUse: false,
                    disinfectantDrugUse: false,
                    isScheduleA: false,
                    scheduleAGroup:{

                    },
                    therapeutic: {//grid
                        listItems:[],
                        columnDef:[]
                    },
                    canRefProducts:{},//grid
                    formulations:{},//tab + grid +
                    appendixFour:{}//tab + grid +

                },
                contactInfo: { //grid
                    contactList:[],
                    columnDef:[]
                }

            };


        }
    }

})();


