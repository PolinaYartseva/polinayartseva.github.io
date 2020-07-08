let url = window.location.toString();

let getUsername = (url) => {
    let urlArray = url.split('=');
    let userName = urlArray[1];
    if(isNaN(userName)){
        userName = 'PolinaYartseva';
    }
    return userName;
}

let name = getUsername(url);

let promise = fetch('https://api.github.com/users/' + name)
    .then(res => res.json())
    .then(json => {
        let avatar = json.avatar_url;
        let name = json.login;
        let bio = json.bio;
        let profile = json.html_url;
        if (name) {

            let createAvatar = () => {
                let newAvatar = document.createElement('img');
                newAvatar.src = avatar;
                let addString = document.createElement('br');
                document.body.appendChild(newAvatar, addString);
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
                elementLink.innerHTML = profile;
                document.body.appendChild(elementLink);
                elementLink.appendChild(elementTitle);
            };

            createProfile();
            createBio();
            createAvatar();

        } else {
            let errorMessage = () => {
                let elementForError = document.createElement('h1');
                elementForError.innerHTML = 'Упс... Информация о пользователе не найдена';
                document.body.appendChild(elementForError);
            };

            errorMessage();
        }
    })

    .catch(err => console.log(err + 'Информация о пользователе не найдена'));
