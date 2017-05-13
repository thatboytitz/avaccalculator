function calc() {
	var summary = '<div class="jumbotron">';
	var error = 0;
	var e = document.getElementById("Fighter1");
	var Fighter1 = e.options[e.selectedIndex].text;
	e = document.getElementById("Fighter2");
	var Fighter2 = e.options[e.selectedIndex].text;
	e = document.getElementById("Fighter3");
	var Fighter3 = e.options[e.selectedIndex].text;
	e = document.getElementById("Quadrant");
	var Quadrant = parseInt(e.options[e.selectedIndex].text);
	e = document.getElementById("Sector");
	var Sector = parseInt(e.options[e.selectedIndex].text);
	var Difficulty = document.getElementById("Difficulty").checked;

	var heroes = [];
	for (var i = 0; i < document.getElementById("Fighter1").options.length; i++) {
		heroes.push(document.getElementById("Fighter1").options[i].text);
	}
	var heroRanks = [];
	for (var i = 0; i < heroes.length; i++) {
		var Costume = getCostume(heroes[i]);
		var AttackRank = getAttackRank(heroes[i]);
		var HealthRank = getHealthRank(heroes[i]);
		heroRanks.push({"hero":heroes[i],"costume":Costume, "attack":AttackRank, "health":HealthRank});
	}
	var myJsonString = JSON.stringify(heroRanks);
	console.log(myJsonString);


	var Costume1 = getCostume(Fighter1);
	var AttackRank1 = getAttackRank(Fighter1);
	var HealthRank1 = getHealthRank(Fighter1);
	var Costume2 = getCostume(Fighter2);
	var AttackRank2 = getAttackRank(Fighter2);
	var HealthRank2 = getHealthRank(Fighter2);
	var Costume3 = getCostume(Fighter3);
	var AttackRank3 = getAttackRank(Fighter3);
	var HealthRank3 = getHealthRank(Fighter3);

	var atk1 = getAttack(Fighter1, Costume1, AttackRank1);
	var atk2 = getAttack(Fighter2, Costume2, AttackRank2);
	var atk3 = getAttack(Fighter3, Costume3, AttackRank3);
	var hth1 = getHealth(Fighter1, Costume1, HealthRank1);
	var hth2 = getHealth(Fighter2, Costume2, HealthRank2);
	var hth3 = getHealth(Fighter3, Costume3, HealthRank3);
	var type1 = getType(Fighter1, Costume1);
	var type2 = getType(Fighter2, Costume2);
	var type3 = getType(Fighter3, Costume3);
	
	var EnemyHealth = getEnemyHealth(Quadrant, Sector, Difficulty);
	var EnemyAttack = getEnemyAttack(Quadrant, Sector, Difficulty);
	if(EnemyHealth != null && EnemyAttack != null){
		console.log('hi');
		var EnemyType = getEnemyType(Quadrant, Sector, Difficulty);
		var turns;
		var PlayerTurns;

		summary += '<div class=\"row\">';
		var Fighter1Text = '<div class="col-xs-12 col-md-4"><p>' + Fighter1 + ': ' + atk1;
		var Fighter2Text = '<div class="col-xs-12 col-md-4"><p>' + Fighter2 + ': ' + atk2;
		var Fighter3Text = '<div class="col-xs-12 col-md-4"><p>' + Fighter3 + ': ' + atk3;


		switch(EnemyType){
			case 1:
				if(type1 == 3 || type1 == 4 || type1 == 7) {
					Fighter1Text += ' x' + (1 + Quadrant) + ' ';
					atk1 *= (1 + Quadrant);
				}
				if(type2 == 3 || type2 == 4 || type2 == 7) {
					Fighter2Text += ' x' + (1 + Quadrant) + ' ';
					atk2 *= (1 + Quadrant);
				}
				if(type3 == 3 || type3 == 4 || type3 == 7) {
					Fighter3Text += ' x' + (1 + Quadrant) + ' ';
					atk3 *= (1 + Quadrant);
				}
				break;
			case 2:
				if(type1 == 1 || type1 == 5 || type1 == 7){
					Fighter1Text += ' x' + (1 + Quadrant) + ' ';
					atk1 *= (1 + Quadrant);
				}
				if(type2 == 1 || type2 == 5 || type2 == 7){
					Fighter2Text += ' x' + (1 + Quadrant) + ' ';
					atk2 *= (1 + Quadrant);
				}
				if(type3 == 1 || type3 == 5 || type3 == 7){
					Fighter3Text += ' x' + (1 + Quadrant) + ' ';
					atk3 *= (1 + Quadrant);
				}
				break;
			case 3:
				if(type1 == 2 || type1 == 6 || type1 == 7){
					Fighter1Text += ' x' + (1 + Quadrant) + ' ';
					atk1 *= (1 + Quadrant);
				}
				if(type2 == 2 || type2 == 6 || type2 == 7) {
					Fighter2Text += ' x' + (1 + Quadrant) + ' ';
					atk2 *= (1 + Quadrant);
				}
				if(type3 == 2 || type3 == 6 || type3 == 7){
					Fighter3Text += ' x' + (1 + Quadrant) + ' ';
					atk3 *= (1 + Quadrant);	
				} 
				break;
		}
		Fighter1Text += ' / ' + hth1 + '</p></div>';
		Fighter2Text += ' / ' + hth2 + '</p></div>';
		Fighter3Text += ' / ' + hth3 + '</p></div>';

		summary += Fighter1Text + Fighter2Text + Fighter3Text + '</div>';

		var totalAtk = atk1 + atk2 + atk3;
		var totalHth = hth1 + hth2 + hth3;

		summary += '<div class=\"row\">';
		summary += '<div class="col-xs-12 col-md-4"><p> Total Attack per Round:' + totalAtk + '</p></div>';
		summary += '<div class="col-xs-12 col-md-4"><p> Total Health:' + totalHth + '</p></div>';
		summary += '</div>';


		summary += '<div class=\"row\">';
		summary += '<div class="col-xs-12 col-md-4"><p> Damage Per Round:' + EnemyAttack + '</p></div>';
		summary += '<div class="col-xs-12 col-md-4"><p> Enemy Health:' + EnemyHealth + '</p></div>';
		summary += '</div><br><br>';

		if((EnemyAttack / totalHth) <= .2){
			turns = EnemyAttack / totalHth;
			PlayerTurns = Math.ceil(EnemyHealth/totalAtk);
			if(PlayerTurns < Math.ceil(.2 / turns)){
				console.log('turns: ' + Math.ceil(.2 / turns) + ' PTurns:' + PlayerTurns);
				summary += '<img src="star.png"><img src="star.png"><img src="star.png"><br><br><br><p>You have enough Health and Attack to not worry about it!</p>';
			}
			else if(PlayerTurns == Math.ceil(.2 / turns)){
				summary += '<img src="star.png"><img src="star.png"><img src="star.png"><br><br><br><p>If RNG allows, you\'ll get those 3 stars!</p>';
			}
			else if(PlayerTurns == 2 && (.2 / turns) == 1){
				summary += '<img src="star.png"><img src="star.png"><img src="star.png"><br><br><br><p>If RNG allows, you\'ll get those 3 stars!</p>';
			}
			else if(PlayerTurns < Math.ceil(.5 / turns)){
				summary += '<img src="star.png"><img src="star.png"><br><br><br><p>You have enough Health to withstand 1 hit for the 3 stars but your attack is too low.</p>';
			}
			else if(PlayerTurns == Math.ceil(.5 / turns)){
				summary += '<img src="star.png"><img src="star.png"><br><br><br><p>You have enough Health to withstand 1 hit for the 3 stars but your attack is too low. If RNG allows, you\'ll get 2 stars.</p>';
			}
			else if(PlayerTurns < Math.ceil(1 / turns)){
				summary += '<img src="star.png"><br><br><br><p>You have enough Health to withstand 1 hit for the 3 stars but your attack is too low!</p>';
			}
			else if(PlayerTurns == Math.ceil(1 / turns)){
				summary += '<img src="star.png"><br><br><br><p>You have enough Health to withstand 1 hit for the 3 stars but your attack is too low! You might lose depending on RNG!</p>';
			}
			else{
				summary += '<h1>0 Stars</h1><br><br><br><p>You have enough Health to withstand 1 hit for the 3 stars but your attack is way too low!</p>';
			}
		}
		else if(EnemyAttack / totalHth <= .5) {
			turns = EnemyAttack / totalHth;
			PlayerTurns = Math.ceil(EnemyHealth/totalAtk);
			if(PlayerTurns < Math.ceil(.5 / turns) + 1){
				summary += '<img src="star.png"><img src="star.png"><br><br><br><p>You don\'t have enough Health to withstand 1 hit for the 3 stars. You need ' + ((EnemyAttack/.2) - totalHth) + ' more Health</p>';
			}
			else if(PlayerTurns == Math.ceil(.5 / turns) + 1){
				summary += '<img src="star.png"><img src="star.png"><br><br><br><p>You don\'t have enough Health to withstand 1 hit for the 3 stars. You need ' + ((EnemyAttack/.2) - totalHth) + ' more Health. If RNG allows, you\'ll get 2 stars.</p>';
			}
			else if(PlayerTurns < Math.ceil(1 / turns) + 1){
				summary += '<img src="star.png"><br><br><br><p>You\'ll survive!</p>';
			}
			else if(PlayerTurns == Math.ceil(1 / turns) + 1){
				summary += '<img src="star.png"><br><br><br><p>You might lose depending on RNG!</p>';
			}
			else{
				summary += '<h1>0 Stars</h1><br><br><br><p>Abort! You don\'t have enough attack to survive</p>';
			}			
		}
		else if(EnemyAttack / totalHth < 1) {
			turns = EnemyAttack / totalHth;
			PlayerTurns = Math.ceil(EnemyHealth/totalAtk);
			if(PlayerTurns > Math.ceil(1 / turns) + 1){
				summary += '<img src="star.png"><br><br><br><p>You\'ll survive!</p>';
			}
			else if(PlayerTurns == Math.ceil(1 / turns) + 1){
				summary += '<img src="star.png"><br><br><br><p>You might lose depending on RNG!</p>';
			}
			else{
				summary += '<h1>0 Stars</h1><br><br><br><p>Abort! You don\'t have enough attack to survive</p>';
			}				
		}
		else {
			summary += '<h1>0 Stars</h1><br><br><br><p>Don\'t even try with this combination</p>';
		}
	}
	else{
		summary += '<p>No Info Available!</p>';
	}
	summary += '</div>';

	document.getElementById('summary').innerHTML = summary;


}

