//api for cats
//basic: https://api.thecatapi.com/v1/images/search?api_key=YOUR_API_KEY
//api key: d6UMByrl4eANDsX8UCdJzCqwHeH7zcdKlejRIUiVidyBfILxCyzTfjfMFsEyPhiI

const baseURL = 'https://api.thecatapi.com/v1/images/search?'
const apiKey = 'd6UMByrl4eANDsX8UCdJzCqwHeH7zcdKlejRIUiVidyBfILxCyzTfjfMFsEyPhiI';

let welcEl = document.getElementsByClassName('welcome-header');
let mainFormEl = document.getElementById('main-form');
let petDisplayEl = document.querySelector('.card');
let petCardHolderEl = document.querySelector('.card-body')
let mainContainerEl = document.querySelector('.form-container');
let uListEl = document.querySelector('.list-group');

document.querySelector('.cat-selection').addEventListener('change', getSelectedValue);
function getSelectedValue(e)
{
    e.preventDefault();
    console.log(e.target.value);

    let catBreed = e.target.value;

    let data = getCatAPI(catBreed);

    data.then((result) => {
        console.log(result);

        result.map((item) => {
            console.log(item);
            const imgEl = document.createElement('img');
            imgEl.classList.add('card-img-top');
            imgEl.setAttribute('src', `${item.url}`);

            petDisplayEl.append(imgEl);

            const nameEl = document.createElement('h5');
            nameEl.innerText = `${item.breeds[0].name}`;
            nameEl.classList.add('card-title');

            const descEl = document.createElement('p');
            descEl.innerText = `${item.breeds[0].description}`;
            descEl.classList.add('card-text');

            const wikiEl = document.createElement('a');
            wikiEl.innerText = 'Wikipedia';
            wikiEl.setAttribute('href', `${item.breeds[0].wikipedia_url}`);
            wikiEl.setAttribute('target', "_blank");
            wikiEl.classList.add('btn');
            wikiEl.classList.add('btn-primary');

            const originListEl = document.createElement('li');
            originListEl.innerText = `Origin - ${item.breeds[0].origin}`;
            originListEl.classList.add('list-group-item');

            const altListEl = document.createElement('li');
            altListEl.innerText = `Alternative name(s) - ${item.breeds[0].alt_names}`;
            altListEl.classList.add('list-group-item');

            const affecListEl = document.createElement('li');
            affecListEl.innerText = `Affection level - ${item.breeds[0].affection_level} / 5`;
            affecListEl.classList.add('list-group-item');

            const adaptListEl = document.createElement('li');
            adaptListEl.innerText = `Adaptibility - ${item.breeds[0].adaptability} / 5`;
            adaptListEl.classList.add('list-group-item');

            const childListEl = document.createElement('li');
            childListEl.innerText = `Child friendly - ${item.breeds[0].child_friendly} / 5`;
            childListEl.classList.add('list-group-item');

            const dogListEl = document.createElement('li');
            dogListEl.innerText = `Dog friendly - ${item.breeds[0].dog_friendly} / 5`;
            dogListEl.classList.add('list-group-item');

            uListEl.append(originListEl,altListEl,affecListEl,adaptListEl,childListEl,dogListEl);


            petCardHolderEl.append(uListEl,nameEl,descEl,wikiEl);

            petDisplayEl.append(petCardHolderEl);
            petDisplayEl.removeAttribute('style');
            petDisplayEl.setAttribute('style', 'width: 50rem; margin: 20px 20px 20px 350px;');


            })


    })
}

const getStarRating = () => {
    //filled star: &#9733
    //unfilled star: &#9734
    const filledStar = document.createElement('p');
    filledStar.innerText = '&#9733';
    const unfilledStar = document.createElement('p');
    unfilledStar.innerText = '&#9734';

    filledStar.setAttribute('style', 'font-size: 50px;');
    unfilledStar.setAttribute('style', 'font-size: 50px;');


}

const getCatAPI = async (catBreed) => {

    const resp = await fetch(`${baseURL}&breed_ids=${catBreed}&api_key=live_${apiKey}`);
    const data = resp.json();

    return data;
}
