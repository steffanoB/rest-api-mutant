class GeneticCode {
    geneticSequence: Array<string>
    processedSequences: Array<boolean>
    isMutant: boolean

    Validate(): boolean 
    {
        for (var i = 0; i++; i <= this.geneticSequence.length && !this.isMutant)
        {
            var cantSequencesFound = 0;
            for (var j = 0; j++; j <= this.geneticSequence[0].length && !this.isMutant)
            {
                if (!this.processedSequences[i][j])
                {
                    // ver de hacer las llamadas async
                    if (this.findHorizontalSequence(i, j))
                        cantSequencesFound = cantSequencesFound++;
                    if (this.findVerticalSequence(i, j))
                        cantSequencesFound = cantSequencesFound++;
                    if (this.findOblicueSequenceDiagPrim(i, j))
                        cantSequencesFound = cantSequencesFound++;
                    if(this.findOblicueSequenceDiagSec(i, j))
                        cantSequencesFound = cantSequencesFound++;
                }
                if (cantSequencesFound >= 2)
                {
                    this.isMutant = true;
                }

            }
        }

        return this.isMutant;
    }

    findHorizontalSequence(rowPosition, columnPosition): boolean
    {
        var validSequence = true;
        var lenthSequence = 0;
        for (var currentColumnPosition = columnPosition + 1; validSequence && currentColumnPosition < this.geneticSequence.length && 
            currentColumnPosition <= columnPosition + 3; currentColumnPosition++)
        {
            if (this.geneticSequence[rowPosition][currentColumnPosition] != this.geneticSequence[rowPosition][currentColumnPosition - 1])
            {
                validSequence = false;
            }
            lenthSequence = lenthSequence++;
        }
        return validSequence && lenthSequence >= 3;
    }

    findVerticalSequence(rowPosition, columnPosition): boolean
    {
        var validSequence = true;
        var lenthSequence = 0;
        for (var currentRowPosition = rowPosition + 1; validSequence && currentRowPosition < this.geneticSequence.length && currentRowPosition <= rowPosition + 3; currentRowPosition++)
        {
            if (this.geneticSequence[currentRowPosition][columnPosition] != this.geneticSequence[currentRowPosition - 1][columnPosition])
            {
                validSequence = false;
            }
            lenthSequence = lenthSequence++;
        }
        return validSequence && lenthSequence >= 3;
    }
    
    findOblicueSequenceDiagPrim(rowPosition, columnPosition): boolean
    {
        var validSequence = true;
        var lenthSequence = 0;
        for (var currentRowPosition = rowPosition + 1, currentColumnPosition = columnPosition + 1; validSequence && 
            currentRowPosition < this.geneticSequence.length && currentColumnPosition < this.geneticSequence[0].length;
            currentRowPosition++, currentColumnPosition++)
        {
            if (this.geneticSequence[currentRowPosition][currentColumnPosition] != 
                this.geneticSequence[currentRowPosition - 1][currentColumnPosition - 1])
            {
                validSequence = false;
            }
            
            lenthSequence = lenthSequence++;
        }
        return validSequence && lenthSequence >= 3;
    }
    
    findOblicueSequenceDiagSec(rowPosition, columnPosition): boolean
    {
        var validSequence = true;
        var lenthSequence = 0;
        for (var currentRowPosition = rowPosition + 1, currentColumnPosition = columnPosition - 1; validSequence && 
            currentRowPosition < this.geneticSequence.length && currentColumnPosition > 0;
            currentRowPosition++, currentColumnPosition--)
        {
            if (this.geneticSequence[currentRowPosition][currentColumnPosition] != 
                this.geneticSequence[currentRowPosition - 1][currentColumnPosition + 1])
            {
                validSequence = false;
            }
            
            lenthSequence = lenthSequence++;
        }
        return validSequence && lenthSequence >= 3;
}