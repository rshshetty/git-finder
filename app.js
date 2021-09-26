//bradtraversy


let searchText = document.getElementById("searchText");

searchText.addEventListener("keyup", e => {
    let searchValue = e.target.value;
    if (e.keyCode === 13) {
        githubFinder(searchValue)
    }
});

let mic = document.querySelector("#microphone");
mic.addEventListener("click", Microphone);


function Microphone(){
    window.SpeechRecognition = window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    recognition.addEventListener("result", e => {
        let transcript = e.results[0][0].transcript.replace(/\s/g, "");
        let searchValue = (searchText.value = transcript);
        githubFinder(searchValue);

    });
    recognition.start();
}
 Microphone();

function githubFinder(search) {
    let Client_ID = "Iv1.af63c2e60a8b2101";
    let Client_Secret = "fb1ce3e162485ec1e1809fd1d89ab351333ec868";
    let GithubEndpoint = `https://api.github.com/users/${search}?client_id=${Client_ID}&client_secret=${Client_Secret}`;
    

    window.fetch(GithubEndpoint).then(data => {
        data.json().then(user => {
            let { login,
                avatar_url,
                html_url,
                company,
                location,
                bio,
                public_repos,
                followers,
                created_at,
            }
                = user;
            document.getElementById("templete").innerHTML=`
                <section id="childblock">
                <article>
                    <div class="profile_img">
                        <img src=${avatar_url} alt=${login} />
                    </div>

                    <div class="profile_details">
                        <ul>
                            <li>Company:${company}</li>
                            <li>Designation:${bio}</li>
                            <li>Repositories:${public_repos}</li>
                            <li>location:${location}</li>
                            <li>followers:${followers}</li>
                            <li>created at:${created_at}</li>
                            <li><a href=${html_url}Go to the Profile</li>
                        



                    </ul>

                    </div>
                  
                </article>
                </section>`
                // console.log(user);
            })
            .catch (err => console.log(err));
            
        })
        .catch(err => console.log(err));
}