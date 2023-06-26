const loadText = document.querySelector('.loading-text')
// 多組bg/bb時使用
const bg = document.querySelectorAll('.bg')
//單獨一組bb/bg時候使用
const bb = document.querySelector('.bb')

let load = 0

let int = setInterval(blurring, 20)

function blurring() {
  load++

  if (load > 99) {
    clearInterval(int)
  }

  loadText.innerText = `${load}%`
  loadText.style.opacity = scale(load, 0, 100, 1, 0)
  bb.style.opacity = scale(load, 0, 100, 1, 0)//控制透明度
  
  //多組bg的時候
  // for (let i = 0; i < bg.length; i++) {
  //   bg[i].style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)` 
  // }

  // 只有一組bg/bb的時候
  bb.style.filter = `blur(${scale(load, 0, 100, 0, 10)}px)`//控制模糊

}

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}