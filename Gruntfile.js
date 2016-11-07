//包装函数
module.exports = function(grunt){
	//任务配置，所有插件的配置信息
	grunt.initConfig({
	   //获取package.json的信息
	   pkg: grunt.file.readJSON('package.json'),
	    // Task configuration.
	    clean: {
	      dist: 'dist',
	      docs: 'docs/dist'
	    },
	   //uglify插件的配置信息
	   uglify: {
	      options:{
	    	stripBanners: true,
			banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
	      },
	      build: {
	  		src: 'src/js/jcmain.js',
			dest: 'dist/js/<%=pkg.name%>-<%=pkg.version%>.min.js'
	      } 
	   },
	   //jshint插件的配置信息
	   jshint: {
	   		build:[ 'Gruntfile.js','src/**/*.js'],
	   		options: {
	   			jshintrc: '.jshintrc'
	   		}
	   },
	   //watch插件的配置信息
	   watch: {
	   		build: {
	   			files: ['src/*.js','src/*.css'],
	   			tasks: ['clean','jshint','uglify','bower','copy'],
	   			options: {spawn: false}
	   		}
	   },
	   bower: {   
		   install: { 
		        options: {
		                "targetDir": "dist/js/lib",
		                "layout": "byComponent",
		                "install": true,
		                "verbose": false,
		                "cleanTargetDir": false
		        }
		    }
      	},
	    copy: {
	      jcmain: { 
	        src: 'src/**',
	        dest: 'dist/'
	      }
    	}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-bower-task'); 

	//告诉grunt当我们在终端中输入grunt时需要做些什么（注意先后顺序）
	grunt.registerTask('default',['clean','jshint','uglify','bower','copy','watch']);
};
