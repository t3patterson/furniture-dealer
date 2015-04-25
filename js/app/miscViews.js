;
(function(exports) {

    Parse.Router = Parse.Router.extend({
        miscViews_loadFinalizeOrder: function() {
            console.log('finalizeOrder')
            this.pageLayout_checkNavBar();
            this.pageLayout_clearBreadCrumb();
            this.pageLayout_clearPagination();
            this.pageLayout_clearFooter();
            window.scrollTo(0, 0)
            this.finalizeOrderView.render();
        },

        miscViews_loadOrderConfirmation: function() {
            this.pageLayout_checkNavBar();
            this.pageLayout_clearBreadCrumb();
            this.pageLayout_clearPagination();
            this.pageLayout_checkFooter();
            this.orderConfView.render();
            window.scrollTo(0, 0)
        },

        miscViews_loadThankCustomer: function() {
            this.pageLayout_checkNavBar();
            this.pageLayout_clearBreadCrumb();
            this.pageLayout_clearPagination();
            this.pageLayout_clearFooter();
            window.scrollTo(0, 0)
            this.thankCustomerView.render();
        },

        miscViews_loadCancelOrder: function() {
            this.pageLayout_checkNavBar();
            this.pageLayout_clearBreadCrumb();
            this.pageLayout_clearPagination();
            this.pageLayout_clearFooter();
            window.scrollTo(0, 0)
            this.cancelOrderView.render();
        },

        miscViews_loadConsignment: function() {
            console.log('consignment-form loaded')
            this.pageLayout_checkNavBar();
            this.pageLayout_clearBreadCrumb();
            this.pageLayout_clearPagination();
            this.pageLayout_checkFooter();
            window.scrollTo(0, 0);
            this.consignView.render();
        },

        miscViews_loadAboutPg: function() {
            this.pageLayout_checkNavBar();
            this.pageLayout_clearBreadCrumb();
            this.pageLayout_clearPagination();
            this.pageLayout_checkFooter();
            window.scrollTo(0, 0)
            this.aboutView.render();
        },
    })

    
    Parse.ConsignView = Parse.TemplateView.extend({
        view: 'consignment-form',
        el: '.wrapper'

    })

    Parse.AboutView = Parse.TemplateView.extend({
        view: 'about-us',
        el: '.wrapper'
    })

    Parse.FinalizeOrderView = Parse.TemplateView.extend({
        view: 'finalize-order',
        el: '.wrapper',
        events: {
            "click .confirm-purchase": "loadPayPal"
        },
        
        loadPayPal: function(evt){
            if($('#checkout').attr('data-status')==='inactive'){          
                $('#checkout').attr('data-status','active')    
                braintree.setup(
                    // Replace this with a client token from your server
                    "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI3NDM0OGQwODUyMTYwMmQxYTI0YjgwNmY2M2RmYWMwYTc4OWY2MDA1M2IzNjkzNWM1OGJmMzA2NTExZTZjMmE2fGNyZWF0ZWRfYXQ9MjAxNS0wMy0zMFQwMTo1MTo1Mi4xOTkwMzgxMjMrMDAwMFx1MDAyNm1lcmNoYW50X2lkPWRjcHNweTJicndkanIzcW5cdTAwMjZwdWJsaWNfa2V5PTl3d3J6cWszdnIzdDRuYzgiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL2RjcHNweTJicndkanIzcW4vY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInRocmVlRFNlY3VyZSI6eyJsb29rdXBVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi90aHJlZV9kX3NlY3VyZS9sb29rdXAifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQiLCJtZXJjaGFudEFjY291bnRJZCI6InN0Y2gybmZkZndzenl0dzUiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjp0cnVlLCJjb2luYmFzZSI6eyJjbGllbnRJZCI6IjExZDI3MjI5YmE1OGI1NmQ3ZTNjMDFhMDUyN2Y0ZDViNDQ2ZDRmNjg0ODE3Y2I2MjNkMjU1YjU3M2FkZGM1OWIiLCJtZXJjaGFudEFjY291bnQiOiJjb2luYmFzZS1kZXZlbG9wbWVudC1tZXJjaGFudEBnZXRicmFpbnRyZWUuY29tIiwic2NvcGVzIjoiYXV0aG9yaXphdGlvbnM6YnJhaW50cmVlIHVzZXIiLCJyZWRpcmVjdFVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tL2NvaW5iYXNlL29hdXRoL3JlZGlyZWN0LWxhbmRpbmcuaHRtbCJ9LCJtZXJjaGFudElkIjoiZGNwc3B5MmJyd2RqcjNxbiIsInZlbm1vIjoib2ZmbGluZSIsImFwcGxlUGF5Ijp7InN0YXR1cyI6Im1vY2siLCJjb3VudHJ5Q29kZSI6IlVTIiwiY3VycmVuY3lDb2RlIjoiVVNEIiwibWVyY2hhbnRJZGVudGlmaWVyIjoibWVyY2hhbnQuY29tLmJyYWludHJlZXBheW1lbnRzLmRldi1kY29wZWxhbmQiLCJzdXBwb3J0ZWROZXR3b3JrcyI6WyJ2aXNhIiwibWFzdGVyY2FyZCIsImFtZXgiXX19",
                    'dropin', {
                        container: 'dropin'
                    });
            }
        },

        triggerThanksHash: function(evt) {
            evt.preventDefault()
            console.log('hey')
            window.location.hash = "/thankyou"
        }
    })

    
    Parse.ThanksView = Parse.TemplateView.extend({
        view: 'thank-customer',
        el: '.wrapper'
    })


    Parse.CancelOrderView = Parse.TemplateView.extend({
        view: 'order-canceled',
        el: '.wrapper'
    })


    exports.Parse.Router = Parse.Router;
    exports.Parse.AboutView = Parse.AboutView;
    exports.Parse.ConsignView = Parse.ConsignView;
    exports.Parse.FinalizeOrderView = Parse.FinalizeOrderView
    exports.Parse.ThanksView = Parse.ThanksView
    exports.Parse.CancelOrderView  = Parse.CancelOrderView 


})(typeof module === "object" ? module.exports : window);
