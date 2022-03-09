import InteractiveMap from './interactiveMap.js';
import Data from './data.js';

export default class Georeview {
    constructor() {
        this.stor = new Data();
        this.formTemplate = document.querySelector('#addFormTemplate').innerHTML;
        this.map = new InteractiveMap('map', this.onClick.bind(this));
        this.map.init().then(this.onInit.bind(this));
    }

    async onInit() {
        const coords = this.stor.getCoords();

        for (const item of coords) {
            this.map.createPlacemark(item);
        }

        document.body.addEventListener('click', this.onDocumentClick.bind(this));
    }

    createForm(coords, reviews) {
        const root = document.createElement('div');
        root.innerHTML = this.formTemplate;
        const reviewList = root.querySelector('.review-list');
        const reviewForm = root.querySelector('[data-role=review-form]');
        reviewForm.dataset.coords = JSON.stringify(coords);

        for (const item of reviews) {
            const div = document.createElement('div');
            div.classList.add('review-item');
            div.innerHTML = `
            <div><b>${item.name}</b> ${item.place}</div>
            <div>${item.text}</div>
            `;
            reviewList.appendChild(div);
        }

        return root;
    }

    async onClick(coords) {
        const reviewsList = this.stor.getReviewsList(JSON.stringify(coords));
        let form = this.createForm(coords, reviewsList);
        this.map.openBalloon(coords, form.innerHTML);
    }

    async onDocumentClick(e) {
        if (e.target.dataset.role === 'review-add') {
            const reviewForm = document.querySelector('[data-role=review-form]');
            const coords = reviewForm.dataset.coords;
            const data = {
                key: coords,
                review: {
                    name: document.querySelector('[data-role=review-name]').value,
                    place: document.querySelector('[data-role=review-place]').value,
                    text: document.querySelector('[data-role=review-text]').value,
                },
            };


            this.stor.addReview(data);
            this.map.createPlacemark(JSON.parse(coords));
            this.map.closeBalloon();
        }
    }
}