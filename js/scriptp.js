let foundUsers = [];
let allUsers = [];

countFoundUsers = 0;
totalMale = 0;
totalFemale = 0;
totalAge = avaregeAge = 0;
(inputName = 0),
  window.addEventListener('load', () => {
    foundUsers = document.querySelector('#foundUsers'); //usuários encontrados de acordo com a busca
    chosenUsers = document.querySelector('#chosenUsers'); //cards mostrados
    countFoundUsersOutput = document.querySelector('#countFoundUsers'); //quantidade de usuários encontrados
    inputName = document.querySelector('#inputName'); //nome digitado
    totalMaleOutput = document.querySelector('#totalMale');
    totalFemaleOutput = document.querySelector('#totalFemale');
    totalAgeOutput = document.querySelector('#totalAge');
    avaregeAgeOutput = document.querySelector('#avaregeAge');
    searchInput = document.querySelector('#searchInput');
    searchButton = document.querySelector('#searchButton');
    fetchUsers();
  });

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();
  allUsers = json.results.map((user) => {
    const { name, dob, gender, picture } = user;

    return {
      name: name.first + ' ' + name.last,
      age: dob.age,
      gender,
      picture: picture.thumbnail,
    };
  });
  searchButton.addEventListener('click', () => {
    handleSummary();
  });
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      handleSummary();
    }
  });
  handleSummary();
}

function handleSummary() {
  //encontrar usuários
  foundUsers.lenght = 0;
  foundUsers = allUsers.filter((user) => {
    let flag = false;
    return (flag =
      user.name.toLowerCase().includes(searchInput.value.toLowerCase()) ===
      true);
  });

  //ordenar alfabeticamente
  foundUsers.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  countFoundUsers = foundUsers.length;
  totalAge = foundUsers.reduce((accumulator, currentUser) => {
    return accumulator + currentUser.age;
  }, 0);
  //console.log(totalFemale);

  avaregeAge = totalAge / countFoundUsers;

  males = foundUsers.filter((user) => user.gender === 'male');
  totalMale = males.length;

  females = foundUsers.filter((user) => user.gender === 'female');
  totalFemale = females.length;

  renderSummary();
  renderFoundUsers();
}
function renderSummary() {
  totalMaleOutput.textContent = totalMale;
  totalFemaleOutput.textContent = totalFemale;
  totalAgeOutput.textContent = totalAge;
  avaregeAgeOutput.textContent = avaregeAge.toFixed(2);
  // countFoundUsersOutput.textContent = countFoundUsers;
}
//console.log(countFoundUsersOutput);
function renderFoundUsers() {
  let foundUsersHTML = `<div> <h3>Usuários encontrados:(${foundUsers.length})</h3>`;
  foundUsers.forEach((user) => {
    const { name, age, gender, picture } = user;
    const foundUserHTML = `
    <div class="card">
        <img src="${picture}" alt="${name}"/>
          <ul>
    <li>${name}</li>
    <li>${age} anos,  sexo ${gender}</li>
    </ul>
       </div>`;
    foundUsersHTML += foundUserHTML + '</div>';
  });

  chosenUsers.innerHTML = foundUsersHTML;
}
