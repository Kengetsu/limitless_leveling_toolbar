// JavaScript Document OLD
var traveling = false; 
var running = false;
var jutsuList = [];
var trainingJutsuList = []; 
var timeoutID = [];
var previousSelections = [];
var keyMap = null;
class KeyMapping
{
	constructor()
	{
		this.travel = {
			"ArrowLeft": "west",
			"ArrowUp": "north",
			"ArrowRight": "east",
			"ArrowDown": "south",
			"unmapped": [],
			
		},
		this.jutsu = {
			"Digit1": 0,
			"Digit2": 1,
			"Digit3": 2,
			"Digit4": 3,
			"Digit5": 4,
			"Digit6": 5,
			"Numpad1": 0,
			"Numpad2": 1,
			"Numpad3": 2,
			"Numpad4": 3,
			"Numpad5": 4,
			"Numpad6": 5,
			"unmapped": [],
		},
		this.ramen = {
			"Digit7": 0,
			"Digit8": 1,
			"Digit9": 2,
			"Numpad7": 0,
			"Numpad8": 1,
			"Numpad9": 2,
			"unmapped": [],
		},
		this.page = {
			"KeyQ": "Scout",
			"KeyW": "Train",
			"KeyE": "Travel",
			"KeyA": "Arena",
			"KeyS": "Ramen",
			"KeyD": "Mission",
			"KeyZ": "Special",
			"KeyX": "Profile",
			"KeyC": "Chat",
			"unmapped": [],
		},
		this.action = {
			"Space": "Fight",
			"KeyR": "RepeatTrain",
			"KeyT": "CancelTrain",
			"KeyF": "RepeatMission",
			"KeyG": "CancelMission",
			"KeyP": "RaidMode",
			"unmapped": [],
		}
	}
}
const pageMap =
{
	"Profile": 1,
	"Chat": 7,
	"Travel": 11,
	"Arena": 12,
	"Train": 13,
	"Mission": 14,
	"Special": 15,
	"Pvp": 19,
	"Clan": 20,
	"Scout": 22,
	"Ramen": 23,
};

const RankOptionsMap = {
	"akademi-sei": {
		ai: [
			{name: "Annoying Crow", id:"1"},
			{name:"Academy Bully", id:"2"},
			{name:"Prodigy Student", id:"3"},
		],
		missions: [
		],
	},
	"genin": {
		ai: [
			{name:"Academy Graduate", id:"4"},
			{name:"Crafty Kunoichi", id:"13"},
			{name:"Advanced Genin", id:"5"},
			{name:"Weapon Fanatic", id:"6"},
			{name:"Talented Genin", id:"10"},
			{name:"Prodigious Genin", id:"24"},
			{name:"Insidious Serpent", id:"25"},
		],
		missions: [
			{name: "Special Request", id: "start_mission=1"},
			{name: "Deliver Food", id: "start_mission=2"},
			{name: "Retrieve the pet Llama!", id: "start_mission=3"},
		],
	},
	"chuunin": {
		ai: [
			{name:"Prodigious Gennin", id:"24"},
			{name:"Insidious Serpent", id:"25"},
			{name:"Furious Tiger", id:"7"},
			{name:"Elite Contender", id:"11"},
			{name:"Chuunin Specialist", id:"26"},
			{name:"Jounin's Shadow Clone", id:"12"},
			{name:"Elderly Shinobi", id:"27"},
			{name:"Tiny Yokai", id:"28"},
			{name:"Cunning Hypnotist", id:"29"},
			{name:"Genin Trio", id:"8"},
			{name:"Vengeful Rival", id:"33"},
			{name:"Hired Assassin", id:"34"},
			{name:"Bloodline Inheritor", id:"35"},
			{name:"Twisted Killer", id:"36"},
			{name:"Legendary Crow", id:"9"},
		],
		missions: [
			{name: "Form Team & Scout Area", id: "start_mission=4"},
			{name: "Patrol Village Primeter", id: "start_mission=6"},
			{name: "Tactical Espionage", id: "start_mission=7"},
			{name: "Fight Club", id: "start_mission=9"},
			{name: "Study Clan Heritage", id: "clan&start_mission=8"},
		],
	},
	"jonin": {
		ai: [
			{name:"Chuunin Expert", id:"14"},
			{name:"Village Outlaw", id:"15"},
			{name:"Rogue Samurai", id:"16"},
			{name:"Enemy ANBU", id:"17"},
			{name:"Muscle-bound Jonin", id:"21"},
			{name:"Renegade Shinobi ", id:"30"},
			{name:"Fumetsu Defector", id:"22"},
			{name:"Kibou Defector", id:"23"},
			{name:"Monstrous Yokai ", id:"31"},
			{name:"Chuunin Assault Squad", id:"32"},
			{name:"ANBU Captain", id:"18"},
		],
		missions: [
			{name: "Form Team & Scout Area", id: "start_mission=4"},
			{name: "Patrol Village Primeter", id: "start_mission=6"},
			{name: "Tactical Espionage", id: "start_mission=7"},
			{name: "Fight Club", id: "start_mission=9"},
			{name: "ANBU Ambush", id: "start_mission=11"},
			{name: "Study Clan Heritage", id: "clan&start_mission=8"},
		],
	}
};

