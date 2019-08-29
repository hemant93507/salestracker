// Dom7
var $$ = Dom7;

// install plugin to Framework7
Framework7.use(Framework7Keypad);

// Init App
var app = new Framework7({
  id: 'com.techstreet.salestracker',
  root: '#app',
  theme: 'md',
  name: 'Sales Tracker',
  view: {
    animate: true,
    xhrCache: false,
    stackPages: false,
  },
  dialog: {
    title: 'Sales Tracker',
  },
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/',
  on: {
    init: function (event, page) {
      var User = localStorage.User;
      if (User) {
        $$('.login-screen-section').hide();
        var user_data = JSON.parse(User);
        var user_group = user_data.User.user_group;
        if (user_group == '1') {
          this.router.navigate({
            name: 'dashboard',
          });
        }
        else {
          $$('.employees-menu').hide();
          this.router.navigate({
            name: 'user-dashboard',
          });
        }
      }
      else {
        $$('.login-screen-section').show();
      }
    },
  }
});

var BaseURL = 'http://marushika.in/sales-tracker/public/api/';

function statusMessage(status) {
  if (status == 0) {
    return 'No Network connection';
  }
  else if (status == 500) {
    return 'Internal Server Error';
  }
  else if (status == 400) {
    return 'Bad Request';
  }
  else {
    return 'Something went wrong';
  }
}

function empty(val) {
  if (val == '' || val == null || val == 'undefined') {
    return true;
  }
  else {
    return false;
  }
}

function NA(val) {
  if (val == null || val == 'undefined') {
    return 'NA';
  }
  else {
    return val;
  }
}

var reverse_location = '';
function locationFromLatLon_success(result) {
  var firstResult = result[0];
  var location = firstResult.subLocality + ',' + firstResult.locality + ',' + firstResult.subAdministrativeArea;
  reverse_location = location;
}
function locationFromLatLon_failure(err) {
  reverse_location = err;
}

function locationFromLatLon(lat, lon) {
  nativegeocoder.reverseGeocode(locationFromLatLon_success, locationFromLatLon_failure, lat, lon, { useLocale: true, maxResults: 1 });
  return reverse_location;
}

function login() {
  window.plugins.uniqueDeviceID.get(success, fail);
  function success(uuid) {
    localStorage.setItem("UUID", uuid);
  };
  function fail() {
    localStorage.setItem("UUID", '');
  };
  if ($$('#login-form')[0].checkValidity()) {
    var username = $$('#login-form input[name=email]').val();
    var password = $$('#login-form input[name=password]').val();
    console.log(username);
    var obj = {
      username: username,
      password: password,
      uuid: localStorage.UUID,
      device_info: JSON.stringify(device),
    };
    app.request({
      url: BaseURL + 'login',
      method: 'POST',
      dataType: 'json',
      data: obj,
      //contentType: 'application/json',
      beforeSend: function (xhr) {
        var spinnerOptions = { dimBackground: true };
        SpinnerPlugin.activityStart('Loading...', spinnerOptions);
      },
      error: function (xhr, status) {
        alert(statusMessage(status));
      },
      success: function (data, status, xhr) {
        console.log(data);
        if (data.ErrorCode == '0') {
          localStorage.setItem("User", JSON.stringify(data));
          var user_group = data.User.user_group;
          if (user_group == '1') {
            app.views.main.router.navigate({
              name: 'dashboard',
            });
          }
          else {
            app.views.main.router.navigate({
              name: 'user-dashboard',
            });
          }
        }
        else {
          window.plugins.toast.show(data.ErrorMessage, 'long', 'bottom');
        }
      },
      complete: function (xhr, status) {
        SpinnerPlugin.activityStop();
      }
    })
  }
}

function logout() {
  localStorage.removeItem("User");
  app.views.main.router.navigate('/');
}

function testMe() {
  console.log('test me is running');
}

function shareApp() {
  if (app.device.android) {
    var url = 'https://play.google.com/store/apps/details?id=com.techstreet.salestracker';
  }
  if (app.device.ios) {
    var url = 'https://play.google.com/store/apps/details?id=com.techstreet.salestracker';
  }
  var options = {
    url: url,
  };
  var onSuccess = function (result) { };
  var onError = function (msg) { };
  window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
}

function resetPassword() {
  app.dialog.prompt('Please Enter Your Email ID', 'Forgot Password', function (email) {
    if (email != '') {
      var obj = {
        email: email
      };
      app.request({
        url: BaseURL + 'forgotpassword',
        method: 'POST',
        dataType: 'json',
        data: obj,
        //contentType: 'application/json',
        beforeSend: function (xhr) {
          var spinnerOptions = { dimBackground: false };
          SpinnerPlugin.activityStart(null, spinnerOptions);
        },
        error: function (xhr, status) {
          alert("Error: " + status);
        },
        success: function (data, status, xhr) {
          if (data.ErrorCode == '0') {
            app.dialog.alert("A new password has been sent to your Email ID");
          }
          else {
            app.dialog.alert(data.ErrorMessage);
          }
        },
        complete: function (xhr, status) {
          SpinnerPlugin.activityStop();
        }
      })
    }
  });
}

$$('.input-end').keypress(function (e) {
  if (e.keyCode == 13) {
    this.blur();
  }
});