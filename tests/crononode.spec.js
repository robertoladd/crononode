/**
 *
 * This is a jasmine-node set of tests for crononode module.
 * 
 * Use "jasmine-node tests --autotest --watch ." 
 * within the modules root folder to test the application.
 * 
 *
 * @source: https://github.com/robertoladd/crononode
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2015 Roberto Ladd
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */


var Crononode = require("../crononode");

var crononode = false;

describe("Crononode init", function () {
  it("Should set the stats_period attribute to 1", function () {
    crononode = new Crononode(1);
    expect(crononode.stats_period).toBe(1);
  });
});
 
describe("Single iteration Timing", function () {
  it("should record more than 2 seconds", function (done) {
    crononode.start('test-2sec');
    setTimeout(function(){
        var timing = crononode.end('test-2sec') / 1000;
        expect(timing).toBeGreaterThan(2);
        done();
    }, 2000);
  });
});

describe("Code section global Timing stats", function () {
  it("should record close to 200ms ", function (done) {
    crononode.start('test-avg-200ms');
    
    var test_interval = setInterval(function(){
        crononode.end('test-avg-200ms');
        crononode.start('test-avg-200ms');
        console.log('end interval');
    }, 200);
    
    setTimeout(function(expect){
        
        clearInterval(test_interval);
        crononode.end('test-avg-200ms');
        
        expect(crononode.inspections['test-avg-200ms']['total_avg_spent_time']).toBeGreaterThan(199);
        expect(crononode.inspections['test-avg-200ms']['total_avg_spent_time']).toBeLessThan(250);
        
        console.log(crononode);
        
        done();
    }, 1000, expect);
  });
});