var URL_ROOT = "https://shinobichronicles.com/";
var FOOD_OPTIONS = ["vegetable", "pork", "deluxe"];

function goAction(ev){ //Check key used and do labeled function.
	var key = ev.code;
	switch(true){
		case key in keyMap.travel:
			top.mainFrame.location=`${URL_ROOT}?id=${pageMap.Travel}&travel=${keyMap.travel[key]}`;
			//top.mainFrame.location=`${URL_ROOT}?id=${pageMap.Travel}`;
			setTimeout((evt) => {
				console.log('mainFrame focused!');
				top.mainFrame.focus();
			}, 80);
			break;
		case key in keyMap.jutsu:
			var jutsu = jutsuList[keyMap.jutsu[key]]
			arenaJutsu(jutsu);
			break;
		case key in keyMap.ramen:
			var ramen = keyMap.ramen[key];
			consumeRamen(ramen);
			break;
		case key in keyMap.page:
			var page = keyMap.page[key];
			if(page == "Mission")
			{
				top.mainFrame.location=`${URL_ROOT}?id=${pageMap[page]}&continue=1`;
			}
			else
			{
				top.mainFrame.location=`${URL_ROOT}?id=${pageMap[page]}`;
			}			
			break;
		case key in keyMap.action:
			var action = keyMap.action[key];
			switch(action)
			{
				case "Fight":
					enemy.arena();
					break;
				case "RepeatTrain":
					$('#trainingForm').submit();
					break;
				case "CancelTrain":
					top.mainFrame.location=`${URL_ROOT}?id=${pageMap.Train}&cancel_training=1`;
					break;
				case "RepeatMission":
					missions.set();
					break;
				case "CancelMission":
					top.mainFrame.location=`${URL_ROOT}?id=${pageMap.Mission}&cancel_mission=1`;
					break;
				case "RaidMode":
					$("#raidCheckbox").click();
					break;
				default:
					break;
			}
			break;
		default:
			break;	
	}
}
var timer = {
	travel: function() { //Add delay when traveling across the map.
		setTimeout(function () {traveling = false;}, 60);
	},
	train: function(trainType) { //Handle alerting user for when training is complete.
		var baseTrainLength = 600000;
		var clanBoost = 0.1;
		var boost = document.getElementById("boost");
		var seal = document.getElementById("seal");
		var times = [];
		var durations = ["Short", "Long", "Extended"];
		trainType = durations.indexOf(trainType);
		if (trainType == -1) return false;

		if(seal.checked) { //Type is short - 0, long - 1, extended - 2.
			times = [baseTrainLength, (baseTrainLength * 4) * 1.5, Math.round((baseTrainLength * 24) * 1.5)];
		}
		else
		{
			times = [baseTrainLength, baseTrainLength * 4, baseTrainLength * 24];
		}
		
		if(boost.checked) { //Cut time and alert based on boost.
			//timer.clear();
			$('#indicator').css("color","green");
			timeoutID.push(setTimeout(function () {
				parent.document.title = "Training Has Completed"; 
				alert ("Training has completed");
				parent.document.title = "Shinobi Chonicles Hotkeys";
				$('#indicator').css("color","red");
			}, delay = (times[trainType] - (times[trainType] * clanBoost))));
			//console.log("delay: "+ delay + " " + "Type: " + type + " " + "TimeoutID: " + timeoutID);
			return false;
		}
		else { //Standard alert without a boost reduction.
			//timer.clear();
			$('#indicator').css("color","green");
			timeoutID.push(setTimeout(function () {
				parent.document.title = "Training Has Completed"; 
				alert ("Training has completed");
				parent.document.title = "Shinobi Chonicles Hotkeys";
				$('#indicator').css("color","red");
			}, times[trainType]));
			//console.log(times[type] + " " + timeoutID);
			return false;
		}
	},
	clear: function () { // Clear all timers for training.
		//console.log("Reset function initial timeoutid: " + timeoutID);
		for(key in timeoutID) {
			clearTimeout(timeoutID[key]);
		}
		//console.log(timeoutID);
		$('#indicator').css("color","red");
	}
}
const populateRankData = (options, ele, optionPrefix='') =>
{
	ele.empty();

	if (options == null || options == '') return;

	for (let item in options)
	{
		let new_option = `<option value="${optionPrefix + options[item].id}">${options[item].name}</option>`;
		ele.append(new_option);
	}
};
var missions = {
	gen: function() { //Generates mission list based on what rank is selected.
		var rank = document.getElementById("userRank").value;
		var select = $("#selectMission");
		
		populateRankData(RankOptionsMap[rank.toLowerCase()].missions, select);
	},
	set: function(mission = null) { //Start selected mission.
		if (mission == null)
		{
			mission = document.getElementById("selectMission").value.split('&');
		}
		
		if (mission[0] == 'clan')
		{
			top.mainFrame.location=`${URL_ROOT}?id=${pageMap.Clan}&${mission[1]}`;
		}
		else
		{
			top.mainFrame.location=`${URL_ROOT}?id=${pageMap.Mission}&${mission[0]}`;
		}
		
	}
}
var enemy = {
	gen: function() { // Generate list of enemy based on rank selected.
		var rank = document.getElementById("userRank").value;
		var select = $("#enemyList");

		populateRankData(RankOptionsMap[rank.toLowerCase()].ai, select, 'fight=');
	},
	arena: function() { //Start fight based on seleced enemy.
		var fight = document.getElementById("enemyList").value;
		top.mainFrame.location=`${URL_ROOT}?id=${pageMap.Arena}&${fight}`;
	}
	
}
function changeVisibility(evt)
{
	if (evt == undefined) return;

	let element = $("#" + evt.target.dataset.id);

	if (evt.target.dataset.id != "options" && element.siblings().length > 0)
	{
		element.siblings().css('visibility', 'collapse');
	}
	if (element.css('visibility') == "collapse")
	{
		element.css('visibility', 'visible');
	}
	else
	{
		element.css('visibility', 'collapse');
	}
	
}

