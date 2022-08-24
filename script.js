let botaocoluna = document.getElementById("column");

//funcao para criar uma coluna ao apertar no botao btnAddColuna
function adicionarColuna(event) {
  event.preventDefault();

  //criando a lista
  let lista = document.createElement("div");
  
  //criando a coluna
  let coluna = {
    nome: inputNovaColuna.value,
  }
  
  //pegando o id da função
  let id = getLastId();
  lista.setAttribute("id", id);
  lista.setAttribute("ondragover", "onDragOver(event)");
  lista.setAttribute("ondrop", "onDrop(event)");
  
  //criando o titulo da coluna
  let titulo = document.createElement('titulo');
  titulo.classList.add('textoTitulo'); 
  titulo.innerHTML = coluna.nome;
  titulo.setAttribute("id", id);

  //criando a div da coluna
  var div = document.createElement("div");
  div.setAttribute("id", id);

  //criando o campo que vai receber a descrição da tarefa
  let campoHtml = document.createElement("input");
  campoHtml.setAttribute("placeholder", "Adicione uma nova tarefa");
  campoHtml.setAttribute("id", id);

  //criando o botao + de adicionar tarefa
  let botaoaddt = document.createElement("button");
  botaoaddt.innerHTML = '<i class="fa fa-plus"></i>';
  botaoaddt.addEventListener('click', (e) => {
  let tarefa = {
    nome: campoHtml.value,
    id: getIdUnico(),
  }
    
  //chamando a função que faz a lista ao clicar no botao
  AddTarefaLista(tarefa);
  });

  //chamando a função que faz a tarefa 
  function AddTarefaLista(tarefa) {
  let li = CriarTarefa(tarefa);
  lista.appendChild(li);
  campoHtml.value = '';
  }

  //criando o botao do lixeiro de excluir coluna
  let botaoexcluirc = document.createElement("button");
  botaoexcluirc.innerHTML = '<i class="fa fa-trash"></i>';
  botaoexcluirc.setAttribute("id", id);
  botaoexcluirc.addEventListener('click', (e) => {
  //chamando a função Excluir coluna ao clicar no botao
  ExcluirC(campoHtml.id);
  });

  //funcao de excluir a coluna (a gente acrescentou essa funcionalidade)
  function ExcluirC(idlista) {
  let confirmacao = window.confirm('Tem certeza que deseja excluir? ');
  if (confirmacao) {
    let lista = document.getElementById('' + idlista + '');
    if (lista) {
      botaocoluna.removeChild(lista);
      }
    }
  }

  //colocando os elementos criados dentro da div
  div.appendChild(titulo);
  div.appendChild(campoHtml);
  div.appendChild(botaoaddt);
  div.appendChild(botaoexcluirc);
  div.appendChild(lista);
  //adicionando a div na column
  botaocoluna.appendChild(div);
  //limpando o campo
  inputNovaColuna.value = '';
}


//funcao para criar uma tarefa ao apertar no botao botaoaddt
function CriarTarefa(tarefa) {

  //criando a tarefa (que é um li)
  let li = document.createElement('li');
  li.id = tarefa.id;
  li.setAttribute("class", "example-draggable");
  li.setAttribute("draggable", true);
  li.setAttribute("ondragstart", "onDragStart(event)");
  
 //criando o nome da tarefa   
  let span = document.createElement('span');
  span.classList.add('textoTarefa');
  span.innerHTML = tarefa.nome;

  //criando a checkbox para marcar a tarefa como concluida
  let CheckBox = document.createElement('checkbox');
  CheckBox.classList.add('checkbox');
  CheckBox.innerHTML = '<input type= checkbox>';
  CheckBox.setAttribute("id", li.id);
  //TENTATIVA
  CheckBox.addEventListener('click', (e) => {
    let confirmacao = window.confirm('Tem certeza que deseja concluir? ');
  if (confirmacao) {
    if (li) {
      li.style.backgroundColor = "LightGreen";
    }
  }
  });
  
  //criando o botao de excluir tarefa
  let botaoexcluirt = document.createElement('button');
  botaoexcluirt.classList.add('btnAcao');
  botaoexcluirt.innerHTML = '<i class="fa fa-trash"></i>';
  botaoexcluirt.setAttribute("id", li.id);
  //chamando a funcao de excluir tarefa
  botaoexcluirt.setAttribute('onclick', 'excluirT(' + li.id + ')');
 
  //passando os elementos da tarefa para a li dela
  li.appendChild(span);
  li.appendChild(CheckBox);
  li.appendChild(botaoexcluirt);

  return li;
}

//criando a funcao ConcluirTarefa
//function ConcluirTarefa(CheckBox, id){

//}

//funcao para excluir uma tarefa ao apertar no botao botaoexcluirc
function excluirT(idtarefa){

  let confirmacao = window.confirm('Tem certeza que deseja excluir? ');
  if (confirmacao) {
    let li = document.getElementById('' + idtarefa + '');
    if (li) {
      li.remove();
    }
  }
}

var i = 0;
var u = 1;
//funcao que gera os ids das colunas
function getLastId() {
  return i = i +2;
}

//funcao que gera os ids das tarefas
function getIdUnico(){
return u = u + 2;
}

//funcoes responsaveis por mover uma tarefa para outra coluna
function onDragStart(event) {
  event
    .dataTransfer
    .setData('text/plain', event.target.id);
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  const id = event
    .dataTransfer
    .getData('text');
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  dropzone.appendChild(draggableElement);
  event
    .dataTransfer
    .clearData();

}

