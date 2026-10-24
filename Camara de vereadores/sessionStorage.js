/* =====================================================================
   sessionStorage_bf.js
   Parte do sessionStorage do projeto (6 chaves).
   Os dados duram apenas enquanto a aba estiver aberta.
   Chaves: sessaoInicio, paginasVisitadas, rascunhoOuvidoria,
           ultimoProtocoloConsultado, slideAtual, vereadoresVistosSessao
   ===================================================================== */
(function () {
"use strict";

/* ---------- Funções auxiliares ---------- */
function lerSessao(chave, padrao) {
    try {
        const valor = sessionStorage.getItem(chave);
        return valor === null ? padrao : JSON.parse(valor);
    } catch (erro) {
        return padrao;
    }
}

function gravarSessao(chave, valor) {
    try {
        sessionStorage.setItem(chave, JSON.stringify(valor));
    } catch (erro) {
        console.warn("sessionStorage indisponível:", erro);
    }
}

function removerSessao(chave) {
    try {
        sessionStorage.removeItem(chave);
    } catch (erro) {
        console.warn("sessionStorage indisponível:", erro);
    }
}

document.addEventListener("DOMContentLoaded", () => {

    // 1. Chave: sessaoInicio
    // Data/hora em que a sessão começou (gravada apenas uma vez).
    if (lerSessao("sessaoInicio", null) === null) {
        gravarSessao("sessaoInicio", new Date().toISOString());
    }

    // 2. Chave: paginasVisitadas
    // Histórico (array JSON) das páginas abertas na sessão.
    const nomePagina = window.location.pathname.split("/").pop() || "Camara_municipal.html";
    const historico = lerSessao("paginasVisitadas", []);
    historico.push({ pagina: nomePagina, hora: new Date().toLocaleTimeString("pt-BR") });
    gravarSessao("paginasVisitadas", historico.slice(-50));

    // 3. Chave: rascunhoOuvidoria
    // Guarda tipo, assunto e mensagem enquanto o cidadão digita; apaga ao enviar.
    const formManifestacao = document.querySelector(".manifestacao form");
    if (formManifestacao) {
        const rascunho = lerSessao("rascunhoOuvidoria", {});

        ["tipo", "assunto", "mensagem"].forEach(id => {
            const campo = formManifestacao.querySelector("#" + id);
            if (!campo) return;

            if (rascunho[id]) {
                campo.value = rascunho[id];
            }

            const salvar = () => {
                const atual = lerSessao("rascunhoOuvidoria", {});
                atual[id] = campo.value;
                gravarSessao("rascunhoOuvidoria", atual);
            };
            campo.addEventListener("input", salvar);
            campo.addEventListener("change", salvar);
        });

        formManifestacao.addEventListener("submit", () => {
            removerSessao("rascunhoOuvidoria");
        });
    }

    // 4. Chave: ultimoProtocoloConsultado
    // Último número de protocolo pesquisado na Ouvidoria.
    const formProtocolo = document.querySelector(".consulta-protocolo form");
    if (formProtocolo) {
        const inputProtocolo = formProtocolo.querySelector("#protocolo");
        const ultimoProtocolo = lerSessao("ultimoProtocoloConsultado", "");
        if (inputProtocolo && ultimoProtocolo) {
            inputProtocolo.value = ultimoProtocolo;
        }
        formProtocolo.addEventListener("submit", () => {
            if (inputProtocolo) {
                gravarSessao("ultimoProtocoloConsultado", inputProtocolo.value);
            }
        });
    }

    // 5. Chave: slideAtual
    // Slide do carrossel da home. O slider.js (original) já escuta o evento
    // "change" dos radios, então basta marcar o radio salvo e disparar o evento.
    const radios = document.querySelectorAll("input[name='radio-btn']");
    if (radios.length > 0) {
        const salvo = parseInt(lerSessao("slideAtual", 1), 10);
        if (salvo >= 1 && salvo <= radios.length) {
            const radioSalvo = document.querySelector("#radio" + salvo);
            if (radioSalvo) {
                radioSalvo.checked = true;
                radioSalvo.dispatchEvent(new Event("change"));
            }
        }

        radios.forEach(radio => {
            radio.addEventListener("change", () => {
                gravarSessao("slideAtual", parseInt(radio.id.slice(-1), 10));
            });
        });
    }

    // 6. Chave: vereadoresVistosSessao
    // Nomes (sem repetição) dos vereadores cujo perfil foi clicado na sessão.
    document.querySelectorAll(".vereador-card a").forEach(link => {
        link.addEventListener("click", () => {
            const card = link.closest(".vereador-card");
            const nome = card.querySelector("h3").innerText;
            const vistos = lerSessao("vereadoresVistosSessao", []);
            if (!vistos.includes(nome)) {
                vistos.push(nome);
                gravarSessao("vereadoresVistosSessao", vistos);
            }
        });
    });
});

})();
