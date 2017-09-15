var lang = {
	"pt-br" : [12.21+0.4+0.41+0.03+0.83, 1.01, 3.35, 4.21, 13.19+0.52+0.36, 1.07, 1.08, 1.22, 5.49+0.18, 0.3, 0.13, 3, 5.07, 5.02, 10.22+0.01+0.04+0.11, 3.01, 1.1, 6.73, 7.35, 5.07, 4.46, 1.72, 0.05, 0.28, 0.04, 0.45]
}
var cur_lang = "pt-br"
var freq, valid = [], needed = [], used = []

function changeLanguage(l) {
	cur_lang = l
	freq = [0]
	for (var i=0;i<lang[cur_lang].length;i++) {
		freq.push(freq[i] + lang[cur_lang][i]/100)
	}
}

function startGame(str) {
	valid = []
	str = str.toUpperCase()
	if (str != "") {
		valid = str.split('')
	}
	else {
		var n = Math.floor(Math.random()*20)%3+8
		for (var i=0;i<n;i++) {
			var x = Math.random()
			for (var j=0;j<freq.length-1;j++) {
				if (x >= freq[j] && x < freq[j+1]) {
					valid.push(String.fromCharCode(j+65))
					break
				}
			}
		}
	}
	alert(valid)
	v = valid
	valid = []
	for (var i=0;i<v.length;i++) {
		if ('A' <= v[i] && v[i] <= 'Z') valid.push(v[i])
	}
}

function loadGame() {
	var langs = document.getElementsByName('language')
	for (var i=0;i<langs.length;i++) {
		if (langs[i].checked) {
			changeLanguage(langs[i].value)
		}
	}
	var text = document.getElementById('input_word').value
		startGame(text)
		document.getElementById('settings').hidden = true
}

function addWord(str) {
	str = str.toUpperCase()
	if (used.includes(str)) {
		//cant add word animation
	}
	else {
		var count = 0
		for (var i = 0;i<needed.length;i++) {
			if (str.split('').includes(needed.split('')[i])) count++;
		}
		//check if all letters are ok
		used.push(str);
	}
}





