var jasmine = require("../lib/jasmine");
var cases = require("./conformance");
var FlowdockText = require("../flowdock-text");
var testers = require("./testers");

(function(){
  var reporter = new jasmine.jasmine.JsApiReporter();
  jasmine.jasmine.getEnv().addReporter(reporter);
  for (var suite in cases) {
    (function(suite) {
      jasmine.describe(suite, function(){
        for (var section in cases[suite]) {
          (function(section) {
            jasmine.describe(section, function() {
              cases[suite][section].forEach(function(testCase){
                var tester = testers.getTester(suite, section);
                jasmine.it(testCase.description, function(){
                  jasmine.expect(tester(testCase)).toEqual(testCase.expected);
                });
              });
            });
          }(section));
        }
      });

    }(suite));
  }
  jasmine.jasmine.getEnv().execute();
  setTimeout(function(){
    var output = "";
    var failed = 0;
    var passed = 0;
    var results = reporter.results();
    for(var i in results){
      if(results[i].result === "passed"){
        passed++;
        output += ".";
      } else if(results[i].result === "failed"){
        output += results[i].messages.map(function(msg){return msg.message + "\n"}).join("\n")
        failed++;
      }
    }
    expectations_count = passed + failed;
    console.log(output + "\n" + expectations_count + " specs, " + failed + " failures.");
    process.exit(failed > 0 ? 1 : 0);
  }, 1);
}());

