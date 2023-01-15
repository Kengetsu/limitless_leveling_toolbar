// JavaScript Document OLD
var traveling = false; running = false; jutsuList = []; timeoutID = [];
var previousTraining = null;
var previousMission = null;

var URL_ROOT = "https://shinobichronicles.com/";
var FOOD_OPTIONS = ["vegetable", "pork", "deluxe"];

$(document).ready(function () {
	if(Cookies.get("css")) {
		$("#theme").attr("href",Cookies.get("css"));
	
	};
	if(Cookies.get("rank")) {
		$("#userRank").val(Cookies.get("rank"));
		
		missions.gen();
		enemy.gen();
	};
	if(Cookies.get("jutsu")) {
		jutsuList = $.parseJSON(Cookies.get("jutsu"));
	};
	$('#layout').change(function() {
		if ($("layout").val() == "selection") {
			return;
		}
		else {
			$("#theme").attr("href", $(this).val());
			Cookies.set("css",$(this).val(), {expires: 365, path: '/', secure: true, sameSite: 'None', secure: true, sameSite: 'None'});
			return false;
		}
	});
	$('#userRank').change(function() {
		enemy.gen();
		missions.gen();
		if ($("userRank").val() == "selection") {
			return;
		}
		else {
			Cookies.set("rank", $(this).val(), {expires: 365, path: '/', secure: true, sameSite: 'None'});
			return false;
		}
	});
	
	var sparringCheckbox = document.getElementById("sparringCheckbox");
	var pvpCheckbox = document.getElementById("pvpCheckbox");
	var missionsCheckbox = document.getElementById("missionsCheckbox");
	$('#sparringCheckbox').click(function () {
		if(sparringCheckbox.checked) {
			pvpCheckbox.checked = false;
			missionsCheckbox.checked = false;
			$('#useJutsu').get(0).setAttribute('action', URL_ROOT + "?id=22");
		}
		else {
			$('#useJutsu').get(0).setAttribute('action', URL_ROOT + "?id=12");
		}
	});
	$('#pvpCheckbox').click(function () {
		if(pvpCheckbox.checked) {
			sparringCheckbox.checked = false;
			missionsCheckbox.checked = false;
			$('#useJutsu').get(0).setAttribute('action', URL_ROOT + "?id=19");
		}
		else {
			$('#useJutsu').get(0).setAttribute('action', URL_ROOT + "?id=12");
		}
	});
	$('#missionsCheckbox').click(function () {
		if(missionsCheckbox.checked) {
			sparringCheckbox.checked = false;
			pvpCheckbox.checked = false;
			$('#useJutsu').get(0).setAttribute('action', URL_ROOT + "?id=14");
		}
		else {
			$('#useJutsu').get(0).setAttribute('action', URL_ROOT + "?id=12");
		}
	});
	
	$('.SubmissionButtons').keydown(function (event)
	{
		event.preventDefault();
	});
});

