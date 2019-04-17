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
    stackPages: true,
    unloadTabContent: true,
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
        this.router.navigate({
          name: 'dashboard',
        });
      }
      else {
        $$('.login-screen-section').show();
      }
    },
  }
});

var BaseURL = 'http://brandstudioz.co.in/sales-tracker/public/api/';

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

function login() {
  if ($$('#login-form')[0].checkValidity()) {
    var username = $$('#login-form input[name=email]').val();
    var password = $$('#login-form input[name=password]').val();
    var obj = {
      username: username,
      password: password,
    };
    app.request({
      url: BaseURL + 'login',
      method: 'POST',
      dataType: 'json',
      data: obj,
      contentType: 'application/json',
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
          app.views.main.router.navigate({
            name: 'dashboard',
          });
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

function logout() {
  localStorage.removeItem("User");
  app.views.main.router.navigate('/');
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
        contentType: 'application/json',
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