var channel;

var markers = [];

var skiers = [
	{
		'name': '源頼朝',
		'lat':  '36.7244',
		'lng': '137.8450'
	},{
		'name': '三浦義村',
		'lat':  '36.7260',
		'lng': '137.8470'
	},{
		'name': '北条義時',
		'lat':  '36.7300',
		'lng': '137.8400'
	},{
		'name': '木曾義仲',
		'lat':  '36.7265',
		'lng': '137.8410'
	}
]

onload = async function(){
	// webSocketリレーの初期化
	var relay = RelayServer("achex", "chirimenSocket" );
	channel = await relay.subscribe("shinshuD");

	messageDiv.innerText="achex web socketリレーサービスに接続しました";
	channel.onmessage = getMessage;
}

function getMessage(msg){ // メッセージを受信したときに起動する関数
	var txt;

	const skierId = msg.data.charAt(0)
	const skierStatus = msg.data.charAt(1)

	switch (skierStatus) {
		case 'E' :
			addRedMarker(skierId);
			txt="緊急事態が発生しました";
			break;
		case 'W' :
			addYellowMarker(skierId);
			txt="";
			break;
		case 'N' :
			addGreenMarker(skierId);
			txt="";
			break;
		default:
			deleteMarker(skierId);
			txt="";
			break;
	}
	messageDiv.innerText = txt;
}

function addGreenMarker(skierId) {
	if (map) {
		if (markers[skierId]) {
			deleteMarker(skierId);
		}
		markers[skierId] = L.marker([skiers[skierId].lat, skiers[skierId].lng], {icon:L.spriteIcon('green')});
		markers[skierId].bindPopup(skiers[skierId].name);
		markers[skierId].addTo(map);
	}
}

function addYellowMarker(skierId) {
	if (map) {
		if (markers[skierId]) {
			deleteMarker(skierId);
		}
		markers[skierId] = L.marker([skiers[skierId].lat, skiers[skierId].lng], {icon:L.spriteIcon('yellow')});
		markers[skierId].bindPopup(skiers[skierId].name);
		markers[skierId].addTo(map);
	}
}

function addRedMarker(skierId) {
	if (map) {
		if (markers[skierId]) {
			deleteMarker(skierId);
		}
		markers[skierId] = L.marker([skiers[skierId].lat, skiers[skierId].lng], {icon:L.spriteIcon('red')});
		markers[skierId].bindPopup(skiers[skierId].name);
		markers[skierId].addTo(map);
	}
}

function deleteMarker(skierId) {
	if (map) {
		var marker = markers[skierId];
		if (marker) {
			map.removeLayer(marker);
			markers[skierId] = null;
		}
	}
}
