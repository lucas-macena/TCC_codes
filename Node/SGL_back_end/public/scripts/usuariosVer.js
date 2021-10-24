var serverIP

window.addEventListener('load',()=>{
    serverIP = document.getElementsByClassName('item')[0].childNodes.item(0).href
    
})

var corpo = document.getElementsByTagName('html')

function ver(ficha) {
    // window.alert("Desconectado!!!")
	var theUrl = serverIP + "fichaUser?ficha=" + ficha
	
	
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
	xmlHttp.setRequestHeader('ficha',ficha)
    xmlHttp.send( null );
    var resp = xmlHttp.response
	
	var tabela = document.getElementsByClassName('tabela')[0]
	var newTabela = new DOMParser().parseFromString(resp,'text/html').getElementsByClassName('tabela')[0]
	console.log(newTabela)
	tabela.parentNode.replaceChild(newTabela,tabela)
	// window.alert(aaa)
	
}