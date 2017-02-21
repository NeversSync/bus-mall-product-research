'use strict';
var ids = [
  'image_one', 'image_two', 'image_three'
];

function Product(name, source) {
  this.name = name;
  this.source = source;
  this.timesClicked = 0;
  this.timesSeen = 0;
}

var products = [
  new Product('bag', 'images/bag.jpg'),
  new Product('banana', 'images/banana.jpg'),
  new Product('bathroom', 'images/bathroom.jpg'),
  new Product('boots', 'images/boots.jpg'),
  new Product('breakfast', 'images/breakfast.jpg'),
  new Product('bubblegum', 'images/bubblegum.jpg'),
  new Product('chair', 'images/chair.jpg'),
  new Product('cthulhu', 'images/cthulhu.jpg'),
  new Product('dog duck', 'images/dog-duck.jpg'),
  new Product('dragon', 'images/dragon.jpg'),
  new Product('pen', 'images/pen.jpg'),
  new Product('pet sweep', 'images/pet-sweep.jpg'),
  new Product('scissors', 'images/scissors.jpg'),
  new Product('shark', 'images/sweep.png'),
  new Product('tauntaun', 'images/tauntaun.jpg'),
  new Product('unicorn', 'images/unicorn.jpg'),
  new Product('usb', 'images/usb.gif'),
  new Product('water can', 'images/water-can.jpg'),
  new Product('wine glass', 'images/wine-glass.jpg')
];

var randomNumber = function() {
  return Math.floor(Math.random() * products.length);
};

function addImages() {
  for(var i = 0; i < ids.length; i++) {
    var images = document.getElementById(ids[i]);
    var randomImage = products[randomNumber()];
    var randomImageSource = randomImage.source;
    images.setAttribute('src', randomImageSource);
    randomImage.timesSeen += 1;
  }
}

for(var i = 0; i < ids.length; i++) {
  var productClick = document.getElementById(ids[i]);
  productClick.addEventListener('click', clickHandler);
}

function clickHandler(event) {
  console.log(event.target);
  event.preventDefault();
  addImages();
}

addImages();

var ctx = document.getElementById('myChart');
var chartConfig = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'Red',
        'Blue',
        'Green',
        'Yellow',
        'Purple',
        'grey'
      ],
      borderColor: [
        'black'
      ],
      borderWidth: 4
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
});