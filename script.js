function calc() {
	var summary = '<div class="jumbotron">';
	var error = 0;
    var atk1 = parseInt(document.getElementById('atk1').value);
    var atk2 = parseInt(document.getElementById('atk2').value);
    var atk3 = parseInt(document.getElementById('atk3').value);
    var hp1 = parseInt(document.getElementById('hp1').value);
    var hp2 = parseInt(document.getElementById('hp2').value);
    var hp3 = parseInt(document.getElementById('hp3').value);
    var pa1 = parseInt(document.getElementById('pa1').value);
    var pa2 = parseInt(document.getElementById('pa2').value);
    var pa3 = parseInt(document.getElementById('pa3').value);
	var bossAtk = parseInt(document.getElementById('bossAtk').value);
    var bossHP = parseInt(document.getElementById('bossHP').value);

	e = document.getElementById("adv1");
	var adv1 = parseFloat(e.options[e.selectedIndex].text);
	e = document.getElementById("adv2");
	var adv2 = parseFloat(e.options[e.selectedIndex].text);
	e = document.getElementById("adv3");
	var adv3 = parseFloat(e.options[e.selectedIndex].text);
	e = document.getElementById("advBoss");
	var advBoss = parseFloat(e.options[e.selectedIndex].text);
	
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
		if (pa1 > hitBossLast) {
			pa1 = hitBossLast
		}
		if (pa2 > hitBossLast) {
			pa2 = hitBossLast
		}
		if (pa3 > hitBossLast) {
			pa3 = hitBossLast
		}

		dmgBossLast = (hitBossLast * teamAtk) + (atk1 * pa1) + (atk2 * pa2) + (atk3 * pa3);
		fightsBossLast = Math.ceil(bossHP / dmgBossLast);

		dmgBossFirst = (hitBossFirst * teamAtk) + (atk1 * pa1) + (atk2 * pa2) + (atk3 * pa3);
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
	}
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

	var stats = [{
		"atk1":atk1,
		"atk2":atk2,
		"atk3":atk3,
		"hp1":hp1,
		"hp2":hp2,
		"hp3":hp3,
		"bossAtk":bossAtk,
		"bossHP":bossHP,
		"adv1":adv1,
		"adv2":adv2,
		"adv3":adv3,
		"advBoss":advBoss
	}];
	var myJsonString = JSON.stringify(stats);
	console.log(myJsonString);
	setCookie("UniData",myJsonString,25600);
}

function onLoad() {
// load values from cookie
	var cookie = getCookie("UniData");
	if(cookie.length > 3){
		var retval = JSON.parse(cookie);
		//alert(retval.length);
		for(var i=0;i<retval.length;i++) {
			var obj = retval[i];
			document.getElementById('atk1').value = obj.atk1;
			document.getElementById('atk2').value = obj.atk2;
			document.getElementById('atk3').value = obj.atk3;
			document.getElementById('hp1').value = obj.hp1;
			document.getElementById('hp2').value = obj.hp2;
			document.getElementById('hp3').value = obj.hp3;
			document.getElementById('bossAtk').value = obj.bossAtk;
			document.getElementById('bossHP').value = obj.bossHP;

			document.getElementById("adv1").value = obj.adv1;
			document.getElementById("adv2").value = obj.adv2;
			document.getElementById("adv3").value = obj.adv3;
			document.getElementById("advBoss").value = obj.advBoss;
		
			// if(obj.costume != null){
			// 	var HeroCostume = obj.hero + 'Costume';
			// 	HeroCostume = HeroCostume.replace(/\s+/g, '');
			// 	document.getElementById(HeroCostume).value = obj.costume;
			// }
		}
	}
}
