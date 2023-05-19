const lista = document.getElementById("lista");
const itemList = loadLocalStorage() || []; //itemList vai ser todos itens do localStorage, ou vazio, se não houver nada

itemList.forEach((element) => {
  const item = buildItem(element);
  lista.append(item);
});

const formulario = document.getElementById("novoItem");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const id = generateId();
  const nomeInput = evento.target.elements["nome"];
  const quantidadeInput = evento.target.elements["quantidade"];

  const itemExists = itemList.find(
    (element) => element.nome === nomeInput.value
  );
  
  if (itemExists) {
    // Atualiza apenas a quantidade do item existente
    itemExists.quantidade = quantidadeInput.value;
    updateItem(itemExists); // Atualiza a exibição do item na página
    updateLocalStorage(); // Atualiza o Local Storage
  } else {
    saveOnLocalStorage(id, nomeInput.value, quantidadeInput.value);
    lista.appendChild(
      buildItem({
        id: id,
        nome: nomeInput.value,
        quantidade: quantidadeInput.value,
      })
    );
  }

  nomeInput.value = "";
  quantidadeInput.value = "";
});

function buildItem(item) {
  const card = document.createElement("li");
  card.classList.add("item");
  card.innerHTML = `<strong>${item.quantidade}</strong>${item.nome}`;
  card.dataset.id = item.id;
  return card;
}

function saveOnLocalStorage(id, nome, quantidade) {
  const itemIndex = itemList.findIndex((element) => element.nome === nome);
  if (itemIndex !== -1) {
    // Item já existe, realiza o update
    itemList[itemIndex].quantidade = quantidade;
  } else {
    // Item não existe, adiciona um novo item
    const newItem = {
      id: id,
      nome: nome,
      quantidade: quantidade,
    };
    itemList.push(newItem);
  }
  localStorage.setItem("itens", JSON.stringify(itemList));
}

function loadLocalStorage() {
  const itensListLocalStorage = JSON.parse(localStorage.getItem("itens")) || [];
  return itensListLocalStorage;
}

function updateItem(item) {
  const card = document.querySelector(`[data-id="${item.id}"]`);
  if (card) {
    card.innerHTML = `<strong>${item.quantidade}</strong>${item.nome}`;
  }
}

function updateLocalStorage(){
  localStorage.setItem("itens", JSON.stringify(itemList))
}

function deleteFromLocalStorage(){
  localStorage.removeItem("itens", JSON.stringify(itemList))
}

function generateId() {
  return Date.now().toString(); // Gera um ID único baseado no timestamp atual
}