function getCostume(fighter) {
	console.log("hi")
;	fighter = fighter.replace(/\s+/g, '');
	fighter += 'Costume';
	var f = document.getElementById(fighter);
	if(f == null) return null;
	return f.options[f.selectedIndex].text;
}

function getAttackRank(fighter) {
	fighter = fighter.replace(/\s+/g, '');
	fighter += 'Atk';
	return parseInt(document.getElementById(fighter).value);
}

function getHealthRank(fighter) {
	fighter = fighter.replace(/\s+/g, '');
	fighter += 'Hth';
	return parseInt(document.getElementById(fighter).value);
}

function getAttack(fighter, costume, rank){
	switch(fighter){
		case 'Captain America':
				return 1500 + expAttack(fighter, rank - 1);
			break;
		case 'Collector':
				return 1050 + expAttack(fighter, rank - 1);
			break;
		case 'Drax':
				return 150 + expAttack(fighter,rank - 1);
			break;
		case 'Falcon':
				return 800 + expAttack(fighter, rank - 1);
			break;
		case 'Gamora':
				switch(costume){
					case 'Galactic Assassin':
						return 300 + expAttack(fighter, rank - 1);
						break;
					case 'Galactic':
						return;
						break;
					default:
						return 150 + expAttack(fighter, rank - 1);
						break;
				}
			break;
		case 'Groot':
				switch(costume){
					case 'Thor Groot':
						return 440 + expAttack(fighter,rank - 1);
						break;
					default:
						return 220 + expAttack(fighter, rank - 1);
						break;
				}
			break;
		case 'Iron Man':
				switch(costume){
					case 'GodKiller':
						return 300 + expAttack(fighter, rank - 1);
						break;
					default:
						return 100 + expAttack(fighter, rank - 1);
						break;
				}
			break;
		case 'Loki':
				return 100 + expAttack(fighter, rank - 1);
			break;
		case 'Mantis':
				return 500 + expAttack(fighter,rank - 1);
			break;
		case 'Nebula':
				return 600 + expAttack(fighter,rank - 1);
			break;
		case 'Nova':
				return 220 + expAttack(fighter,rank - 1);
			break;
		case 'Rocket':
				return 180 + expAttack(fighter,rank - 1);
			break;
		case 'Star Lord':
				switch(costume){
					case 'Captain':
						return 300 + expAttack(fighter, rank - 1);
						break;
					case 'Galactic':
						return 800 + expAttack(fighter, rank - 1);
						break;
					default:
						return 150 + expAttack(fighter, rank - 1);
						break;
				}
			break;
		default:
			break;
	}

}

