
const BASE_URL = "https://crudcrud.com/api/14f12d67612748cb8b9ad2fd3cddeb87/clientes";

const form = document.getElementById('clienteForm');
const listaClientes = document.getElementById('listaClientes');


document.addEventListener('DOMContentLoaded', buscarClientes);

async function buscarClientes() {
    try {
        const response = await fetch(BASE_URL);
        const clientes = await response.json();
        
        listaClientes.innerHTML = "";
        
        if (clientes.length === 0) {
            listaClientes.innerHTML = "<li>Nenhum cliente cadastrado.</li>";
            return;
        }

        clientes.forEach(cliente => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><strong>${cliente.nome}</strong> (${cliente.email})</span>
                <button onclick="deletarCliente('${cliente._id}')">Excluir</button>
            `;
            listaClientes.appendChild(li);
        });
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
    }
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const novoCliente = { nome, email };

    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoCliente)
        });

        if (response.ok) {
            form.reset();
            buscarClientes(); // Atualiza a lista na tela
        } else {
            alert("Erro ao cadastrar cliente.");
        }
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
    }
});


async function deletarCliente(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            buscarClientes(); // Atualiza a lista após remover
        } else {
            alert("Erro ao excluir cliente.");
        }
    } catch (error) {
        console.error("Erro ao excluir:", error);
    }
}