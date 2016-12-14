/**
 * Created by dkilty on 8/13/2016.
 */


(function () {
    'use strict';

    angular
        .module('lcDetailsModule', ['ui.bootstrap'])
})();

(function () {
    'use strict';

    angular
        .module('lcDetailsModule')
        .component('cmpLifecycleDetails', {
            templateUrl: 'app/scripts/components/lifecycleDetails/tpl-lifecycle-details_20161209_1205.html',
            controller: lifecycleRecCtrl,
            controllerAs: 'lifecycleCtrl',

            bindings: {
                lifecycleRecord: '<',
                onUpdate: '&',
                showErrors: '&',
                isDetailValid: '&',
                onDelete: '&',
                enableDeleteIndex: '&',
                isEctd: '<'
            }
        });
    lifecycleRecCtrl.$inject = ['TransactionLists', '$translate'];

    function lifecycleRecCtrl(TransactionLists, $translate) {
        var vm = this;
        vm.savePressed = false;
        vm.activityList = TransactionLists.getActivityTypes();
        vm.sequenceList = [];
        vm.descriptionList = [];

        vm.lifecycleModel = {};
        vm.endDateVisible = false;
        vm.yearVisible = false;
        vm.startDateVisible = false;
        vm.descriptionVisible = false;
        vm.versionVisible = false;
        vm.ectd = false;
        vm.popOpened = false;
        vm.dateOptions = {
            showWeeks: false,
        };
        vm.yearList = _createYearList();

        vm.$onInit = function () {

            //lazy load of year lust
            if (!vm.yearList || vm.yearList.length === 0) {
                vm.yearList = _createYearList();
            }
        };

        /**
         *
         * @param changes
         */
        vm.$onChanges = function (changes) {
            if (changes.lifecycleRecord) {
                _updateLocalModel(changes.lifecycleRecord.currentValue);
            }
            if (changes.isEctd) {
                vm.ectd = changes.isEctd.currentValue;
            }

        };


        vm.openStartDate = function () {
            vm.startDateOpen = true;
        };
        vm.openEndDate = function () {
            vm.endDateOpen = true;
        };
        vm.openFiledDate = function () {
            vm.filedDateOpen = true;
        };


        function _updateLocalModel(record) {
            vm.lifecycleModel = angular.copy(record);
            convertToDate();
            vm.setSequenceList();
            vm.setDetailsState();
        }

        vm.disableDeleteState = function () {
            //this is noEctd case
            if (!vm.ectd) {
                return true;
            }
            var value = parseInt(vm.lifecycleModel.sequence);
            if (value == vm.enableDeleteIndex()) {
                return false;
            }
            return true;
        }

        /**
         * @ngdoc Method -sets the lifecycle Sequence DescriptionValie
         * @param value
         */
        vm.setSequenceList = function () {

            var value = vm.lifecycleModel.activityType;
            var temp = vm.lifecycleModel.descriptionValue;
            vm.lifecycleModel.descriptionValue = "";
            switch (value) {
                case ("PRESUB_MEETING"):
                    vm.descriptionList = TransactionLists.getPresubTypes();
                    break;
                case ("ANDS"):
                    vm.descriptionList = TransactionLists.getAndsType();
                    break;
                case ("DINA"):
                    vm.descriptionList = TransactionLists.getDinaType();
                    break;
                case ("DINB"):
                    vm.descriptionList = TransactionLists.getDinbType();
                    break;
                case ("EUNDS"):
                    vm.descriptionList = TransactionLists.getEundsType()
                    break;

                case ("EUSNDS"):
                    vm.descriptionList = TransactionLists.getEusndsType();
                    break;
                case ("LEVEL_3"):
                    vm.descriptionList = TransactionLists.getLevel3Type();
                    break;
                case ("NC_ACT"):
                    vm.descriptionList = TransactionLists.getNcType();
                    break;
                case ("NDS"):
                    vm.descriptionList = TransactionLists.getNdsType();
                    break;
                case ("PDC"):
                    vm.descriptionList = TransactionLists.getPdcType();
                    break;
                case ("PDC_B"):
                    vm.descriptionList = TransactionLists.getPdcBType();
                    break;
                case ("PSUR_C"):
                    vm.descriptionList = TransactionLists.getpSurCType();
                    break;
                case ("PSUR_PV"):
                    vm.descriptionList = TransactionLists.getpSurPvType();
                    break;
                case ("RMP_PV"):
                    vm.descriptionList = TransactionLists.getRmpPvType();
                    break;
                case ("SANDS"):
                    vm.descriptionList = TransactionLists.getSandsType();
                    break;
                case ("SNDS"):
                    vm.descriptionList = TransactionLists.getSndsType();
                    break;
                case ("SNDS_C"):
                    vm.descriptionList = TransactionLists.getSndsCArray();
                    break;
                case ("UD_PV"):
                    vm.descriptionList = TransactionLists.getUdpvType();
                    break;
                case ("UDRA"):
                    vm.descriptionList = TransactionLists.getUdraType();
                    break;
                case ("CONSULTATION"):
                    vm.descriptionList = TransactionLists.getConsultType();
                    break;

                case ("YBPR"):
                    vm.descriptionList = TransactionLists.getYbprType()
                    break;

                default:
                    vm.descriptionList = "";
                    break;

            }
            ///find if the value is in the list
            if (temp && vm.descriptionList.indexOf(temp) !== -1) {
                vm.lifecycleModel.descriptionValue = temp;
            }
        };
        /**
         * @ngdoc method sets the state of the details field based on
         * @ngdoc method sets the state of the details field based on
         * what was selected for the details description
         */
        vm.setDetailsState = function () {
            var value = vm.lifecycleModel.descriptionValue
            if (!value) {
                vm.descriptionList = [];
                return;
            }
            switch (value) {
                case('ADMINISTRATIVE'):         /*FALLTHROUGH*/
                case('BENEFIT_RISK_ASSESS'):    /*FALLTHROUGH*/
                case('CANCEL_LETTER'):          /*FALLTHROUGH*/
                case('CHANGE_TO_DIN'):          /*FALLTHROUGH*/
                case('DIN_DISCONTINUED'):       /*FALLTHROUGH*/
                case('DRUG_NOTIF_FORM'):        /*FALLTHROUGH*/
                case('INITIAL'):                /*FALLTHROUGH*/
                case('NOTIFICATION_CHANGE'):    /*FALLTHROUGH*/
                case('PANDEMIC_APPL'):          /*FALLTHROUGH*/
                case('POST_CLEARANCE_DATA'):    /*FALLTHROUGH*/
                case('POST_MARKET_SURV'):       /*FALLTHROUGH*/
                case('POST_NOC_CHANGE'):        /*FALLTHROUGH*/
                case('POST_AUTH_DIV1_CHANGE'):  /*FALLTHROUGH*/
                case('PRESUB_MEETING_PKG'):     /*FALLTHROUGH*/
                case('PRIORITY_REVIEW_RQ'):     /*FALLTHROUGH*/
                case('PRISTINE_PM'):            /*FALLTHROUGH*/
                case('PRISTINE_PM_2LANG'):      /*FALLTHROUGH*/
                case('RISK_COMMUN_DOC'):        /*FALLTHROUGH*/
                case('SIGNAL_WORK_UP'):         /*FALLTHROUGH*/
                    //nothing visible
                    setDetailsAsNone();
                    vm.setConcatDetails();
                    break;

                case('COMMENTS_NOC'):             /*FALLTHROUGH*/
                case('COMMENTS_SUMMARY_BASIS'):   /*FALLTHROUGH*/
                case('MEETING_MINUTES'):            /*FALLTHROUGH*/
                case('ADVISEMENT_LETTER_RESPONSE'):   /*FALLTHROUGH*/
                case('CLIN_CLARIF_RESPONSE'):         /*FALLTHROUGH*/
                case('EMAIL_RQ_RESPONSE'):            /*FALLTHROUGH*/
                case('LABEL_CLARIF_RESPONSE'):        /*FALLTHROUGH*/
                case('MHPD_RQ_RESPONSE'):             /*FALLTHROUGH*/
                case('NOC_RESPONSE'):                  /*FALLTHROUGH*/
                case('NOD_RESPONSE'):                  /*FALLTHROUGH*/
                case('NON_RESPONSE'):                 /*FALLTHROUGH*/
                case('PROCESSING_CLARIF_RESPONSE'):   /*FALLTHROUGH*/
                case('QUAL_CLIN_CLARIF_RESPONSE'):   /*FALLTHROUGH*/
                case('QUAL_CLARIF_RESPONSE'):         /*FALLTHROUGH*/
                case('SDN_RESPONSE'):                 /*FALLTHROUGH*/
                case('PHONE_RQ_RESPONSE'):         /*FALLTHROUGH*/
                case('BE_CLARIF_RESPONSE'):        /*FALLTHROUGH*/
                case('SCREENING_ACCEPT_RESPONSE'):        /*FALLTHROUGH*/
                case('SCREENING_CLARIF_RESPONSE'):        /*FALLTHROUGH*/
                case('NOL_RESPONSE'):        /*FALLTHROUGH*/

                    setAsStartDate();
                    vm.setConcatDetails();
                    break;
                case('RMP_VERSION_DATE'):
                    setVersionAndDate();
                    vm.setConcatDetails();
                    break;

                case('FOR_PERIOD'):
                    setAsDatePeriod();
                    vm.setConcatDetails();
                    break;

                case('UNSOLICITED_DATA'):

                    setAsDescription();
                    vm.setConcatDetails();
                    break;

                case('YEAR_LIST_OF_CHANGE'):
                    setAsDescriptionYear();
                    vm.setConcatDetails();
                    break;

                default:
                    console.warn("Lifecycle Details activity not found: " + value);
                    break;
            }

        }



        /**
         * @ngdoc method -sets the details fields to all hidden
         */
        function setAsDescriptionYear() {
            vm.endDateVisible = false;
            vm.startDateVisible = false;
            vm.descriptionVisible = true;
            vm.versionVisible = false;
            vm.yearVisible = true;
            vm.lifecycleModel.startDate = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.version = "";
        }

        function setDetailsAsNone() {

            vm.endDateVisible = false;
            vm.startDateVisible = false;
            vm.descriptionVisible = false;
            vm.versionVisible = false;
            vm.yearVisible = false;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.startDate = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.details = "";
            vm.lifecycleModel.version = "";
        }

        function setAsDescription() {
            vm.endDateVisible = false;
            vm.startDateVisible = false;
            vm.descriptionVisible = true;
            vm.versionVisible = false;
            vm.yearVisible = false;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.startDate = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.version = "";

        }

        function setAsStartDate() {
            vm.endDateVisible = false;
            vm.startDateVisible = true;
            vm.startDateLabel = "DATED"
            vm.descriptionVisible = false;
            vm.versionVisible = false;
            vm.yearVisible = false;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.details = "";
            vm.lifecycleModel.version = "";
        }

        function setVersionAndDate() {
            vm.endDateVisible = false;
            vm.startDateVisible = true;
            vm.startDateLabel = "DATED"
            vm.descriptionVisible = false;
            vm.versionVisible = true;
            vm.yearVisible = false;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.details = "";
        }

        function setAsDatePeriod() {

            vm.endDateVisible = true;
            vm.startDateVisible = true;
            vm.startDateLabel = "START_DATE"
            vm.descriptionVisible = false;
            vm.versionVisible = false;
            vm.yearVisible = false;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.details = "";
            vm.lifecycleModel.version = "";
        }

        function setAsVersionDescription() {
            vm.endDateVisible = false;
            vm.startDateVisible = false;
            vm.descriptionVisible = true;
            vm.versionVisible = true;
            vm.yearVisible = false;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.startDate = "";
            vm.lifecycleModel.endDate = "";
        }

        vm.setConcatDetails = function () {
            var startDate = "";
            var endDate = "";
            var concatText = ""
            //translate value to english
            var enDescription = translateToEnglish(vm.lifecycleModel.descriptionValue);
            if (vm.startDateVisible) {
                startDate = convertDate(vm.lifecycleModel.startDate);
                concatText = enDescription + " dated " + startDate;
            }
            if (vm.endDateVisible) {

                endDate = convertDate(vm.lifecycleModel.endDate);
                concatText = enDescription + " of " + startDate + " to " + endDate;
            }
            if (vm.descriptionVisible && !vm.yearVisible) {

                concatText = enDescription + "\n" + vm.lifecycleModel.details;
            }
            if (vm.versionVisible) {
                concatText = enDescription + vm.lifecycleModel.version + concatText;
            }
            if (vm.yearVisible) {
                concatText = vm.lifecycleModel.year + ": " + vm.lifecycleModel.details;
            }
            if (!concatText) concatText = enDescription;
            vm.lifecycleModel.sequenceConcat = concatText;
        }
        function translateToEnglish(key) {
            var translateText = "";
            //note this is done whether loaded or not should be OK
            translateText = $translate.instant(key, "", '', 'en')
            return translateText;
        }

        function convertDate(value) {

            if (!value) return "";
            var date = new Date(value);
            var m_names = ["Jan", "Feb", "Mar",
                "Apr", "May", "Jun", "Jul", "Aug", "Sep",
                "Oct", "Nov", "Dec"];
            var result = ""
            result = m_names[date.getUTCMonth()] + ". " + date.getUTCDate() + ", " + date.getUTCFullYear();
            return result
        }
        /**
         *  calls the delete function on the parent
         */
        vm.delete = function () {
            vm.onDelete({id: vm.lifecycleModel.sequence});
        };
        /* @ngdoc method -discards the changes and reverts to the model
         *
         */
        vm.discardChanges = function () {
            if (vm.lifecycleDetailsForm.$pristine) return;
            _updateLocalModel(vm.lifecycleRecord)
            vm.isDetailValid({state: vm.lifecycleDetailsForm.$valid});
            vm.savePressed = false;
        };

        /**
         * @ngdoc method -Updates the parent on whether this record is valid or not
         */
        vm.updateValid = function () {
            //vm.isDetailValid({state: (vm.addressRecForm.$valid && !vm.addressRecForm.$dirty)});
        };


        /**
         * Updates the contact model used by the save button
         */
        vm.updateLivecycleModel = function () {

            if (vm.lifecycleDetailsForm.$valid) {
                vm.isDetailValid({state: true});
                vm.lifecycleDetailsForm.$setPristine();
                vm.onUpdate({record: vm.lifecycleModel});
            }
            vm.savePressed = true;
        }
        function convertToDate() {
            //TODO parse string and convert
            if (vm.lifecycleModel.dateFiled) {
                vm.lifecycleModel.dateFiled = _parseDate(vm.lifecycleModel.dateFiled)
            }
            if (vm.lifecycleModel.startDate) {
                vm.lifecycleModel.startDate = _parseDate(vm.lifecycleModel.startDate)
            }
            if (vm.lifecycleModel.endDate) {
                vm.lifecycleModel.endDate = _parseDate(vm.lifecycleModel.endDate);
            }
        }

        function _parseDate(value) {
            var dateArray = value.split('-');
            if (dateArray.length != 3) {
                console.error(("_parseDate error not 3 parts"))
            }
            var aDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
            return aDate;
        }

        /**
         * @ngdoc method toggles error state to make errors visible
         * @returns {boolean}
         */
        vm.showError = function (isInvalid, isTouched) {

            if ((isInvalid && isTouched) || (vm.savePressed && isInvalid )) {
                return true
            }
            return (false);
        }

        function _createYearList() {
            var start = 1980;
            var end = (new Date()).getFullYear();
            var result = [];
            for (var i = start; i <= end; i++) {
                result.push("" + i)
            }
            return (result);
        }
    }
})();