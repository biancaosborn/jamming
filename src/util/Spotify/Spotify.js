let accessToken;
const clientID = "c850fbda0afa49ca8cb111a06b2011bf";
const redirectURL = "http://localhost:3000/";

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;
        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        if(tokenInURL && expiryTime){
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1]);
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        }

        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
        window.location = redirect;
    },
};

export {Spotify};