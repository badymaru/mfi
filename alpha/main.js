/*
* MFI Metro
* Copyright (C) 2022 Shandra McCollough <shandramccollough@gmail.com>
 */


// Initializing game data variables
var gameData = {
	version: '0.42',
	money: 50000,
	ticketPrice: 100,
	passengers: 0,
	prestige: 0,
	ginza: 			{ line: 0, stations: 0, locomotives: 0, cars: 0 },
	marunouchi: 	{ line: 0, stations: 0, locomotives: 0, cars: 0 },
	hibiya: 			{ line: 0, stations: 0, locomotives: 0, cars: 0 },
	tozai: 			{ line: 0, stations: 0, locomotives: 0, cars: 0 },
	chiyoda: 		{ line: 0, stations: 0, locomotives: 0, cars: 0 },
	yurakucho: 	{ line: 0, stations: 0, locomotives: 0, cars: 0 },
	hanzomon: 	{ line: 0, stations: 0, locomotives: 0, cars: 0 },
	namboku: 		{ line: 0, stations: 0, locomotives: 0, cars: 0 },
	fukutoshin: 	{ line: 0, stations: 0, locomotives: 0, cars: 0 }
	
}	// remember to add new variables to load function

// non gameData variables
var pps = 0;
var maxPassengers = 0;
var mps = 0;
var lineCost = 0;			// dont forget this exists
var buyMax = false;
var locoPerStat = 2;
var carPerLoco = 12;
var passPerCar = 100;










// Defining save function
function save() {
	localStorage.setItem("mfiSave",JSON.stringify(gameData));	// mfiSave is name of locally stored data
	console.log('Game Saved!');
}


// Defining load function
function load() {
	var saveGame = JSON.parse(localStorage.getItem("mfiSave"));	// saveGame is the decoded save
	if (saveGame !==null) {	// runs if player has a save file
		if (saveGame.version !== gameData.version) { // runs if the save is out of date
			if (typeof saveGame.version === 'undefined') saveGame.version = gameData.version;
			if (typeof saveGame.money === 'undefined') saveGame.money = gameData.money;
			if (typeof saveGame.ticketPrice === 'undefined') saveGame.ticketPrice = gameData.ticketPrice;
			if (typeof saveGame.passengers === 'undefined') saveGame.passengers = gameData.passengers;
			if (typeof saveGame.prestige === 'undefined') saveGame.prestige = gameData.prestige;
			if (typeof saveGame.ginza === 'undefined') saveGame.ginza = gameData.ginza;
			if (typeof saveGame.marunouchi === 'undefined') saveGame.marunouchi = gameData.marunouchi;
			if (typeof saveGame.hibiya === 'undefined') saveGame.hibiya = gameData.hibiya;
			if (typeof saveGame.tozai === 'undefined') saveGame.tozai = gameData.tozai;
			if (typeof saveGame.chiyoda === 'undefined') saveGame.chiyoda = gameData.chiyoda;
			if (typeof saveGame.yurakucho === 'undefined') saveGame.yurakucho = gameData.yurakucho;
			if (typeof saveGame.hanzomon === 'undefined') saveGame.hanzomon = gameData.hanzomon;
			if (typeof saveGame.namboku === 'undefined') saveGame.namboku = gameData.namboku;
			if (typeof saveGame.fukutoshin === 'undefined') saveGame.fukutoshin = gameData.fukutoshin;
			
			saveGame.version = gameData.version;
			console.log(`saveGame has been updated to ${gameData.version}`);
		}
		gameData = saveGame;	// loading the player's save data into the game
		refresh();	// visually refreshing values
		console.log('Game Loaded!');
	}
}


// Defining delete save function
function deleteSave() {
	clearInterval(autosaveLoop);
	if(confirm("This will delete your progress, are you sure?") === true) {
		localStorage.removeItem("mfiSave");
		console.log('Save Deleted!');
		location.reload();
	} else {
		console.log('Delete Cancelled.')
		location.reload();
	}
}




// General tools

function update(id, content) {
  document.getElementById(id).innerHTML = content;
}

function show(id) {
	document.getElementById(id).style.display = "inline-block"; 
}

function hide(id) {
	document.getElementById(id).style.display = "none"; 
}










// line refresh functions

function refreshGinza() {
	update("ginStations", format(gameData.ginza.stations) );
	ginStationCost = calcStationCost(gameData.ginza.stations);
	update("ginStationCost", format(ginStationCost));
	update("ginLocomotives", format(gameData.ginza.locomotives) );
	update("ginMaxLocomotives", format(gameData.ginza.stations * locoPerStat) );
	ginLocomotiveCost = calcLocomotiveCost(gameData.ginza.locomotives);
	update("ginLocomotiveCost", format(ginLocomotiveCost));
	update("ginCars", format(gameData.ginza.cars) );
	update("ginMaxCars", format(gameData.ginza.locomotives * carPerLoco) );
	ginCarCost = calcCarCost(gameData.ginza.cars);
	update("ginCarCost", format(ginCarCost));
}

function refreshMarunouchi() {
	update("maruStations", format(gameData.marunouchi.stations) );
	maruStationCost = calcStationCost(gameData.marunouchi.stations);
	update("maruStationCost", format(maruStationCost));
	update("maruLocomotives", format(gameData.marunouchi.locomotives) );
	update("maruMaxLocomotives", format(gameData.marunouchi.stations * locoPerStat) );
	maruLocomotiveCost = calcLocomotiveCost(gameData.marunouchi.locomotives);
	update("maruLocomotiveCost", format(maruLocomotiveCost));
	update("maruCars", format(gameData.marunouchi.cars) );
	update("maruMaxCars", format(gameData.marunouchi.locomotives * carPerLoco) );
	maruCarCost = calcCarCost(gameData.marunouchi.cars);
	update("maruCarCost", format(maruCarCost));
}

