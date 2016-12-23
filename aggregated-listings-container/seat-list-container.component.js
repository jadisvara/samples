'use strict';
define(['event.angular.app.directives.module', 'utils', 'tracking'], function (app, utils, tracking) {
    app.component('seatListContainer', {
        templateUrl: '/Areas/event/aggregated-listings-container/seat-list-container.html',
        bindings: {
            listings: '<',
            price: '<',
            maxPrice: '<',
            onSelectListing: '&',
            onHighlightListing: '&',
            highlightedListings: '<'
        },
        controller: ['stateService', 'eventService', '$rootScope', '$timeout', '$scope', '$element', '$window', 'debounce', 'inventoryFilterService',
            function (stateService, eventService, $rootScope, $timeout, $scope, $element, $window, debounce, inventoryFilterService) {
                var $ctrl = this;
                var infiniteScrollSetting = { initialItemCount: 15, currentItemCount: 15, timeoutValue: 300 };

                $ctrl.$onChanges = onChanges;
                $ctrl.infiniteScrollEnabled = true;
                $ctrl.loadMoreByScrolling = loadMoreByScrolling;
                $ctrl.filteredListings = [];
                

                function enableScroll(enable, withDelay) {
                    $timeout(function () {
                        $ctrl.infiniteScrollEnabled = enable;
                    }, withDelay ? infiniteScrollSetting.timeoutValue : 0);
                };

                function loadMoreByScrolling() {
                    utils.log("--loadMoreByScrolling");

                    if (!stateService.listReady || $ctrl.filteredListings.length == $ctrl.lazyListings.length) return;
                    enableScroll(false);
                    infiniteScrollSetting.currentItemCount += infiniteScrollSetting.initialItemCount;
                    $ctrl.lazyListings = $ctrl.filteredListings.slice(0, infiniteScrollSetting.currentItemCount);
                    enableScroll(true, true);

                    tracking.pushData({ 'event': 'EventPage.SeatList.LazyLoad.Scrolled' });
                };

                function updateSeatListHeight() {
                    if ($element[0]) {
                        var seatListHeight = angular.element($window).height() - angular.element($element[0].firstChild).offset().top - 20; // seatListHeight = windowHeight - offsetTop - bottomMargin
                        angular.element($element[0].firstChild).css({ 'max-height': '{0}px'.format(seatListHeight) });
                    }
                };

                function onChanges(changes) {
                    if (changes.listings && changes.listings.currentValue) {
                        if ($ctrl.listings.length == 0) {
                            $ctrl.lazyListings = null;
                            return;
                        }
                        $ctrl.filteredListings = inventoryFilterService.filterEmptyListings(changes.listings.currentValue);

                        infiniteScrollSetting.currentItemCount = infiniteScrollSetting.initialItemCount;
                        $ctrl.lazyListings = $ctrl.filteredListings.slice(0, infiniteScrollSetting.currentItemCount);

                        if ($ctrl.filteredListings && $ctrl.filteredListings.length > 0 && !stateService.listReady) {
                            $timeout(function () {
                                stateService.listReady = true;
                            });
                        }

                        if (!stateService.isMobile) {
                            updateSeatListHeight();
                        }
                    }
                    if (changes.price && changes.price.currentValue) {
                        if (changes.price.currentValue == $ctrl.maxPrice) { // if max price reached then scroll to the top of the list
                            $timeout(function () {
                                angular.element($element[0].firstChild).scrollTop(0);
                            }, 100);
                        }
                    }

                    if (changes.highlightedListings) {
                        $ctrl.highlightedListings = changes.highlightedListings.currentValue;
                    }
                }
            }]
    });
});
