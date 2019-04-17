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

var BaseURL = 'http://main.knowfakes.com/webservice/json_knowfakes.php';
var id = 'M$H$';
var subid = 'M$H$1';
var appid = 'WEB1';
var user_auth = '07EEAD0EF1DF68F73605351AA4B1346C';
var ip = '103.61.255.34';

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
    var mobile_email = $$('#login-form input[name=mobile_email]').val();
    var pin = $$('#login-form input[name=pin]').val();
    var obj = {
      id: id,
      subid: subid,
      appid: appid,
      user_auth: user_auth,
      ip: ip,
      type: "login",
      mobile_email: mobile_email,
      pin: pin,
      user_type: "Individual"
    };
    app.request({
      url: BaseURL,
      method: 'POST',
      dataType: 'json',
      data: JSON.stringify(obj),
      beforeSend: function (xhr) {
        var spinnerOptions = { dimBackground: true };
        SpinnerPlugin.activityStart('Loading...', spinnerOptions);
      },
      error: function (xhr, status) {
        alert(statusMessage(status));
      },
      success: function (data, status, xhr) {
        console.log(data);
        if (data.resCode == '3100') {
          localStorage.setItem("KnowFakesMobileEmail", mobile_email);
          localStorage.setItem("User", JSON.stringify(data));
          app.views.main.router.navigate({
            name: 'dashboard',
          });
        }
        else {
          window.plugins.toast.show(data.resMsg, 'long', 'bottom');
        }
      },
      complete: function (xhr, status) {
        SpinnerPlugin.activityStop();
      }
    })
  }
}

function testMe(){
  console.log('test me is running');
}

function closeWelcomescreen(){
  $$('.login-screen-section').show();
  $$('.welcome-screen-section').hide();
  $$('.welcome-screen-toolbar').hide();
}

function nextWelcomescreen(){
  var welcomeSwiper = app.swiper.get('.welcome-swiper-container');
  welcomeSwiper.slideNext();
}

function shareApp() {
  if (app.device.android) {
    var url = 'https://play.google.com/store/apps/details?id=com.marstimithya.knowfakes';
  }
  if (app.device.ios) {
    var url = 'https://play.google.com/store/apps/details?id=com.marstimithya.knowfakes';
  }
  var options = {
    url: url,
  };
  var onSuccess = function (result) { };
  var onError = function (msg) { };
  window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
}

function logout() {
  localStorage.removeItem("KnowFakesMobileEmail");
  localStorage.removeItem("User");
  app.views.main.router.navigate('/');
}

function resetPIN(){
  app.dialog.prompt('Please Enter Mobile Number or Email ID', 'Forgot PIN', function (mobile_email) {
    if(mobile_email != ''){
      var obj = {
        id: id,
        subid: subid,
        appid: appid,
        user_auth: user_auth,
        ip: ip,
        type: "reset_pin",
        mobile_email: mobile_email
      };
      app.request({
        url: BaseURL,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
          //app.preloader.show();
          var spinnerOptions = { dimBackground: false };
          SpinnerPlugin.activityStart(null, spinnerOptions);
        },
        error: function (xhr, status) {
          alert("Error: " + status);
        },
        success: function (data, status, xhr) {
          if(data.resCode == '3103'){
            app.dialog.alert("PIN has been sent to your Mobile or Email");
          }
          else{
            app.dialog.alert(data.resMsg);
          }
        },
        complete: function (xhr, status) {
          //app.preloader.hide();
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