function refreshHibiya() {
	update("hibiStations", format(gameData.hibiya.stations) );
	hibiStationCost = calcStationCost(gameData.hibiya.stations);
	update("hibiStationCost", format(hibiStationCost));
	update("hibiLocomotives", format(gameData.hibiya.locomotives) );
	update("hibiMaxLocomotives", format(gameData.hibiya.stations * locoPerStat) );
	hibiLocomotiveCost = calcLocomotiveCost(gameData.hibiya.locomotives);
	update("hibiLocomotiveCost", format(hibiLocomotiveCost));
	update("hibiCars", format(gameData.hibiya.cars) );
	update("hibiMaxCars", format(gameData.hibiya.locomotives * carPerLoco) );
	hibiCarCost = calcCarCost(gameData.hibiya.cars);
	update("hibiCarCost", format(hibiCarCost));
}

function refreshTozai() {
	update("tozaStations", format(gameData.tozai.stations) );
	tozaStationCost = calcStationCost(gameData.tozai.stations);
	update("tozaStationCost", format(tozaStationCost));
	update("tozaLocomotives", format(gameData.tozai.locomotives) );
	update("tozaMaxLocomotives", format(gameData.tozai.stations * locoPerStat) );
	tozaLocomotiveCost = calcLocomotiveCost(gameData.tozai.locomotives);
	update("tozaLocomotiveCost", format(tozaLocomotiveCost));
	update("tozaCars", format(gameData.tozai.cars) );
	update("tozaMaxCars", format(gameData.tozai.locomotives * carPerLoco) );
	tozaCarCost = calcCarCost(gameData.tozai.cars);
	update("tozaCarCost", format(tozaCarCost));
}

function refreshChiyoda() {
	update("chiyoStations", format(gameData.chiyoda.stations) );
	chiyoStationCost = calcStationCost(gameData.chiyoda.stations);
	update("chiyoStationCost", format(chiyoStationCost));
	update("chiyoLocomotives", format(gameData.chiyoda.locomotives) );
	update("chiyoMaxLocomotives", format(gameData.chiyoda.stations * locoPerStat) );
	chiyoLocomotiveCost = calcLocomotiveCost(gameData.chiyoda.locomotives);
	update("chiyoLocomotiveCost", format(chiyoLocomotiveCost));
	update("chiyoCars", format(gameData.chiyoda.cars) );
	update("chiyoMaxCars", format(gameData.chiyoda.locomotives * carPerLoco) );
	chiyoCarCost = calcCarCost(gameData.chiyoda.cars);
	update("chiyoCarCost", format(chiyoCarCost));
}

function refreshYurakucho() {
	update("yuraStations", format(gameData.yurakucho.stations) );
	yuraStationCost = calcStationCost(gameData.yurakucho.stations);
	update("yuraStationCost", format(yuraStationCost));
	update("yuraLocomotives", format(gameData.yurakucho.locomotives) );
	update("yuraMaxLocomotives", format(gameData.yurakucho.stations * locoPerStat) );
	yuraLocomotiveCost = calcLocomotiveCost(gameData.yurakucho.locomotives);
	update("yuraLocomotiveCost", format(yuraLocomotiveCost));
	update("yuraCars", format(gameData.yurakucho.cars) );
	update("yuraMaxCars", format(gameData.yurakucho.locomotives * carPerLoco) );
	yuraCarCost = calcCarCost(gameData.yurakucho.cars);
	update("yuraCarCost", format(yuraCarCost));
}

function refreshHanzomon() {
	update("hanStations", format(gameData.hanzomon.stations) );
	hanStationCost = calcStationCost(gameData.hanzomon.stations);
	update("hanStationCost", format(hanStationCost));
	update("hanLocomotives", format(gameData.hanzomon.locomotives) );
	update("hanMaxLocomotives", format(gameData.hanzomon.stations * locoPerStat) );
	hanLocomotiveCost = calcLocomotiveCost(gameData.hanzomon.locomotives);
	update("hanLocomotiveCost", format(hanLocomotiveCost));
	update("hanCars", format(gameData.hanzomon.cars) );
	update("hanMaxCars", format(gameData.hanzomon.locomotives * carPerLoco) );
	hanCarCost = calcCarCost(gameData.hanzomon.cars);
	update("hanCarCost", format(hanCarCost));
}

function refreshNamboku() {
	update("namStations", format(gameData.namboku.stations) );
	namStationCost = calcStationCost(gameData.namboku.stations);
	update("namStationCost", format(namStationCost));
	update("namLocomotives", format(gameData.namboku.locomotives) );
	update("namMaxLocomotives", format(gameData.namboku.stations * locoPerStat) );
	namLocomotiveCost = calcLocomotiveCost(gameData.namboku.locomotives);
	update("namLocomotiveCost", format(namLocomotiveCost));
	update("namCars", format(gameData.namboku.cars) );
	update("namMaxCars", format(gameData.namboku.locomotives * carPerLoco) );
	namCarCost = calcCarCost(gameData.namboku.cars);
	update("namCarCost", format(namCarCost));
}