function getHealth(fighter, costume, rank){
	switch(fighter){
		case 'Captain America':
				return 4500 + expHealth(fighter, rank - 1);
			break;
		case 'Collector':
				return 3150 + expHealth(fighter, rank - 1);
			break;
		case 'Drax':
				return 450 + expHealth(fighter, rank - 1);
			break;
		case 'Falcon':
				return 2400 + expHealth(fighter, rank - 1);
			break;
		case 'Gamora':
				switch(costume){
					case 'Galactic Assassin':
						return 900 + expHealth(fighter, rank - 1);
						break;
					case 'Galactic':
						return;
						break;
					default:
						return 450 + expHealth(fighter, rank - 1);
						break;
				}
			break;
		case 'Groot':
				switch(costume){
					case 'Thor Groot':
						return 1320 + expHealth(fighter, rank  - 1);
						break;
					default:
						return 660 + expHealth(fighter, rank - 1);
						break;
				}
			break;
		case 'Iron Man':
				switch(costume){
					case 'GodKiller':
						return 900 + expHealth(fighter, rank  - 1);
						break;
					default:
						return 300 + expHealth(fighter, rank - 1);
						break;
				}
			break;
		case 'Loki':
				return 300 + expHealth(fighter, rank - 1);
			break;
		case 'Mantis':
				return 1500 + expHealth(fighter, rank - 1);
			break;
		case 'Nebula':
				return 1800 + expHealth(fighter, rank - 1);
			break;
		case 'Nova':
				return 660 + expHealth(fighter, rank - 1);
			break;
		case 'Rocket':
				return 540 + expHealth(fighter, rank - 1);
			break;
		case 'Star Lord':
				switch(costume){
					case 'Captain':
						return 900 + expHealth(fighter, rank - 1);
						break;
					case 'Galactic':
						return 2400 + expHealth(fighter, rank - 1);
						break;
					default:
						return 450 + expHealth(fighter, rank - 1);
						break;
				}
			break;
		default:
			break;
	}
}

