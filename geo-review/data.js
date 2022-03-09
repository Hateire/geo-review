export default class Data {
    getCoords() {
        let allCoords = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key[0] == "[") {
                allCoords.push(JSON.parse(key));
            }
        }
        return allCoords;
    }

    addReview(data) {
        if (localStorage.getItem(data["key"]) === null) {
            localStorage.setItem(data["key"], `[${JSON.stringify(data["review"])}]`);
        } else {
            let acum = JSON.parse(localStorage.getItem(data["key"]));
            console.log(acum);
            acum.push(data["review"]);
            localStorage.setItem(data["key"], JSON.stringify(acum));
        }

    }

    getReviewsList(coords) {
        console.log(coords);
        if (localStorage.getItem(coords) !== null) {
            console.log(JSON.parse(localStorage.getItem(coords)));
            return JSON.parse(localStorage.getItem(coords));
        } else {
            return [];
        }
    }
}