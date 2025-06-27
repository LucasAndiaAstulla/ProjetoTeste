//array aonde vou guardar minhas pessoas
let pessoas = [];

//Declarando minhas variávels
const nomeInput = document.getElementById("nomeInput"); //Input para adicionar parentes
const btnIncluir = document.getElementById("btnIncluir"); //Input adicionar a pessoa
const pessoasContainer = document.getElementById("pessoasContainer"); //Conteiner aonde fica as pessoas
const jsonOutput = document.getElementById("jsonOutput"); //Conteiner do json

// Atualiza a interface e passa a parte de HTML na tela 
function atualizarInterface() {
    pessoasContainer.innerHTML = "<h2>Pessoas</h2>";


    pessoas.forEach((pessoa, indexPessoa) => {
        //Criando conteiner de cada pessoa criada
        const div = document.createElement("div");
        div.className = "pessoa";

        //criando nome da pessoa e colocando nome dela
        const h3 = document.createElement("h3");
        h3.textContent = pessoa.nome;

        //criando botão remover
        const btnRemover = document.createElement("button");

        //Criando filho de pessoa
        const ul = document.createElement("ul");

        //Criando botão para adicionar filho
        const btnAdicionarFilho = document.createElement("button");

        //Ação para botão remover
        btnRemover.textContent = "Remover";
        btnRemover.onclick = () => {
            pessoas.splice(indexPessoa, 1);
            //chama para resetar a interface e excluir a pessoa
            atualizarInterface();
        };

        //organizando
        h3.appendChild(btnRemover);
        div.appendChild(h3);

        //Ação para filho criado
        pessoa.filhos.forEach((filho, indexFilho) => {
            const li = document.createElement("li");
            li.textContent = `- ${filho}`;

            //botão para excluir filho
            const btnRemoverFilho = document.createElement("button");
            //adicionando o texto "remover filho" dentro do btn
            btnRemoverFilho.textContent = "Remover filho";
            btnRemoverFilho.onclick = () => {
                pessoa.filhos.splice(indexFilho, 1);
                atualizarInterface();
            };

            //organizando quem fica dentro de quem
            li.appendChild(btnRemoverFilho);
            ul.appendChild(li);
        });

        //organizando
        div.appendChild(ul);

        //Ação para adicionar filho
        btnAdicionarFilho.textContent = "Adicionar filho";
        btnAdicionarFilho.onclick = () => {
            const nomeFilho = prompt("Nome do filho:");
            if (nomeFilho) {
                pessoa.filhos.push(nomeFilho);
                atualizarInterface();
            }
        };

        //organizando
        div.appendChild(btnAdicionarFilho);
        pessoasContainer.appendChild(div);
    });

    // Atualiza JSON no painel direito para adicionar as pessoas e excluir elas
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
        alert("Digite o nome da pessoa!!");
    }
});

//Tentativa de gravar o arquivo inteiro
document.getElementById("btnGravar").addEventListener("click", () => {
    //tentar a conexão a rede, no caso conexão ao arquivo ler.php
    fetch("gravar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //em JSON
        body: JSON.stringify({ pessoas }) // Corpo seria em JSON
    })
        //metodo then puxado quando o fetch é devolvido com sucesso
        .then(res => res.json())
        .then(data => {
            alert(data.mensagem);
        })
        .catch(() => alert("Erro ao gravar os dados"));
});

//Tentativa de ler
document.getElementById("btnLer").addEventListener("click", () => {
    //tentar a conexão com o banco de dados
    fetch("ler.php")
        //metodo then puxado quando o fetch é devolvido com sucesso
        .then(res => res.json())
        .then(data => {
            pessoas = data.pessoas || [];
            atualizarInterface();
        })
        //Só roda se ocorrer algum erro
        .catch(() => alert("Erro ao ler os dados"));
});
