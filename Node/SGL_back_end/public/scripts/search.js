function desconectar(topico,subscribe) {
    // window.alert("Desconectado!!!")
	var theUrl = "http://localhost:5500/descon"
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    
}

function homeOnClick() {
	const urlParams = new URLSearchParams(window.location.search)
	const nome = urlParams.get("name")
	console.log(nome)
	var theUrl = "http://localhost:5500/"
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, true ); // false for synchronous request
    // xmlHttp.send( null );
	
	console.log("aki")
	

}

(function() {
	window.Main = {};
	Main.Page = (function() {
		
		function Page() {
			var _this = this;
			

			// $('#connect-button').click(function() {
			// 	return _this.connect();
			// });
			// $('#disconnect-button').click(function() {
			// 	return _this.disconnect();
			// });
			// $('#subscribe-button').click(function() {
			// 	return _this.subscribe();
			// });
			// $('#unsubscribe-button').click(function() {
			// 	return _this.unsubscribe();
			// });

			// $('#search').click(function() {
            //     var menssagem = $('#refPID')[0].value;
            //     var enviado = document.createElement("p");	
            //     if (menssagem == 'L')
			// 		enviado.innerHTML = "<center><img src='/images/ligado.png' width='100px'></center>"
			// 	else
			// 		enviado.innerHTML = "<center><img src='/images/desligado.png' width='100px'></center>"
            //     $("#status_io").html(enviado);
            // });
			

		}
		
		
		return Page;
	})();

	$(function(){
		return Main.controller = new Main.Page;
	});
}).call(this);
