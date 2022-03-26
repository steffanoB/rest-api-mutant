class validateGenticCode implements iValidator
{
    isMutant(geneticCode:Array<string>): boolean 
    {
        // usar factory en nueva version
        let codeToEval = new GeneticCode(geneticCode);
        return codeToEval.Validate();
    }
}