function goAction(evt){ //Check key used and do labeled function.
	var key = (evt) ? evt.which : e.keyCode;
	//console.log(key);
		switch(key){
			case 37: // Left - Travel West
				if(!traveling) {
					top.mainFrame.location=URL_ROOT + "?id=11&travel=west";
					traveling = true;
					timer.travel();
					break;
				};
			case 38: // Up - Travel North
				if(!traveling) {
					top.mainFrame.location=URL_ROOT + "?id=11&travel=north";
					traveling = true;
					timer.travel();
					break;
				};
			case 39: // Right - Travel East
				if(!traveling) {
					top.mainFrame.location=URL_ROOT + "?id=11&travel=east";
					traveling = true;
					timer.travel();
					break;
				};
			case 40: // Down - Travel South
				if(!traveling) {
					top.mainFrame.location=URL_ROOT + "?id=11&travel=south";
					traveling = true;
					timer.travel();
					break;
				};
			case 49:
			case 97: //Number pad 1 - use jutsu in array position 0
				arenaJutsu(jutsuList[0]);
				break;
			case 50:
			case 98: //Number pad 2 - use jutsu in array position 1
				arenaJutsu(jutsuList[1]);
				break;
			case 51:
			case 99: //Number pad 3 - use jutsu in array position 2
				arenaJutsu(jutsuList[2]);
				break;
			case 52:
			case 100: //Number pad 4 - use jutsu in array position 3
				arenaJutsu(jutsuList[3]);
				break;
			case 53:
			case 101: //Number pad 5 - use jutsu in array position 4
				arenaJutsu(jutsuList[4]);
				break;
			case 54:
			case 102: //Number pad 6 - use jutsu in array position 5
				arenaJutsu(jutsuList[5]);
				break;
			case 55:
			case 103:
				consumeRamen(0);
				break;
			case 56:
			case 104:
				consumeRamen(1);
				break;
			case 57:
			case 105:
				consumeRamen(2);
				break;
			case 81: // Q - Scout Area
				top.mainFrame.location=URL_ROOT + "?id=22";
				break;
			case 87: // W - Training
				top.mainFrame.location=URL_ROOT + "?id=13";
				break;
			case 69: // E - Travel Map
				top.mainFrame.location=URL_ROOT + "?id=11";
				break;
			case 65: // A - Arena
				top.mainFrame.location=URL_ROOT + "?id=12";
				break;
			case 83: // S - Ramen Shop
				top.mainFrame.location=URL_ROOT + "?id=23";
				break;
			case 68: // D - Missions
				top.mainFrame.location=URL_ROOT + "?id=14";
				break;
			case 90: // Z - Special Missions
				top.mainFrame.location=URL_ROOT + "?id=15";
				break;
			case 88: // X - View Profile
				top.mainFrame.location=URL_ROOT + "?id=1";
				break;
			case 67: // C - Chat
				top.mainFrame.location=URL_ROOT + "?id=7";
				break;
			case 32: //Space Bar - Fight Selected
				$('#arenaFight select').submit();
				break;
			case 82: // R - Repeat Training
				if (previousTraining == null) break;
				var selectElement = $('select[name=' + previousTraining[0] + ']');
				selectElement.selectedIndex = previousTraining[0];
				selectElement.siblings('input[value=' + previousTraining[2] +']')[0].click()
				//$('select[name=skill]').siblings('input[value=Short]')[0].click()
				break;
			case 70: // F - Repeat Mission
				if (previousMission == null) break;
				missions.set(previousMission);
			default:
				break;
		}
}
var timer = {
	travel: function() { //Add delay when traveling across the map.
		setTimeout(function () {traveling = false;}, 60);
	},
	train: function(type) { //Handle alerting user for when training is complete.
		var baseTrainLength = 600000;
		var clanBoost = 0.1;
		var alerts = document.getElementById("alerts");
		var boost = document.getElementById("boost");
		var seal = document.getElementById("seal");
		var times = [];
		if(seal.checked) { //Type is short - 0, long - 1, extended - 2.
			times = [baseTrainLength, (baseTrainLength * 4) * 1.5, Math.round((baseTrainLength * 24) * 1.5)];
		}
		else
		{
			times = [baseTrainLength, baseTrainLength * 4, baseTrainLength * 24];
		}
		
		if(boost.checked && alerts.checked) { //Cut time and alert based on boost.
			//timer.clear();
			$('#indicator').css("color","green");
			timeoutID.push(setTimeout(function () {
				parent.document.title = "Training Has Completed"; 
				alert ("Training has completed");
				parent.document.title = "Shinobi Chonicles Hotkeys";
				$('#indicator').css("color","red");
				top.mainFrame.location.reload();
			}, delay = (times[type] - (times[type] * clanBoost))));
			//console.log("delay: "+ delay + " " + "Type: " + type + " " + "TimeoutID: " + timeoutID);
			return false;
		}
		else if(alerts.checked) { //Standard alert without a boost reduction.
			//timer.clear();
			$('#indicator').css("color","green");
			timeoutID.push(setTimeout(function () {
				parent.document.title = "Training Has Completed"; 
				alert ("Training has completed");
				parent.document.title = "Shinobi Chonicles Hotkeys";
				$('#indicator').css("color","red");
				top.mainFrame.location.reload();
			}, times[type]));
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
var missions = {
	gen: function() { //Generates mission list based on what rank is selected.
		var rank = document.getElementById("userRank").value;
		var select = document.getElementById("selectMission").options;
		switch(rank) {
			case "genin":
				select.length = 0;
				select[select.length] = new Option("Special Request", "start_mission=1");
				select[select.length] = new Option("Deliver Food", "start_mission=2");
				select[select.length] = new Option("Retrieve the pet Llama!", "start_mission=3");
				return false;
				break;
			case "chuunin":
				select.length = 0;
				select[select.length] = new Option("Form Team & Scout Area", "start_mission=4");
				select[select.length] = new Option("Patrol Village Primeter", "start_mission=6");
				select[select.length] = new Option("Tactical Espionage", "start_mission=7");
				select[select.length] = new Option("Fight Club", "start_mission=9");
				select[select.length] = new Option("Study Clan Heritage", "clan&start_mission=8");
				return false;
				break;
			case "jonin":
				select.length = 0;
				select[select.length] = new Option("Form Team & Scout Area", "start_mission=4");
				select[select.length] = new Option("Patrol Village Primeter", "start_mission=6");
				select[select.length] = new Option("Tactical Espionage", "start_mission=7");
				select[select.length] = new Option("Fight Club", "start_mission=9");
				select[select.length] = new Option("ANBU Ambush", "start_mission=11");
				select[select.length] = new Option("Study Clan Heritage", "clan&start_mission=8");
				return false;
				break;
			default:
				select.length = 0;
				document.getElementById("startMission").style.display = "none";
				return false;
				break;
		};},
	set: function(mission = null) { //Start selected mission.
		if (mission == null)
		{
			mission = document.getElementById("selectMission").value.split('&');
		}
		
		previousMission = mission;
		
		if (mission[0] == 'clan')
		{
			top.mainFrame.location=URL_ROOT + "?id=20&" + mission[1];
		}
		else
		{
			top.mainFrame.location=URL_ROOT + "?id=14&" + mission[0];
		}
		
	}
}
var enemy = {
	gen: function() { // Generate list of enemy based on rank selected.
		var rank = document.getElementById("userRank").value;
		var select = document.getElementById("enemyList").options;
		switch(rank) {
			case "akademi-sei":
					select.length = 0; 
					select[select.length] = new Option("Annoying Crow", "fight=1");
					select[select.length] = new Option("Academy Bully", "fight=2");
					select[select.length] = new Option("Prodigy Student", "fight=3");
					break;
			case "genin":
					select.length = 0; 
					select[select.length] = new Option("Academy Graduate", "fight=4");
					select[select.length] = new Option("Crafty Kunoichi", "fight=13");
					select[select.length] = new Option("Advanced Genin", "fight=5");
					select[select.length] = new Option("Weapon Fanatic", "fight=6");
					select[select.length] = new Option("Talented Genin", "fight=10");
					break;
			case "chuunin":
					select.length = 0;
					select[select.length] = new Option("Furious Tiger", "fight=7");
					select[select.length] = new Option("Elite Contender", "fight=11");
					select[select.length] = new Option("Jonin Shadow Clone", "fight=12");
					select[select.length] = new Option("Genin Trio", "fight=8");
					select[select.length] = new Option("Novice Chuunin", "fight=9");
					break;
			case "jonin":
					select.length = 0;
					select[select.length] = new Option("Chuunin Expert", "fight=14");
					select[select.length] = new Option("Village Outlaw", "fight=15");
					select[select.length] = new Option("Rogue Samurai", "fight=16");
					select[select.length] = new Option("Enemy ANBU", "fight=17");
					select[select.length] = new Option("ANBU Captain", "fight=18");
					break;
				default:
					select.length = 0;
					break;
		}
	},
	arena: function() { //Start fight based on seleced enemy.
		var fight = document.getElementById("enemyList").value;
		top.mainFrame.location=URL_ROOT + "?id=12&" + fight;
	}
	
}
var toggle = { //Toggle menu bars for skills, attributes, skin, and missions.
	panel: function(element) {
		var menu = ["trainSkills", "trainAttributes", "startMission", "arenaFight", "styleChange"];
		for (i = 0; i < menu.length; i++) {
			if (menu[i] == element) {
				$("#" + element).toggle();
			}
			else {
				document.getElementById(menu[i]).style.display = "none";
			}
		}
	}
}
function arenaJutsu(array) { // Using jutsu information from cookie array, fill out form information.
	//$('#useJutsu').get(0).setAttribute('action', top.mainFrame.location);
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
		
		$('#useJutsu').submit();
	}
	else {
		$('#hand_seal_input').val(array.jutsuSeals);
		$('#jutsuType').val(array.jutsuType);
		$('#useJutsu').submit();
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
	location.reload();
	top.frames['toolBar'].location.reload();
}
function consumeRamen(selection)// Eat tier of ramen.
{
	// Page Url= ?id=23&heal=vegetable
	
	if (FOOD_OPTIONS[selection] == undefined) return false;
	var food = FOOD_OPTIONS[selection];
	
	top.mainFrame.location=URL_ROOT + "?id=23&heal=" + food;
}
function recordTraining(training)
{
	//console.log(training, event.submitter.value);
	if (training.length > 1) return false;
	var trainType = training[0].name;
	var trainValue = training[0].selectedIndex;
	var trainDuration = event.submitter.value;
	
	previousTraining = [trainType, trainValue, trainDuration];
	//console.log(previousTraining);
}