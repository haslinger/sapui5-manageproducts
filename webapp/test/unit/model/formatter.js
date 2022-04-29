/*global QUnit*/

sap.ui.define([
	"opensap/manageproducts/model/formatter",
  "opensap/manageproducts/test/unit/helper/FakeI18nModel",
  "sap/ui/thirdparty/sinon",
  "sap/ui/thirdparty/sinon-qunit"
], function (formatter, FakeI18n) {
	"use strict";

	QUnit.module("Number unit");

	function numberUnitValueTestCase(assert, sValue, fExpectedNumber) {
		// Act
		var fNumber = formatter.numberUnit(sValue);

		// Assert
		assert.strictEqual(fNumber, fExpectedNumber, "The rounding was correct");
	}

	QUnit.test("Should round down a 3 digit number", function (assert) {
		numberUnitValueTestCase.call(this, assert, "3.123", "3.12");
	});

	QUnit.test("Should round up a 3 digit number", function (assert) {
		numberUnitValueTestCase.call(this, assert, "3.128", "3.13");
	});

	QUnit.test("Should round a negative number", function (assert) {
		numberUnitValueTestCase.call(this, assert, "-3", "-3.00");
	});

	QUnit.test("Should round an empty string", function (assert) {
		numberUnitValueTestCase.call(this, assert, "", "");
	});

	QUnit.test("Should round a zero", function (assert) {
		numberUnitValueTestCase.call(this, assert, "0", "0.00");
	});
  
  QUnit.module("Delivery");
		
  QUnit.test("Should determine a delivery method based on the weight of a product", function (assert) {
    var oControllerStub = {
      getModel: sinon.stub().withArgs("i18n").returns(new FakeI18n({
        formatterMailDelivery : "mail"
      }))
    };
    var fnIsolatedFormatter = formatter.delivery.bind(oControllerStub);
    
    assert.strictEqual(fnIsolatedFormatter("KG", 0.2), "mail");
    assert.strictEqual(fnIsolatedFormatter("G", 200), "mail");
  });

});
