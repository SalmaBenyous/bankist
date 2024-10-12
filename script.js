'use strict';

///////////////////////////////////////
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo=document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1');
const links=document.querySelector('.nav__links');
const openModal = function(e) {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
 
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn=>btn.addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//scrolling
btnScrollTo.addEventListener('click', function() {
  section1.scrollIntoView({ behavior: 'smooth' });
});
//navigation pages in smoothing
links.addEventListener('click',(e)=>
{
  e.preventDefault();
  if(e.target.classList.contains('nav__link'))
  {
    const id=e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
    
  }
})
// tabbed compennet
const tab=document.querySelectorAll('.operations__tab');
const tabConent=document.querySelector('.operations__tab-container');
const content=document.querySelectorAll('.operations__content');
tabConent.addEventListener('click',(e)=>
{
  const clicked=e.target.closest('.operations__tab');
  if(!clicked) return;
  tab.forEach(el=>
  {
    el.classList.remove('operations__tab--active');
  }
  )
  clicked.classList.add('operations__tab--active');
  content.forEach(el=>
  {
    el.classList.remove('operations__content--active');
  }
  )
  const tabDisplay=document.querySelector(`.operations__content--${clicked.dataset.tab}`);
  tabDisplay.classList.add('operations__content--active');
})
// Menu fade animation
const nav=document.querySelector('.nav');
const menuAnimation=function(opacity,e)
{
  if(e.target.classList.contains('nav__link'))
    {
      const link=e.target;
    const siblings=link.closest('.nav').querySelectorAll('.nav__link');
    const logo=link.closest('.nav').querySelector('img');
    siblings.forEach(el=> {
      if(el !== e.target) el.style.opacity=opacity;
    }
    )
    logo.style.opacity=opacity;
  }
}
nav.addEventListener('mouseover',(e)=>
{
  menuAnimation(0.5,e);
});
nav.addEventListener('mouseout',(e)=>
{
  menuAnimation(1,e);
}
);
//header sticky
window.addEventListener('scroll',(e)=>
{
  const intitialCoords=section1.getBoundingClientRect();
  // console.log(window.scrollY);
  if(window.scrollY>intitialCoords.top-200)
  {
    nav.classList.add('sticky');
  }
  else
  {
    nav.classList.remove('sticky');
  }
});
// Reveal Sections
const revealSection=function(entries,observer)
{
 const [antry]=entries;
 if(!antry.isIntersecting) return;
 antry.target.classList.remove('section--hidden');
 //stop observertion
 observer.unobserve(antry.target);
}
const option={root:null,rootMargin:'0px',threshold:0.15};
const allSection=document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver(revealSection,option);
allSection.forEach((section)=>
{
  //obser any section
  sectionObserver.observe(section);
  //hidden all sections
  section.classList.add('section--hidden');

})

// lazy loading images
// all images conten atribeut data-src
const imgTargets=document.querySelectorAll('img[data-src]');
const loadImg=function(entries,observer)
{
   const [antry]=entries;
   if(!antry.isIntersecting) return;
   // replace src with data-src
   antry.target.src=antry.target.dataset.src;
   antry.target.addEventListener('load',(e)=>
  {
    e.target.classList.remove('lazy-img');
  })
  observer.unobserve(antry.target);
  
}
const imgObserver= new IntersectionObserver(loadImg,{root:null,threshold:0});
imgTargets.forEach(img=>
{
  imgObserver.observe(img);
}
)
//slider
const slide=document.querySelectorAll('.slide');
const maxSlide=slide.length;
const netxSilde=document.querySelector('.slider__btn--right');
const prevSilde=document.querySelector('.slider__btn--left');
let curentSlide=0;

const activeDots=function(dotSlide)
{
  // dot.classList.add('dots__dot--active');
  btnSlide.forEach(dot=>
  {
    dot.classList.remove('dots__dot--active');
  }
  )
 const el= document.querySelector(`.dots__dot[data-slide="${dotSlide}"]`);
 console.log(el)
 el.classList.add('dots__dot--active');
}
const goToSlide=function(slideContent)
{
  slide.forEach((slider,i)=>
    {
      slider.style.transform=`translateX(${(i-slideContent)*100}%)`;
    })
}
const goToNextSilde=function()
{
  curentSlide === maxSlide-1?curentSlide=0: curentSlide++;
  goToSlide(curentSlide);
  activeDots(curentSlide)
}
const goToPrevSilde=function()
{
  curentSlide === 0?curentSlide=maxSlide-1: curentSlide--;
    goToSlide(curentSlide);
    activeDots(curentSlide)
  
}
goToSlide(0);

netxSilde.addEventListener('click',goToNextSilde);
prevSilde.addEventListener('click',goToPrevSilde);
// chek fp keydown
document.addEventListener('keydown',(e)=>
{
  if(e.code==='ArrowRight')
  {
    goToNextSilde();
  }
  else if(e.code==='ArrowLeft')
  {
   goToPrevSilde();
  }
})
// create byns silide
const divBtns=document.querySelector('.dots');
slide.forEach(( _,i)=>
{
  divBtns.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`);
})
const btnSlide=document.querySelectorAll('.dots__dot');
divBtns.addEventListener('click',(e)=>
{
 if( e.target.classList.contains('dots__dot'))
 {
  const curentBtn=e.target.dataset.slide;
  console.log(curentBtn);
  goToSlide(curentBtn);
  activeDots(curentBtn);
 }


})
activeDots(0);