'use strict';

module.exports = {
	app: {
		title: 'musicamise-cli',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'asdfghjkl;lkjhgfdsasdfghjkl;lkjhgfqwet',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/angular-block-ui/dist/angular-block-ui.min.css',
				'public/lib/fancybox-plus/css/jquery.fancybox-plus.css',
				'public/plugin/owl-carousel/owl.theme.css',
				'public/plugin/owl-carousel/owl.carousel.css',
			],
			js: [
				'public/plugin/js/jquery-1.11.1.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-scroll/dist/ui-scroll.min.js',
			    'public/lib/angular-ui-scrollpoint/dist/scrollpoint.min.js',
			    'public/lib/angular-ui-event/dist/event.min.js',
			    'public/lib/angular-ui-mask/dist/mask.min.js',
			    'public/lib/angular-ui-validate/dist/validate.min.js',
			    'public/lib/angular-ui-indeterminate/dist/indeterminate.min.js',
			    'public/lib/angular-ui-uploader/dist/uploader.min.js',
				'public/lib/angular-ui-utils/index.js',
				'public/lib/angular-mask/dist/ngMask.min.js',
				'public/lib/angular-fancybox-plus/js/angular-fancybox-plus.js',
				'public/lib/angular-block-ui/dist/angular-block-ui.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/ngInfiniteScroll/build/ng-infinite-scroll.js',
				'public/plugin/img-lazyload/me-lazyload.js',
				'public/lib/angular-img-fallback/angular.dcb-img-fallback.min.js'

			]
		},
		css: [
			'public/modules/**/css/*.css',
			'public/css/app.css',
			'public/plugin/etalage/etalage.css',
		],
		js: [
			'public/plugin/js/*.js',
			'public/plugin/etalage/jquery.etalage.min.js',
			'public/plugin/owl-carousel/owl.carousel.js',
			'public/lib/fancybox-plus/src/jquery.fancybox-plus.js',
			'public/lib/bootstrap-sass-official/assets/javascripts/bootstrap.min.js',
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};