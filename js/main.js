const lista = document.getElementById("lista");
const itemList = loadLocalStorage() || [];

itemList.forEach((element) => {
  const item = buildItem(element);
  lista.append(item);
});

const formulario = document.getElementById("novoItem");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const id = generateId()
  const nomeInput = evento.target.elements["nome"];
  const quantidadeInput = evento.target.elements["quantidade"];

  const itemExists = itemList.find((element) => element.id === itemId);
  saveOnLocalStorage(nomeInput.value, quantidadeInput.value);

  lista.appendChild(
    buildItem({ nome: nomeInput.value, quantidade: quantidadeInput.value })
  );

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
  const actualItem = {
    id: id,
    nome: nome,
    quantidade: quantidade,
  };

  itemList.push(actualItem);
  localStorage.setItem("itens", JSON.stringify(itemList));
}

function loadLocalStorage() {
  const itensListLocalStorage = JSON.parse(localStorage.getItem("itens")) || [];
  return itensListLocalStorage;
}

function updateItem(item) {
  document.querySelector("[data-id=" + item.id + "]");
}

function generateId() {
  return Date.now().toString(); // Gera um ID único baseado no timestamp atual
}
