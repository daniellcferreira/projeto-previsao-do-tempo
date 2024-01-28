"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-localizacao");
const sectionInfo = document.querySelector("#tempo-info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionInfo)
        return;
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert("O local precisar ter pelo menos 3 letras!");
        return;
    }
    ;
    try {
        const resposta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=67fc4370ef859855bfeb8faca7ea682e&lang=pt_br&units=metric`);
        const dados = yield resposta.json();
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
    }
    catch (erro) {
        console.log("Ocorreu um erro no requerimento dos dados da api.", erro);
    }
}));
