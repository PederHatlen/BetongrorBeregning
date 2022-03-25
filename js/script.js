let formEl = document.getElementById("form");
let resultsEl = document.getElementById("results");
let infoEl = document.getElementById("info");

let ytreDiameterEl = document.getElementById("ytreDiameter");
let indreDiameterEl = document.getElementById("indreDiameter");
let lengdeEl = document.getElementById("lengde");

let pipeInnerVolumeOut = document.getElementById("pipeInnerVolume");
let pipeThicknessOut = document.getElementById("pipeThickness");
let concreteM3Out = document.getElementById("concreteM3");
let concreteLOut = document.getElementById("concreteL");
let priceTotalOut = document.getElementById("priceTotal");
let sackCountOut = document.getElementById("sackCount");
let weightSackOut = document.getElementById("weightSack");

let price = 89;
let weight = 25;

formEl.addEventListener("submit", calc);
console.log(formEl);

function calc(e) {
	e.preventDefault();

	let yD = ytreDiameterEl.value;
	let iD = indreDiameterEl.value;
	let l = lengdeEl.value
	console.log(yD, iD, l);

	if (yD == 0 || l == 0) { infoEl.innerHTML = "Alle verdiene må være satt"; return; }
	else if (yD < iD) { infoEl.innerHTML = "Indre diameter kan ikke være over ytre."; return; }

	infoEl.innerHTML = "";

	let concreteVolume = volume(yD, l) - volume(iD, l);
	let concreteLiter = concreteVolume / 1000
	let sackCount = Math.ceil(concreteLiter / 12.5); // Sekker (Utregning)

	console.log(concreteVolume, concreteLiter, sackCount, (concreteLiter) / 12.5);

	pipeInnerVolumeOut.innerHTML = round(volume(iD, l) / 1000); // Indre volum av røret
	pipeThicknessOut.innerHTML = (yD - iD) / 2; // Tykkelse på betongrøret
	concreteM3Out.innerHTML = round(concreteLiter / 1000); // M^3
	concreteLOut.innerHTML = round(concreteLiter); // Liter
	sackCountOut.innerHTML = sackCount + (sackCount > 1 ? "sekker" : "sekk"); // Sekker (Plasering)
	priceTotalOut.innerHTML = sackCount * price; // Pris
	weightSackOut.innerHTML = weight + " kilo" + (sackCount > 1 ? "per sekk, eller " + sackCount * weight + "kg totalt" : ""); // Vekt av sekker (Trengs egentlig ikke, men det er interesant)
	
	// Hiding form and showing results
	formEl.style.display = "none";
	resultsEl.style.display = "block";
}

function volume(r, l) { return Math.PI * ((r/2) ** 2) * l; }
function round(n) {return parseFloat(n.toPrecision(3)); }