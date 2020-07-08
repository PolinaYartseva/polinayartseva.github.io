let url = window.location.toString();

let getUsername = (url) => {
    let urlArray = url.split('=');
    let userName = urlArray[1];
    if(isNaN(userName)){
        userName = 'github';
    }
    return userName;
};

let name = getUsername(url);

let getNowDate = new Promise((resolve, reject) => {
    let nowDate = new Date();
    setTimeout(() => nowDate ?
        resolve(nowDate) :
        reject ('Ошибка вычисления времени'), 2000)
});

let getUserData = fetch('https://api.github.com/users/' + name);

Promise.all([getUserData, getNowDate])
    .then(([ourUserData, ourNowDate]) => {
        userData = ourUserData;
        currentDate = ourNowDate;
    })
    .then(() => userData.json())
    .then(userInfo => {
        let avatar = userInfo.avatar_url;
        let name = userInfo.login;
        let bio = userInfo.bio;
        let profile = userInfo.html_url;
        if (name) {

            let createAvatar = () => {
                let newAvatar = document.createElement('img');
                newAvatar.src = avatar;
                let addString = document.createElement('br');
                document.body.appendChild(newAvatar);
                document.body.appendChild(addString);
            };

            let createBio = () => {
                let newBio = document.createElement('p');
                newBio.innerHTML = bio;
                document.body.appendChild(newBio);
            };

            let createProfile = () => {
                let elementLink = document.createElement('a');
                let elementTitle = document.createElement('h2');
                elementTitle.innerText = name;
                elementLink.href = profile;
                document.body.appendChild(elementLink);
                elementLink.appendChild(elementTitle);
            };

            let createDate = () => {
                let newCurrentDate = document.createElement('p');
                newCurrentDate.innerHTML = currentDate;
                document.body.appendChild(newCurrentDate);
            };

            let elementForPreloader = document.getElementById('preloader');
            elementForPreloader.classList.add('hidden');

            createProfile();
            createBio();
            createAvatar();
            createDate();

        } else {
            let errorMessage = () => {
                let elementForError = document.createElement('h1');
                elementForError.innerHTML = 'Упс... Информация о пользователе не найдена';
                document.body.appendChild(elementForError);
            };

            let elementForPreloader = document.getElementById('preloader');
            elementForPreloader.classList.add('hidden');

            errorMessage();
        }
    })

    .catch(err => console.log(err + 'Информация о пользователе не найдена'));
