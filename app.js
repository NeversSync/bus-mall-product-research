'use strict';
var ids = [
  'image_one', 'image_two', 'image_three'
];
var sources = [
  'images/bag.jpg', 'images/banana.jpg', 'images/bathroom.jpg', 'images/boots.jpg', 'images/breakfast.jpg', 'images/bubblegum.jpg', 'images/chair.jpg', 'images/cthulhu.jpg', 'images/dog-duck.jpg', 'images/dragon.jpg', 'images/pen.jpg', 'images/pet-sweep.jpg', 'images/scissors.jpg', 'images/shark.jpg', 'images/sweep.png', 'images/tauntaun.jpg', 'images/unicorn.jpg', 'images/usb.gif', 'images/water-can.jpg', 'images/wine-glass.jpg'
];
var lastImages = [];
var items = [];
var totalClicks = 0;
var myChart;


function Product(source) {
  this.name = source.split('/')[1].split('.')[0];
  this.source = source;
  this.timesClicked = 0;
  this.timesSeen = 0;
}

function makeObjects() {
  for(var i = 0; i < sources.length; i++) {
    items.push(new Product(sources[i]));
  }
}

var randomNumber = function() {
  return Math.floor(Math.random() * items.length);
};

function addImages() {
  var newImages = [];
  for(var i = 0; i < ids.length; i++) {
    var images = document.getElementById(ids[i]);
    var randomImage = items[randomNumber()];
    var randomImageSource = randomImage.source;
    if(newImages.length === 0) {
      while(randomImageSource === lastImages[0] || randomImageSource === lastImages[1] || randomImageSource === lastImages[2]) {
        randomImageSource = items[randomNumber()].source;
      }
    } else if(newImages.length === 1) {
      while(randomImageSource === newImages[0] || randomImageSource === lastImages[0] || randomImageSource === lastImages[1] || randomImageSource === lastImages[2]) {
        randomImageSource = items[randomNumber()].source;
      }
    } else {
      while(randomImageSource === newImages[0] || randomImageSource === newImages[1] || randomImageSource === lastImages[0] || randomImageSource === lastImages[1] || randomImageSource === lastImages[2]) {
        randomImageSource = items[randomNumber()].source;
      }
    }
    images.setAttribute('src', randomImageSource);
    randomImage.timesSeen += 1;
    newImages.push(randomImageSource);

  }
  lastImages = newImages;
}

function clickHandler(event) {
  var clickedImage = event.target.getAttribute('src');
  for(var i = 0; i < items.length; i++) {
    if(clickedImage === items[i].source) {
      items[i].timesClicked += 1;
      totalClicks += 1;
    }
  }
  if(totalClicks === 25) {
    for(var j = 0; j < ids.length; j++) {
      productClick = document.getElementById(ids[j]);
      productClick.removeEventListener('click', clickHandler);
    }
    renderChart();
    storeData();
  }
  addImages();
}

function renderChart() {
  var labelNames = [];
  var clickCount = [];
  var showCount = [];
  var barColor1 = [];
  var barColor2 = [];
  for(var i = 0; i < items.length; i++) {
    labelNames.push(items[i].name);
    clickCount.push(items[i].timesClicked);
    showCount.push(items[i].timesSeen);
    barColor1.push('red');
    barColor2.push('blue');
  }
  var ctx = document.getElementById('my_chart');
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelNames,
      datasets: [{
        label: 'Number of Votes',
        data: clickCount,
        backgroundColor: barColor1,
        borderColor: [
          'black'
        ],
        borderWidth: 1
      },
      {
        label: 'Amount of times shown',
        data: showCount,
        backgroundColor: barColor2,
        borderColor: [
          'black'
        ],
        borderWidth: 1
      }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Customer votes',
        fontSize: 30,
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

function storeData() {
  var jsonItems = JSON.stringify(items);
  localStorage.setItem('busMallData', jsonItems);
}

function getData() {
  return localStorage.getItem('busMallData');
}


//main flow of logic
for(var i = 0; i < ids.length; i++) {
  var productClick = document.getElementById(ids[i]);
  productClick.addEventListener('click', clickHandler);
};

// if objects and data are stored, then use those as baseline, otherwise;
var oldData = getData();
if (oldData) {
  //i have data!
  items = JSON.parse(oldData);
} else {
  makeObjects();
}

addImages();