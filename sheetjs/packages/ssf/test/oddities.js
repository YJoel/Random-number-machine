/* vim: set ts=2: */
/*jshint loopfunc:true, mocha:true, node:true */
var SSF = require('../');
var fs = require('fs'), assert = require('assert');
var data = JSON.parse(fs.readFileSync('./test/oddities.json','utf8'));
describe('oddities', function() {
  data.forEach(function(d) {
    it(String(d[0]), function(){
      for(var j=1;j<d.length;++j) {
        if(d[j].length == 2) {
          var expected = d[j][1], actual = SSF.format(d[0], d[j][0], {});
          assert.equal(actual, expected);
        } else if(d[j][2] !== "#") assert.throws(function() { SSF.format(d[0], d[j][0]); });
      }
    });
  });
  it('should fail for bad formats', function() {
    var bad = ['##,##'];
    var chk = function(fmt){ return function(){ SSF.format(fmt,0); }; };
    bad.forEach(function(fmt){assert.throws(chk(fmt));});
  });
  it('should handle NaN values and infinities', function() {
    assert.equal(SSF.format('#,##0.0; (#,##0.0); "-"', NaN), " -");
    assert.equal(SSF.format('#,##0.0; (#,##0.0); "-"', Infinity), " -");
    assert.equal(SSF.format('#,##0.0; (#,##0.0); "-"', -Infinity), " -");
    ["0.00", "General"].forEach(function(fmt) {
      assert.equal(SSF.format(fmt, NaN), "#VALUE!");
      assert.equal(SSF.format(fmt, Infinity), "#DIV/0!");
      assert.equal(SSF.format(fmt, -Infinity), "#DIV/0!");
    });
  });
});
