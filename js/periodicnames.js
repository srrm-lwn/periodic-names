var best = [];

var ELEMENTS = [
    "H", "Hydrogen", "1.00",
    "He", "Helium", "4.00",
    "Li", "Lithium", "6.94",
    "Be", "Beryllium", "9.01",
    "B", "Boron", "10.81",
    "C", "Carbon", "12.01",
    "N", "Nitrogen", "14.00",
    "O", "Oxygen", "15.99",
    "F", "Fluorine", "18.99",
    "Ne", "Neon", "20.17",
    "Na", "Sodium", "22.98...",
    "Mg", "Magnesium", "24.30",
    "Al", "Aluminium", "26.98",
    "Si", "Silicon", "28.08",
    "P", "Phosphorus", "30.97",
    "S", "Sulfur", "32.06",
    "Cl", "Chlorine", "35.45",
    "Ar", "Argon", "39.94",
    "K", "Potassium", "39.94",
    "Ca", "Calcium", "40.07",
    "Sc", "Scandium", "44.95",
    "Ti", "Titanium", "47.86",
    "V", "Vanadium", "50.94",
    "Cr", "Chromium", "51.99",
    "Mn", "Manganese", "54.93",
    "Fe", "Iron", "55.84",
    "Co", "Cobalt", "58.93",
    "Ni", "Nickel", "58.69",
    "Cu", "Copper", "63.54",
    "Zn", "Zinc", "65.38",
    "Ga", "Gallium", "69.72",
    "Ge", "Germanium", "72.63",
    "As", "Arsenic", "74.92",
    "Se", "Selenium", "78.96",
    "Br", "Bromine", "79.90",
    "Kr", "Krypton", "83.79",
    "Rb", "Rubidium", "85.46",
    "Sr", "Strontium", "87.62",
    "Y", "Yttrium", "88.90",
    "Zr", "Zirconium", "91.22",
    "Nb", "Niobium", "92.90",
    "Mo", "Molybdenum", "95.96",
    "Tc", "Technetium", "(98)",
    "Ru", "Ruthenium", "101.07",
    "Rh", "Rhodium", "102.90",
    "Pd", "Palladium", "106.42",
    "Ag", "Silver", "107.86",
    "Cd", "Cadmium", "112.41",
    "In", "Indium", "114.81",
    "Sn", "Tin", "118.71",
    "Sb", "Antimony", "121.76",
    "Te", "Tellurium", "127.6",
    "I", "Iodine", "126.90",
    "Xe", "Xenon", "131.29",
    "Cs", "Caesium", "132.90",
    "Ba", "Barium", "132.90",
    "La", "Lanthanum", "138.90",
    "Ce", "Cerium", "140.11",
    "Pr", "Praseodymium", "140.90",
    "Nd", "Neodymium", "144.24",
    "Pm", "Promethium", "(145)",
    "Sm", "Samarium", "150.36",
    "Eu", "Europium", "151.96",
    "Gd", "Gadolinium", "157.25",
    "Tb", "Terbium", "158.92",
    "Dy", "Dysprosium", "162.5",
    "Ho", "Holmium", "164.93",
    "Er", "Erbium", "167.25",
    "Tm", "Thulium", "168.93",
    "Yb", "Ytterbium", "173.05",
    "Lu", "Lutetium", "174.96",
    "Hf", "Hafnium", "178.49",
    "Ta", "Tantalum", "180.94",
    "W", "Tungsten", "183.84",
    "Re", "Rhenium", "186.20",
    "Os", "Osmium", "190.23",
    "Ir", "Iridium", "192.21",
    "Pt", "Platinum", "195.08",
    "Au", "Gold", "196.96",
    "Hg", "Mercury", "200.59",
    "Tl", "Thallium", "204.38",
    "Pb", "Lead", "207.2",
    "Bi", "Bismuth", "208.98",
    "Po", "Polonium", "(209)",
    "At", "Astatine", "(210)",
    "Rn", "Radon", "(222)",
    "Fr", "Francium", "(223)",
    "Ra", "Radium", "(226)",
    "Ac", "Actinium", "(227)",
    "Th", "Thorium", "232.03",
    "Pa", "Protactinium", "231.05",
    "U", "Uranium", "238.02",
    "Np", "Neptunium", "(237)",
    "Pu", "Plutonium", "(244)",
    "Am", "Americium", "(243)",
    "Cm", "Curium", "(247)",
    "Bk", "Berkelium", "(247)",
    "Cf", "Californium", "(251)",
    "Es", "Einstenium", "(252)",
    "Fm", "Fermium", "(257)",
    "Md", "Mendelevium", "(258)",
    "No", "Nobelium", "(259)",
    "Lr", "Lawrencium", "(262)",
    "Rf", "Rutherfordium", "(267)",
    "Db", "Dubnium", "(268)",
    "Sg", "Seaborgium", "(271)",
    "Bh", "Bohrium", "(272)",
    "Hs", "Hassium", "(270)",
    "Mt", "Meitnerium", "(276)",
    "Ds", "Darmstadium", "(281)",
    "Rg", "Roentgenium", "(280)",
    "Cn", "Copernicium", "(285)",
    "Uut", "Unutrium", "(284)",
    "Fl", "Flerovium", "(289)",
    "Uup", "Ununpentium", "(288)",
    "Lv", "Livermorium", "(293)",
    "Uus", "Ununseptium", "(294)",
    "Uuo", "Ununoctium", "(294)"
];


var ELEMENT_NAMES = {};
for (var i = 0; i < ELEMENTS.length; i += 3) {
    ELEMENT_NAMES[ELEMENTS[i].toUpperCase()] = true;
}

var VOWELS = {};
VOWELS.A = true;
VOWELS.E = true;
VOWELS.I = true;
VOWELS.O = true;
VOWELS.U = true;

function findIndexOfElement(element) {
    for (var i = 0; i < ELEMENTS.length; i += 3) {
        if (ELEMENTS[i] === element) {
            return i;
        }
    }
    throw "Unable to find element " + element;
}

function populateResult() {
    var result = document.getElementById("result");
    result.innerHTML = "";
    if (typeof best == 'undefined') {
        result.innerHTML = "FAILURE";
    } else {
        result.innerHTML += "<ul>";
        for (i = 0; i < best.length; i++) {
            if (best[i] === " ") {
                if (i + 1 != best.length && best[i + 1] !== " ") {
                    result.innerHTML += "<li class='empty'/>"
                }
            }
            else {
                var index = findIndexOfElement(best[i]);
                result.innerHTML += "<li class=\"element\" data-pos=\""
                + (index + 1)
                + "\" data-nb=\""
                + ELEMENTS[index + 2]
                + "\" >"
                + best[i]
                + "<span>"
                + ELEMENTS[index + 1]
                + "</span></li>";
            }
        }
        result.innerHTML += "</ul>";
    }
}

function convert() {
    best = [];
    var input = document.getElementById('name');
    console.log(input.value);

    var inputValue = input.value.toUpperCase().split("");

    recursiveConvert(inputValue, 0, []);

    populateResult();
}


function recursiveConvert(inputValue, i, s) {
    if (i == inputValue.length) {
        if (best.length === 0 || s.length > best.length) {
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

    if (i + 1 != inputValue.length && VOWELS[inputValue[i + 1]] && i + 2 < inputValue.length) {
        var str3 = inputValue[i] + inputValue[i + 2];
        if (isElement(str3)) {
            s.push(str3.charAt(0) + str3.charAt(1).toLowerCase());
            recursiveConvert(inputValue, i + 3, s);
            s.pop();
        }
    }
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