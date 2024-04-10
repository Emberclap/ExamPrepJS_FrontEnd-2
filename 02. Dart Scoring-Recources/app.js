window.addEventListener("load", solve)

function solve() {
  const [playerElement, scoreElement, roundElement] = document.getElementsByTagName('input');
  const addButtonElement = document.getElementById('add-btn');
  const sureListElement = document.getElementById('sure-list');
  const scoreboardElement = document.getElementById('scoreboard-list');

  document.querySelector('.clear').addEventListener('click', () => {
    location.reload();
  })

  addButtonElement.addEventListener('click', () => {
    sureListElement.appendChild(sureListCreator(playerElement, scoreElement, roundElement));
    addButtonElement.disabled = true;
    clearInputData()
  })

  function sureListCreator(playerElement, scoreElement, roundElement) {
    const player = playerElement.value;
    const score = scoreElement.value;
    const round = roundElement.value;

    const liElement = document.createElement('li');
    liElement.classList.add('dart-item');

    const ArticleElement = document.createElement('article');
    ArticleElement.innerHTML = `
        <p>${`${player}`}</p>
        <p>${`Score: ${score}`}</p>
        <p>${`Round: ${round}`}</p>`;

    liElement.appendChild(ArticleElement);

    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'edit');
    editButton.textContent = 'edit'
    editButton.addEventListener('click', () => {
      playerElement.value = player;
      scoreElement.value = score;
      roundElement.value = round;
      sureListElement.innerHTML = '';
      addButtonElement.disabled = false;

    })

    const okButton = document.createElement('button');
    okButton.classList.add('btn', 'ok');
    okButton.textContent = 'ok'
    okButton.addEventListener('click', () => {
      scoreboardElement.appendChild(scoreboardUpload(player, score, round))
      sureListElement.innerHTML = '';
      addButtonElement.disabled = false;
    })

    liElement.appendChild(editButton);
    liElement.appendChild(okButton);

    return liElement;
  }
  function clearInputData() {
    playerElement.value = '';
    scoreElement.value = '';
    roundElement.value = '';
  }
  function scoreboardUpload(player, score, round) {
    const liElement = document.createElement('li');
    liElement.classList.add('dart-item');

    const ArticleElement = document.createElement('article');
    ArticleElement.innerHTML = `
        <p>${`${player}`}</p>
        <p>${`Score: ${score}`}</p>
        <p>${`Round: ${round}`}</p>`;

    liElement.appendChild(ArticleElement);
    return liElement
  }
}