function refreshFukutoshin() {
	update("fukuStations", format(gameData.fukutoshin.stations) );
	fukuStationCost = calcStationCost(gameData.fukutoshin.stations);
	update("fukuStationCost", format(fukuStationCost));
	update("fukuLocomotives", format(gameData.fukutoshin.locomotives) );
	update("fukuMaxLocomotives", format(gameData.fukutoshin.stations * locoPerStat) );
	fukuLocomotiveCost = calcLocomotiveCost(gameData.fukutoshin.locomotives);
	update("fukuLocomotiveCost", format(fukuLocomotiveCost));
	update("fukuCars", format(gameData.fukutoshin.cars) );
	update("fukuMaxCars", format(gameData.fukutoshin.locomotives * carPerLoco) );
	fukuCarCost = calcCarCost(gameData.fukutoshin.cars);
	update("fukuCarCost", format(fukuCarCost));
}

// end line refresh functions







// Defining refresh function to update page after loading game
function refresh() {
	// refreshing values from gameData
	update("money", format(gameData.money));
	update("ticketPrice", gameData.ticketPrice.toLocaleString("en-US"));
	update("passengers", gameData.passengers.toLocaleString("en-US"));

	// refreshing formulas dependent on gameData
	updatePps();
	updateMps();
	updateMaxPassengers();
	lineCost = calcLineCost();
	
	// making sure proper elements are displayed per line
	if(gameData.ginza.line < 1) {
		update("ginLineCost", format(lineCost));
	}
	if(gameData.ginza.line > 0) {
		show("ginzaBody"); hide("ginzaHead");
		refreshGinza();
		show("marunouchiHead");
		update("maruLineCost", format(lineCost));
	}
		if(gameData.marunouchi.line > 0) {
		show("marunouchiBody"); hide("marunouchiHead");
		refreshMarunouchi();
		show("hibiyaHead");
		update("hibiLineCost", format(lineCost));
	}
		if(gameData.hibiya.line > 0) {
		show("hibiyaBody"); hide("hibiyaHead");
		refreshHibiya();
		show("tozaiHead");
		update("tozaLineCost", format(lineCost));
	}
		if(gameData.tozai.line > 0) {
		show("tozaiBody"); hide("tozaiHead");
		refreshTozai();
		show("chiyodaHead");
		update("chiyoLineCost", format(lineCost));
	}
		if(gameData.chiyoda.line > 0) {
		show("chiyodaBody"); hide("chiyodaHead");
		refreshChiyoda();
		show("yurakuchoHead");
		update("yuraLineCost", format(lineCost));
	}
		if(gameData.yurakucho.line > 0) {
		show("yurakuchoBody"); hide("yurakuchoHead");
		refreshYurakucho();
		show("hanzomonHead");
		update("hanLineCost", format(lineCost));
	}
		if(gameData.hanzomon.line > 0) {
		show("hanzomonBody"); hide("hanzomonHead");
		refreshHanzomon();
		show("nambokuHead");
		update("namLineCost", format(lineCost));
	}
		if(gameData.namboku.line > 0) {
		show("nambokuBody"); hide("nambokuHead");
		refreshNamboku();
		show("fukutoshinHead");
		update("fukuLineCost", format(lineCost));
	}
		if(gameData.fukutoshin.line > 0) {
		show("fukutoshinBody"); hide("fukutoshinHead");
		refreshFukutoshin();
	}
	
}









// INITIAL GAME LOAD
load();
refresh();
update("titleVer", `v${gameData.version}`);
if(window.location.href === "https://smmdesign.github.io/mfiMetro/alpha/") {titleVer.insertAdjacentHTML('afterend', ' <span style="font-size:70%;">ALPHA</span>');}











// GAME FUNCTIONS

function makeMoney(number) {
	gameData.money += number;
	// update("money", gameData.money.toLocaleString("en-US"));
	update("money", format(gameData.money));
	
}

function generatePassengers(number) {
	gameData.passengers += number;
	// Prevents passengers from exceeding passenger car max
	if (gameData.passengers >= calcTotalCars() * 100) {
		gameData.passengers = calcTotalCars() * 100;
	}
	// Prevents passengers from going below zero
	if (gameData.passengers < 0) {
		gameData.passengers = 0;
	}
	update("passengers", gameData.passengers.toLocaleString("en-US"));
	updateMps();
	updatePps();
}




function setTicketPrice() {
	let userPrice = prompt("Set Price ( 1 - 1,000 )","100");
	if(userPrice === null || isNaN(userPrice)) { return;}
	if(userPrice < 1 || userPrice > 1000) {
		alert("Please enter a number between 1 and 1,000."); return;
	}
	gameData.ticketPrice = Math.round(userPrice);
	update("ticketPrice", gameData.ticketPrice);
	updatePps();					// because pps is dependent on ticket price
}

function toggleBuyMax() {
	buyMax = !buyMax;
	if(buyMax) {update("buyMaxToggle", "ON"); }
	if(!buyMax) {update("buyMaxToggle", "OFF"); }
}





// equilibrium is ¥200 price

function updatePps() {
	// pps = gameData.ginza.stations * 2;
	pps = Math.ceil( (( 200 - gameData.ticketPrice ) / 200 ) * ( calcTotalStations() * 5 ) );
	// prevents errors from dividing by zero
	if(!pps) {
		pps = 0;
	}
	// prevents stalling at 0 passengers once game has started
	if(gameData.passengers === 0 && gameData.ginza.line > 0) {
		gameData.passengers = 1;
	}
	update("pps", `(${pps.toLocaleString("en-US")}/s)`)
}

function updateMps() {
	mps = gameData.passengers * gameData.ticketPrice;
	update("mps", `(¥${mps.toLocaleString("en-US")}/s)`)
}

function updateMaxPassengers() {
	maxPassengers = calcTotalCars() * 100;
	update("maxPassengers", `/${maxPassengers.toLocaleString("en-US")}`)
}








