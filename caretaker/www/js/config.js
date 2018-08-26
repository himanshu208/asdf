if (window.location.hostname == "localhost") {
    angular.module('sspf.config', [])
            .constant('WORDPRESS_API_URL', 'http://wordpress.startapplabs.com/blog/api/')
//.constant('API_URL', 'http://sspf.in/sspfapp/sspfapi/v1')
            .constant('API_URL', 'http://localhost/api/v1')
            .constant('GCM_SENDER_ID', '523426080086')

            ;
} else {
    angular.module('sspf.config', [])
            .constant('WORDPRESS_API_URL', 'http://wordpress.startapplabs.com/blog/api/')
            .constant('API_URL', 'http://phpnoida.com/api/v1/')
            .constant('GCM_SENDER_ID', '523426080086')

            ;
}
