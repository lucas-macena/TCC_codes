var serverIP

window.addEventListener('load',()=>{
    serverIP = document.getElementsByClassName('item')[0].childNodes.item(0).href
    
})

var corpo = document.getElementsByTagName('html')



function editar(tomb,endereço) {
    // window.alert("Desconectado!!!")
	// var ip = document.getElementsByClassName('item')[0].childNodes.item(0).href
    // serverIP = endereço
    var theUrl = serverIP + "editTomb?tomb=" + tomb
    
	console.log(theUrl)
	
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
	xmlHttp.setRequestHeader('tomb',tomb)
    xmlHttp.send( null );
    var resp = xmlHttp.response
	
	var line = document.getElementById(tomb)
	var newLine = new DOMParser().parseFromString(resp,'text/html').getElementById(tomb)
	
	line.parentNode.replaceChild(newLine,line)
	// window.alert(aaa)
	
}

function salvar(tomb) {
    // window.alert("Desconectado!!!")
    

	var theUrl = serverIP + "editTomb?tomb=" + tomb
	
	var line = document.getElementById(tomb).getElementsByTagName('input')
    console.log(theUrl)

    const gerente = line[0].value
    const ref = line[1].value
    const mqttEnviar = line[2].value
    const mqttRec = line[3].value
    const ip = line[4].value

    
    theUrl = theUrl + "&gerente=" + gerente
    theUrl = theUrl + "&ref=" + ref
    theUrl = theUrl + "&mqttEnviar=" + mqttEnviar
    theUrl = theUrl + "&mqttRec=" + mqttRec
    theUrl = theUrl + "&ip=" + ip


	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, false ); // false for synchronous request
	xmlHttp.setRequestHeader('tomb',tomb)
    xmlHttp.send( "gerente="+gerente );
    var resp = xmlHttp.response
	var line = document.getElementById(tomb)
	var newLine = new DOMParser().parseFromString(resp,'text/html').getElementById(tomb)
	
	line.parentNode.replaceChild(newLine,line)
}