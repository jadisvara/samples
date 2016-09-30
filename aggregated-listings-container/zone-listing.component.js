'use strict';
define(['event.angular.app.directives.module', 'utils', 'tracking'], function (app, utils, tracking) {
    app.component('zoneListing', {
        templateUrl: '/Areas/event/aggregated-listings-container/zone-listing.html',
        bindings: {
            listing: '<',
            onSelect: '&',
            onHighlight: '&',
            highlightedListings: '<'
        },
        controller: ['stateService', 'debounce', '$filter', '$scope', '$timeout',
            function (stateService, debounce, $filter, $scope, $timeout) {
                var $ctrl = this;

                $ctrl.$onChanges = onChanges;

                function onChanges(changes) {
                    if (changes.highlightedListings) {
                        $ctrl.isHighlighted = _.some(changes.highlightedListings.currentValue, function (id) { return id == $ctrl.listing.id; });
                    }
                }
            }]
    });
});

