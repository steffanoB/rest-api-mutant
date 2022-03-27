var validateGenticCode = /** @class */ (function () {
    function validateGenticCode() {
    }
    validateGenticCode.prototype.isMutant = function (geneticCode) {
        // usar factory en nueva version
        var codeToEval = new GeneticCode(geneticCode);
        return codeToEval.Validate();
    };
    return validateGenticCode;
}());
//# sourceMappingURL=validateGeneticCode.js.map