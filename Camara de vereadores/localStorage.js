document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Chave: temaPreferido (Cria a chave se ela não existir)
    if (!localStorage.getItem("temaPreferido")) {
        localStorage.setItem("temaPreferido", "claro");
    }

    // 2. Chave: totalAcessosHome (Incrementa apenas na página inicial)
    if (window.location.pathname.includes("Camara_municipal.html") || window.location.pathname.endsWith("/")) {
        let acessos = parseInt(localStorage.getItem("totalAcessosHome")) || 0;
        acessos++;
        localStorage.setItem("totalAcessosHome", acessos);
    }

    // 3. Chave: ultimoVereadorVisualizado (Valor padrão inicial)
    if (!localStorage.getItem("ultimoVereadorVisualizado")) {
        localStorage.setItem("ultimoVereadorVisualizado", "Nenhum");
    }

    const linksVereadores = document.querySelectorAll(".vereador-card a");
    linksVereadores.forEach(link => {
        link.addEventListener("click", (evento) => {
            const card = evento.target.closest(".vereador-card");
            const nomeVereador = card.querySelector("h3").innerText;
            localStorage.setItem("ultimoVereadorVisualizado", nomeVereador);
        });
    });

    // 4. Chave: nomeUltimoVisitante (Valor padrão inicial)
    if (!localStorage.getItem("nomeUltimoVisitante")) {
        localStorage.setItem("nomeUltimoVisitante", "Cidadão Anônimo");
    }

    const inputNomeOuvidoria = document.querySelector("#ouvidoria #nome");
    if (inputNomeOuvidoria) {
        const ultimoNome = localStorage.getItem("nomeUltimoVisitante");
        if (ultimoNome && ultimoNome !== "Cidadão Anônimo") {
            inputNomeOuvidoria.value = ultimoNome;
        }

        inputNomeOuvidoria.addEventListener("input", (e) => {
            localStorage.setItem("nomeUltimoVisitante", e.target.value);
        });
    }

    // 5. Chave: noticiasFavoritas (Array JSON inicial)
    if (!localStorage.getItem("noticiasFavoritas")) {
        localStorage.setItem("noticiasFavoritas", JSON.stringify([]));
    }
});