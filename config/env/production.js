'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/musicamise-cli',
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
				'public/lib/angular/angular.min.js',
				'public/lib/angular-resource/angular-resource.min.js', 
				'public/lib/angular-cookies/angular-cookies.min.js', 
				'public/lib/angular-animate/angular-animate.min.js', 
				'public/lib/angular-touch/angular-touch.min.js', 
				'public/lib/angular-sanitize/angular-sanitize.min.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
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
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
				'public/lib/ngInfiniteScroll/build/ng-infinite-scroll.min.js',
				'public/plugin/img-lazyload/me-lazyload.js',
				'public/lib/angular-img-fallback/angular.dcb-img-fallback.min.js',
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: '/auth/facebook/callback'
	},
	pagseguro: {
		clientMail: process.env.PAGSEGURO_MAIL || '',
		clientSecret: process.env.PAGSEGURO_SECRET || '',
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
