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
            templateUrl: './components/schedule-a/tpl-schedule-a.html',
            controller: scheduleACtrl,
            bindings: {
                scheduleGroup: '<',
                onUpdate: '&',
                onDelete: '&'
            }

        });

    function scheduleACtrl() {
        var self = this;

        self.$onInit = function () {
            self.scheduleAModel = {
                drugIdNumber: "00000000",
                scheduleAClaimsIndDetails: "AAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                diseaseDisorderList: [

                    {name: "acute-alcohol", label: "Acute Alcohol", value: false},
                    {name: "acute-anxiety", label: "Acute Anxiety", value: false},
                    {name: "acute-infectious", label: "Acute Infectious", value: false},
                    {name: "acute-inflammatory", label: "Acute Inflammatory", value: false},
                    {name: "acute-psychotic", label: "Acute Psychotic", value: false},
                    {name: "addiction", label: "Addiction", value: false},
                    {name: "ateriosclerosis", label: "Ateriosclerosis", value: false},
                    {name: "appendicitis", label: "Appendicitis", value: false},
                    {name: "asthma", label: "Asthma", value: false},
                    {name: "cancer", label: "Cancer", value: false},
                    {name: "congest-heart-fail", label: "Congest Heart Fail", value: false},
                    {name: "convulsions", label: "Convulsions", value: false},
                    {name: "dementia", label: "Dementia", value: false},
                    {name: "depression", label: "Depression", value: false},
                    {name: "diabetes", label: "Diabetes", value: false},
                    {name: "gangrene", label: "Gangrene", value: false},
                    {name: "glaucoma", label: "Glaucoma", value: false},
                    {name: "haematologic-bleeding", label: "Haematologic Bleeding", value: false},
                    {name: "hepatitis", label: "Hepatitis", value: false},
                    {name: "hypertension", label: "Hypertension", value: false},
                    {name: "nausea-pregnancy", label: "Nausea Pregnancy", value: false},
                    {name: "obesity", label: "Obesity", value: false},
                    {name: "rheumatic-fever", label: "Rheumatic Fever", value: false},
                    {name: "septicemia", label: "Septicemia", value: false},
                    {name: "sex-transmit-disease", label: "Sex Transmit Disease", value: false},
                    {name: "strangulated-hernia", label: "Strangulated Hernia", value: false},
                    {name: "thrombotic-embolic-disorder", label: "Thrombotic Embolic Disorder", value: false},
                    {name: "thyroid-disease", label: "Thyroid Disease", value: false},
                    {name: "ulcer-gastro", label: "Ulcer Gastro", value: false},
                    {name: "other", label: "Other", value: false, hasOtherDetails:true}
                ]


            };

            if (self.scheduleGroup) {
                self.scheduleAModel = self.scheduleGroup;
            }

            /*  var test = self.scheduleAModel.diseaseDisorder.replace(/_\w/g, function(m) {
             return m[1].toUpperCase();
             });

             cons*/
        }
    }

})();