var TestOne = /** @class */ (function () {
    function TestOne(name) {
        this.name = name;
    }
    TestOne.prototype.__init = function () {
        console.log(11111, this.name);
    };
    return TestOne;
}());
