require 'rubygems'
require 'yaml'
require 'json'

namespace :test do
  desc "Prepare JS conformance test suite"
  task :prepare do
    test_files = ['autolink', 'extract', 'validate', 'get_tags']
    r = {}

    f = File.open(File.join(File.dirname(__FILE__), "test", "conformance.js"), "w")
    f.write("var cases = {};")

    test_files.each do |test_file|
      path = File.join(File.dirname(__FILE__), "test", test_file + ".yml")
      yml = YAML.load_file(path)
      f.write("cases.#{test_file} = #{yml['tests'].to_json};")
    end
    f.write("if (typeof module != 'undefined' && module.exports){module.exports = cases;}");
    f.close
  end

  desc "Run test suite"
  task :run do
    exec('open test/conformance.html')
  end
  desc "Run test suite with node"
  task :run_node do
    exec('node test/runner.js')
  end
end

desc "Run test suite"
task :test => ['test:prepare', 'test:run']

desc "Run test suite with node"
task :test_node => ['test:prepare', 'test:run_node']


directory "pkg"

task :package, [:version] => [:pkg] do |t, args|
  pkg_name = "flowdock-text-#{args.version}.js"
  puts "Building #{pkg_name}..."

  pkg_file = File.open(File.join(File.dirname(__FILE__), "pkg", pkg_name), "w")

  puts "Writing header..."
  header_comment = <<-COMMENT
/*!
 * flowdock-text #{args.version}
 *
 * Copyright 2011 Twitter, Inc.
 * Copyright 2011 Flowdock Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this work except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 */
  COMMENT
  pkg_file.write(header_comment)

  puts "Writing library..."
  js_file = File.open(File.join(File.dirname(__FILE__), "flowdock-text.js"), "r")
  pkg_file.write(js_file.read)
  js_file.close

  pkg_file.close

  puts "Done with #{pkg_name}"

end
