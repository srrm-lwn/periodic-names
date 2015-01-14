var best = [];

var ELEMENTS = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Uut", "Fl", "Uup", "Lv", "Uus", "Uuo"];

var ELEMENT_NAMES = {};
for (var i = 0; i < ELEMENTS.length; i++) {
    ELEMENT_NAMES[ELEMENTS[i].toUpperCase()] = true;
}

var VOWELS = {};
VOWELS.A = true;
VOWELS.E = true;
VOWELS.I = true;
VOWELS.O = true;
VOWELS.U = true;

function findNameInPeriodicTable(inputValue) {
    best = [];
    recursiveConvert(inputValue, 0, []);
    return best;
}

function numberOfLettersCovered(s) {
    var num = 0;
    for (var i = 0; i < s.length; i++) {
        num += s[i].length;
    }
    return num;
}

function recursiveConvert(inputValue, i, s) {
    if (i == inputValue.length) {
        var numS = numberOfLettersCovered(s);
        var numBest = numberOfLettersCovered(best);
        if (numS > numBest || (numS === numBest && s.length < best.length)) {
            best = s.concat();
        }
        return;
    }

    if (inputValue[i] === " ") {
        s.push(" ");
        recursiveConvert(inputValue, i + 1, s);
        s.pop();
    }

    if (i + 1 != inputValue.length) {
        var str2 = inputValue[i] + inputValue[i + 1];
        if (isElement(str2)) {
            s.push(str2.charAt(0) + str2.charAt(1).toLowerCase());
            recursiveConvert(inputValue, i + 2, s);
            s.pop();
        }
    }

//    if (i + 1 != inputValue.length && VOWELS[inputValue[i + 1]] && i + 2 < inputValue.length) {
//        var str3 = inputValue[i] + inputValue[i + 2];
//        if (isElement(str3)) {
//            s.push(str3.charAt(0) + str3.charAt(1).toLowerCase());
//            recursiveConvert(inputValue, i + 3, s);
//            s.pop();
//        }
//    }
    var str1 = inputValue[i];
    if (isElement(str1)) {
        s.push(str1);
        recursiveConvert(inputValue, i + 1, s);
        s.pop();
    }
    if (VOWELS[inputValue[i]]) {
        recursiveConvert(inputValue, i + 1, s);
    }
    recursiveConvert(inputValue, i + 1, s);
}

function isElement(s) {
    return ELEMENT_NAMES[s.toUpperCase()];
}


function findIndexOfElement(element) {
    for (var i = 0; i < ELEMENTS.length; i++) {
        if (ELEMENTS[i] === element) {
            return i;
        }
    }
    throw "Unable to find element " + element;
}




