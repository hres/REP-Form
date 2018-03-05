/**
 * Created by dkilty on 10/03/2017.
 */

/**

 Deep diff - decode of what the json issue

 kind - indicates the kind of change; will be one of the following:
 N - indicates a newly added property/element
 D - indicates a property/element was deleted
 E - indicates a property/element was edited
 A - indicates a change occurred within an array
 path - the property path (from the left-hand-side root)
 lhs - the value on the left-hand-side of the comparison (undefined if kind === 'N')
 rhs - the value on the right-hand-side of the comparison (undefined if kind === 'D')
 index - when kind === 'A', indicates the array index where the change occurred
 item - when kind === 'A', contains a nested change record indicating the change that occurred at the array index
 */

(function () {
    'use strict';
    angular
        .module('diffModule', []);

})();

//  https://www.npmjs.com/package/deep-diff
(function () {
    'use strict';

    angular
        .module('diffModule')
        .factory('diffEngine', differenceEngine);

    differenceEngine.$inject = ['$filter', '$http', '$q'];

    /* @ngInject */
    function differenceEngine($filter, $http, $q) {

        var kindSuffix = "_DIFF";
        var service = {
            compareJson: _compareFiles,
            consolidateResults: _consolidateDiffResults,
            loadExceptionList: _getExceptions
        };
        return service;

        ////////////////
        /**
         * Calls the DeepDiff functionality amd returns the raw results
         * @param base
         * @param compare
         * @returns {*}
         */
        function _compareFiles(base, compare) {
            return DeepDiff(base, compare);
        }

        function _consolidateDiffResults(diffList, exclusionList) {
            var resultList = [];
            if (!diffList) return resultList;
            //loop through each difference node and build a consolidated view
            for (var i = 0; i < diffList.length; i++) {
                var record = diffList[i];
                if (!(record.path && record.path[record.path.length - 1] === "toString")) {
                    _processNode(record, resultList, exclusionList);
                }
            }
            return (resultList);
        }

        /**
         *
         * @param node - the starting node to walk the path
         * @param resultList- the array list to place the results
         * @param exclusionList - values to exclude?
         * @param currentNode -
         * @private
         */
        function _processNode(node, resultList, exclusionList, currentNode) {

            var _index = 0;
            var existingRecord = null;
            var searchList = resultList;

           // console.log(node);
            //console.log(resultList);
           // console.log(currentNode); asdsad

            if (angular.isUndefined(exclusionList)) {
                exclusionList = {}; //easiest just to make this empty if there is none
            }

            if (currentNode) {
                searchList = currentNode.nodes;
            }
            //special case path is length one. Can this ever happen in production?
            if (node.path && node.path.length === 1) {
                _processNodePathOne(node, resultList, exclusionList);
                return;
            }

            for (var i = 0; i < node.path.length; i++) {
                var record_found = null;
                /*sometimes paths contain the node index.
                 * If we are on the index skip it.
                 */
                if (angular.isNumber(node.path[i])) {
                    continue; //skip number nodes
                }
                //check if the path value has an index or not
                if (i < node.path.length - 2 && angular.isNumber(node.path[i + 1])) {
                    _index = Number(node.path[i + 1]);
                }
                //index property ONLY applies to the last path name value
                else if (node.hasOwnProperty("index") && i === node.path.length - 1) {
                    _index = node.index;
                } else {
                    _index = 0;
                }
                record_found = $filter('filter')(searchList, {recordName: node.path[i], index: _index});
                if (record_found && record_found.length > 0) {
                    existingRecord = record_found[0];
                    searchList = existingRecord.nodes;
                    continue;
                }
                //new record create it
                var isLeaf = i === node.path.length - 1;
                if (!exclusionList.hasOwnProperty(node.path[i])) {
                //checking for the case where one file has a single record and another file has an array of the same
                //records. This needs to be specially handled
                    if (isLeaf && (((node.lhs instanceof Array) && (!(node.rhs instanceof Array) && (node.rhs instanceof Object))) ||
                        ((node.rhs instanceof Array) && (!(node.lhs instanceof Array) && (node.lhs instanceof Object))))) {

                    _processArrayUpdate(node, node.path[i], _index, existingRecord, resultList, exclusionList);
                    continue;
                }

                    var newNode = _createNodeRecord(node, node.path[i], _index, isLeaf);
                    searchList = newNode.nodes;
                    if (!existingRecord) {
                        existingRecord = newNode;
                        resultList.push(newNode);
                    } else {
                        var target = existingRecord.nodes;
                        if (isLeaf) {
                            target = existingRecord.value
                        }
                        target.push(newNode);
                        existingRecord = newNode;
                    }
                }
            }
        }

        /**
         * Processes a node with a path of length one
         * @param node
         * @param resultList
         * @param exclusionList
         * @private
         */
        function _processNodePathOne(node, resultList, exclusionList) {
            var _index = 0;
            var existingRecord = null;
            if (node.hasOwnProperty("index")) {
                _index = node.index;
            }
            existingRecord = $filter('filter')(resultList, {
                recordName: node.path[0], index: _index
            });

            if (existingRecord && existingRecord.length > 0) {
                _updateNodeRecord(node, existingRecord[0], true);
            }
            //if no current record, make a new entry
            else {
                if (!exclusionList.hasOwnProperty(node.path[0])) {
                    var newNode = _createNodeRecord(node, node.path[0], _index, true);
                    resultList.push(newNode);
                }
            }

        }

        /**
         * Creates a node record
         * @param node
         * @param name
         * @param node_index
         * @param isLeaf
         * @returns {{}}
         * @private
         */
        function _createNodeRecord(node, name, node_index, isLeaf) {
            var record = {};
            record.recordName = name;
            record.nodes = [];
            record.isChange = isLeaf;
            record.index = node_index;
            record.type = null;
            record.original = null;
            record.value = [];
            /**
             * kind - indicates the kind of change; will be one of the following:
             N - indicates a newly added property/element
             D - indicates a property/element was deleted
             E - indicates a property/element was edited
             A - indicates a change occurred within an array
             */
            if (isLeaf) {
                var type = "";
                if (node.kind === 'A') {

                    if (node.item.kind) {
                        type = node.item.kind + kindSuffix;
                    }
                    record.type = type;
                    record.original = node.item.lhs;
                    record.diff = node.item.rhs;
                    record.index = node.index;
                } else {
                    if (node.kind) {
                        type = node.kind + kindSuffix;
                    }
                    record.type = type;
                    record.original = node.lhs;
                    record.diff = node.rhs;
                }
            }
            return record;
        }


        /**
         * Updates an exsting consolidated node record with any changes and if a leaf
         * @param node
         * @param record
         * @param isLeaf
         * @returns {boolean}
         * @private
         */
        function _updateNodeRecord(node, record, isLeaf) {

            record.isChange = isLeaf;
            var type = "";
            /**
             * kind - indicates the kind of change; will be one of the following:
             N - indicates a newly added property/element
             D - indicates a property/element was deleted
             E - indicates a property/element was edited
             A - indicates a change occurred within an array
             */
            if (isLeaf) {
                if (node.kind === 'A') {

                    if (node.item.kind) {
                        type = node.item.kind + kindSuffix;
                    }
                    record.type = type;
                    record.original = node.item.lhs;
                    record.diff = node.item.rhs;
                } else {
                    if (node.kind) {
                        type = node.kind + kindSuffix;
                    }
                    record.type = type;
                    record.original = node.lhs;
                    record.diff = node.rhs;
                }
            }
            return true;
        }


        function _processArrayUpdate(node, nodeName, index, existingRecord, resultList, exclusionList) {

            var specialResults = _processOneArrayCase(node, nodeName, index, exclusionList);
            var target = null;
            if (!existingRecord) {
                target = resultList;
            } else {
                target = existingRecord.nodes;
            }
            for (var k = 0; k < specialResults.length; k++) {
                target.push(specialResults[k]);
            }
        }


        /**
         * Process the case where one is a json object one is an array of that object
         * Need to rediff the array of json objects
         * @param node
         * @param nodeName
         * @param index
         * @returns {Array}
         * @private
         */
        function _processOneArrayCase(node, nodeName, index, exclusionList) {
            //since a special case need to make a group of node results
            var result = [];
            //var isAdd = true;
            var base = {};
            var compare = {};
            base[nodeName] = [];
            compare[nodeName] = [];

            //make both sides arrays
            if (node.rhs instanceof Array) {
                base[nodeName] = [node.lhs];
                compare[nodeName] = node.rhs;
            } else if (node.lhs instanceof Array) {
                compare[nodeName] = [node.rhs];
                base[nodeName] = node.lhs;
            } else if ((node.lhs instanceof Array) && (node.rhs instanceof Array)) {
                console.error("_processSpecialCase::both are arrays");
            } else {
                console.error("_processSpecialCase::neither are arrays");
            }
            var diffList = DeepDiff(base, compare);
            //TODO: is the commented lines needed?
            // var newNode = _createNodeRecord(null, nodeName, 0, false); //there is at least one record
            // result.push(newNode);
            for (var i = 0; i < diffList.length; i++) {
                var diffNode = diffList[i];
                if (diffNode.kind == 'E' && ((!diffNode.lhs && !diffNode.rhs) || (diffNode.lhs.length == 0 && diffNode.rhs.length == 0))) {
                    //special case- appears to be a bug with DeepDiff lib. Creates empty record
                    console.warn("there is no diff");
                } else if (!exclusionList.hasOwnProperty(nodeName) && (!diffNode.path || diffNode.path.length === 0)) {
                    //if there is no path array then this is a leaf!
                    result.push(_createNodeRecord(diffNode, nodeName, 0, true));
                } else {
                    _processNode(diffNode, result, exclusionList);
                }
            }
            return result;

        }


        function _getExceptions(url) {

            var deferred = $q.defer();

            $http.get(url).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }



    }

})();