// functions that return values

function calcTotalLines() {
	return gameData.ginza.line + gameData.marunouchi.line + gameData.hibiya.line + gameData.tozai.line + gameData.chiyoda.line + gameData.yurakucho.line + gameData.hanzomon.line + gameData.namboku.line + gameData.fukutoshin.line;
}
function calcTotalStations() {
	return gameData.ginza.stations + gameData.marunouchi.stations + gameData.hibiya.stations + gameData.tozai.stations + gameData.chiyoda.stations + gameData.yurakucho.stations + gameData.hanzomon.stations + gameData.namboku.stations + gameData.fukutoshin.stations
}
function calcTotalCars() {
	return gameData.ginza.cars + gameData.marunouchi.cars + gameData.hibiya.cars + gameData.tozai.cars + gameData.chiyoda.cars + gameData.yurakucho.cars + gameData.hanzomon.cars + gameData.namboku.cars + gameData.fukutoshin.cars
}


function calcLineCost() {
	return Math.floor(50000 * (24 ** calcTotalLines()));
}

function calcStationCost(stations) {
	return Math.floor(10000 * (4	** stations ));
}

function calcLocomotiveCost(locomotives) {
	return Math.floor(10000 * (2 ** locomotives ));
}

function calcCarCost(cars) {
	return Math.floor(5000 * (1.06 ** cars ));
}






// buying functions

// ginza buying functions
function buyGinLine() {
	if(gameData.money >= lineCost) {
		gameData.ginza.line = 1;
		gameData.money -= lineCost;		
		gameData.ginza.stations += 2;
		gameData.ginza.locomotives += 1;
		gameData.ginza.cars += 1;
		show("ginzaBody");
		hide("ginzaHead");
		show("marunouchiHead");
		update("money", format(gameData.money));
		lineCost = calcLineCost();
		update("maruLineCost", format(lineCost));
		refreshGinza();
		updatePps();					// because pps is dependent on station number
		updateMaxPassengers();	// because max is dependent on car number
	}
}

function buyGinStation(number) {
	if(gameData.money >= ginStationCost) {
		gameData.ginza.stations += number;
		gameData.money -= ginStationCost * number;
		update("money", format(gameData.money));
		refreshGinza();
		updatePps();					// because pps is dependent on station number
	}
}

function buyGinLocomotive(number) {
	if(gameData.ginza.locomotives < gameData.ginza.stations * 2 && gameData.money >= ginLocomotiveCost) {
		gameData.ginza.locomotives += number;
		gameData.money -= ginLocomotiveCost * number;
		update("money", format(gameData.money));
		refreshGinza();
	}
}

function buyGinCar(number) {
	if(gameData.ginza.cars < gameData.ginza.locomotives * 12 && gameData.money >= ginCarCost) {
		gameData.ginza.cars += number;
		gameData.money -= ginCarCost * number;
		if(buyMax && gameData.money >= ginCarCost) { buyGinCar(1); }
		update("money", format(gameData.money));
		refreshGinza();
		updateMaxPassengers();	// because max is dependent on car number
	}
}
// end of ginza buying functions



// marunouchi buying functions
function buyMaruLine() {
	if(gameData.money >= lineCost) {
		gameData.marunouchi.line = 1;
		gameData.money -= lineCost;		
		gameData.marunouchi.stations += 2;
		gameData.marunouchi.locomotives += 1;
		gameData.marunouchi.cars += 1;
		show("marunouchiBody");
		hide("marunouchiHead");
		show("hibiyaHead");
		update("money", format(gameData.money));
		lineCost = calcLineCost();
		update("hibiLineCost", format(lineCost));
		update("maruStations", gameData.marunouchi.stations.toLocaleString("en-US"));
		maruStationCost = calcStationCost(gameData.marunouchi.stations);
		update("maruStationCost", format(maruStationCost));
		updatePps();					// because pps is dependent on station number
		update("maruLocomotives", gameData.marunouchi.locomotives.toLocaleString("en-US"));
		maruLocomotiveCost = calcLocomotiveCost(gameData.marunouchi.locomotives);
		update("maruLocomotiveCost", format(maruLocomotiveCost));
		update("maruCars", gameData.marunouchi.cars.toLocaleString("en-US"));
		maruCarCost = calcCarCost(gameData.marunouchi.cars);
		update("maruCarCost", format(maruCarCost));
		updateMaxPassengers();	// because max is dependent on car number
	}
}


function buyMaruStation(number) {
	if(gameData.money >= maruStationCost) {
		gameData.marunouchi.stations += number;
		gameData.money -= maruStationCost * number;
		update("money", format(gameData.money));
		update("maruStations", gameData.marunouchi.stations.toLocaleString("en-US"));
		maruStationCost = calcStationCost(gameData.marunouchi.stations);
		update("maruStationCost", format(maruStationCost));
		updatePps();					// because pps is dependent on station number
	}
}


function buyMaruLocomotive(number) {
	if(gameData.marunouchi.locomotives < gameData.marunouchi.stations * 2 && gameData.money >= maruLocomotiveCost) {
		gameData.marunouchi.locomotives += number;
		gameData.money -= maruLocomotiveCost * number;
		update("money", format(gameData.money));
		update("maruLocomotives", gameData.marunouchi.locomotives.toLocaleString("en-US"));
		maruLocomotiveCost = calcLocomotiveCost(gameData.marunouchi.locomotives);
		update("maruLocomotiveCost", format(maruLocomotiveCost));
	}
}


