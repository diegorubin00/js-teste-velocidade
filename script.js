const testArea = document.querySelector("#test-area");
const gabaritoArea = document.querySelector("#origin-text")
const theTimer = document.querySelector(".timer");
const testWrapper = document.querySelector(".test-wrapper");
const resetButton = document.querySelector("#reset");

const GABARITOS = [
    "A gente se encontra um dia, quando eu voltar.",
    "Não buzine, acorde mais cedo.",
    "Deus ajuda, a quem cedo madruga.",
    "Quem cedo madruga, fica com sono o dia inteiro.",
    "A luz dos teus olhos ilumina o meu caminho.",
    "Dirijo com cuidado para não deixar chorando quem me espera sorrindo.",
    "Não sou detetive mas só ando na pista.",
    "Nunca é tarde para ser feliz.",
    "Antes eu sonhava, agora eu nem durmo.",
    "Como é triste sonhar com teu carinho e acordar no Mercedinho.",
    "Meus faróis iluminam a estrada e Deus ilumina meu caminho.",
    "Antes eu sonhava, agora eu nem durmo.",
    "Não dirija dormindo para não fazer acordar chorando quem espera sorrindo.",
    "A fortuna faz amigos, mas a desgraça prova se eles existem de fato.",
    "A maior lei do trânsito é a nossa educação.",
    "Pra quem não tem nada, metade é o dobro.",
    "As coisas podem piorar, você é que não tem imaginação!",
    "Devagar se vai longe – rápido também, só que mais depressa!",
    "Se tempo fosse dinheiro, então o meu relógio seria milionário!",
    "Não há diferença entre um sábio e um tolo quando ambos estão apaixonados.",
    "Qualquer fracassado lhe dirá que sucesso não passa de sorte.",
    "Vitamina de motorista é poeira de estrada.",
    "Um diamante é um pedaço de carvão que se saiu bem sob pressão.",
    "Tudo que você usa já esteve em um caminhão.",
    "A humildade é a base da felicidade.",
    "A velocidade que emociona é a mesma que mata.",
    "A vida é como um dado: tem pontos marcados.",
    "Dinheiro não traz felicidade ... manda buscar.",
    "Não sou dono do mundo, mas sou filho dele.",
    "A Serviço de Deus.",
    "Enquanto há vida, há esperança.",
    "O Senhor é meu pastor e nada me faltará.",
    "Ninguém vai me amar do jeito que Jesus me ama.",
    "Este veículo é rastreado por Deus.",
    "Tudo sofre, tudo crê, tudo espera, tudo suporta.",
    "Se Deus é por nós, então quem será contra?",
    "Meus faróis iluminam a estrada, mas Deus ilumina meu caminho.",
    "Dirigido por mim, guiado por Deus.",
    "Fé em Deus e pé na tábua.",
    "Deus é joia, o resto é bijuteria.",
    "Quem fala o que quer, escuta o que não quer.",
    "Dinheiro não traz felicidade ... Então me dê o seu e seja feliz.",
    "Com Deus e Nossa Senhora, por esse Brasil afora.",
    "Deus dá as batalhas mais difíceis aos seus melhores soldados.",
    "Se você não acredita em milagres, talvez você tenha esquecido: você é um!",
    "Perigo não é um cavalo na pista, mas sim um burro na direção.",
    "O amor é um sonho... mas o casamento é o despertador.",
    "Casei com Maria, mas viajo com Mercedes.",
    "Se um dia for falar mal de mim, me chame, pois sei coisas terríveis sobre mim.",
    "Não sou o Silvio Santos, mas vivo do baú.",
    "Não me siga, posso estar perdido.",
    "No teatro do poder, todos são formados em artes cínicas!",
    "Nunca desista de seu sonho!…você sempre vai encontrá-lo em alguma padaria!",
    "Os últimos serão os desclassificados!",
    "O trabalho foi inventado por quem não tinha o que fazer!",
    "Preguiça é o hábito de descansar antes de estar cansado.",
    "Quanto mais conheço os homens mais admiro os cachorros.",
    "A distância mostra como é bom estarmos juntos!",
    "A saudade é a memória do coração.",
    "Eu te amo, meu amor! Saudades.",
    "Foi nas curvas da vida que eu capotei meu coração.",
    "Não tenho tudo na vida, mas amo tudo que tenho.",
    "Se disserem que te esqueci, reze, porque morri.",
    "Viajo porque preciso, volto porque te amo.",
    "Não é pressa, mas saudade.",
    "Te amo mais que ontem e menos que amanhã.",
    "A gente se encontra um dia, quando eu voltar.",
    "Dirijo com cuidado para não deixar chorando quem me espera sorrindo."
]

timer = [0,0,0,0];
var interval;
var timerRunning = false;

function spellCheck() {
    const textoInseridoText = testArea.value;
    const gabaritoText = gabaritoArea.innerText;

    if (textoInseridoText == gabaritoText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
    } else {
        if (textoInseridoText == gabaritoText) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }

}

// Adiciona zero inicial aos números <= 9 (apenas para estética):
function leadingZero(time) {
    if(time <= 9){
        time = "0" + time;
    }
    return time;
}

// Executa um timer padrão de minuto / segundo / centésimos:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

function start(){
    let textEnteredLength = testArea.value.length;
     if (textEnteredLength === 0 && !timerRunning) {
         timerRunning = true;
         interval = setInterval(runTimer, 10);
     }
 }

// Função de recomeçar:
async function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";

    const gabaritoValue = await getGabarito()
    console.log('xxxx_gabarito', gabaritoValue)
    gabaritoArea.innerText = gabaritoValue;
}

function loadGabarito() {

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  
testArea.addEventListener("keyup", spellCheck, false);
testArea.addEventListener("keypress", start, false);
resetButton.addEventListener("click", reset, false);

async function getGabarito()  {
    const defer = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(GABARITOS[getRandomInt(68)])
        }, 2000);
    });

    return defer
        .then((data) => {
            return data;
        })
}

window.addEventListener('load', async (event) => {

    console.log('The page has fully loaded');
    const gabaritoValue = await getGabarito()
    console.log('xxxx_gabarito', gabaritoValue)
    gabaritoArea.innerText = gabaritoValue;
});