let sekundy = 0;
let minuty = 0;
let intervalId;
let isRunning = false;

function aktualizujCzas() {
    sekundy++;
    if (sekundy == 60) {
        sekundy = 0;
        minuty++;
    }

    let czasTekst;
    if (minuty > 0) {
        czasTekst = `${minuty}min ${sekundy}s`;
    } else {
        czasTekst = `${sekundy}s`;
    }

    document.getElementById("czas").innerText = czasTekst;
}

function startStoper() {
    if (!isRunning) {
        intervalId = setInterval(aktualizujCzas, 1000);
        isRunning = true;
    }
}

function stopStoper() {
    clearInterval(intervalId);
    isRunning = false;
}

function resetStoper() {
    clearInterval(intervalId);
    sekundy = 0;
    minuty = 0;
    isRunning = false;
    document.getElementById("czas").innerText = "0";
}