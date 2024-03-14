module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    sass: {
      dist: {
        files: {
          "dist/css/styles.css": "src/scss/styles.scss",
        },
      },
    },

    uglify: {
      options: {
        mangle: false,
      },
      my_target: {
        files: {
          "dist/js/script.js": ["src/js/script.js"],
        },
      },
    },

    copy: {
      main: {
        expand: true,
        cwd: "src/",
        src: "index.html",
        dest: "dist/",
      },
    },

    watch: {
      scripts: {
        files: ["src/js/*.js", "src/scss/*.scss", "src/*.html"],
        tasks: ["uglify", "sass", "copy"],
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["uglify", "sass", "copy", "watch"]);
  grunt.registerTask("build", ["uglify", "sass", "copy"]);
};
