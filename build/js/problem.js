const URL = "https://cat-fact.herokuapp.com"

let getData = async () => {
    let random = await fetch(URL)
    console.log(random);
}