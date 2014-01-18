"use strict";

var Benchmark = require("benchmark");
var FlowdockText = require("./flowdock-text.js");

var samples = (function () {
  var result = [];
  var size = 1000;
  var evilchars = "().#,";
  var i = 0;
  var text;

  while (size > 0) {
    text = "foo bar #hashtag http://www.google.com/lol";
    for(i=0; i < size; i++) {
      text += evilchars.charAt(Math.floor(Math.random() * evilchars.length));
    }

    result.push(text);
    size--;
  }
  return result;
}());

var suite = new Benchmark.Suite;

suite
.add("All", function() {
  var i;
  for (var i = samples.length; i >= 0; i--) {
    FlowdockText.extractUrls(samples[i]);
    FlowdockText.extractHashtags(samples[i]);
  }
})
.add("Long: 1000 evil chars", function() {
  FlowdockText.extractUrls(samples[0]);
  FlowdockText.extractHashtags(samples[0]);
})
.add("Short: 100 evil chars", function() {
  FlowdockText.extractUrls(samples[900]);
  FlowdockText.extractHashtags(samples[900]);
})
.add("Nice: 0 evil chars", function() {
  FlowdockText.extractUrls(samples[999]);
  FlowdockText.extractHashtags(samples[999]);
})
.on("cycle", function(event) {
  console.log(String(event.target));
})
.run();
