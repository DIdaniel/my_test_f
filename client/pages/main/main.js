const courseContainer = document.querySelector(".course-container");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const slideWrapper = document.querySelector(".slide-wrapper");
const searchWrapper = document.querySelector(".search-input");
const inputBox = document.querySelector(".search-box");
const autoBox = document.querySelector(".auto-box");

// API
let count = 8;
const courseAPI = "courses";
let apiURL = `http://localhost:3000/api/${courseAPI}?count=${count}`;
let searchApiURL = `http://localhost:3000/api/${courseAPI}?count=400`;

// states
let lectureArray = [];
let searchArray = [];

// 전체 코스 로딩 됐는지 확인
function courseLoaded() {
    count = count + 3;
    apiURL = `http://localhost:3000/api/${courseAPI}?count=${count}`;
}

function displayCourses() {
    lectureArray.forEach((course) => {
        const { title, coverImageUrl, instructorName, price } = course;

        // course-card-wrapper
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");

        // course-image-wrapper
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("course-image");

        // course-image
        const image = document.createElement("img");
        image.classList.add("course-card-image");
        image.src = coverImageUrl;
        image.loading = "lazy";

        // course-description-wrapper
        const courseDesc = document.createElement("div");
        courseDesc.classList.add("course-description");

        // course-description
        const courseTitle = document.createElement("h3");
        courseTitle.classList.add("course-title");
        courseTitle.textContent = title;

        const courseInstructor = document.createElement("p");
        courseInstructor.classList.add("course-instructor");
        courseInstructor.textContent = instructorName;

        const coursePrice = document.createElement("strong");
        coursePrice.classList.add("course-price");
        coursePrice.innerHTML = `${price}원`;

        // Append
        courseCard.append(
            image,
            courseDesc,
            courseTitle,
            imageWrapper,
            courseInstructor,
            coursePrice
        );

        courseContainer.appendChild(courseCard);

        // 끝나면 이미지 카드 더 보여주셈
        courseContainer.addEventListener("load", courseLoaded);
    });
}

function updateDOM(pageReslt) {
    courseContainer.textContent = "";
    displayCourses(pageReslt);
    courseLoaded(pageReslt);
}

// 인풋 박스 체크
inputBox.onkeyup = (e) => {
    let userData = e.target.value;
    let emptyArray = [];

    if (userData.length >= 2) {
        emptyArray = searchArray.filter((data) => {
            return data
                .toLocaleLowerCase()
                .startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data) => {
            return (data = `<li>${data}</li>`);
        });

        // 자동완성 켜기 + 클릭했을 떄!
        if (inputBox.getAttribute("class") === "search-box") {
            searchWrapper.classList.add("focus");
            showSearchLists(emptyArray);
            let searchCourseLists = autoBox.querySelectorAll("li");
            for (let i = 0; i < searchCourseLists.length; i++) {
                searchCourseLists[i].onclick = saveStoreage;
            }
        }
    } else {
        // 자동완성 끄기
        document.addEventListener("click", (e) =>
            e.target != inputBox
                ? searchWrapper.classList.remove("focus")
                : null
        );
    }
};

function saveStoreage(e) {
    const selected = e.target.innerText;
    let select = {};
    lectureArray.forEach((item) => {
        if (item.title === selected) {
            select = item.title;
        }
    });
    sessionStorage.setItem("selectedLecture", JSON.stringify(select));
    if (
        sessionStorage.key(1) == "selectedLecture" &&
        sessionStorage.getItem("selectedLecture")
    ) {
        window.location.pathname = "../client/pages/detail/detailPage.html";
    }
}

function showSearchLists(list) {
    let listData;
    if (!list.length) {
        let userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    } else {
        listData = list.join("");
    }
    autoBox.innerHTML = listData;
}

function updateInputDOM() {
    searchArray = lectureArray.map((item) => {
        const title = item.title;
        return title;
    });
}

// Carousel
let carouselIndex = 0;

prevBtn.addEventListener("click", function () {
    carouselIndex = carouselIndex < 0 ? (carouselIndex += 25) : carouselIndex;
    slideWrapper.style.transform = `translate(${carouselIndex}%)`;
});

nextBtn.addEventListener("click", function () {
    carouselIndex = carouselIndex > -75 ? carouselIndex - 25 : carouselIndex;
    slideWrapper.style.transform = `translate(${carouselIndex}%)`;
});

//// API fetching => default 6개 씩!
async function getLectures() {
    try {
        const response = await fetch(apiURL);
        const jsonResult = await response.json();
        lectureArray = await jsonResult.data.courses;
        updateDOM("results");
    } catch {
        console.error("초기 데이터를 불러오지 못했어요!");
    }
}

async function getSearchLists() {
    try {
        const response = await fetch(searchApiURL);
        const jsonResult = await response.json();
        lectureArray = await jsonResult.data.courses;
        updateInputDOM();
    } catch {
        throw new Error("데이터를 불러오지 못했어요");
    }
}

// scroll check
window.addEventListener("scroll", () => {
    if (
        window.innerHeight + window.scrollY + 500 >=
            document.body.offsetHeight &&
        lectureArray.length === lectureArray.length
    ) {
        getLectures();
    }
});

// execute
getLectures();
getSearchLists();