function expAttack(fighter, times) {
	var amount = 0;
	if(times == 0){
		return 0;
	}
	else {
		if(times > 6){
			amount = getAttackRate(fighter, times);
			var e = expAttack(fighter, times - 1);
			var f = Math.ceil((times - 6) / 2) + 6;
			return (amount * f) + e;
		}
		else{
			amount = getAttackRate(fighter, times);
			var e = expAttack(fighter, times - 1);
			return (amount * times) + e;
		}
	}
}

function expHealth(fighter, times) {
	var amount = 0;
	if(times == 0){
		return 0;
	}
	else {
		if(times > 6){
			amount = getHealthRate(fighter, times);
			var e = expHealth(fighter, times - 1);
			var f = Math.ceil((times - 6) / 2) + 6;
			return (amount * f) + e;
		}
		else{
			amount = getHealthRate(fighter, times);
			var e = expHealth(fighter, times - 1);
			return (amount * times) + e;
		}
	}
}

function getAttackRate(fighter,rank) {
	var rate = 0;
	switch(fighter){
		case 'Captain America':
			rate = 60;
			break;
		case 'Collector':
			rate = 55;
			break;
		case 'Drax':
			rate = 50;
			break;
		case 'Falcon':
			rate = 50;
			break;
		case 'Gamora':
			rate = 50;
			break;
		case 'Groot':
			rate = 60;
			break;
		case 'Iron Man':
			rate = 50;
			break;
		case 'Loki':
			rate = 50;
			break;
		case 'Mantis':
			rate = 55;
			break;
		case 'Nebula':
			rate = 60;
			break;
		case 'Nova':
			rate = 60;
			break;
		case 'Rocket':
			rate = 50;
			break;
		case 'Star Lord':
			rate = 50;
			break;
		default:
			break;
	}
	if(rank < 14 && rank > 6){
		rate -= 5 * Math.ceil((rank - 6)/4);
	}
	return rate;
}

