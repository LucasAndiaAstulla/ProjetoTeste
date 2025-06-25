let pessoas = [];

const nomeInput = document.getElementById("nomeInput");
const btnIncluir = document.getElementById("btnIncluir");
const pessoasContainer = document.getElementById("pessoasContainer");
const jsonOutput = document.getElementById("jsonOutput");


function atualizarInterface() {
    pessoasContainer.innerHTML = "<h2>Pessoas</h2>";

    pessoas.forEach((pessoa, indexPessoa) => {
        const div = document.createElement("div");
        div.className = "pessoa";

        const h3 = document.createElement("h3");
        h3.textContent = pessoa.nome;

        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.onclick = () => {
            pessoas.splice(indexPessoa, 1);
            atualizarInterface();
        };

        h3.appendChild(btnRemover);
        div.appendChild(h3);

        const ul = document.createElement("ul");
        pessoa.filhos.forEach((filho, indexFilho) => {
            const li = document.createElement("li");
            li.textContent = `- ${filho}`;

            const btnRemoverFilho = document.createElement("button");
            btnRemoverFilho.textContent = "Remover filho";
            btnRemoverFilho.onclick = () => {
                pessoa.filhos.splice(indexFilho, 1);
                atualizarInterface();
            };

            li.appendChild(btnRemoverFilho);
            ul.appendChild(li);
        });

        div.appendChild(ul);

        const btnAdicionarFilho = document.createElement("button");
        btnAdicionarFilho.textContent = "Adicionar filho";
        btnAdicionarFilho.onclick = () => {
            const nomeFilho = prompt("Nome do filho:");
            if (nomeFilho) {
                pessoa.filhos.push(nomeFilho);
                atualizarInterface();
            }
        };

        div.appendChild(btnAdicionarFilho);
        pessoasContainer.appendChild(div);
    });

    // Atualiza JSON no painel direito
    jsonOutput.textContent = JSON.stringify({ pessoas }, null, 2);
}

// Incluir nova pessoa
btnIncluir.addEventListener("click", () => {
    const nome = nomeInput.value.trim();
    if (nome) {
        pessoas.push({ nome, filhos: [] });
        nomeInput.value = "";
        atualizarInterface();
    } else {
        alert("Digite um nome!");
    }
});


document.getElementById("btnGravar").addEventListener("click", () => {
    fetch("gravar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pessoas })
    })
        .then(res => res.json())
        .then(data => {
            alert(data.mensagem);
        })
        .catch(() => alert("Erro ao gravar os dados"));
});

document.getElementById("btnLer").addEventListener("click", () => {
    fetch("ler.php")
        .then(res => res.json())
        .then(data => {
            pessoas = data.pessoas || [];
            atualizarInterface();
        })
        .catch(() => alert("Erro ao ler os dados"));
});
