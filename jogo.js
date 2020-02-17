var timerId = null; //variavel que armazena a chamada da function timeOut
function iniciaJogo(){
	var url=window.location.search;
	var nivel=url.replace('?','');
	var tempo=0;

	if(nivel==1)		//1 fácil -> 120 segundos
		tempo=120;
	else if(nivel==2)	//2 normal -> 60 segundos
		tempo=60;
	else if(nivel==3)	//3 dificil -> 30 segundos
		tempo=30;

	//Inserindo segundos no SPAN
	document.getElementById('cronometro').innerHTML=tempo;

	//Quantidade de Balões
	var qtd_balao=60;

	cria_baloes(qtd_balao);

	document.getElementById('baloes_inteiros').innerHTML= qtd_balao;
	document.getElementById('baloes_estourados').innerHTML= 0;
	
	contagem_tempo(tempo+1);

	console.log(tempo);
}

function contagem_tempo(time){
	time--;
	document.getElementById('cronometro').innerHTML=time;
	if(time==0){
		//Para a execução do setTimeout
		clearTimeout(timerId);
		game_over();
		return false;
	}
	timerId=setTimeout('contagem_tempo('+time+')',1000);
}

function game_over(){
	alert("Fim de jogo, YOU LOSER");
}

function cria_baloes(qt){ 
	for(i=1;i<=qt;i++){
		var balao=document.createElement("img");
		balao.src='imagens/balao_azul_pequeno.png';
		balao.style.margin='10px';
		balao.id='b'+i;
		balao.onclick=function(){estourar(this);}

		document.getElementById('cenario').appendChild(balao);
	}

}

function estourar(e){
	var id_balao=e.id;
	e.setAttribute('onclick','');
	e.src='imagens/balao_azul_pequeno_estourado.png'
	pontuacao(-1);
}

function pontuacao(acao){
	var inteiros=parseInt(document.getElementById('baloes_inteiros').innerHTML);
	var estourados=parseInt(document.getElementById('baloes_estourados').innerHTML);

	inteiros=inteiros+acao;
	estourados= estourados-acao;

	document.getElementById('baloes_inteiros').innerHTML=inteiros
	document.getElementById('baloes_estourados').innerHTML=estourados;

	estado_jogo(inteiros);

}

function estado_jogo(baloes_inteiros){
	if(baloes_inteiros==0){
		clearTimeout(timerId);
		var tela=document.createElement('div');
		tela.style.position='absolute';
		tela.style.top='0px';
		tela.style.width='600px';
		tela.style.height='500px';
		tela.style.background='rgba(0,0,0,0.4)';
		tela.style.textAlign='center';
		tela.innerHTML='<h1 style="color:white; margin-top: 50px;">Você Venceu!!!</h1>';
		document.getElementById('cenario').appendChild(tela);
	}
}

