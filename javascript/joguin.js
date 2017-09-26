var lang = {
	"pt-br" : [12.21+0.4+0.41+0.03+0.83, 1.01, 3.35, 4.21, 13.19+0.52+0.36, 1.07, 1.08, 1.22, 5.49+0.18, 0.3, 0.13, 3, 5.07, 5.02, 10.22+0.01+0.04+0.11, 3.01, 1.1, 6.73, 7.35, 5.07, 4.46, 1.72, 0.05, 0.28, 0.04, 0.45]
}
var cur_lang = "pt-br"
var freq, valid = [], needed = [], used = []

$(document).on({
	change: function() {
		var t = $(this).val()
		if (t == 'random') {
			$('#div_form_random').show()
			$('#div_form_input').hide()
		}
		else {
			$('#div_form_input').show()
			$('#div_form_random').hide()
		}
	}
}, '#game_type');

$(document).on({
	input: function() {
		updateList($(this).val())	
	}
}, '#search_word');

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
	v = valid
	valid = []
	for (var i=0;i<v.length;i++) {
		if ('A' <= v[i] && v[i] <= 'Z') valid.push(v[i])
	}
	needed = valid
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
	$('#game').show()
	updateNeeded()
}

function submitWord() {
	var text = document.getElementById('game_word').value
	addWord(text)
}

function addWord(str) {
	$('#submit_alert').hide()
	str = str.toUpperCase()
	var temp = str
	str = ""
	for (var i=0;i<temp.length;i++) {
		if ('A' <= temp[i] && temp[i] <= 'Z') str += temp[i]
	}
	if (used.includes(str)) {
		document.getElementById('submit_alert').innerHTML = "Word was already used!"
		$('#submit_alert').show()
	}
	else {
		var count = 0
		for (var i = 0;i<needed.length;i++) {
			if (str.split('').includes(needed[i])) count++
		}
		if (count) {
			var letterFreq = []
			for (var i=0;i<500;i++) letterFreq.push(0)
			for (var i=0;i<valid.length;i++) letterFreq[valid[i].charCodeAt(0)]++
			for (var i=0;i<str.split('').length;i++) letterFreq[str.charCodeAt(i)]--
			var flag = 1
			for (var i=0;i<500;i++) {
				if (letterFreq[i] < 0) {
					flag = 0;
					break;
				}
			}
			if (flag) {
				needed = str.split('')
				used.push(str)
				updateNeeded()
			}
			else {
				document.getElementById('submit_alert').innerHTML = "Not using valid letters!"
				$('#submit_alert').show()
			}
		}
		else {
			document.getElementById('submit_alert').innerHTML = "Missing obligatory letters!"
			$('#submit_alert').show()
		}
	}
	updateList("")
}

function updateNeeded() {
	var finalStr = ""
	var temp = needed;
	for (i in valid) {
		flag = 0;
		for (j in temp) {
			if (temp[j] == valid[i]) {
				finalStr += '<input class="letters_top" style="background-color: #00b248;display:inline-block;" type="button" class="btn" value="' + valid[i] + '"/>'
				flag = 1
				break
			}
		}
		if (flag == 0) {
			finalStr += '<input class="letters_top" style="background-color: #66ffa6;display:inline-block;" type="button" class="btn" value="'+ valid[i] + '"/>'
		}
	}
	document.getElementById('letters').innerHTML = finalStr
	var perc = 100.0/valid.length
	var elements = document.getElementsByClassName("letters_top");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.width=perc.toString() + '%';
    }
}

function updateList(str) {
	str = str.toUpperCase()
	$('#lists').show()
	var list = []
	for (var i = 0;i<used.length;i++) {
		var flag = 1
		for (var j=0;j<str.length;j++) {
			if (str[j] != used[i][j]) {
				flag = 0
				break
			}
		}
		if (flag) list.push(used[i])
	}
	var finalStr = ""
	for (i in list) {
		finalStr += '<li class="list-group-item">' + list[i] + '</li>'
	}
	document.getElementById('used_list').innerHTML = finalStr
}



