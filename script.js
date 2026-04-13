
const getUserProfile=async()=>{
    const usernameInput=document.getElementById("username");
    const username=usernameInput.value;
    const profile=document.getElementById("profile");
    if(!username){
        profile.innerHTML="Please enter a username";
        return;
    }
    profile.innerHTML="Loading...";
    try{
        const response=await fetch(`https://api.github.com/users/${username}`);
        if(!response.ok){
            throw new Error("User not found");
        }
        const data=await response.json();

        const reposResponse=await fetch(data.repos_url);
        const repos=await reposResponse.json();

        profile.innerHTML=`
            <img src="${data.avatar_url}" alt="${data.login}">
            <h2>${data.name || data.login}</h2>
            <p>${data.bio || "No bio available"}</p>
            <p>Public Repos: ${data.public_repos}</p>
            <p>Followers: ${data.followers}</p>
            <p>Following: ${data.following}</p>
            <a href="${data.html_url}" target="_blank">View Profile</a>
            <h3>Repositories:</h3>
            <ul id="reposList"></ul>

        `;
        usernameInput.value="";
        const reposList=document.getElementById("reposList");
        repos.slice(0,5).forEach(repo =>{
            const li=document.createElement("li");
            li.innerHTML=`
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            `;
            reposList.appendChild(li);
        });

    }
    catch(error){
        profile.innerHTML=`
            <p>Error: ${error.message}</p>
        `
    }

} ;
