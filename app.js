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
var myChart2;

function Product(source) {
  this.name = source.split('/')[1].split('.')[0];
  this.source = source;
  this.timesClicked = 0;
  this.timesSeen = 0;
  this.clickPercent;
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
    makeClickPercent();
    renderChart();
    storeData();
  }
  addImages();
}

Chart.defaults.global.defaultFontFamily = 'Gruppo';
Chart.defaults.global.defaultFontSize = 25;

function renderChart() {
  var labelNames = [];
  var clickCount = [];
  var showCount = [];
  var percentCount = [];
  var barColor1 = [];
  var barColor2 = [];
  var barColor3 = [];
  for(var i = 0; i < items.length; i++) {
    labelNames.push(items[i].name);
    clickCount.push(items[i].timesClicked);
    showCount.push(items[i].timesSeen);
    percentCount.push(items[i].clickPercent);
    barColor1.push('red');
    barColor2.push('blue');
    barColor3.push('green');
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
        borderWidth: 2
      },
      {
        label: 'Number of times shown',
        data: showCount,
        backgroundColor: barColor2,
        borderColor: [
          'white'
        ],
        borderWidth: 2
      }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Customer votes',
        fontSize: 50,
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

  var ctx2 = document.getElementById('percent_chart');
  myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: labelNames,
      datasets: [{
        label: 'Percent of times clicked/shown',
        data: percentCount,
        backgroundColor: barColor3,
        borderColor: [
          'green'
        ],
        borderWidth: 2
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Popularity of products',
        fontSize: 50,
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true,
            min: 0,
            max: 100,
            callback: function(value) {return value + '%';}
          },
          scaleLabel: {
            display: true,
            labelString: 'Percentage'
          }
        }]
      }
    }
  });
}

function makeClickPercent() {
  for(var i = 0; i < items.length; i++) {
    if(items[i].timesSeen > 0) {
      items[i].clickPercent = (items[i].timesClicked / items[i].timesSeen) * 100;
    } else {
      items[i].clickPercent = '0';
    }
  }
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