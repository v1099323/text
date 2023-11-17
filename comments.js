// Клиентский код

function postComment() {
  const commentName = document.getElementById('commentName');
  const commentText = document.getElementById('commentText');

  if (commentName.value && commentText.value) {
    const comment = {
      name: commentName.value,
      text: commentText.value
    };

    fetch('https://v1099323.github.io/text/postComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      getComments(); // Обновим комментарии после добавления нового
      commentName.value = ''; // Очистим поле имени
      commentText.value = ''; // Очистим поле комментария
    })
    .catch(error => console.error('Ошибка - 1:', error));
  } else {
    alert('Both name and comment are required!');
  }
}


function getComments() {
  fetch('https://v1099323.github.io/text/getComments')
    .then(response => response.json())
    .then(data => displayComments(data))
    .catch(error => console.error('Ошибка - 2:', error));
}

function displayComments(comments) {
  const commentSection = document.getElementById('commentSection');
  commentSection.innerHTML = '';

  comments.forEach(e = (comment , index) => {;
    const item = document.createElement('div');
    const name = document.createElement('div');
    const text = document.createElement('p');
    item.classList.add('comment__item');
    name.classList.add('comment__name');
    text.classList.add('comment__text');
    let normalIndex = index + 1;
    
    item.innerHTML = `<strong>${normalIndex} ${comment.name}:</strong> ${comment.text}`;
    item.setAttribute('data-id', `${normalIndex}`);
    commentSection.appendChild(item);
  });
}

// Загрузим комментарии при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  getComments();
});
