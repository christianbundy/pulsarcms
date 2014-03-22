/*
 * FILE
 *  controllers/verify.js
 *
 * PURPOSE
 *
 *
 * LICENSE
 *  Copyright (C) 2014 Rob Colbert <rob.isConnected@gmail.com>
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to
 *  deal in the Software without restriction, including without limitation the
 *  rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 *  sell copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 *  IN THE SOFTWARE.
 */

'use strict';
/* global $:false */

function VerifyCtrl ($scope, $route, $interval, Users) {
  var intervalPromise = null;

  $scope.nodeIsDone = false;
  $scope.showLoginButton = false;
  ga('send', 'pageview');

  // this controller does not require (or accept) user interaction to
  // begin the email verification process. It reads URL query variables
  // to determine the userId and emailVerificationKey values to use in
  // the HTTP service request.
  ga('send', 'event', 'EmailVerify', 'attempted', 1);

  Users.verify(
    {
      'userId': $route.current.params.u,
      'k': $route.current.params.k
    },
    null,
    function onVerifySuccess (response) {
      console.log('verify success', response);
      ga('send', 'event', 'EmailVerify', 'verifySuccess', 1);
      $scope.nodeIsDone = true;
      $scope.showLoginButton = true;
      $scope.nodeStatusMessage = 'Damn, homie. You actually check out. Welcome aboard!';
    },
    function onVerifyFailed (error) {
      console.log('verify failed', error);
      ga('send', 'event', 'EmailVerify', 'verifyError', {'error':error});
      $scope.nodeIsDone = true;
      $scope.percentComplete = 100;
      $scope.statusMessage = error.data.msg;
      $scope.nodeStatusMessage = error.data.msg;
      if (intervalPromise !== null) {
        $interval.cancel(intervalPromise);
        intervalPromise = null;
      }
    }
  );

  // This is some humorous shit I wrote to poke fun at how this
  // tends to look on sites built with Java.
  $scope.percentComplete = 0;
  $scope.statusMessage = 'Contacting Pulsar API server...';
  intervalPromise = $interval(function ( ) {
    if ($scope.percentComplete >= 100) {
      if (intervalPromise !== null) {
        $interval.cancel(intervalPromise);
        intervalPromise = null;
      }
      return;
    }
    $scope.percentComplete += 1;
    if ($scope.percentComplete > 20 && $scope.percentComplete <= 33) {
      $scope.statusMessage = 'Submitting authentication token...';
    }
    if ($scope.percentComplete > 33 && $scope.percentComplete <= 60) {
      $scope.statusMessage = 'The ORACLE wants you to know: There is no spoon...';
    }
    if ($scope.percentComplete > 60 && $scope.percentComplete <= 80) {
      $scope.statusMessage = 'Shit\'s actually getting real all up in this piece right about now...';
    }
    if ($scope.percentComplete > 80 && $scope.percentComplete <= 95) {
      $scope.statusMessage = 'Shit\'s actually getting real all up in this piece right about now...very real...';
    }
    if ($scope.percentComplete === 100) {
      $scope.statusMessage = 'Damn, homie. You actually check out. Welcome aboard!';
    }
  }, 100);

  $scope.showLoginModal = function ( ) {
    $('#userLoginModal').modal('show');
  };

}

VerifyCtrl.$inject = [
  '$scope',
  '$route',
  '$interval',
  'Users'
];

angular.module('robcolbertApp')
.controller('VerifyCtrl', VerifyCtrl);
