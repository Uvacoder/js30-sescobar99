function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const container = document.getElementById('mainContainer');
let sliderImages = document.querySelectorAll('.slide-in');
let imgIndex = 1000;
const limit = 2000;
const imgToLoad = 2;



function checkSlide(e) {
    sliderImages.forEach(sliderImage => {
        const slideInAt = (window.scrollY + window.innerHeight) - (sliderImage.height / 2);
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        const isHalfShown = slideInAt > sliderImage.offsetTop
        const isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolledPast) {
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }
    });

    if ((container.scrollHeight - window.scrollY < window.innerHeight) && imgIndex < limit) {
        createAppendElements('mainContainer');
        sliderImages = document.querySelectorAll('.slide-in');
    }
}

window.addEventListener('scroll', debounce(checkSlide));

function createAppendElements(appendTo) {
    const parent = document.getElementById(appendTo);
    const p = document.createElement('p')
    p.textContent = 'Consectetur adipisicing elit. Tempore tempora rerum, est autem cupiditate, corporis a qui libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores omnis blanditiis quod quas laborum nam! Fuga ad tempora in aspernatur pariaturlores sunt esse magni, ut, dignissimos.';
    parent.appendChild(p);   
    const auxIndex = imgIndex + imgToLoad;
    let left = true;
    for (imgIndex; imgIndex < auxIndex; imgIndex++) {
        const p2= document.createElement('p');
        p2.textContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore tempora rerum, est autem cupiditate, corporis a qui libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores omnis blanditiis quod quas laborum nam! Fuga ad tempora in aspernatur pariatur fugit quibusdam dolores sunt esse magni, ut, dignissimos.'
        parent.appendChild(p2);
        const img = document.createElement('img');
        img.src = `https://i.picsum.photos/id/${imgIndex}/400/400.jpg`;
        img.classList.add('slide-in');
        if (left) {
            img.classList.add('align-right');
        } else {
            img.classList.add('align-left')
        }
        left = !left;
        parent.appendChild(img);
        const p3 = document.createElement('p');        
        p3.textContent = 'at provident praesentium atque quas rerum optio dignissimos repudiandae ullam illum quibusdam. Vel ad error quibusdam, illo ex totam placeat. Quos excepturi fuga, molestiae ea quisquam minus, ratione dicta consectetur officia omnis, doloribus voluptatibus? Veniam ipsum veritatis architecto, provident quas consequatur doloremque quam quidem earum expedita, ad delectus voluptatum, omnis praesentium nostrum qui aspernatur ea eaque adipisci et cumque ab? Ea voluptatum dolore itaque odio. Eius minima distinctio harum, officia ab nihil exercitationem. Tempora rem nemo nam temporibus molestias facilis minus ipsam quam doloribus consequatur debitis nesciunt tempore officiis aperiam quisquam, molestiae voluptates cum, fuga culpa. ';
        parent.appendChild(p3);
    }
}