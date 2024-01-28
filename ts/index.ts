const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null = document.querySelector("#input-localizacao");

const sectionInfo = document.querySelector("#tempo-info")

form?.addEventListener("submit", async(event) => {
    event.preventDefault();

    if (!input || !sectionInfo) return;

    const localizacao = input.value;

    if (localizacao.length < 3) {
        alert("O local precisar ter pelo menos 3 letras!");
        return;
    };

    try {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=67fc4370ef859855bfeb8faca7ea682e&lang=pt_br&units=metric`);

        const dados = await resposta.json();

        const infos = {
            temperatura: Math.round(dados.main.temp),
            local: dados.name,
            icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
         };

        sectionInfo.innerHTML = `
            <div class="tempo-dados">
                <h2>${infos.local}</h2>
                <span>${infos.temperatura}°C</span>
            </div>
            <img src="${infos.icone}">
        `;
    } catch (erro) {
        console.log("Ocorreu um erro no requerimento dos dados da api.", erro);
    }



})