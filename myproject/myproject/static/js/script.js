let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
let veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
let operacoes = JSON.parse(localStorage.getItem('operacoes')) || [];


function adicionarCliente() {
   const nome = prompt("Digite o nome do cliente:");
   const cpf = prompt("Digite o CPF do cliente:");
   const endereco = prompt("Digite o endereço do cliente:");

   if (nome && cpf && endereco) {
    const clientes = {
        nome: nome,
        cpf: cpf,
        endereco: endereco,
    };

    fetch('/polls/criar-clientes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientes) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert("Ciente adicionado com sucesso!");
            atualizarListaClientes();
        } else {
            alert("Erro ao adicionar cliente: " + data.message);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert("Erro na comunicação com o servidor.");
    });
} else {
    alert("Todos os campos são obrigatórios.");
}
}

function atualizarListaClientes() {
    const lista = document.getElementById("lista-clientes");
    lista.innerHTML = ""; 
 
    fetch('/polls/listar-clientes/', { 
       method: 'GET',
       headers: {
          'Content-Type': 'application/json',
       },
    })
    .then(response => response.json()) 
    .then(data => {
       if (data.status === 'success') {
          const clientes = data.clientes;  
 

          clientes.sort((a, b) => a.nome.localeCompare(b.nome));
 
    
          clientes.forEach((cliente, index) => {
             const li = document.createElement("li");
             li.textContent = `${cliente.nome} - ${cliente.cpf} - ${cliente.endereco}`;
 
 
             const btnEditar = document.createElement("button");
             btnEditar.textContent = "Editar";
             btnEditar.onclick = () => {
                editarCliente(index);  
             };
 

             const btnRemover = document.createElement("button");
             btnRemover.textContent = "Remover";
             btnRemover.onclick = () => {
                removerCliente(index);  
             };
 
             li.appendChild(btnEditar);
             li.appendChild(btnRemover);
             lista.appendChild(li);
          });
       } else {
          console.log('Erro ao obter clientes:', data.message);
       }
    })
    .catch(error => {
       console.log('Erro na requisição:', error);
    });
 }

function editarCliente(index) {
   const cliente = clientes[index];
   const novoNome = prompt("Digite o novo nome:", cliente.nome);
   const novoCpf = prompt("Digite o novo CPF:", cliente.cpf);
   const novoEndereco = prompt("Digite o novo endereço:", cliente.endereco);

   if (novoNome && novoCpf && novoEndereco) {
       clientes[index] = { nome: novoNome, cpf: novoCpf, endereco: novoEndereco };
       localStorage.setItem('clientes', JSON.stringify(clientes));
       atualizarListaClientes();
   }
}

function removerCliente(index) {
   clientes.splice(index, 1); 
   localStorage.setItem('clientes', JSON.stringify(clientes)); 
   atualizarListaClientes(); 
}


function adicionarVeiculo() {
    const modelo = prompt("Digite o modelo do veículo:");
    const placa = prompt("Digite a placa do veículo:");
    const marca = prompt("Digite a marca do veículo:");
    const imagemUrl = prompt("Digite a URL da imagem do veículo:");

    if (modelo && placa && marca && imagemUrl) {
        const veiculo = {
            modelo: modelo,
            placa: placa,
            marca: marca,
            imagemUrl: imagemUrl
        };

        fetch('/polls/criar-veiculos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(veiculo) 
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert("Veículo adicionado com sucesso!");
                atualizarListaVeiculos();
            } else {
                alert("Erro ao adicionar veículo: " + data.message);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Erro na comunicação com o servidor.");
        });
    } else {
        alert("Todos os campos são obrigatórios.");
    }
}


