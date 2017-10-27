/**
 * Created by Abdessamad on 8/17/2016.
 */

(function () {
    'use strict';

    angular
        .module('scheduleAModule', ['checkBoxListModule','errorMessageModule'])
})();


(function () {
    'use strict';

    angular
        .module('scheduleAModule')
        .component('cmpScheduleA', {
            templateUrl: 'app/scripts/components/schedule-a/tpl-schedule-a.html',
            controller: scheduleACtrl,
            controllerAs:'schedACtrl',
            bindings: {
                scheduleGroup: '<',
                //onUpdate: '&',
                //onDelete: '&',
                showErrors: '<'
            }

        });
    scheduleACtrl.$inject=['$scope'];

    function scheduleACtrl($scope) {
        var vm = this;
        vm.isClaim="";
        vm.expanderOpenState=false;
       vm.disableExpander=false;
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.oneRequired = [{type: "required", displayAlias: "MSG_ONE_SCHEDA"}];
        vm.errorMinLength = [{type: "minlength", displayAlias: "MSG_LENGTH_8NUM"}];


        vm.$onInit = function () {
            var noValue=false;
            if (!vm.model) {
                vm.model = {
                    drugIdNumber: "",
                    scheduleAClaimsIndDetails: ""
                /*    diseaseDisorderList: [

                        {name: "acute-alcohol", label: "ACUTEALCOHOL", value:noValue },
                        {name: "acute-anxiety", label: "ACUTEANXIETY", value: noValue },
                        {name: "acute-infectious", label: "ACUTERESP", value: noValue},
                        {name: "acute-inflammatory", label: "ACUTEINFLAM", value: noValue },
                        {name: "acute-psychotic", label: "ACUTEPSYCHOTIC", value: noValue },
                        {name: "addiction", label: "ADDICTION", value: noValue},
                        {name: "ateriosclerosis", label: "ATERIOSCLEROSIS", value: noValue },
                        {name: "appendicitis", label: "APPENDICITIS", value: noValue},
                        {name: "asthma", label: "ASTHMA", value: noValue},
                        {name: "cancer", label: "CANCER", value: noValue},
                        {name: "congest-heart-fail", label: "HEARTCONGEST", value:noValue},
                        {name: "convulsions", label: "CONVULSIONS", value: noValue },
                        {name: "dementia", label: "DEMENTIA", value: noValue },
                        {name: "depression", label: "DEPRESSION", value: noValue},
                        {name: "diabetes", label: "DIABETES", value: noValue},
                        {name: "gangrene", label: "GANGRENE", value: noValue },
                        {name: "glaucoma", label: "GLAUCOMA", value: noValue},
                        {name: "haematologic-bleeding", label: "BLEEDINGDISORDERS", value: noValue},
                        {name: "hepatitis", label: "HEPATITIS", value: noValue },
                        {name: "hypertension", label: "HYPERTENSION", value: noValue },
                        {name: "nausea-pregnancy", label: "NAUSEAPREG", value: noValue },
                        {name: "obesity", label: "OBESITY", value: noValue },
                        {name: "rheumatic-fever", label: "RHEUMATICFEVER", value: noValue },
                        {name: "septicemia", label: "SEPTICEMIA", value: noValue},
                        {name: "sex-transmit-disease", label: "SEXDISEASE", value: noValue},
                        {name: "strangulated-hernia", label: "STRANGHERNIA", value: noValue},
                        {name: "thrombotic-embolic-disorder", label: "THROMBOTICDISORDER", value: noValue },
                        {name: "thyroid-disease", label: "THYROIDDISEASE", value: noValue},
                        {name: "ulcer-gastro", label: "UCLERGASTRO", value: noValue}

                    ]*/


                };

             }
            _setIdNames();
    };
        /**
         * Updates the bindings
         * @param changes
         */
        vm.$onChanges=function(changes){
            if(changes.scheduleGroup){
                vm.model = changes.scheduleGroup.currentValue;
                vm.claimSelected();
            }
            if(changes.showErrors){

                vm.showErrorDetails=changes.showErrors.currentValue;
            }
        };

        /**
         * Checks to see if at least one claim has been selected
         */
        vm.claimSelected=function(){
            var keys = Object.keys(vm.model.diseaseDisorderList);

            for (var i=0;i<keys.length;i++){
                if(vm.model.diseaseDisorderList[keys[i]]){
                    vm.isClaim="selected";//give mand field a value
                    return true;
                }
            }
            vm.isClaim="";
            return false;
        };
        vm.noClaimSelected=function(){
            return(!vm.claimSelected());
        };
        vm.showError = function (ctrl) {
            if(!ctrl){
                console.warn("No ctrl in cmp-schedule-a::showError");
                return false;
            }
            return ((ctrl.$invalid && ctrl.$touched) || (ctrl.$invalid && vm.showErrorDetails))
        };

        vm.isOpenState=function(form){
            if(form.$invalid){
                vm.expanderOpenState=true;
                vm.disableExpander=true;
            }else{
                vm.disableExpander=false;
               // vm.expanderOpenState= !vm.expanderOpenState;
            }
            return vm.expanderOpenState;
        };

        $scope.$watch("$ctrl.schedAForm.$invalid", function () {
            //vm.isOpenState();
            vm.expanderOpenState=true;
            vm.disableExpander=true;
        }, true);
       /* $scope.$watch("$ctrl.schedAForm.$valid", function () {
            //vm.isOpenState();
            vm.expanderOpenState=true;
            vm.disableExpander=false;
        }, true);*/


        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
           // vm.formId="drug_product_form" + scopeId;
            vm.acuteAlcoholId="acute_alcohol"+ scopeId;
            vm.acuteAnxietyId="acute_anxiety"+ scopeId;
            vm.acuteInfectId="acute_infectious"+ scopeId;
            vm.accuteInflamId="acute_inflammatory"+ scopeId;
            vm.acutePsycoticId="acute_psychotic"+ scopeId;
            vm.addictionId="addiction"+ scopeId;
            vm.aterioId="ateriosclerosis"+ scopeId;
            vm.appendId="appendicitis"+ scopeId;
            vm.asthmaId="asthma"+ scopeId;
            vm.cancerId="cancer"+ scopeId;
            vm.congestId="congest_heart_fail"+ scopeId;
            vm.convulId="convulsions"+ scopeId;
            vm.dementId="dementia"+ scopeId;
            vm.depressId="depression"+ scopeId;
            vm.diabetesId="diabetes"+ scopeId;
            vm.gangreneId="gangrene"+ scopeId;
            vm.glaucomaId="glaucoma"+ scopeId;
            vm.haemId="haematologic_bleeding"+ scopeId;
            vm.hepatitisId="hepatitis"+ scopeId;
            vm.hypertensionId="hypertension"+ scopeId;
            vm.nausPregId="nausea_pregnancy"+ scopeId;
            vm.obesityId="obesity"+ scopeId;
            vm.rFeverId="rheumatic_fever"+ scopeId;
            vm.septId="septicemia"+ scopeId;
            vm.sexDiseasetId="sex_transmit_disease"+ scopeId;
            vm.sHerniaId="strangulated_hernia"+ scopeId;
            vm.thromDisorderId="thrombotic_embolic_disorder"+ scopeId;
            vm.thyroidId="thyroid_disease"+ scopeId;
            vm.ulcerGssId="ulcer_gastro"+ scopeId;
            vm.schedIndId="scheda_claims"+ scopeId;
            vm.oneSchedId="msg_one_scheda"+ scopeId;
            vm.fsId="fs_schedAMissing"+scopeId;
            vm.dinId="sched_din"+scopeId;
        }
    }

})();