function getHealthRate(fighter,rank) {
	var rate = 0;
	switch(fighter){
		case 'Captain America':
			rate = 180;
			break;
		case 'Collector':
			rate = 165;
			break;
		case 'Drax':
			rate = 150;
			break;
		case 'Falcon':
			rate = 150;
			break;
		case 'Gamora':
			rate = 150;
			break;
		case 'Groot':
			rate = 180;
			break;
		case 'Iron Man':
			rate = 150;
			break;
		case 'Loki':
			rate = 150;
			break;
		case 'Mantis':
			rate = 165;
			break;
		case 'Nebula':
			rate = 180;
			break;
		case 'Nova':
			rate = 180;
			break;
		case 'Rocket':
			rate = 150;
			break;
		case 'Star Lord':
			rate = 150;
			break;
		default:
			break;
	}
	if(rank < 14 && rank > 6){
		rate -= 15 * Math.ceil((rank - 6)/4);
	}
	return rate;
}

function getType(fighter, costume) {
	// Poison: 1, Quick: 2, Strong 3, AdvPoison: 4, AdvQuick: 5, AdvStrong: 6, Ult: 7
	switch(fighter){
		case 'Captain America':
			return 7;
			break;
		case 'Collector':
			return 3;
			break;
		case 'Drax':
			return 1;
			break;
		case 'Falcon':
			return 2;
			break;
		case 'Gamora':
			if(costume == 'Galactic') return 6;
			return 3;
			break;
		case 'Groot':
			return 3;
			break;
		case 'Iron Man':
			return 1;
			break;
		case 'Loki':
			return 3;
			break;
		case 'Mantis':
			return 1;
			break;
		case 'Nebula':
			return 2;
			break;
		case 'Nova':
			return 1;
			break;
		case 'Rocket':
			return 2;
			break;
		case 'Star Lord':
			if(costume == 'Galactic')return 5;
			return 2;
			break;
		default:
			break;
	}
}