function arenaJutsu(array) { // Using jutsu information from cookie array, fill out form information.
	//var location = top.mainFrame.location.href;
	var jutsuForm = $('#useJutsu');
	if (array === undefined) return false;
	if (jutsuForm.attr('action') == undefined)
	{
		jutsuForm.attr('action', `${URL_ROOT}?id=${pageMap.Arena}`);
	}
	if((array.jutsuType == "bloodline_jutsu") || (array.jutsuType == "taijutsu")) {
		$('#hand_seal_input').val("");
		$('#jutsuType').val(array.jutsuType);
		$('#jutsuID').val(array.jutsuSeals);
		
		if (array.weaponID == undefined)
		{
			$('#weaponID').val('');
		}
		else
		{
			$('#weaponID').val(array.weaponID);
		}
		
		jutsuForm.submit();
	}
	else {
		$('#hand_seal_input').val(array.jutsuSeals);
		$('#jutsuType').val(array.jutsuType);
		jutsuForm.submit();
	}
}
function addJutsu(type, name, value, weapon) { //Append jutsu to array
	if(jutsuList.length == 6) { // Prompt to clear jutsu if array is holding 6 jutsu.
		var accept = prompt("Max jutsu reached, clear list?", "yes/no")
		accept = accept.toUpperCase();
		if(accept == "YES") {
			clearJutsu();
		}
		else {
			return false;
		}
	}
	if(jutsuList.length < 6) {
		jutsuList.push({ jutsuType : type , jutsuName : name , jutsuSeals : value, weaponID : weapon });
		Cookies.set("jutsu", JSON.stringify(jutsuList), {expires: 365, path: '/', secure: true, sameSite: 'None'});
	}
}
function moveJutsu(currentPos, newPos)
{
	if (newPos < 0)
	{
		newPos = 0;
	}
	var element = jutsuList.splice(currentPos, 1)[0];
	jutsuList.splice(newPos, 0, element);
	Cookies.set("jutsu", JSON.stringify(jutsuList), {expires: 365, path: '/', secure: true, sameSite: 'None'});
	top.frames['toolBar'].location.reload();
}
function clearJutsu() { // Clear jutsu on array index if passed int else clear all.
	var id = event.target.dataset.id;
	if(id) {
		jutsuList.splice(id, 1);
		Cookies.set("jutsu", JSON.stringify(jutsuList), {expires: 365, path: '/', secure: true, sameSite: 'None'});
	}
	else {
		jutsuList.length = 0;
		Cookies.set("jutsu", JSON.stringify(jutsuList), {expires: 365, path: '/', secure: true, sameSite: 'None'});
	}
	populateJutsu();
	top.frames['toolBar'].location.reload();
}
function consumeRamen(selection)// Eat tier of ramen.
{
	// Page Url= ?id=23&heal=vegetable
	
	if (FOOD_OPTIONS[selection] == undefined) return false;
	var food = FOOD_OPTIONS[selection];
	
	top.mainFrame.location=`${URL_ROOT}?id=${pageMap.Ramen}&heal=${food}`;
}
function remapKey(ev)
{
	var key = ev.target.dataset.key;
	var set = ev.target.dataset.set;
	var action = ev.target.dataset.action;
	var newKey = ev.code;

	ev.target.value = null;

	console.log(key, set);
	if (key in keyMap[set])
	{
		var accept = confirm(`Are you sure you want to map ${set} : ${action} to ${newKey}`);

		if (!accept)
		{
			return false;
		}

		var keyConflict = checkKey(newKey);
		if(keyConflict) 
		{
			if (!confirm(`Key is already bound to ${keyConflict[2]}, are you sure you want to clear the binding for ${keyConflict[2]}`))
			{
				return false;
			}
			clearBinding(...keyConflict);
			
		};
		if (key == 'unmapped')
		{
			var index = keyMap[set][key].indexOf(action);
			keyMap[set][newKey] = keyMap[set][key][index];
			keyMap[set]["unmapped"].splice(index,1);
		}
		else
		{
			keyMap[set][newKey] = keyMap[set][key];
			delete keyMap[set][key];
		}
	}
	else
	{
		alert("There is something wrong with your key mapping, please try the restore default button then try again");
		return;
	}
	Cookies.set("customKeys", JSON.stringify(keyMap), {expires: 365, path: '/', secure: true, sameSite: 'None'});
	
	reloadToolbar();
}
function clearBinding(keySet, key, action, reload = false)
{
	if (keySet == undefined || key == undefined || action == undefined) return false;
	delete keyMap[keySet][key];
	if("unmapped" in keyMap[keySet])
	{
		if (keyMap[keySet]["unmapped"].indexOf(action) === -1)
		{
			keyMap[keySet]["unmapped"].push(action);
		}	
	}
	else
	{
		keyMap[keySet]["unmapped"] = [action];
	}
	if (reload) {
		Cookies.set("customKeys", JSON.stringify(keyMap), {expires: 365, path: '/', secure: true, sameSite: 'None'});
		reloadToolbar();
	}

	
}
function resetKeyMapping()
{
	keyMap = new KeyMapping();
	Cookies.set("customKeys", JSON.stringify(keyMap), {expires: 365, path: '/', secure: true, sameSite: 'None'});
	reloadToolbar();
}
function checkKey(key)
{
	for (let set in keyMap)
	{
		if (key in keyMap[set])
		{
			if (key == "unmapped") continue;
			return [set, key, keyMap[set][key]];
		}
	}
	return false;
}
function reloadToolbar()
{
	location.reload();
	top.frames['toolBar'].location.reload();
}

