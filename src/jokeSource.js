export function joke(categories, blacklist, safe) {
    function someACB(response) {
        return response.json();
    }

    function getArrayACB(response) {
        return response.joke || response.setup + "\n\n" + response.delivery;
    }

    const options = {
        method: "GET",
    };

    const categoryString = categories.toString();
    const blacklistString = "blacklistFlags=" + blacklist.toString();
    const queryString = categoryString + "?" + blacklistString;
    let safeString = "";
    if (safe) {
        safeString = "&safe-mode";
    }

    return fetch("https://v2.jokeapi.dev/joke/" + queryString + safeString, options)
        .then(someACB)
        .then(getArrayACB);
}
