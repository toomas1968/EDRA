class Bracket {
    constructor(entries) {
        this.RawEntries = deepCopy(entries);
        
        let prettyEntries  = entries.filter(obj => obj.temporary_round_column_for_testing == 1);
        let prettyEntries2 = entries.filter(obj => obj.temporary_round_column_for_testing == 2);
        let prettyEntries3 = entries.filter(obj => obj.temporary_round_column_for_testing == 3);
        let prettyEntries4 = entries.filter(obj => obj.temporary_round_column_for_testing == 4);
        let prettyEntries5 = entries.filter(obj => obj.temporary_round_column_for_testing == 5);



        // determine bracket dimensions
        let nearestP2 = 2**(Math.ceil(Math.log2(prettyEntries.length)))
        this.Height = 2*nearestP2 - 1;
        this.Depth = Math.log2(nearestP2) + 1;

        // make a filled list of Entries with BYEs
        
        for (let i = prettyEntries.length; i < nearestP2; i++) {
            prettyEntries.push(new Entry(BYE));
        }

        // add in TBDs to prettyEntries
        for (let i = 1; i < prettyEntries.length; i++) {
            if (i % 2 == 1) {
                prettyEntries.splice(i, 0, new Entry(TBD));
            }
        }
        

        this.PrettyEntries = prettyEntries;
        this.PrettyEntries2 = prettyEntries2;
        this.PrettyEntries3 = prettyEntries3;
        this.PrettyEntries4 = prettyEntries4;



        // fill initial bracket
        this.makeBracket();
    }

    makeBracket() {

        // make be-rows and insert PrettyEntries
        for (let i = 0; i < this.Height; i++) {

            let prettyEntry = this.PrettyEntries[i];
    
            // BEE row
            let bEERowElement = document.createElement("div");
            bEERowElement.id = ID_BE_ROW + i;
            bEERowElement.className = CLASS_BE_ROW;
            bEERowElement.style.width = 100 + "%";

            // BEE
            let bEE = document.createElement("div");
            bEE.id = ID_BE + prettyEntry.racer;
            bEE.className = CLASS_BE;
            bEE.style.width = 100 / this.Depth + "%";

            //      BEE REVERT ARROW
            let bEERevertElement = document.createElement("div");
            bEERevertElement.className = CLASS_BE_BTN;
            bEERevertElement.style.visibility = "hidden";
            bEERevertElement.setAttribute('onclick', "revertRowEntry(this.parentNode.parentNode)");

            let bEERevertImgElement = document.createElement("img");
            bEERevertImgElement.src = IMG_REVERT;
            bEERevertElement.appendChild(bEERevertImgElement);

            // BEE NAME
            let bEENameElement = document.createElement("div");
            bEENameElement.className = CLASS_BE_NAME + " " + CLASS_VERDANA_GRAY;
            bEENameElement.innerText = prettyEntry.racer; 
            bEE.appendChild(bEENameElement);
            
            // BEE ADVANCE ARROW
            let bEEAdvanceElement = document.createElement("div");
            bEEAdvanceElement.className = CLASS_BE_BTN;
            bEEAdvanceElement.style.visibility = "hidden";
            bEEAdvanceElement.setAttribute('onclick', "advanceRowEntry(this.parentNode.parentNode)");

            let bEEAdvancImgElement = document.createElement("img");
            bEEAdvancImgElement.src = IMG_ADVANCE;
            bEEAdvanceElement.appendChild(bEEAdvancImgElement);

            // APPEND ELEMENTS
            bEE.appendChild(bEERevertElement);
            bEE.appendChild(bEENameElement);
            bEE.appendChild(bEEAdvanceElement);
            bEERowElement.appendChild(bEE);
            _B_Element.appendChild(bEERowElement);
            _B_Row_Elements.push(bEERowElement);


        }

        // offset entries to make the bracket shape
        // Go through oddly indexed powers of two that are less than the length of PrettyEntries
        //  2, 4, 8, ...
        // (2, 4, 6, ...), (4, 8, 12, ...), (8, 16, 24, ...), ...
        // Getting powers of two is easy so use (i-1)

        for(let i = 2; i < this.PrettyEntries.length; i *= 2) {
            for (let ei = i; ei < this.PrettyEntries.length; ei+=i) {
                let spacerE = document.createElement("div");
                spacerE.style.width = 100 / this.Depth + "%";                

                _B_Row_Elements[ei-1].prepend(spacerE);
            }
        }

        // advance any entries that have BYEs first round. also adds advance arrows to entries
        // Check all even indexes if they are BYEs
        // for (let i = 0; i < this.PrettyEntries.length; i+=4) {

        //     if (this.PrettyEntries[i].Name == BYE) {
        //         // advance this.PrettyEntries[i+2].Name
        //         let winnerName = this.PrettyEntries[i+2].Name;
                
        //         let winnerE = _B_Row_Elements[i+1].lastChild;
        //         winnerE.id = ID_BE + winnerName;
        //         winnerE.lastChild.style.visibility = "visible";

        //         let winnerNameE = winnerE.childNodes[1];
        //         winnerNameE.innerText = winnerName;
        //     }
        //     else if (this.PrettyEntries[i+2].Name == BYE) {
        //         // advance this.PrettyEntries[i].Name
        //         let winnerName = this.PrettyEntries[i].Name;
                
        //         let winnerE = _B_Row_Elements[i+1].lastChild;
        //         winnerE.id = ID_BE + winnerName;
        //         winnerE.lastChild.style.visibility = "visible";

        //         let winnerNameE = winnerE.childNodes[1];
        //         winnerNameE.innerText = winnerName;
        //     }
        //     else {
        //         _B_Row_Elements[i].lastChild.lastChild.style.visibility = "visible";
        //         _B_Row_Elements[i+2].lastChild.lastChild.style.visibility = "visible";
        //     }
        // }


         
        //Round 2
        for (let i = 0; i < this.Height; i+=4) {
             for (let x = 0; x < this.PrettyEntries2.length; x++) {    
                let winnerName = this.PrettyEntries2[x].racer;
                
                let winnerE = _B_Row_Elements[i+1].lastChild;
                winnerE.id = ID_BE + winnerName;
                winnerE.lastChild.style.visibility = "visible";

                let winnerNameE = winnerE.childNodes[1];
                winnerNameE.innerText = winnerName;

                console.log(winnerE)

             }
        }


        //round3
        
            for (let i = 2; i < this.PrettyEntries.length; i+=8) {
               
                    for (let y = 0; y < this.PrettyEntries3.length; y++) {
                         for (let x = 0; x < this.PrettyEntries2.length; x++) {
                        if (this.PrettyEntries3[y].racer == this.PrettyEntries2[x].racer) {
                           
                            let winnerName = this.PrettyEntries3[y].racer;
                            let winnerE = _B_Row_Elements[i+1].lastChild;
                            winnerE.id = ID_BE + winnerName;
                            winnerE.lastChild.style.visibility = "visible";

                            let winnerNameE = winnerE.childNodes[1];
                            winnerNameE.innerText = winnerName;

                        }    
                    }
                }            
            }





        // for (let i = 2; i < this.PrettyEntries.length; i+=8) {
        //     console.log(this.PrettyEntries[i].racer)
        //     for (let z = 0; z < this.PrettyEntries3.length; z++) {
        //         if (this.PrettyEntries[i].racer == this.PrettyEntries3[z].racer) {
        //             console.log(this.PrettyEntries3[z].racer)
        //             //let winnerName = this.PrettyEntries3[x].racer;
        //             let winnerName = "tasd";
        //             let winnerE = _B_Row_Elements[i+1].lastChild;
        //             winnerE.id = ID_BE + winnerName;
        //             winnerE.lastChild.style.visibility = "visible";

        //             let winnerNameE = winnerE.childNodes[1];
        //             winnerNameE.innerText = winnerName;
        //         }
                
        //     }
        // }

        for (let i = 6; i < this.PrettyEntries.length; i+=16) {
            //round4
                let winnerName = "round 4";
                
                let winnerE = _B_Row_Elements[i+1].lastChild;
                winnerE.id = ID_BE + winnerName;
                winnerE.lastChild.style.visibility = "visible";

                let winnerNameE = winnerE.childNodes[1];
                winnerNameE.innerText = winnerName;
        }

        for (let i = 14; i < this.PrettyEntries.length; i+=32) {
            //round5
                let winnerName = "round 5";
                
                let winnerE = _B_Row_Elements[i+1].lastChild;
                winnerE.id = ID_BE + winnerName;
                winnerE.lastChild.style.visibility = "visible";

                let winnerNameE = winnerE.childNodes[1];
                winnerNameE.innerText = winnerName;
        }

        for (let i = 30; i < this.PrettyEntries.length; i+=64) {
            //round6
                let winnerName = "round 6";
                
                let winnerE = _B_Row_Elements[i+1].lastChild;
                winnerE.id = ID_BE + winnerName;
                winnerE.lastChild.style.visibility = "visible";

                let winnerNameE = winnerE.childNodes[1];
                winnerNameE.innerText = winnerName;
        }
            
        
    }

    hideArrowsFrom(BEE) {
        let vis = "hidden";
        BEE.firstChild.style.visibility = vis;
        BEE.lastChild.style.visibility = vis;
    }

    showArrowsFor(BEE) {
        // Don't show arrows for TBDs
        if (BEE.childNodes[1].innerText != TBD) {
            let vis = "visible";
            let thisSpacing = BEE.parentNode.childNodes.length - 1;

            // first round entries dont need revert arrow
            if (0 < thisSpacing) {
                BEE.firstChild.style.visibility = vis;
            }
            // winner doesn't need advance arrow 
            if (thisSpacing < this.Depth - 1) {
                BEE.lastChild.style.visibility = vis;
            }
            // check if this entry had first round bye
            if (thisSpacing == 1) {
                let thisRowIndex = parseInt(BEE.parentNode.id.split(ID_BE_ROW)[1]);
                let prevMatchupTopRow = document.getElementById(ID_BE_ROW + (thisRowIndex-1));
                let prevMatchupBotRow = document.getElementById(ID_BE_ROW + (thisRowIndex+1));
                if (prevMatchupTopRow.lastChild.childNodes[1].innerText == BYE || prevMatchupBotRow.lastChild.childNodes[1].innerText == BYE) {
                    BEE.firstChild.style.visibility = "hidden";
                }
            }
        }
    }

    advanceRowEntry(thisBracketRow) {
        let bracketIndexSplit = thisBracketRow.id.split("-");
        let thisIndex = parseInt(bracketIndexSplit[bracketIndexSplit.length-1]);

        let thisSpacing = thisBracketRow.childElementCount - 1;
        let matchupSize = 2**(thisSpacing);

        let topIndex = thisIndex - matchupSize;
        let topRow = document.getElementById(ID_BE_ROW + topIndex);

        let botIndex = thisIndex + matchupSize;
        let botRow = document.getElementById(ID_BE_ROW + botIndex);

        let matchupWinnerRow = null;
        let matchupLoserRow = null;

        // Matchup out of bracket bounds (below)  OR  winner is the top row
        if (_B_Row_Elements.length - 1 < botIndex || (topRow != null && topRow.childElementCount - 1 == thisSpacing + 1)) {
            matchupWinnerRow = topRow;
            matchupLoserRow = document.getElementById(ID_BE_ROW + (topIndex - matchupSize));
        }
        // Matchup out of bracket bounds (over)  OR  winner is the bottom row
        else if (topIndex < 0 || (botRow != null && botRow.childElementCount - 1 == thisSpacing + 1)) {
            matchupWinnerRow = botRow;
            matchupLoserRow = document.getElementById(ID_BE_ROW + (botIndex + matchupSize));
        }
        else {
            let msg = "issue advancing: " + winnerName;

            alert(msg);
        }

        // Set winner
        let winnerName = thisBracketRow.lastChild.childNodes[1].innerText;
        matchupWinnerRow.lastChild.id = ID_BE + winnerName;
        matchupWinnerRow.lastChild.childNodes[1].innerText = winnerName;
        this.showArrowsFor(matchupWinnerRow.lastChild);
        
        // Remove advance/revert arrows from the advanced entry and the matchup loser
        this.hideArrowsFrom(thisBracketRow.lastChild);
        if (matchupLoserRow != null) {
            this.hideArrowsFrom(matchupLoserRow.lastChild);
        }
    }

    revertRowEntry(thisBracketRow) {
        let bracketIndexSplit = thisBracketRow.id.split("-");
        let thisIndex = parseInt(bracketIndexSplit[bracketIndexSplit.length-1]);

        let thisSpacing = thisBracketRow.childElementCount - 1;
        let prevMatchupSize = 2**(thisSpacing - 1);

        // reset the reverting element to TBD
        thisBracketRow.lastChild.childNodes[1].innerText = TBD;
        thisBracketRow.lastChild.id = ID_BE + TBD;
        this.hideArrowsFrom(thisBracketRow.lastChild);

        // go back and add arrows to the previous matchup
        // need to check if they can have revert arrows
        let prevMatchupTopRowIndex = thisIndex - prevMatchupSize;
        let prevMatchupTopRow = document.getElementById(ID_BE_ROW + prevMatchupTopRowIndex);
        let prevMatchupBotRowIndex = thisIndex + prevMatchupSize;
        let prevMatchupBotRow = document.getElementById(ID_BE_ROW + prevMatchupBotRowIndex);

        // show arrows for the previous matchup
        this.showArrowsFor(prevMatchupTopRow.lastChild);
        this.showArrowsFor(prevMatchupBotRow.lastChild);
    }
}
