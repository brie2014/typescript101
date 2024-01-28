// Custom joke type to cast the API response to
type Joke = {
    error: boolean
    category: string
    type: string
    setup?: string
    delivery?: string;
    joke?: string
    flags: {
        nsfw: boolean
        religious: boolean,
        political: boolean,
        racist: boolean,
        sexist: boolean,
        explicit: boolean
    },
    safe: boolean,
    id: number,
    lang: string
};

const jokeTypes: string[] = ['Any', 'Miscellaneous', 'Programming', 'Dark', 'Pun', 'Spooky', 'Christmas']

// Async function to fetch a joke
async function getJoke(jokeType: string = 'Any'): Promise<any> {
    return fetch(`https://v2.jokeapi.dev/joke/${jokeType}?blacklistFlags=nsfw,racist,explicit`, {
        method: 'GET',
    }).then(response => response?.json()) // Parse the response in JSON
        .then(response => response as Joke // Cast the response type to our interface
        ).then(response => response)
}

// Function to handle the logic for telling a joke
function tellJoke(joke: Joke) {
    if (joke.error) {
        return
    }
    /*Some jokes are one liners and have joke property*/
    if (joke.joke) {
        console.log(joke.joke)
        return
    }

    /*Other jokes have a setup and delivery*/

    // Tell the setup
    console.log(joke.setup)
    // Wait 3 seconds and then tell the punchline
    setTimeout(() => {
        console.log(joke.delivery)
    }, 3000);

}

async function tellASingleJoke(jokeType: string = 'Any') {
    getJoke(jokeType)// Fetch a joke of the specified type
        .then((joke) => tellJoke(joke))// Tell the joke when the response is back
        .catch(() => console.error('Unable to get a joke'))// If the call fails, catch the error
}

// Helper function that returns a Promise that resolves after "ms" Milliseconds
const wait = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

// Fetch and tell a joke of each type
async function tellAllTheJokes() { // We need to wrap the loop into an async function for this to work
    for (const i in jokeTypes) {
        console.log()
        console.log(`${jokeTypes[i]} Joke...`)
        console.log()
        await tellASingleJoke(jokeTypes[i]) // Tell a joke of the specified type
        await wait(5000)// then the created Promise can be awaited
    }
}

tellAllTheJokes();