function train(evt)
{	
	$('#trainingType').prop('name', $("#trainingType").find(":selected").data('type'));
	if ($(evt.target).attr('action') == undefined)
	{	
		$(evt.target).attr('action', `${URL_ROOT}?id=${pageMap.Train}`);
	}
	if ($('#alerts').prop("checked") == true)
	{
		timer.clear();
		timer.train($(evt.target).children()[1].value);
	}
}
function trainChange(evt)
{
	let trainingType = $("#trainingType").val();
	let trainingVal = $("#trainingDuration").val();
	previousSelections[0] = [trainingType, trainingVal];
	Cookies.set('previousSelections', JSON.stringify(previousSelections), {expires: 365, path: '/', secure: true, sameSite: 'None'});
}
function selectionChange(evt)
{
	let element = evt.target;
	if (element.id == 'selectMission')
	{
		previousSelections[1] = evt.target.value;
	}
	else if (element.id == 'enemyList')
	{
		previousSelections[2] = evt.target.value;
	}
	else
	{
		return false;
	}
	Cookies.set('previousSelections', JSON.stringify(previousSelections), {expires: 365, path: '/', secure: true, sameSite: 'None'});
}
function validateKeyMapping(currentMap)
{
	var defaultMap = new KeyMapping();
	var newMap = currentMap;
	var changedKeys = [];
	var defaultActionList = {};
	var userActionList = {};

	for(let set in currentMap)
	{
		for(let key in currentMap[set])
		{		
			if (key == 'unmapped') continue;
			userActionList[currentMap[set][key]] = [key, set];
			if (typeof currentMap[set][key] == 'object')
			{
				if (currentMap[set][key].length == 1)
				{
					newMap[set][key] = currentMap[set][key][0];
					changedKeys.push(key);
				}
				else
				{
					delete newMap[set][key];
					newMap[set]['unmapped'].push(key);
					changedKeys.push(key);
				}
			}
			//console.log(currentMap[set][key], defaultMap[set][key]);
		}
	}

	//Add any missing keys
	for(let set in defaultMap)
	{
		for(let key in defaultMap[set])
		{
			if (key != 'unmapped')
			{
				defaultActionList[defaultMap[set][key]] = [key, set];
			}
			if (key in currentMap[set]) continue;
			if (defaultMap[set][key] in userActionList) continue;
			if (currentMap[set]['unmapped'].indexOf(defaultMap[set][key]) != -1) continue;
			//console.log(newMap[set][key], defaultMap[set][key]);
			newMap[set][key] = defaultMap[set][key];
			changedKeys.push(key);
		}
	}
	
	//console.log(defaultActionList, userActionList);
	for (let action in userActionList)
	{
		if(action in defaultActionList) continue;
		//console.log(userActionList[action]);
		delete newMap[userActionList[action][1]][userActionList[action][0]];
		changedKeys.push(userActionList[action][0]);
		// if(userActionList[action][1] == 'unmapped') continue;
		// console.log(action, userActionList[action], defaultActionList[action] == undefined)
	}
	if (changedKeys.length > 0)
	{
		alert(`Your key mapping has updated. The following keys were changed ${changedKeys.join(',')}`)
		Cookies.set("customKeys", JSON.stringify(newMap), {expires: 365, path: '/', secure: true, sameSite: 'None'});
	}
	return newMap;
}
function populateTrainingJutsu(arr)
{ //This populates the training jutsu dropdown.
	$('#jutsuList').empty();
	for (let jutsu in arr)
	{
		$('#jutsuList').append($('<option>', {
			value: arr[jutsu].id,
			title: arr[jutsu].type,
			text: arr[jutsu].name
		}));
	}
	trainingJutsuList = arr;
}
function trainJutsu(evt)
{
	if ($(evt.target).attr('action') == undefined)
	{	
		$(evt.target).attr('action', `${URL_ROOT}?id=${pageMap.Train}`);
	}
}
async function getJutsuId(name)
{
	const request = new Request('./sc_jutsu.json');
	const response = await fetch(request);
	const jutsuLibrary = await response.json();
	let filtered = jutsuLibrary.filter(jutsu => jutsu.name === name)
	if (filtered.length == 0) return undefined;
	return filtered[0].jutsu_id;
}
function clearTrainingJutsu(all = false) 
{ // Clear jutsu on array index if passed int else clear all. This is used for the CP page.
	var id = event.target.dataset.id;
	if(all)
	{
		trainingJutsuList.length = 0;
		Cookies.set("trainingJutsu", JSON.stringify(trainingJutsuList), {expires: 365, path: '/', secure: true, sameSite: 'None'});
	}
	else
	{
		trainingJutsuList.splice(id, 1);
		Cookies.set("trainingJutsu", JSON.stringify(trainingJutsuList), {expires: 365, path: '/', secure: true, sameSite: 'None'});
	}
	top.frames['toolBar'].location.reload();
	populateTrainingJutsuList();
}
function setTrainJutsu()
{ // Sets new jutsu in the training list on CP.
	let data = event.target.dataset;
	let duplicate = trainingJutsuList.filter(jutsu => jutsu.id == data.id);
	if(duplicate.length > 0) return;
	if(trainingJutsuList.length == 6) { // Prompt to clear jutsu if array is holding 6 jutsu.
		var accept = prompt("Max jutsu reached, clear list?", "yes/no")
		accept = accept.toUpperCase();
		if(accept == "YES") {
			clearTrainingJutsu(true);
		}
		else {
			return false;
		}
	}
	trainingJutsuList.push({name: data.name, type: data.type, id: data.id});
	Cookies.set("trainingJutsu", JSON.stringify(trainingJutsuList), {expires: 365, path: '/', secure: true, sameSite: 'None'});
	top.frames['toolBar'].location.reload();
	populateTrainingJutsuList();
}
