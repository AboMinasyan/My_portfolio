const futureDelImg = document.querySelectorAll('.futureImg');
const showMoreBtn = document.querySelector('#showMore');
const cardContainer = document.querySelector('.card-container');
const submitReservation = document.querySelector('#submit');
const whiteNavbar = document.querySelectorAll('.myNavBar');
showMoreBtn.onclick = createCard;
submitReservation.onclick = resTable;

document.addEventListener('scroll', (event) => {
whiteNavbar.forEach(item => {
    if(document.documentElement.scrollTop > 0){
         item.classList.add('header-white')
        }else{
        item.classList.remove('header-white')
    }
})

})

function createCard(){
fetch(' https://www.themealdb.com/api/json/v1/1/random.php ')
.then(res => res.json())
.then(data => data['meals'])
.then(data => data.forEach(post => {
    const cardTamplate = `<div class="myCard col-lg-4">
                        <img src="${post.strMealThumb}" alt="randomPic" class="mb-4 futureImg">
                        <h3 class="static-font d-flex justify-content-between align-items-center"> 
                            <p>Lorem ipsum dolor sit amet consectetur.</p> 
                            <p>$45</p>
                        </h3>
                        <p class="discription">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. In.
                        </p>
                        </div>
`;
cardContainer.insertAdjacentHTML('beforeend', cardTamplate);
}))
.catch(err => console.log(err))
fetch(' https://www.themealdb.com/api/json/v1/1/random.php ')
.then(res => res.json())
.then(data => data['meals'])
.then(data => data.forEach(post => {
    const cardTamplate = `<div class="myCard col-lg-4">
                        <img src="${post.strMealThumb}" alt="randomPic" class="mb-4 futureImg">
                        <h3 class="static-font d-flex justify-content-between align-items-center"> 
                            <p>Lorem ipsum dolor sit amet consectetur.</p> 
                            <p>$45</p>
                        </h3>
                        <p class="discription">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. In.
                        </p>
                        </div>
`;
cardContainer.insertAdjacentHTML('beforeend', cardTamplate);
}))
.catch(err => console.log(err))
fetch(' https://www.themealdb.com/api/json/v1/1/random.php ')
.then(res => res.json())
.then(data => data['meals'])
.then(data => data.forEach(post => {
    const cardTamplate = `<div class="myCard col-lg-4">
                        <img src="${post.strMealThumb}" alt="randomPic" class="mb-4 futureImg">
                        <h3 class="static-font d-flex justify-content-between align-items-center"> 
                            <p>Lorem ipsum dolor sit amet consectetur.</p> 
                            <p>$45</p>
                        </h3>
                        <p class="discription">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. In.
                        </p>
                        </div>
`;
cardContainer.insertAdjacentHTML('beforeend', cardTamplate);
}))
.catch(err => console.log(err))
}

function resTable (e){
e.preventDefault();
let fullName = document.querySelector('#fullName').value;;
let howPerson = document.querySelector('#persons').value;
let email = document.querySelector('#email').value;
let phoneNumber = document.querySelector('#phoneNumber').value;
let resDate = document.querySelector('#date').value;
let time = document.querySelector('#time').value;
fetch('https://jsonplaceholder.typicode.com/posts' , {
    method: 'POST',
    headers: {
        'Accept' : 'application/json',
        'Content-type' : 'application/json'
    },
    body: JSON.stringify({
        fullName:fullName,
        howPerson:howPerson,
        email:email,
        phoneNumber:phoneNumber,
        resDate:resDate,
        time:time
    })
})
}
const prewButton = document.querySelector('#leftBtn');
const nextButton = document.querySelector('#rightBtn');
const slideItems = document.querySelectorAll('.slide-item');
let currentIndex = 0;
let prevIndex;
const comentatorImgs = document.querySelectorAll('.com-img');
const dots = document.querySelectorAll('.dot');
dots.forEach((dot, index) => {
    dot.dataset.index = index;
    dot.onclick = currentSlide;
})
comentatorImgs.forEach(img => {
    fetch('https://randomuser.me/api/')
    .then(res => res.json())
    .then(data => data['results'])
    .then(data => data.forEach(post => {
        img.src = post.picture.large
    }))
    .catch(err => console.log(err))
})
changeSrc();
prewButton.onclick = goLeft;
nextButton.onclick = goRight;

function goRight(){
    prevIndex = currentIndex;
    if(currentIndex === slideItems.length-1){
        currentIndex = 0;
    }else{
        currentIndex++
    }
changeSrc()
}
function goLeft(){
    prevIndex = currentIndex;
    if(currentIndex === 0){
        currentIndex = slideItems.length-1
    }else{
        currentIndex--
    }
changeSrc()
}
function currentSlide(event){
    prevIndex = currentIndex;
    currentIndex = +event.target.dataset.index;
    changeSrc();
}
function changeSrc (){
    slideItems.forEach(item => {
        item.style.display = "none"
    })
    dots.forEach(dot => {
        dot.className = dot.className.replace("active-dot","")
    })
    slideItems[currentIndex].style.display = "block";
    dots[currentIndex].classList.add("active-dot")
 }

 let int = null;
startSlider();

 function startSlider(){
    int = setInterval(goRight,3000)
 }

 function stopSlider(){
    clearInterval(int);
    int = null;
 }
 slideItems.forEach(slider => slider.onmouseover = stopSlider);
 slideItems.forEach(slider => slider.onmouseleave = startSlider);


