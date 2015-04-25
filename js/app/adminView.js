;(function(exports) {

    Parse.Router = Parse.Router.extend({
        adminView_loadAdminLogin: function() {pageLayout_checkNavBar();
            this.pageLayout_clearBreadCrumb();
            this.pageLayout_clearPagination();
            this.pageLayout_clearFooter();
            window.scrollTo(0,0)
            this.adminLoginView.render();
        },

        adminView_loadAdminDashboard: function() {pageLayout_checkNavBar();
            this.pageLayout_clearBreadCrumb();
            this.pageLayout_clearPagination();
            this.pageLayout_clearFooter();
            window.scrollTo(0,0)
            this.adminDashboardView.render();
        },

    })

    Parse.AdminLoginView = Parse.TemplateView.extend({
        view: 'admin-login',
        el: '.wrapper',

        events: {
            "click .admin-login-btn": 'verifyPassword'
        },

        verifyPassword: function(evt) {
            evt.preventDefault();

            var loginName = $('#login-name').val()
            var passwordValue = $('#login-password').val()

            console.log([loginName, passwordValue])

            Parse.User.logIn(loginName, passwordValue)
                .then(function(parseUser) {

                    if (parseUser.get('role') === 'admin') {
                        window.location.hash = '/admin/dashboard';
                    } else {
                        parseUser.logOut();
                        $('.response-msg').text("User is not an admin").fadeIn();
                    }
                })
                .fail(function(error) {
                    $('.response-msg').text("Username doesn't exist or password is invalid").fadeIn();
                })



        }
    })

    Parse.AdminDashboardView = Parse.TemplateView.extend({
        view: 'admin-dashboard',
        el: '.wrapper',

        events: {
            'click .add-new-employee': 'addNewEmployee'
        },

        addNewEmployee: function(evt) {
            evt.preventDefault();
            console.log(evt);
            var newUserName = $('.new-employee-username').val();
            var newUserPassword = $('.new-employee-password').val();

            console.log(newUserName)
            console.log(newUserPassword)

            console.log(newUserName.length)
            console.log(newUserPassword.length)


            if (newUserName.length > 0 && newUserPassword.length > 0) {
                console.log('add user initiated')
                var newEmployeeUser = new Parse.User();
                newEmployeeUser.set('username', newUserName);
                newEmployeeUser.set('password', newUserPassword);
                newEmployeeUser.set('role', 'employee');


                newEmployeeUser.signUp()
                    .then(function(newUser) {
                        console.log(newUser);
                        Parse.User.logOut();
                        $('.response-msg').text('new employee submitted').show();
                        $('.new-employee-username').val("");
                        $('.new-employee-password').val("");

                    }).fail(function(error) {
                        $('.response-msg').text('didnt work user not submitted, sorry...').show();
                    })
            } else {
                $('.response-msg').text('enter values for new employee and new password').show();
            }
        }
    })

    
    exports.Parse.Router = Parse.Router
    exports.Parse.AdminLoginView = Parse.AdminLoginView
    exports.Parse.AdminDashboardView = Parse.AdminDashboardView

})(typeof module === "object" ? module.exports : window);

