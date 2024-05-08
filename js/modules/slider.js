function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider
    const slider = document.querySelector(container);
    const sliderCounterId = document.querySelector(currentCounter);
    const sliderPrev = document.querySelector(prevArrow);
    const sliderNext = document.querySelector(nextArrow);
    const total = document.querySelector(totalCounter);
    const sliderItem = document.querySelectorAll(slide);
    const sliderWrapper = document.querySelector(wrapper);
    const sliderField = document.querySelector(field);
    const width = window.getComputedStyle(sliderWrapper).width;

    
    
    let slideIndex = 1;
    let offset = 0;
  
  
    if (sliderItem.length < 10) {
      total.textContent = `0${sliderItem.length}`;
      sliderCounterId.textContent = `0${slideIndex}`;
    } else {
      total.textContent = sliderItem.length;
      sliderCounterId.textContent = slideIndex;
    }
   
  
    sliderField.style.width = 100 * sliderItem.length + '%';
    sliderField.style.display = 'flex';
    sliderField.style.transition = '0.5s all';
    sliderWrapper.style.overflow = 'hidden';
    sliderItem.forEach(item => {
      item.style.width = width;
    });
  
    slider.style.position = 'relative';
  
    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);
  
    for (let i = 0; i < sliderItem.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.style.cssText = `
          box-sizing: content-box;
          flex: 0 1 auto;
          width: 30px;
          height: 6px;
          margin-right: 3px;
          margin-left: 3px;
          cursor: pointer;
          background-color: #fff;
          background-clip: padding-box;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          opacity: .5;
          transition: opacity .6s ease;
      `;
      if (i === 0) {
        dot.style.opacity = 1;
      }
      indicators.append(dot);
      dots.push(dot);
    }
  
    function deleteNotDigits(str) {
      return +str.replace(/\D/g, '');
    }
  
    sliderNext.addEventListener('click', () => {
      if (offset === deleteNotDigits(width) * (sliderItem.length - 1)) {
        offset = 0;
      } else {
        offset += deleteNotDigits(width);
      }
      sliderField.style.transform = `translateX(-${offset}px)`;
      if (slideIndex === sliderItem.length) {
        slideIndex = 1;
      } else {
        slideIndex++;
      }
      if (sliderItem.length < 10) {
        sliderCounterId.textContent = `0${slideIndex}`;
      } else {
        sliderCounterId.textContent = slideIndex;
      }
  
      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = '1';
    });
  
    sliderPrev.addEventListener('click', () => {
      if (offset === 0) {
        offset = deleteNotDigits(width) * (sliderItem.length - 1);
      } else {
        offset -= deleteNotDigits(width);
      }
      sliderField.style.transform = `translateX(-${offset}px)`;
  
      if (slideIndex === 1) {
        slideIndex = sliderItem.length;
      } else {
        slideIndex--;
      }
      if (sliderItem.length < 10) {
        sliderCounterId.textContent = `0${slideIndex}`;
      } else {
        sliderCounterId.textContent = slideIndex;
      }
      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = '1';
    });
  
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
  
        slideIndex = slideTo;
        offset = deleteNotDigits(width) * (slideTo - 1);
        sliderField.style.transform = `translateX(-${offset}px)`;
        
        if (sliderItem.length < 10) {
          sliderCounterId.textContent = `0${slideIndex}`;
        } else {
          sliderCounterId.textContent = slideIndex;
        }
  
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
      })
    })
  
    // sliderShow(slideIndex);
    // if (sliderItem.length < 10) {
    //   total.textContent = `0${sliderItem.length}`;
    // } else {
    //   total.textContent = sliderItem.length;
    // }
  
    // function sliderShow(i) {
    //   if (i > sliderItem.length) {
    //     slideIndex = 1;
    //   }
    //   if (i < 1) {
    //     slideIndex = sliderItem.length;
    //   }
    //   sliderItem.forEach(item => {
    //     item.classList.add('hide');
    //     item.classList.remove('show');
    //   });
    //   sliderItem[slideIndex - 1].classList.add('show');
    //   sliderItem[slideIndex - 1].classList.remove('hide');
    //   // sliderCounterId.textContent = `0${slideIndex}`;
    //   if (sliderItem.length < 10) {
    //     sliderCounterId.textContent = `0${slideIndex}`;
    //   } else {
    //     sliderCounterId.textContent = slideIndex;
    //   }
    // }
  
    // function plusSlides(n) {
    //   sliderShow(slideIndex += n);
    // }
    
    // sliderPrev.addEventListener('click', () => {
    //   plusSlides(-1);
    // })
    // sliderNext.addEventListener('click', () => {
    //   plusSlides(1);
    // })
}

export default slider;