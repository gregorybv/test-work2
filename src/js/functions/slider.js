document.getElementById('next').onclick = function(){
  const widthItem = document.querySelector('.slider__item').offsetWidth;
  document.getElementById('formList').scrollLeft += widthItem;
}
document.getElementById('prev').onclick = function(){
  const widthItem = document.querySelector('.slider__item').offsetWidth;
  document.getElementById('formList').scrollLeft -= widthItem;
}