function buyMaruCar(number) {
	if(gameData.marunouchi.cars < gameData.marunouchi.locomotives * 12 && gameData.money >= maruCarCost) {
		gameData.marunouchi.cars += number;
		gameData.money -= maruCarCost * number;
		update("money", format(gameData.money));
		update("maruCars", gameData.marunouchi.cars.toLocaleString("en-US"));
		maruCarCost = calcCarCost(gameData.marunouchi.cars);
		update("maruCarCost", format(maruCarCost));
		updateMaxPassengers();	// because max is dependent on car number
		if(buyMax && gameData.money >= maruCarCost) {
			buyMaruCar(1);
		}
	}
}
// end of marunouchi buying functions



// hibiya buying functions
function buyHibiLine() {
	if(gameData.money >= lineCost) {
		gameData.hibiya.line = 1;
		gameData.money -= lineCost;		
		gameData.hibiya.stations += 2;
		gameData.hibiya.locomotives += 1;
		gameData.hibiya.cars += 1;
		show("hibiyaBody");
		hide("hibiyaHead");
		show("tozaiHead");
		update("money", format(gameData.money));
		lineCost = calcLineCost();
		update("tozaLineCost", format(lineCost));
		update("hibiStations", gameData.hibiya.stations.toLocaleString("en-US"));
		hibiStationCost = calcStationCost(gameData.hibiya.stations);
		update("hibiStationCost", format(hibiStationCost));
		updatePps();					// because pps is dependent on station number
		update("hibiLocomotives", gameData.hibiya.locomotives.toLocaleString("en-US"));
		hibiLocomotiveCost = calcLocomotiveCost(gameData.hibiya.locomotives);
		update("hibiLocomotiveCost", format(hibiLocomotiveCost));
		update("hibiCars", gameData.hibiya.cars.toLocaleString("en-US"));
		hibiCarCost = calcCarCost(gameData.hibiya.cars);
		update("hibiCarCost", format(hibiCarCost));
		updateMaxPassengers();	// because max is dependent on car number
	}
}


function buyHibiStation(number) {
	if(gameData.money >= hibiStationCost) {
		gameData.hibiya.stations += number;
		gameData.money -= hibiStationCost * number;
		update("money", format(gameData.money));
		update("hibiStations", gameData.hibiya.stations.toLocaleString("en-US"));
		hibiStationCost = calcStationCost(gameData.hibiya.stations);
		update("hibiStationCost", format(hibiStationCost));
		updatePps();					// because pps is dependent on station number
	}
}


function buyHibiLocomotive(number) {
	if(gameData.hibiya.locomotives < gameData.hibiya.stations * 2 && gameData.money >= hibiLocomotiveCost) {
		gameData.hibiya.locomotives += number;
		gameData.money -= hibiLocomotiveCost * number;
		update("money", format(gameData.money));
		update("hibiLocomotives", gameData.hibiya.locomotives.toLocaleString("en-US"));
		hibiLocomotiveCost = calcLocomotiveCost(gameData.hibiya.locomotives);
		update("hibiLocomotiveCost", format(hibiLocomotiveCost));
	}
}


function buyHibiCar(number) {
	if(gameData.hibiya.cars < gameData.hibiya.locomotives * 12 && gameData.money >= hibiCarCost) {
		gameData.hibiya.cars += number;
		gameData.money -= hibiCarCost * number;
		update("money", format(gameData.money));
		update("hibiCars", gameData.hibiya.cars.toLocaleString("en-US"));
		hibiCarCost = calcCarCost(gameData.hibiya.cars);
		update("hibiCarCost", format(hibiCarCost));
		updateMaxPassengers();	// because max is dependent on car number
		if(buyMax && gameData.money >= hibiCarCost) {
			buyHibiCar(1);
		}
	}
}
// end of hibiya buying functions



// tozai buying functions
function buyTozaLine() {
	if(gameData.money >= lineCost) {
		gameData.tozai.line = 1;
		gameData.money -= lineCost;		
		gameData.tozai.stations += 2;
		gameData.tozai.locomotives += 1;
		gameData.tozai.cars += 1;
		show("tozaiBody");
		hide("tozaiHead");
		show("chiyodaHead");
		update("money", format(gameData.money));
		lineCost = calcLineCost();
		update("chiyoLineCost", format(lineCost));
		update("tozaStations", gameData.tozai.stations.toLocaleString("en-US"));
		tozaStationCost = calcStationCost(gameData.tozai.stations);
		update("tozaStationCost", format(tozaStationCost));
		updatePps();					// because pps is dependent on station number
		update("tozaLocomotives", gameData.tozai.locomotives.toLocaleString("en-US"));
		tozaLocomotiveCost = calcLocomotiveCost(gameData.tozai.locomotives);
		update("tozaLocomotiveCost", format(tozaLocomotiveCost));
		update("tozaCars", gameData.tozai.cars.toLocaleString("en-US"));
		tozaCarCost = calcCarCost(gameData.tozai.cars);
		update("tozaCarCost", format(tozaCarCost));
		updateMaxPassengers();	// because max is dependent on car number
	}
}


function buyTozaStation(number) {
	if(gameData.money >= tozaStationCost) {
		gameData.tozai.stations += number;
		gameData.money -= tozaStationCost * number;
		update("money", format(gameData.money));
		update("tozaStations", gameData.tozai.stations.toLocaleString("en-US"));
		tozaStationCost = calcStationCost(gameData.tozai.stations);
		update("tozaStationCost", format(tozaStationCost));
		updatePps();					// because pps is dependent on station number
	}
}


