/**
 * Created by Abdessamad on 8/17/2016.
 */

(function () {
    'use strict';

    angular
        .module('scheduleAModule', ['checkBoxListModule'])
})();


(function () {
    'use strict';

    angular
        .module('scheduleAModule')
        .component('cmpScheduleA', {
            templateUrl: 'app/scripts/components/schedule-a/tpl-schedule-a.html',
            controller: scheduleACtrl,
            bindings: {
                scheduleGroup: '<',
                onUpdate: '&',
                onDelete: '&',
                showErrors: '&'
            }

        });
    scheduleACtrl.$inject=['$scope'];

    function scheduleACtrl($scope) {
        var self = this;
        self.isClaim="";
        self.expanderOpenState=false;
        self.disableExpander=false;
        self.$onInit = function () {
            var noValue=false;
            if (!self.scheduleAModel) {
                self.scheduleAModel = {
                    drugIdNumber: "",
                    scheduleAClaimsIndDetails: "",
                    diseaseDisorderList: [

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

                    ]


                };
             }
    };
        /**
         * Updates the bindings
         * @param changes
         */
        self.$onChanges=function(changes){
            if(changes.scheduleGroup){
                self.scheduleAModel = changes.scheduleGroup.currentValue;
            }
        };

        /**
         * Checks to see if at least one claim has been selected
         */
        self.claimSelected=function(){
            for (var i=0;i<self.scheduleAModel.diseaseDisorderList.length;i++){
                if(self.scheduleAModel.diseaseDisorderList[i].value){
                    self.isClaim="selected";//give mand field a value
                    return true;
                }
            }
            self.isClaim="";
            return false;
        };
        self.noClaimSelected=function(){
            return(!self.claimSelected());
        };
        self.showError = function (isInvalid, isTouched) {

            return ((isInvalid && isTouched) || (isInvalid && self.showErrors()))
        };

        self.isOpenState=function(){
            if(self.schedAForm.$invalid){
                self.expanderOpenState=true;
                self.disableExpander=true;
            }else{
                self.disableExpander=false;
               // self.expanderOpenState= !self.expanderOpenState;
            }
            return self.expanderOpenState;
        };

        $scope.$watch("$ctrl.schedAForm.$invalid", function () {
            self.isOpenState();
        }, true);

    }

})();