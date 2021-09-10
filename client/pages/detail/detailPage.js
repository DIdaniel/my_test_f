const cardContainer = document.querySelector(".card-container");

// let courseAPI = "courses";
let searchApiURL = `http://localhost:3000/api/courses?count=400`;

let select = {};

if (!location.hash) {
    location.hash = "#reload";
    location.href = location.href;

    if (sessionStorage.getItem("selectedLecture")) {
        select = JSON.parse(sessionStorage.getItem("selectedLecture"));
        fetchNcreateDOM(select);
    }
}

async function fetchNcreateDOM(select) {
    try {
        const response = await fetch(searchApiURL);
        const result = await response.json();
        const lectureArray = result.data.courses;

        lectureArray.map((course) => {
            const { title, instructorName, price, coverImageUrl } = course;
            if (course.title === select) {
                window.onload = () => {
                    const lectureImg = document.createElement("img");
                    lectureImg.class = "course-img";
                    lectureImg.src = `${coverImageUrl}`;
                    lectureImg.alt = `${title}`;

                    const titleAnswer = document.createElement("span");
                    const nodeTitle = document.createTextNode(`${title}`);
                    titleAnswer.appendChild(nodeTitle);

                    const nameAnswer = document.createElement("span");
                    const nodeName = document.createTextNode(
                        `${instructorName}`
                    );
                    nameAnswer.appendChild(nodeName);

                    const priceAnswer = document.createElement("span");
                    const nodePrice = document.createTextNode(`${price}원`);
                    priceAnswer.appendChild(nodePrice);

                    const titleP = document.getElementById("title");
                    const nameP = document.getElementById("name");
                    const priceP = document.getElementById("price");
                    const cardContainer =
                        document.querySelector(".card-container");

                    return (
                        cardContainer.prepend(lectureImg),
                        titleP.appendChild(titleAnswer),
                        nameP.appendChild(nameAnswer),
                        priceP.appendChild(priceAnswer)
                    );
                };
            }
        });
    } catch {
        console.log(err);
    }
}