function buyTozaLocomotive(number) {
	if(gameData.tozai.locomotives < gameData.tozai.stations * 2 && gameData.money >= tozaLocomotiveCost) {
		gameData.tozai.locomotives += number;
		gameData.money -= tozaLocomotiveCost * number;
		update("money", format(gameData.money));
		update("tozaLocomotives", gameData.tozai.locomotives.toLocaleString("en-US"));
		tozaLocomotiveCost = calcLocomotiveCost(gameData.tozai.locomotives);
		update("tozaLocomotiveCost", format(tozaLocomotiveCost));
	}
}


function buyTozaCar(number) {
	if(gameData.tozai.cars < gameData.tozai.locomotives * 12 && gameData.money >= tozaCarCost) {
		gameData.tozai.cars += number;
		gameData.money -= tozaCarCost * number;
		update("money", format(gameData.money));
		update("tozaCars", gameData.tozai.cars.toLocaleString("en-US"));
		tozaCarCost = calcCarCost(gameData.tozai.cars);
		update("tozaCarCost", format(tozaCarCost));
		updateMaxPassengers();	// because max is dependent on car number
		if(buyMax && gameData.money >= tozaCarCost) {
			buyTozaCar(1);
		}
	}
}
// end of tozai buying functions



// chiyoda buying functions
function buyChiyoLine() {
	if(gameData.money >= lineCost) {
		gameData.chiyoda.line = 1;
		gameData.money -= lineCost;		
		gameData.chiyoda.stations += 2;
		gameData.chiyoda.locomotives += 1;
		gameData.chiyoda.cars += 1;
		show("chiyodaBody");
		hide("chiyodaHead");
		show("yurakuchoHead");
		update("money", format(gameData.money));
		lineCost = calcLineCost();
		update("yuraLineCost", format(lineCost));
		update("chiyoStations", gameData.chiyoda.stations.toLocaleString("en-US"));
		chiyoStationCost = calcStationCost(gameData.chiyoda.stations);
		update("chiyoStationCost", format(chiyoStationCost));
		updatePps();					// because pps is dependent on station number
		update("chiyoLocomotives", gameData.chiyoda.locomotives.toLocaleString("en-US"));
		chiyoLocomotiveCost = calcLocomotiveCost(gameData.chiyoda.locomotives);
		update("chiyoLocomotiveCost", format(chiyoLocomotiveCost));
		update("chiyoCars", gameData.chiyoda.cars.toLocaleString("en-US"));
		chiyoCarCost = calcCarCost(gameData.chiyoda.cars);
		update("chiyoCarCost", format(chiyoCarCost));
		updateMaxPassengers();	// because max is dependent on car number
	}
}


function buyChiyoStation(number) {
	if(gameData.money >= chiyoStationCost) {
		gameData.chiyoda.stations += number;
		gameData.money -= chiyoStationCost * number;
		update("money", format(gameData.money));
		update("chiyoStations", gameData.chiyoda.stations.toLocaleString("en-US"));
		chiyoStationCost = calcStationCost(gameData.chiyoda.stations);
		update("chiyoStationCost", format(chiyoStationCost));
		updatePps();					// because pps is dependent on station number
	}
}


function buyChiyoLocomotive(number) {
	if(gameData.chiyoda.locomotives < gameData.chiyoda.stations * 2 && gameData.money >= chiyoLocomotiveCost) {
		gameData.chiyoda.locomotives += number;
		gameData.money -= chiyoLocomotiveCost * number;
		update("money", format(gameData.money));
		update("chiyoLocomotives", gameData.chiyoda.locomotives.toLocaleString("en-US"));
		chiyoLocomotiveCost = calcLocomotiveCost(gameData.chiyoda.locomotives);
		update("chiyoLocomotiveCost", format(chiyoLocomotiveCost));
	}
}


function buyChiyoCar(number) {
	if(gameData.chiyoda.cars < gameData.chiyoda.locomotives * 12 && gameData.money >= chiyoCarCost) {
		gameData.chiyoda.cars += number;
		gameData.money -= chiyoCarCost * number;
		update("money", format(gameData.money));
		update("chiyoCars", gameData.chiyoda.cars.toLocaleString("en-US"));
		chiyoCarCost = calcCarCost(gameData.chiyoda.cars);
		update("chiyoCarCost", format(chiyoCarCost));
		updateMaxPassengers();	// because max is dependent on car number
		if(buyMax && gameData.money >= chiyoCarCost) {
			buyChiyoCar(1);
		}
	}
}
// end of chiyoda buying functions



// yurakucho buying functions
function buyYuraLine() {
	if(gameData.money >= lineCost) {
		gameData.yurakucho.line = 1;
		gameData.money -= lineCost;		
		gameData.yurakucho.stations += 2;
		gameData.yurakucho.locomotives += 1;
		gameData.yurakucho.cars += 1;
		show("yurakuchoBody");
		hide("yurakuchoHead");
		show("hanzomonHead");
		update("money", format(gameData.money));
		lineCost = calcLineCost();
		update("hanLineCost", format(lineCost));
		update("yuraStations", gameData.yurakucho.stations.toLocaleString("en-US"));
		yuraStationCost = calcStationCost(gameData.yurakucho.stations);
		update("yuraStationCost", format(yuraStationCost));
		updatePps();					// because pps is dependent on station number
		update("yuraLocomotives", gameData.yurakucho.locomotives.toLocaleString("en-US"));
		yuraLocomotiveCost = calcLocomotiveCost(gameData.yurakucho.locomotives);
		update("yuraLocomotiveCost", format(yuraLocomotiveCost));
		update("yuraCars", gameData.yurakucho.cars.toLocaleString("en-US"));
		yuraCarCost = calcCarCost(gameData.yurakucho.cars);
		update("yuraCarCost", format(yuraCarCost));
		updateMaxPassengers();	// because max is dependent on car number
	}
}


