function calc() {
	var summary = '<div class="jumbotron">';
	var error = 0;
    var atk1 = parseInt(document.getElementById('atk1').value);
    var atk2 = parseInt(document.getElementById('atk2').value);
    var atk3 = parseInt(document.getElementById('atk3').value);
    var hp1 = parseInt(document.getElementById('hp1').value);
    var hp2 = parseInt(document.getElementById('hp2').value);
    var hp3 = parseInt(document.getElementById('hp3').value);
	var bossAtk = parseInt(document.getElementById('bossAtk').value);
    var bossHP = parseInt(document.getElementById('bossHP').value);

	e = document.getElementById("adv1");
	var adv1 = parseInt(e.options[e.selectedIndex].text);
	e = document.getElementById("adv2");
	var adv2 = parseInt(e.options[e.selectedIndex].text);
	e = document.getElementById("adv3");
	var adv3 = parseInt(e.options[e.selectedIndex].text);
	e = document.getElementById("advBoss");
	var advBoss = parseInt(e.options[e.selectedIndex].text);
	
	atk1 = atk1 * adv1;
	atk2 = atk2 * adv2;
	atk3 = atk3 * adv3;
	bossAtk = bossAtk * advBoss;

	var teamAtk = atk1 + atk2 + atk3;
    var teamHP = hp1 + hp2 + hp3;

    console.log("atk: ", teamAtk, " teamHP: ", teamHP);

    summary += "<p>Your team's total Attack: " + teamAtk + "</p>";
    summary += "<p>Your team's total HP: " + teamHP + "</p>";

	var hitBossLast , hitBossFirst, dmgBossLast, dmgBossFirst, fightsBossLast, fightsBossFirst;	  

	if (teamHP != 0) {
		hitBossLast = Math.ceil(teamHP / bossAtk);
		hitBossFirst = hitBossLast - 1;
	}
	// if (pa1 > hitBossLast) {
	// 	pa1 = hitBossLast
	// }
	// if (pa2 > hitBossLast) {
	// 	pa2 = hitBossLast
	// }
	// if (pa3 > hitBossLast) {
	// 	pa3 = hitBossLast
	// }

	dmgBossLast = (hitBossLast * teamAtk);
	fightsBossLast = Math.ceil(bossHP / dmgBossLast);

	dmgBossFirst = (hitBossFirst * teamAtk);
	fightsBossFirst = Math.ceil(bossHP / dmgBossFirst);

	summary += "<p>Number of boss' hits your team can take: " + hitBossLast + "</p><br><br>";

	summary += "<h2>If the boss attack last on the last turn.</h2>";

	summary += "<p>Total damage your team can do: " + dmgBossLast + "</p>";

	summary += "<p>Number of fights needed to defeat the boss: " + fightsBossLast + "</p><br><br>";

	summary += "<h2>If the boss attack first on the last turn.</h2>";

	summary += "<p>Total damage your team can do: " + dmgBossFirst + "</p>";

	summary += "<p>Number of fights needed to defeat the boss:" + fightsBossFirst + "</p>";
	summary += "</div>"
	document.getElementById('summary').innerHTML = summary;
	return false;
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
	// var heroes = [];
	// for (var i = 0; i < document.getElementById("Fighter1").options.length; i++) {
	// 	heroes.push(document.getElementById("Fighter1").options[i].text);
	// }
	// var heroRanks = [];
	// for (var i = 0; i < heroes.length; i++) {
	// 	var Costume = getCostume(heroes[i]);
	// 	var AttackRank = getAttackRank(heroes[i]);
	// 	var HealthRank = getHealthRank(heroes[i]);
	// 	heroRanks.push({"hero":heroes[i],"costume":Costume, "attack":AttackRank, "health":HealthRank});
	// }
	// var myJsonString = JSON.stringify(heroRanks);
	// console.log(myJsonString);
	// setCookie("HeroData",myJsonString,25600);
}

function onLoad() {
// load values from cookie
	// var cookie = getCookie("HeroData");
	// if(cookie.length > 10){
	// 	var retval = JSON.parse(cookie);
	// 	//alert(retval.length);
	// 	for(var i=0;i<retval.length;i++) {
	// 		var obj = retval[i];
	// 		var HeroAtk = obj.hero + 'Atk';
	// 		var HeroHth = obj.hero + 'Hth';
	// 		HeroAtk = HeroAtk.replace(/\s+/g, '');
	// 		HeroHth = HeroHth.replace(/\s+/g, '');
	// 		document.getElementById(HeroAtk).value = obj.attack;
	// 		document.getElementById(HeroHth).value = obj.health;
	// 		if(obj.costume != null){
	// 			var HeroCostume = obj.hero + 'Costume';
	// 			HeroCostume = HeroCostume.replace(/\s+/g, '');
	// 			document.getElementById(HeroCostume).value = obj.costume;
	// 		}
	// 	}
	// }
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