function getEnemyHealth(Quadrant,Sector,Difficulty) {
	switch(Quadrant){
		case 1:
			switch(Sector){
				case 1:
					if(!Difficulty) return 1800;
					return 13800;
					break;
				case 2:
					if(!Difficulty) return 2400;
					return null;
					break;
				case 3:
					if(!Difficulty) return 300;
					return null;
					break;
				case 4:
					if(!Difficulty) return 3600;
					return null;
					break;
				case 5:
					if(!Difficulty) return 4800;
					return null;
					break;
				case 6:
					if(!Difficulty) return 5400;
					return null;
					break;
				case 7:
					if(!Difficulty) return 7200;
					return null;
					break;
				case 8:
					if(!Difficulty) return 9000;
					return null;
					break;
			}
			break;
		case 2:
			switch(Sector){
				case 1:
					if(!Difficulty) return 10800;
					return null;
					break;
				case 2:
					if(!Difficulty) return 13500;
					return null;
					break;
				case 3:
					if(!Difficulty) return 14400;
					return null;
					break;
				case 4:
					if(!Difficulty) return null;
					return null;
					break;
				case 5:
					if(!Difficulty) return 20700;
					return null;
					break;
				case 6:
					if(!Difficulty) return null;
					return null;
					break;
				case 7:
					if(!Difficulty) return null;
					return null;
					break;
				case 8:
					if(!Difficulty) return 32400;
					return null;
					break;
			}
			break;
		case 3:
			switch(Sector){
				case 1:
					if(!Difficulty) return null;
					return null;
					break;
				case 2:
					if(!Difficulty) return null;
					return null;
					break;
				case 3:
					if(!Difficulty) return null;
					return null;
					break;
				case 4:
					if(!Difficulty) return null;
					return null;
					break;
				case 5:
					if(!Difficulty) return null;
					return null;
					break;
				case 6:
					if(!Difficulty) return null;
					return null;
					break;
				case 7:
					if(!Difficulty) return null;
					return null;
					break;
				case 8:
					if(!Difficulty) return null;
					return null;
					break;
			}
			break;
	}
}



function getEnemyAttack(Quadrant,Sector,Difficulty) {
	switch(Quadrant){
		case 1:
			switch(Sector){
				case 1:
					if(!Difficulty) return 360;
					return 2951;
					break;
				case 2:
					if(!Difficulty) return 480;
					return 3450;
					break;
				case 3:
					if(!Difficulty) return 600;
					return null;
					break;
				case 4:
					if(!Difficulty) return 720;
					return null;
					break;
				case 5:
					if(!Difficulty) return 960;
					return null;
					break;
				case 6:
					if(!Difficulty) return 1080;
					return null;
					break;
				case 7:
					if(!Difficulty) return 1440;
					return null;
					break;
				case 8:
					if(!Difficulty) return 1800;
					return null;
					break;
			}
			break;
		case 2:
			switch(Sector){
				case 1:
					if(!Difficulty) return 1440;
					return null;
					break;
				case 2:
					if(!Difficulty) return 1800;
					return null;
					break;
				case 3:
					if(!Difficulty) return 1850;
					return null;
					break;
				case 4:
					if(!Difficulty) return 2220;
					return null;
					break;
				case 5:
					if(!Difficulty) return 2700;
					return null;
					break;
				case 6:
					if(!Difficulty) return 3500;
					return null;
					break;
				case 7:
					if(!Difficulty) return 4000;
					return null;
					break;
				case 8:
					if(!Difficulty) return 3000;
					return null;
					break;
			}
			break;
		case 3:
			switch(Sector){
				case 1:
					if(!Difficulty) return null;
					return null;
					break;
				case 2:
					if(!Difficulty) return null;
					return null;
					break;
				case 3:
					if(!Difficulty) return null;
					return null;
					break;
				case 4:
					if(!Difficulty) return null;
					return null;
					break;
				case 5:
					if(!Difficulty) return null;
					return null;
					break;
				case 6:
					if(!Difficulty) return null;
					return null;
					break;
				case 7:
					if(!Difficulty) return null;
					return null;
					break;
				case 8:
					if(!Difficulty) return null;
					return null;
					break;
			}
			break;
	}
}

