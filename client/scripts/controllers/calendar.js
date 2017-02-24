'use strict';

function CalendarCtrl($scope, $compile, $window, uiCalendarConfig) {
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  var parentHeight;
  $scope.changeTo = 'Hungarian';
  /* event source that pulls from google.com */
  $scope.eventSource = {
    url: 'http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic',
    className: 'gcal-event', // an option!
    currentTimezone: 'America/Chicago' // an option!
  };
  /* event source that contains custom events on the scope */
  $scope.events = [{
    title: 'All Day Event',
    start: new Date(y, m, 1),
    listColor: 'danger',
    className: ['event-danger']
  }, {
    title: 'Long Event',
    start: new Date(y, m, d - 5),
    end: new Date(y, m, d - 2),
    listColor: 'success',
    className: ['event-success']
  }, {
    id: 999,
    title: 'Repeating Event',
    start: new Date(y, m, d - 3, 16, 0),
    allDay: false,
    listColor: 'info',
    className: ['event-info']
  }, {
    id: 999,
    title: 'Repeating Event',
    start: new Date(y, m, d + 4, 16, 0),
    allDay: false,
    listColor: 'primary',
    className: ['event-primary']
  }, {
    title: 'Birthday Party',
    start: new Date(y, m, d + 1, 19, 0),
    end: new Date(y, m, d + 1, 22, 30),
    allDay: false,
    listColor: 'default',
    className: ['event-default']
  }, {
    title: 'Click for Google',
    start: new Date(y, m, 28),
    end: new Date(y, m, 29),
    url: 'http://google.com/',
    listColor: 'warning',
    className: ['event-warning']
  }];
  /* event source that calls a function on every view switch */
  $scope.eventsF = function(start, end, timezone, callback) {
    var s = new Date(start).getTime() / 1000;
    var e = new Date(end).getTime() / 1000;
    var m = new Date(start).getMonth();
    var events = [{
      title: 'Feed Me ' + m,
      start: s + (50000),
      end: s + (100000),
      allDay: false,
      className: ['customFeed']
    }];
    callback(events);
  };
  $scope.calEventsExt = {
    color: '#f00',
    textColor: 'yellow',
    events: [{
      type: 'party',
      title: 'Lunch',
      start: new Date(y, m, d, 12, 0),
      end: new Date(y, m, d, 14, 0),
      allDay: false
    }, {
      type: 'party',
      title: 'Lunch 2',
      start: new Date(y, m, d, 12, 0),
      end: new Date(y, m, d, 14, 0),
      allDay: false
    }, {
      type: 'party',
      title: 'Click for Google',
      start: new Date(y, m, 28),
      end: new Date(y, m, 29),
      url: 'http://google.com/'
    }]
  };
  /* alert on eventClick */
  $scope.alertOnEventClick = function(date, jsEvent, view) {
    $scope.alertMessage = (date.title + ' was clicked ');
  };
  /* alert on Drop */
  $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view) {
    $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
  };
  /* alert on Resize */
  $scope.eventResize = function(event, delta, revertFunc, jsEvent, ui, view, calendar) {
    //$scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    uiCalendarConfig.calendars[calendar].fullCalendar('option', 'height', $(window).height() - angular.element('.header').height() - angular.element('.content-footer').height() - 25);
  };
  /* add and removes an event source of choice */
  $scope.addRemoveEventSource = function(sources, source) {
    var canAdd = 0;
    angular.forEach(sources, function(value, key) {
      if (sources[key] === source) {
        sources.splice(key, 1);
        canAdd = 1;
      }
    });
    if (canAdd === 0) {
      sources.push(source);
    }
  };
  /* add custom event*/
  $scope.addEvent = function() {
    $scope.events.push({
      title: 'Open Sesame',
      start: new Date(y, m, 28),
      end: new Date(y, m, 29),
      className: ['event-primary'],
      listColor: 'default'
    });
  };
  /* remove event */
  $scope.remove = function(index) {
    $scope.events.splice(index, 1);
  };
  /* Change View */
  $scope.changeView = function(view, calendar) {
    uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
  };
  /* Change View */
  $scope.renderCalender = function(calendar) {
    if (uiCalendarConfig.calendars[calendar]) {
      uiCalendarConfig.calendars[calendar].fullCalendar('render');
    }
  };
  /* Render Tooltip */
  $scope.eventRender = function(event, element, view) {
    element.attr({
      'uib-tooltip': event.title,
      'uib-tooltip-append-to-body': true
    });
    $compile(element)($scope);
  };
  /* config object */
  $scope.uiConfig = {
    calendar: {
      //height: 550,
      height: $(window).height() - angular.element('.header').height() - angular.element('.content-footer').height() - 25,
      editable: true,
      header: {
        left: 'today prev,next',
        right: 'title month,agendaWeek,agendaDay'
      },
      buttonIcons: {
        prev: ' fa fa-caret-left',
        next: ' fa fa-caret-right'
      },
      droppable: true, // this allows things to be dropped onto the calendar !!!
      axisFormat: 'h:mm',
      columnFormat: {
        month: 'dddd', // Mon
        week: 'ddd M/D', // Mon 7
        day: 'dddd M/d', // Monday 9/7
        agendaDay: 'dddd D'
      },
      allDaySlot: false,
      eventClick: $scope.alertOnEventClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.eventResize,
      eventRender: $scope.eventRender,
      viewRender: function(view, element) {
        if (!$('.fc-toolbar .fc-left .fc-t-events').length) {
          $('.fc-toolbar .fc-left').prepend($('<button type="button" class="fc-button fc-state-default fc-corner-left fc-corner-right fc-t-events"><i class="icon-list"></i></button>').on('click', function() {
            $('.events-sidebar').toggleClass('hide');
          }));
        }
      }
    }
  };
  $scope.changeLang = function() {
    if ($scope.changeTo === 'Hungarian') {
      $scope.uiConfig.calendar.dayNames = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
      $scope.uiConfig.calendar.dayNamesShort = ['Vas', 'Hét', 'Kedd', 'Sze', 'Csüt', 'Pén', 'Szo'];
      $scope.changeTo = 'English';
    } else {
      $scope.uiConfig.calendar.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      $scope.uiConfig.calendar.dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      $scope.changeTo = 'Hungarian';
    }
  };
  /* event sources array*/
  $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
}
angular.module('app').controller('CalendarCtrl', ['$scope', '$compile', '$window', 'uiCalendarConfig', CalendarCtrl]);