function buyYuraStation(number) {
	if(gameData.money >= yuraStationCost) {
		gameData.yurakucho.stations += number;
		gameData.money -= yuraStationCost * number;
		update("money", format(gameData.money));
		update("yuraStations", gameData.yurakucho.stations.toLocaleString("en-US"));
		yuraStationCost = calcStationCost(gameData.yurakucho.stations);
		update("yuraStationCost", format(yuraStationCost));
		updatePps();					// because pps is dependent on station number
	}
}


function buyYuraLocomotive(number) {
	if(gameData.yurakucho.locomotives < gameData.yurakucho.stations * 2 && gameData.money >= yuraLocomotiveCost) {
		gameData.yurakucho.locomotives += number;
		gameData.money -= yuraLocomotiveCost * number;
		update("money", format(gameData.money));
		update("yuraLocomotives", gameData.yurakucho.locomotives.toLocaleString("en-US"));
		yuraLocomotiveCost = calcLocomotiveCost(gameData.yurakucho.locomotives);
		update("yuraLocomotiveCost", format(yuraLocomotiveCost));
	}
}


function buyYuraCar(number) {
	if(gameData.yurakucho.cars < gameData.yurakucho.locomotives * 12 && gameData.money >= yuraCarCost) {
		gameData.yurakucho.cars += number;
		gameData.money -= yuraCarCost * number;
		update("money", format(gameData.money));
		update("yuraCars", gameData.yurakucho.cars.toLocaleString("en-US"));
		yuraCarCost = calcCarCost(gameData.yurakucho.cars);
		update("yuraCarCost", format(yuraCarCost));
		updateMaxPassengers();	// because max is dependent on car number
		if(buyMax && gameData.money >= yuraCarCost) {
			buyYuraCar(1);
		}
	}
}
// end of yurakucho buying functions



// hanzomon buying functions
function buyHanLine() {
	if(gameData.money >= lineCost) {
		gameData.hanzomon.line = 1;
		gameData.money -= lineCost;		
		gameData.hanzomon.stations += 2;
		gameData.hanzomon.locomotives += 1;
		gameData.hanzomon.cars += 1;
		show("hanzomonBody");
		hide("hanzomonHead");
		show("nambokuHead");
		update("money", format(gameData.money));
		lineCost = calcLineCost();
		update("namLineCost", format(lineCost));
		update("hanStations", gameData.hanzomon.stations.toLocaleString("en-US"));
		hanStationCost = calcStationCost(gameData.hanzomon.stations);
		update("hanStationCost", format(hanStationCost));
		updatePps();					// because pps is dependent on station number
		update("hanLocomotives", gameData.hanzomon.locomotives.toLocaleString("en-US"));
		hanLocomotiveCost = calcLocomotiveCost(gameData.hanzomon.locomotives);
		update("hanLocomotiveCost", format(hanLocomotiveCost));
		update("hanCars", gameData.hanzomon.cars.toLocaleString("en-US"));
		hanCarCost = calcCarCost(gameData.hanzomon.cars);
		update("hanCarCost", format(hanCarCost));
		updateMaxPassengers();	// because max is dependent on car number
	}
}


function buyHanStation(number) {
	if(gameData.money >= hanStationCost) {
		gameData.hanzomon.stations += number;
		gameData.money -= hanStationCost * number;
		update("money", format(gameData.money));
		update("hanStations", gameData.hanzomon.stations.toLocaleString("en-US"));
		hanStationCost = calcStationCost(gameData.hanzomon.stations);
		update("hanStationCost", format(hanStationCost));
		updatePps();					// because pps is dependent on station number
	}
}


function buyHanLocomotive(number) {
	if(gameData.hanzomon.locomotives < gameData.hanzomon.stations * 2 && gameData.money >= hanLocomotiveCost) {
		gameData.hanzomon.locomotives += number;
		gameData.money -= hanLocomotiveCost * number;
		update("money", format(gameData.money));
		update("hanLocomotives", gameData.hanzomon.locomotives.toLocaleString("en-US"));
		hanLocomotiveCost = calcLocomotiveCost(gameData.hanzomon.locomotives);
		update("hanLocomotiveCost", format(hanLocomotiveCost));
	}
}


function buyHanCar(number) {
	if(gameData.hanzomon.cars < gameData.hanzomon.locomotives * 12 && gameData.money >= hanCarCost) {
		gameData.hanzomon.cars += number;
		gameData.money -= hanCarCost * number;
		update("money", format(gameData.money));
		update("hanCars", gameData.hanzomon.cars.toLocaleString("en-US"));
		hanCarCost = calcCarCost(gameData.hanzomon.cars);
		update("hanCarCost", format(hanCarCost));
		updateMaxPassengers();	// because max is dependent on car number
		if(buyMax && gameData.money >= hanCarCost) {
			buyHanCar(1);
		}
	}
}
// end of hanzomon buying functions



// namboku buying functions
function buyNamLine() {
	if(gameData.money >= lineCost) {
		gameData.namboku.line = 1;
		gameData.money -= lineCost;		
		gameData.namboku.stations += 2;
		gameData.namboku.locomotives += 1;
		gameData.namboku.cars += 1;
		show("nambokuBody");
		hide("nambokuHead");
		show("fukutoshinHead");
		update("money", format(gameData.money));
		lineCost = calcLineCost();
		update("fukuLineCost", format(lineCost));
		update("namStations", gameData.namboku.stations.toLocaleString("en-US"));
		namStationCost = calcStationCost(gameData.namboku.stations);
		update("namStationCost", format(namStationCost));
		updatePps();					// because pps is dependent on station number
		update("namLocomotives", gameData.namboku.locomotives.toLocaleString("en-US"));
		namLocomotiveCost = calcLocomotiveCost(gameData.namboku.locomotives);
		update("namLocomotiveCost", format(namLocomotiveCost));
		update("namCars", gameData.namboku.cars.toLocaleString("en-US"));
		namCarCost = calcCarCost(gameData.namboku.cars);
		update("namCarCost", format(namCarCost));
		updateMaxPassengers();	// because max is dependent on car number
	}
}