function getEnemyType(Quadrant,Sector,Difficulty) {
	// Poison: 1, Quick: 2, Strong 3, AdvPoison: 4, AdvQuick: 5, AdvStrong: 6, Ult: 7
	switch(Quadrant){
		case 1:
			switch(Sector){
				case 1:
					if(!Difficulty) return 1;
					return 3;
					break;
				case 2:
					if(!Difficulty) return 2;
					return 1;
					break;
				case 3:
					if(!Difficulty) return 3;
					return 2;
					break;
				case 4:
					if(!Difficulty) return 1;
					return 3;
					break;
				case 5:
					if(!Difficulty) return 2;
					return 1;
					break;
				case 6:
					if(!Difficulty) return 3;
					return 2;
					break;
				case 7:
					if(!Difficulty) return 1;
					return 3;
					break;
				case 8:
					if(!Difficulty) return 2;
					return 1;
					break;
			}
			break;
		case 2:
			switch(Sector){
				case 1:
					if(!Difficulty) return 3;
					return 3;
					break;
				case 2:
					if(!Difficulty) return 1;
					return 1;
					break;
				case 3:
					if(!Difficulty) return 2;
					return 2;
					break;
				case 4:
					if(!Difficulty) return 3;
					return 3;
					break;
				case 5:
					if(!Difficulty) return 1;
					return 1;
					break;
				case 6:
					if(!Difficulty) return 2;
					return 2;
					break;
				case 7:
					if(!Difficulty) return 3;
					return 3;
					break;
				case 8:
					if(!Difficulty) return 1;
					return 1;
					break;
			}
			break;
		case 3:
			switch(Sector){
				case 1:
					if(!Difficulty) return null;
					return null;
					break;
				case 2:
					if(!Difficulty) return null;
					return null;
					break;
				case 3:
					if(!Difficulty) return null;
					return null;
					break;
				case 4:
					if(!Difficulty) return null;
					return null;
					break;
				case 5:
					if(!Difficulty) return null;
					return null;
					break;
				case 6:
					if(!Difficulty) return null;
					return null;
					break;
				case 7:
					if(!Difficulty) return null;
					return null;
					break;
				case 8:
					if(!Difficulty) return null;
					return null;
					break;
			}
			break;
	}
}

function setCookie(c_name,value,expireminutes){
    var d = new Date();
    d.setTime(d.getTime() + (expireminutes * 10 * 365 * 24 * 60 * 60));
    var expires = "expires="+d.toUTCString();
   document.cookie=c_name+ "=" +escape(value)+
   ((expireminutes==null) ? "" : ";expires="+expires);
}

function getCookie(c_name){
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}

function Save(){
	var heroes = [];
	for (var i = 0; i < document.getElementById("Fighter1").options.length; i++) {
		heroes.push(document.getElementById("Fighter1").options[i].text);
	}
	var heroRanks = [];
	for (var i = 0; i < heroes.length; i++) {
		var Costume = getCostume(heroes[i]);
		var AttackRank = getAttackRank(heroes[i]);
		var HealthRank = getHealthRank(heroes[i]);
		heroRanks.push({"hero":heroes[i],"costume":Costume, "attack":AttackRank, "health":HealthRank});
	}
	var myJsonString = JSON.stringify(heroRanks);
	console.log(myJsonString);
	setCookie("HeroData",myJsonString,1);
}

function onLoad() {
// load values from cookie
	var cookie = getCookie("HeroData");
	if(cookie.length > 10){
		var retval = JSON.parse(cookie);
		//alert(retval.length);
		for(var i=0;i<retval.length;i++) {
			var obj = retval[i];
			var HeroAtk = obj.hero + 'Atk';
			var HeroHth = obj.hero + 'Hth';
			HeroAtk = HeroAtk.replace(/\s+/g, '');
			HeroHth = HeroHth.replace(/\s+/g, '');
			document.getElementById(HeroAtk).value = obj.attack;
			document.getElementById(HeroHth).value = obj.health;
			if(obj.costume != null){
				var HeroCostume = obj.hero + 'Costume';
				HeroCostume = HeroCostume.replace(/\s+/g, '');
				document.getElementById(HeroCostume).value = obj.costume;
			}
		}
	}
}



// Captain America
// Collector
// Drax
// Falcon
// Gamora
// Groot
// Iron Man
// Loki
// Mantis
// Nebula
// Nova
// Rocket
// Star Lord