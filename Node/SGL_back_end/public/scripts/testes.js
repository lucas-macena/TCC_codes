
var token = document.getElementsByClassName("token").item(0).innerHTML

function homeOnClick() {
    
    
	// console.log('oi lucas')
    // const urlParams = new URLSearchParams(window.location.search)
    // console.log(urlParams)
	var token = document.getElementsByClassName("token").item(0).innerHTML
    
	var theUrl = "/testes"
	var xmlHttp = new XMLHttpRequest();

    xmlHttp.open( "GET", theUrl, true ); // false for synchronous request
    xmlHttp.setRequestHeader("auth", true)
    xmlHttp.setRequestHeader("token", "arrasei")
    xmlHttp.send(null);
    
    console.log('clicando no botão')

}

document.getElementById('homeButton').onclick = ()=>{
    var token = document.getElementsByClassName("token").item(0).innerHTML
    
	var theUrl = "/testes"
	var xmlHttp = new XMLHttpRequest();

    xmlHttp.open( "GET", theUrl, true ); // false for synchronous request
    xmlHttp.setRequestHeader("auth", true)
    xmlHttp.setRequestHeader("token", "arrasei")
    xmlHttp.send(null);
    
	
	
    console.log('clicando no botão')
}

document.getElementsByTagName("a").onclick = ()=>{
    fetch('/testes', {
        method: "GET",
        headers: {
            auth: 'true',
            token: token
        }
    })
}


console.log(location.hash)

document.addEventListener('onunload',()=>{
    console.log('mudou')
    window.alert('saindo!')
})