function atualizarListaVeiculos() {
    const lista = document.getElementById("lista-veiculos");
    lista.innerHTML = "";
    fetch('/polls/listar-veiculos/', {  
       method: 'GET',
       headers: {
          'Content-Type': 'application/json',
       },
    })
    .then(response => response.json())  
    .then(data => {
       if (data.status === 'success') {
          const veiculos = data.veiculos;
          veiculos.sort((a, b) => a.marca.localeCompare(b.marca) || a.modelo.localeCompare(b.modelo));
 
          veiculos.forEach((veiculo, index) => {
             const li = document.createElement("li");
             const img = document.createElement("img");
             img.src = veiculo.imagemUrl;
             img.alt = `Imagem do ${veiculo.modelo}`;
             img.style.width = "100px"; 
             img.style.height = "auto"; 
 
             li.textContent = `${veiculo.marca} - ${veiculo.modelo} - ${veiculo.placa} - `;
 
             const btnEditarVeiculo = document.createElement("button");
             btnEditarVeiculo.textContent = "Editar";
             btnEditarVeiculo.onclick = () => {
                editarVeiculo(index);
             };
 
             const btnRemoverVeiculo = document.createElement("button");
             btnRemoverVeiculo.textContent = "Remover";
             btnRemoverVeiculo.onclick = () => {
                removerVeiculo(index);
             };
 
             li.appendChild(img);
             li.appendChild(btnEditarVeiculo);
             li.appendChild(btnRemoverVeiculo);
 
             lista.appendChild(li);
          });
       } else {
          console.log('Erro ao obter veículos:', data.message);
       }
    })
    .catch(error => {
       console.log('Erro na requisição:', error);
    });
 }

function editarVeiculo(index) {
   const veiculo = veiculos[index];
   const novoModelo = prompt("Digite o novo modelo:", veiculo.modelo);
   const novaPlaca = prompt("Digite a nova placa:", veiculo.placa);
   const novaMarca = prompt("Digite a nova marca:", veiculo.marca);
   const novaImagemUrl = prompt("Digite a nova URL da imagem:", veiculo.imagemUrl);

   if (novoModelo && novaPlaca && novaMarca && novaImagemUrl) {
       veiculos[index] = { modelo: novoModelo, placa: novaPlaca, marca: novaMarca, imagemUrl: novaImagemUrl };
       localStorage.setItem('veiculos', JSON.stringify(veiculos));
       atualizarListaVeiculos();
   }
}

function removerVeiculo(index) {
   veiculos.splice(index, 1); 
   localStorage.setItem('veiculos', JSON.stringify(veiculos)); 
   atualizarListaVeiculos(); 
}


function carregarSelects() {
   const clienteSelect = document.getElementById('cliente-select');
   const veiculoSelect = document.getElementById('veiculo-select');

   clientes.forEach(cliente => {
       const option = document.createElement('option');
       option.value = cliente.cpf;
       option.textContent = cliente.nome;
       clienteSelect.appendChild(option);
   });

   veiculos.forEach(veiculo => {
       const option = document.createElement('option');
       option.value = veiculo.placa;
       option.textContent = `${veiculo.marca} - ${veiculo.modelo}`;
       veiculoSelect.appendChild(option);
   });
}


document.getElementById('form-operacao').addEventListener('submit', function(e) {
   e.preventDefault(); 

   const tipoOperacao = document.getElementById('tipo-operacao').value;
   const numero = document.getElementById('numero').value;
   const data = document.getElementById('data').value;
   const clienteCpf = document.getElementById('cliente-select').value;
   const vendedor = document.getElementById('vendedor').value;
   const veiculoPlaca = document.getElementById('veiculo-select').value;

   let operacao;

   if (tipoOperacao === 'compra') {
       operacao = {
           tipo: 'compra',
           numero,
           data,
           cliente: clienteCpf,
           vendedor,
           veiculo: veiculoPlaca,
           valor: prompt("Digite o valor da compra:")
       };
   } else {
       operacao = {
           tipo: 'venda',
           numero,
           data,
           cliente: clienteCpf,
           vendedor,
           veiculo: veiculoPlaca,
           valorEntrada: prompt("Digite o valor de entrada:"),
           valorFinanciado: prompt("Digite o valor financiado:"),
           valorTotal: prompt("Digite o valor total:")
       };
   }

   operacoes.push(operacao);
   localStorage.setItem('operacoes', JSON.stringify(operacoes));
   atualizarListaOperacoes();
});


