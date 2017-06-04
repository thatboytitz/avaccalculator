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
	for (var i = 1; i < document.getElementById("Fighter1").options.length; i++) {
		heroes.push(document.getElementById("Fighter1").options[i].text);
	}
	var heroRanks = [];
	for (var i = 0; i < heroes.length; i++) {
		var Costume = getCostume(heroes[i]);
		var AttackRank = getAttackRank(heroes[i]) + 1;
		var HealthRank = getHealthRank(heroes[i]) + 1;
		heroRanks.push({"hero":heroes[i],"costume":Costume, "attack":AttackRank, "health":HealthRank});
	}
	var myJsonString = JSON.stringify(heroRanks);

	var AttackRank1, HealthRank1, atk1, hp1, type1, temp;
	var AttackRank2, HealthRank2, atk2, hp2, type2;
	var AttackRank3, HealthRank3, atk3, hp3, type3;
	console.log(myJsonString);

	if(Fighter1 != 'None'){
		AttackRank1 = getAttackRank(Fighter1);
		HealthRank1 = getHealthRank(Fighter1);
		temp = getCostume(Fighter1);
		if(temp)
			Fighter1 = temp + Fighter1;
		atk1 = heroAtk[Fighter1][AttackRank1];
		hp1 = heroHP[Fighter1][HealthRank1];
		type1 = heroType[Fighter1];
	}
	else{
		AttackRank1 = 0;
		HealthRank1 = 0;
		atk1 = 0;
		hp1 = 0;
		type1 = 0;
	}

	if(Fighter2 != 'None'){
		AttackRank2 = getAttackRank(Fighter2);
		HealthRank2 = getHealthRank(Fighter2);
		temp = getCostume(Fighter2);
		if(temp)
			Fighter2 = temp + Fighter2;
		atk2 = heroAtk[Fighter2][AttackRank2];
		hp2 = heroHP[Fighter2][HealthRank2];
		type2 = heroType[Fighter2];
	}
	else {
		AttackRank2 = 0;
		HealthRank2 = 0;
		atk2 = 0;
		hp2 = 0;
		type2 = 0;
		
	}

	if(Fighter3 != 'None'){
		AttackRank3 = getAttackRank(Fighter3);
		HealthRank3 = getHealthRank(Fighter3);
		temp = getCostume(Fighter3);
		if(temp)
			Fighter3 = temp + Fighter3;
		atk3 = heroAtk[Fighter3][AttackRank3];
		hp3 = heroHP[Fighter3][HealthRank3];
		type3 = heroType[Fighter3];
	}
	else {
		AttackRank3 = 0;
		HealthRank3 = 0;
		atk3 = 0;
		hp3 = 0;
		type3 = 0;
	}

	summary += '<div class=\"row\">';

	var Fighter1Text, Fighter2Text, Fighter3Text

	Fighter1Text = '<div class="col-xs-12 col-md-4"><p>' + Fighter1 + ': ' + atk1;
	Fighter2Text = '<div class="col-xs-12 col-md-4"><p>' + Fighter2 + ': ' + atk2;
	Fighter3Text = '<div class="col-xs-12 col-md-4"><p>' + Fighter3 + ': ' + atk3;
	
	var EnemyHealth = getEnemyHealth(Quadrant, Sector, Difficulty);
	var EnemyAttack = getEnemyAttack(Quadrant, Sector, Difficulty);

	if(Fighter1 == 'None' && Fighter2 == 'None' && Fighter3 == 'None'){
		summary += '<p>Please select at least one character</p>'
	}
	else if(EnemyHealth == 0 || EnemyAttack == 0){
		summary += '<p>No Info Available!</p>';
	}
	else{
		var EnemyType = getEnemyType(Quadrant, Sector, Difficulty);
		var turns;
		var PlayerTurns;

		switch(EnemyType){
// Poison: 1, Quick: 2, Strong: 3, AdvPoison: 4, AdvQuick: 5, AdvStrong: 6, Ult: 7
			case 1:
				if(type1 == 3 || type1 == 4 || type1 == 7) {
					Fighter1Text += ' x ' + (1 + Quadrant) + ' ';
					atk1 *= (1 + Quadrant);
				}
				else if(type1 == 2) {
					Fighter1Text += ' - ' +  (atk1 * (0.2 * Quadrant)) + ' ';
					atk1 -= atk1 * (0.2 * Quadrant);
				}
				if(type2 == 3 || type2 == 4 || type2 == 7) {
					Fighter2Text += ' x ' + (1 + Quadrant) + ' ';
					atk2 *= (1 + Quadrant);
				}
				else if(type2 == 2) {
					Fighter2Text += ' - ' + (atk2 * (0.2 * Quadrant)) + ' ';
					atk2 -= (atk2 * (0.2 * Quadrant));
				}
				if(type3 == 3 || type3 == 4 || type3 == 7) {
					Fighter3Text += ' x ' + (1 + Quadrant) + ' ';
					atk3 *= (1 + Quadrant);
				}
				else if(type3 == 2) {
					Fighter3Text += ' - ' + (atk3 * (0.2 * Quadrant)) + ' ';
					atk3 -= (atk3 * (0.2 * Quadrant));
				}
				break;
			case 2:
				if(type1 == 1 || type1 == 5 || type1 == 7){
					Fighter1Text += ' x' + (1 + Quadrant) + ' ';
					atk1 *= (1 + Quadrant);
				}
				else if(type1 == 3){
					Fighter1Text += ' - ' + (atk1 * (0.2 * Quadrant)) + ' ';
					atk1 -=  (atk1 * (0.2 * Quadrant));
				}
				if(type2 == 1 || type2 == 5 || type2 == 7){
					Fighter2Text += ' x ' + (1 + Quadrant) + ' ';
					atk2 *= (1 + Quadrant);
				}
				else if(type2 == 3){
					Fighter2Text += ' - ' + (atk2 * (0.2 * Quadrant)) + ' ';
					atk2 -=  (atk2 * (0.2 * Quadrant));
				}
				if(type3 == 1 || type3 == 5 || type3 == 7){
					Fighter3Text += ' x ' + (1 + Quadrant) + ' ';
					atk3 *= (1 + Quadrant);
				}
				else if(type3 == 3){
					Fighter3Text += ' - ' + (atk3 * (0.2 * Quadrant)) + ' ';
					atk3 -= (atk3 * (0.2 * Quadrant));
				}
				
				break;
			case 3:
				if(type1 == 2 || type1 == 6 || type1 == 7){
					Fighter1Text += ' x ' + (1 + Quadrant) + ' ';
					atk1 *= (1 + Quadrant);
				}
				else if(type1 == 1){
					Fighter1Text += ' - ' + (atk1 * (0.2 * Quadrant)) + ' ';
					atk1 -= (atk1 * (0.2 * Quadrant));
				}
				if(type2 == 2 || type2 == 6 || type2 == 7) {
					Fighter2Text += ' x ' + (1 + Quadrant) + ' ';
					atk2 *= (1 + Quadrant);
				}
				else if(type2 == 1) {
					Fighter2Text += ' - ' + (atk2 * (0.2 * Quadrant)) + ' ';
					atk2 -= (atk2 * (0.2 * Quadrant));
				}
				if(type3 == 2 || type3 == 6 || type3 == 7){
					Fighter3Text += ' x ' + (1 + Quadrant) + ' ';
					atk3 *= (1 + Quadrant);	
				}
				else if(type3 == 1){
					Fighter3Text += ' - ' + (atk3 * (0.2 * Quadrant)) + ' ';
					atk3 -= (atk3 * (0.2 * Quadrant));	
				} 
				break;
		}
		Fighter1Text += ' / ' + hp1 + '</p></div>';
		Fighter2Text += ' / ' + hp2 + '</p></div>';
		Fighter3Text += ' / ' + hp3 + '</p></div>';

		if(Fighter1 != 'None')
			summary += Fighter1Text;
		if(Fighter2 != 'None')
			summary += Fighter2Text;
		if(Fighter3 != 'None')
			summary += Fighter3Text;
		
		summary += '</div>';

		var totalAtk = atk1 + atk2 + atk3;
		var totalHP = hp1 + hp2 + hp3;

		summary += '<div class=\"row\">';
		summary += '<div class="col-xs-12 col-md-6"><p> Total Attack per Round:' + totalAtk + '</p></div>';
		summary += '<div class="col-xs-12 col-md-6"><p> Total Health:' + totalHP + '</p></div>';
		summary += '</div>';


		summary += '<div class=\"row\">';
		summary += '<div class="col-xs-12 col-md-6"><p> Damage Per Round:' + EnemyAttack + '</p></div>';
		summary += '<div class="col-xs-12 col-md-6"><p> Enemy Health:' + EnemyHealth + '</p></div>';
		summary += '</div><br><br>';

		if((EnemyAttack / totalHP) <= .2){
			turns = EnemyAttack / totalHP;
			PlayerTurns = Math.ceil(EnemyHealth/totalAtk);
			if(PlayerTurns < Math.ceil(.2 / turns)){
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
		else if(EnemyAttack / totalHP <= .5) {
			turns = EnemyAttack / totalHP;
			PlayerTurns = Math.ceil(EnemyHealth/totalAtk);
			if(PlayerTurns < Math.ceil(.5 / turns) + 1){
				summary += '<img src="star.png"><img src="star.png"><br><br><br><p>You don\'t have enough Health to withstand 1 hit for the 3 stars. You need ' + ((EnemyAttack/.2) - totalHP) + ' more Health</p>';
			}
			else if(PlayerTurns == Math.ceil(.5 / turns) + 1){
				summary += '<img src="star.png"><img src="star.png"><br><br><br><p>You don\'t have enough Health to withstand 1 hit for the 3 stars. You need ' + ((EnemyAttack/.2) - totalHP) + ' more Health. If RNG allows, you\'ll get 2 stars.</p>';
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
		else if(EnemyAttack / totalHP < 1) {
			turns = EnemyAttack / totalHP;
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
	summary += '</div>';

	document.getElementById('summary').innerHTML = summary;
}

function getCostume(fighter) {
	fighter = fighter.replace(/\s+/g, '');
	var fighter_costume = fighter + 'Costume';
	var f = document.getElementById(fighter_costume);
	if(f == null || f.options[f.selectedIndex].text == 'None') return null;
	return f.options[f.selectedIndex].text;
}

function getAttackRank(fighter) {
	fighter = fighter.replace(/\s+/g, '');
	fighter += 'Atk';
	return parseInt(document.getElementById(fighter).value) - 1;
}

function getHealthRank(fighter) {
	fighter = fighter.replace(/\s+/g, '');
	fighter += 'HP';
	return parseInt(document.getElementById(fighter).value) - 1;
}

function getEnemyHealth(Quadrant, Sector, Difficulty) {
	if(!Difficulty){
		return quadrantHP[Quadrant-1][Sector-1];
	}
	return heroicQuadrantHP[Quadrant-1][Sector-1];
}

function getEnemyAttack(Quadrant, Sector, Difficulty) {
	if(!Difficulty){
		return quadrantAtk[Quadrant-1][Sector-1];
	}
	return heroicQuadrantAtk[Quadrant-1][Sector-1];
	
}

function getEnemyType(Quadrant, Sector, Difficulty) {
	if(!Difficulty){
		return quadrantType[Quadrant-1][Sector-1];
	}
	return heroicQuadrantType[Quadrant-1][Sector-1];
}




function setCookie(c_name,value,expireminutes){
   var exdate=new Date();
   exdate.setMinutes(exdate.getMinutes()+expireminutes);
   document.cookie=c_name+ "=" +escape(value)+
   ((expireminutes==null) ? "" : ";expires="+exdate.toUTCString());
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
	for (var i = 1; i < document.getElementById("Fighter1").options.length; i++) {
		heroes.push(document.getElementById("Fighter1").options[i].text);
	}
	var heroRanks = [];
	for (var i = 0; i < heroes.length; i++) {
		var Costume = getCostume(heroes[i]);
		var AttackRank = getAttackRank(heroes[i]) + 1;
		var HealthRank = getHealthRank(heroes[i]) + 1;
		heroRanks.push({"hero":heroes[i],"costume":Costume, "attack":AttackRank, "health":HealthRank});
	}
	var myJsonString = JSON.stringify(heroRanks);
	console.log(myJsonString);
	setCookie("HeroData",myJsonString,25600);
}

function onLoad() {
// load values from cookie
	var cookie = getCookie("HeroData");
	if(cookie.length > 10){
		var retval = JSON.parse(cookie);
		console.log(retval);
		//alert(retval.length);
		for(var i=0;i<retval.length;i++) {
			var obj = retval[i];
			var HeroAtk = obj.hero + 'Atk';
			var HeroHP = obj.hero + 'HP';
			HeroAtk = HeroAtk.replace(/\s+/g, '');
			HeroHP = HeroHP.replace(/\s+/g, '');
			document.getElementById(HeroAtk).value = obj.attack;
			document.getElementById(HeroHP).value = obj.health;
			if(obj.costume != null){
				var HeroCostume = obj.hero + 'Costume';
				HeroCostume = HeroCostume.replace(/\s+/g, '');
				document.getElementById(HeroCostume).value = obj.costume;
			}
		}
	}
}
