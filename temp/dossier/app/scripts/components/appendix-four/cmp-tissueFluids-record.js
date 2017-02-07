/**
 * Created by dkilty on 04/11/2016.
 */

(function () {
    'use strict';

    angular
        .module('tissuesFluidsRecord',
            ['dossierDataLists',
                'nervousModule',
                'digestiveModule',
                'cardioModule',
                'immuneModule',
                'muscleModule',
                'otherTissuesModule',
                'reprodModule',
                'skinModule'
            ])
})();

(function () {
    'use strict';

    angular
        .module('tissuesFluidsRecord')
        .component('cmpTissuesFluidsRecord', {
            templateUrl: 'app/scripts/components/appendix-four/tpl-tiissueFluids-record.html',
            controller: tissuesFluidsController,
            controllerAs: 'tissuesSrcCtrl',
            bindings: {
                record: '<',
                onDelete: '&',
                showErrors: '&',
                service: '<',
                systemUsed: '&'
            }
        });

    tissuesFluidsController.$inject = ['DossierLists', '$translate', '$filter'];

    function tissuesFluidsController(DossierLists, $translate, $filter) {
        var vm = this;
        vm.systemList = DossierLists.getTissuesSystem();
        vm.fluidsLists = DossierLists;
        vm.dosService = "";
        vm.isUsed = false;
        /*vm.nervousList = DossierLists.getNervousSystem();
         vm.digestList = DossierLists.getDigestiveSystem();
         vm.cardioList = DossierLists.getCardioSystem();
         vm.otherList = DossierLists.getOtherSystem();
         vm.immuneList = DossierLists.getImmuneSystem();
         vm.skinList = DossierLists.getSkinSystem();
         vm.reprodList = DossierLists.getReprodSystem();
         vm.muscleList = DossierLists.getMuscleSystem();*/
        vm.selectedSystemList = [];
        vm.model = {};

        vm.$onInit = function () {

        };

        vm.$onChanges = function (changes) {

            if (changes.record) {
                vm.model = changes.record.currentValue;
                //setSelectedList(vm.model.systemType)
            }
            if (changes.service) {
                vm.dosService = changes.service.currentValue;
            }
        };

        vm.deleteRecord = function () {
            vm.onDelete({id: vm.model.id});
        };
        /**
         * Shows the errors for individual controls
         * @param ctrl
         * @returns {*}
         */
        vm.showError = function (ctrl) {
            if (!ctrl) {
                console.warn("No control found in tissuesFluids-record");
                return false;
            }
            return ((ctrl.$invalid && ctrl.$touched) || (ctrl.$invalid && vm.showErrors()) )
        };
        vm.systemChanged = function (ctrl) {
            vm.model.system = {}; //clear out old
            vm.model.detailsConcat = "";

            vm.isUsed = vm.systemUsed({value: vm.model.systemType});
            ctrl.$setValidity("duplicateRole", !vm.isUsed);
            if (vm.isUsed) {
                vm.model.system = {};
                vm.otherDetails = "";
                vm.model.detailsConcat = "";
            }
            switch (vm.model.systemType) {
                case DossierLists.getNervousSystemValue():
                    //get model
                    vm.model.system = vm.dosService.getDefaultNervousSystem();
                    break;
                case DossierLists.getDigestiveSystemValue():
                    //get model
                    vm.model.system = vm.dosService.getDefaultDigestiveSystem();
                    break;
                case DossierLists.getImmuneSystemValue():
                    //get model
                    vm.model.system = vm.dosService.getDefaultImmuneSystem();
                    break;
                case DossierLists.getMuscleSystemValue():
                    //get model
                    vm.model.system = vm.dosService.getDefaultMuscleSystem();
                    break;
                case DossierLists.getOtherTissuesSystemValue():
                    //get model
                    vm.model.system = vm.dosService.getDefaultOtherSystem();
                    break;
                case DossierLists.getReproductiveSystemValue():
                    //get model
                    vm.model.system = vm.dosService.getDefaultReproductiveSystem();
                    break;
                case DossierLists.getSkinSystemValue():
                    //get model
                    vm.model.system = vm.dosService.getDefaultSkinSystem();
                    break;

                case DossierLists.getCardioSystemValue():
                    //get model
                    vm.model.system = vm.dosService.getDefaultCardioSystem();
                    break;
                default:
                    vm.model.system = {};
                    vm.otherDetails = "";
                    vm.model.detailsConcat = "";
                    break;
            }

            vm.otherChanged(); //update otherState, should be empty
        };
        /**
         * Used for ui purposes only
         */
        vm.otherChanged = function () {
            vm.model.otherDetails = vm.model.system.otherDetails;

        };
        vm.updateConcat = function (alias, toAdd) {
            var currentLang = $translate.proposedLanguage() || $translate.use();
            var translateText = $translate.instant(alias, "", '', currentLang);
            var records = vm.model.detailsConcat.split("<br>");
            var index = -1;

            for (var i = 0; i < records.length; i++) {
                if (records[i] == translateText) {
                    index = i;
                    break;
                }
            }
            if (index === -1 && toAdd) {
                if (!records[0]) {
                    records[0] = translateText
                } else {
                    records.push(translateText);
                }
                records = $filter('orderBy')(records);
                vm.model.detailsConcat = "";
                vm.model.detailsConcat = records[0];
                for (var s = 1; s < records.length; s++) {
                    vm.model.detailsConcat = vm.model.detailsConcat + "<br>" + records[s];
                }

            } else if (!toAdd && index !== -1) {
                var newConcat = "";
                for (var j = 0; j < records.length; j++) {
                    if (j !== index) {
                        newConcat = newConcat + records[j] + "<br>"
                    }
                }
                vm.model.detailsConcat = newConcat.substring(0, newConcat.length - 4);
            }
        };

        /**
         * Sets the state of the other field when system details is other
         * @returns {boolean}
         */
        /*  vm.isOther = function () {
         var val = false;
         switch (vm.model.systemDetails) {
         case "CARDIO_OTHER":
         case "REPROD_OTHER":
         case "DIGESTIVE_OTHER":
         case "NERVOUS_OTHER":
         case "IMMUNE_OTHER":
         case "MUSCLE_OTHER":
         case "FLUIDS_OTHER":
         case "SKIN_OTHER":
         val = true;
         break;
         default:
         vm.model.otherDetails = "";
         val = false;
         break;
         }
         return val;
         };*/

        /*  function setSelectedList(value) {
         if (!value) {
         vm.selectedSystemList = [];
         }
         switch (value) {

         case 'NERVOUS_SYSTEM':
         vm.selectedSystemList = vm.nervousList;
         break;
         case 'DIGESTIVE_SYSTEM':
         vm.selectedSystemList = vm.digestList;
         break;
         case 'REPRODUCT_SYSTEM':
         vm.selectedSystemList = vm.reprodList;
         break;
         case 'CARDIO_SYSTEM':
         vm.selectedSystemList = vm.cardioList;
         break;
         case 'IMMUNE_SYSTEM':
         vm.selectedSystemList = vm.immuneList;
         break;
         case 'SKINGLAND_SYSTEM':
         vm.selectedSystemList = vm.skinList;
         break;
         case 'MUSCULO_SYSTEM':
         vm.selectedSystemList = vm.muscleList;
         break;
         case 'OTHERTISSUE_SYSTEM':
         vm.selectedSystemList = vm.otherList;
         break;
         case '':
         vm.selectedSystemList = [];//empty case
         break;
         default:
         console.warn("Invalid Tissues/Fluids System " + value);
         vm.selectedSystemList = [];
         break;
         }
         }
         */

    }
})();