function buyNamStation(number) {
	if(gameData.money >= namStationCost) {
		gameData.namboku.stations += number;
		gameData.money -= namStationCost * number;
		update("money", format(gameData.money));
		update("namStations", gameData.namboku.stations.toLocaleString("en-US"));
		namStationCost = calcStationCost(gameData.namboku.stations);
		update("namStationCost", format(namStationCost));
		updatePps();					// because pps is dependent on station number
	}
}


function buyNamLocomotive(number) {
	if(gameData.namboku.locomotives < gameData.namboku.stations * 2 && gameData.money >= namLocomotiveCost) {
		gameData.namboku.locomotives += number;
		gameData.money -= namLocomotiveCost * number;
		update("money", format(gameData.money));
		update("namLocomotives", gameData.namboku.locomotives.toLocaleString("en-US"));
		namLocomotiveCost = calcLocomotiveCost(gameData.namboku.locomotives);
		update("namLocomotiveCost", format(namLocomotiveCost));
	}
}


function buyNamCar(number) {
	if(gameData.namboku.cars < gameData.namboku.locomotives * 12 && gameData.money >= namCarCost) {
		gameData.namboku.cars += number;
		gameData.money -= namCarCost * number;
		update("money", format(gameData.money));
		update("namCars", gameData.namboku.cars.toLocaleString("en-US"));
		namCarCost = calcCarCost(gameData.namboku.cars);
		update("namCarCost", format(namCarCost));
		updateMaxPassengers();	// because max is dependent on car number
		if(buyMax && gameData.money >= namCarCost) {
			buyNamCar(1);
		}
	}
}
// end of namboku buying functions



// fukutoshin buying functions
function buyFukuLine() {
	if(gameData.money >= lineCost) {
		gameData.fukutoshin.line = 1;
		gameData.money -= lineCost;		
		gameData.fukutoshin.stations += 2;
		gameData.fukutoshin.locomotives += 1;
		gameData.fukutoshin.cars += 1;
		show("fukutoshinBody");
		hide("fukutoshinHead");
		update("money", format(gameData.money));
		lineCost = calcLineCost();
		update("fukuStations", gameData.fukutoshin.stations.toLocaleString("en-US"));
		fukuStationCost = calcStationCost(gameData.fukutoshin.stations);
		update("fukuStationCost", format(fukuStationCost));
		updatePps();					// because pps is dependent on station number
		update("fukuLocomotives", gameData.fukutoshin.locomotives.toLocaleString("en-US"));
		fukuLocomotiveCost = calcLocomotiveCost(gameData.fukutoshin.locomotives);
		update("fukuLocomotiveCost", format(fukuLocomotiveCost));
		update("fukuCars", gameData.fukutoshin.cars.toLocaleString("en-US"));
		fukuCarCost = calcCarCost(gameData.fukutoshin.cars);
		update("fukuCarCost", format(fukuCarCost));
		updateMaxPassengers();	// because max is dependent on car number
	}
}


function buyFukuStation(number) {
	if(gameData.money >= fukuStationCost) {
		gameData.fukutoshin.stations += number;
		gameData.money -= fukuStationCost * number;
		update("money", format(gameData.money));
		update("fukuStations", gameData.fukutoshin.stations.toLocaleString("en-US"));
		fukuStationCost = calcStationCost(gameData.fukutoshin.stations);
		update("fukuStationCost", format(fukuStationCost));
		updatePps();					// because pps is dependent on station number
	}
}


function buyFukuLocomotive(number) {
	if(gameData.fukutoshin.locomotives < gameData.fukutoshin.stations * 2 && gameData.money >= fukuLocomotiveCost) {
		gameData.fukutoshin.locomotives += number;
		gameData.money -= fukuLocomotiveCost * number;
		update("money", format(gameData.money));
		update("fukuLocomotives", gameData.fukutoshin.locomotives.toLocaleString("en-US"));
		fukuLocomotiveCost = calcLocomotiveCost(gameData.fukutoshin.locomotives);
		update("fukuLocomotiveCost", format(fukuLocomotiveCost));
	}
}


function buyFukuCar(number) {
	if(gameData.fukutoshin.cars < gameData.fukutoshin.locomotives * 12 && gameData.money >= fukuCarCost) {
		gameData.fukutoshin.cars += number;
		gameData.money -= fukuCarCost * number;
		update("money", format(gameData.money));
		update("fukuCars", gameData.fukutoshin.cars.toLocaleString("en-US"));
		fukuCarCost = calcCarCost(gameData.fukutoshin.cars);
		update("fukuCarCost", format(fukuCarCost));
		updateMaxPassengers();	// because max is dependent on car number
		if(buyMax && gameData.money >= fukuCarCost) {
			buyFukuCar(1);
		}

	}
}
// end of fukutoshin buying functions




































































// Game Loop
window.setInterval(function() {
	makeMoney(gameData.passengers * gameData.ticketPrice);
	generatePassengers(pps);
	
	
}, 1000);



// Autosave Loop
autosaveLoop = window.setInterval(function() {
	save();
	
	
}, 1000);