function atualizarListaOperacoes() {
    const listaOperacoes = document.getElementById("lista-operacoes");
    listaOperacoes.innerHTML = "";

    operacoes.forEach((operacao, index) => {
        const li = document.createElement("li");
        li.textContent = `${operacao.tipo.charAt(0).toUpperCase() + operacao.tipo.slice(1)} - Número: ${operacao.numero}, Data: ${operacao.data}, Cliente: ${operacao.cliente}, Vendedor: ${operacao.vendedor}, Veículo: ${operacao.veiculo}`;
        
        if (operacao.tipo === 'venda') {
            li.textContent += `, Valor Entrada: ${operacao.valorEntrada}, Valor Financiado: ${operacao.valorFinanciado}, Valor Total: ${operacao.valorTotal}`;
        } else {
            li.textContent += `, Valor: ${operacao.valor}`;
        }

        const btnEditarOperacao = document.createElement("button");
        btnEditarOperacao.textContent = "Editar";
        btnEditarOperacao.onclick = () => {
            editarOperacao(index);
        };


        const btnRemoverOperacao = document.createElement("button");
        btnRemoverOperacao.textContent = "Remover";
        btnRemoverOperacao.onclick = () => {
            removerOperacao(index);
        };

        li.appendChild(btnEditarOperacao);
        li.appendChild(btnRemoverOperacao);

        listaOperacoes.appendChild(li);
    });
}

function editarOperacao(index) {
    const operacaoAtualizadaTipo= operacoes[index].tipo;
    
    if (operacaoAtualizadaTipo === 'compra') {    
      operacoes[index].numero=prompt(`Número atual é ${operacoes[index].numero}. Digite um novo número:`)
      operacoes[index].data=prompt(`Data atual é ${operacoes[index].data}. Digite uma nova data:`)
      operacoes[index].cliente=prompt(`Cliente atual é ${operacoes[index].cliente}. Digite um novo cliente:`)
      operacoes[index].vendedor=prompt(`Vendedor atual é ${operacoes[index].vendedor}. Digite um novo vendedor:`)
      operacoes[index].veículo=prompt(`Veículo atual é ${operacoes[index].veículo}. Digite um novo veículo:`)
      operacoes[index].valor=prompt(`Valor atual é ${operacoes[index].valor}. Digite um novo valor:`)
      
      } else {  
          operacoes[index].numero=prompt(`Número atual é ${operacoes[index].numero}. Digite um novo número:`)
          operacoes[index].data=prompt(`Data atual é ${operacoes[index].data}. Digite uma nova data:`)
          operacoes[index].cliente=prompt(`Cliente atual é ${operacoes[index].cliente}. Digite um novo cliente:`)
          operacoes[index].vendedor=prompt(`Vendedor atual é ${operacoes[index].vendedor}. Digite um novo vendedor:`)
          operacoes[index].veículo=prompt(`Veículo atual é ${operacoes[index].veículo}. Digite um novo veículo:`)
          operacoes[index].valorEntrada=prompt(`Valor de entrada atual é ${operacoes[index].valorEntrada}. Digite um novo valor de entrada:`)
          operações[index].valorFinanciado=prompt(`Valor financiado atual é ${operacoes[index].valorFinanciado}. Digite um novo valor financiado:`)
          operações[index].valorTotal=prompt(`Valor total atual é ${operacoes[index].valorTotal}. Digite um novo valor total:`)
      }

      localStorage.setItem('operações', JSON.stringify(operations));
      atualizarListaOperações();
}

function removerOperacao(index) {
    operacoes.splice(index, 1); 
    localStorage.setItem('operacoes', JSON.stringify(operacoes)); 
    atualizarListaOperacoes(); 
}

// window.onload = function() {
//         console.log("dean")
     
// }

document.addEventListener("DOMContentLoaded", function() {
    console.log('Carregou');
    atualizarListaClientes();
    atualizarListaVeiculos();
    carregarSelects();
    atualizarListaOperacoes();
 });