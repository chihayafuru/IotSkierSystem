var channel;


onload = async function(){
	// webSocketリレーの初期化
	var relay = RelayServer("achex", "chirimenSocket" );
	channel = await relay.subscribe("shinshuD");

	messageDiv.innerText="achex web socketリレーサービスに接続しました";
	channel.onmessage = getMessage;
}


function sendMessage(skierId, status) {
	const message = String(skierId) + status;
	channel.send(message);
}