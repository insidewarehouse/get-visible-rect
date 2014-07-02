module.exports = function (grunt) {
	grunt.initConfig({
		watch: {
			autoTest: {
				files: [ "index.js", "test/**.js" ],
				tasks: [ "test" ]
			}
		},
		buster: {
			dist: {
				reporter: "specification"
			}
		}
	});
	grunt.loadNpmTasks("grunt-buster");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-release");

	grunt.registerTask("default", ["test"]);
	grunt.registerTask("test", ["buster"]);
};
