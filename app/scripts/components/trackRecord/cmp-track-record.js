/**
 * Created by dkilty on 8/13/2016.
 */

/*(function () {
 'use strict';

 angular
 .module('testThis', [])
 })();*/


(function () {
    'use strict';

    angular
        .module('expandingTable')
        .component('cmpTrackRecord2', {
            templateUrl: 'app/scripts/components/trackRecord/tpl-track-record.html',
            controller: trackRecordCtrl,
            bindings: {
                contactRecord: '&',
                newRecord: '='
            },
            require: {
                trackRecordCtrl: '^trackRecord'
            },

        });

    function trackRecordCtrl() {
        var vm = this;

        console.log("Init the trackRecord")
        vm.$onInit = function () {

            console.log("@@@@@@@@Track record component oninit is there a record" + vm.contactRecord())
            var rec = vm.trackRecordCtrl.trackRecord();
            vm.newRecord = rec;
            //console.log(vm.newRecord)
        }
        //TODO rename
        vm.$onChanges = function (changes) {
            // console.log("changes details")
            console.log("@@@@@@@@in contact changes")

            if (changes.contactRecord) {
                //vm.contactModel = changes.contactRecord.currentValue;
                console.log("This is the contact record in changes " + vm.contactRecord)
                console.log("@@@@@@in contact on changes there is a change" + changes.contactRecord.currentValue)
            }

        }


    }

})();



