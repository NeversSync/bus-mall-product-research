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

function Product(source) {
  this.name = source.split('/')[1];
  this.source = source;
  this.timesClicked = 0;
  this.timesSeen = 0;
}

function makeObjects() {
  for(var i = 0; i < sources.length; i++) {
    items.push(new Product(sources[i]));
  }
}

makeObjects();

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

for(var i = 0; i < ids.length; i++) {
  var productClick = document.getElementById(ids[i]);
  productClick.addEventListener('click', clickHandler);
};



function clickHandler(event) {
  var clickedImage = event.target.getAttribute('src');
  for(var i = 0; i < items.length; i++) {
    if(clickedImage === items[i].source) {
      items[i].timesClicked += 1;
      totalClicks += 1;
    }
  }
  for(var j = 0; j < ids.length; j++) {
    if(totalClicks === 25) {
      productClick = document.getElementById(ids[j]);
      productClick.removeEventListener('click', clickHandler);
      renderChart();
    }
  }
  addImages();
}
// renderChart();
addImages();

// for(var j = 0; j < items.length; j++) {
//   labels.push(items[j]);
// }

// var labelNames = [];
function renderChart() {
  var ctx = document.getElementById('my_chart');
  var clickChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [items[0].name, items[1].name, items[2].name, items[3].name, items[4].name, items[5].name, items[6].name, items[7].name, items[8].name, items[9].name, items[10].name, items[11].name, items[12].name, items[13].name, items[14].name, items[15].name, items[16].name, items[17].name, items[18].name, items[19].name],
      datasets: [{
        label: '# of Votes',
        data: [items[0].timesClicked, items[1].timesClicked, items[2].timesClicked, items[3].timesClicked, items[4].timesClicked, items[5].timesClicked, items[6].timesClicked, items[7].timesClicked, items[8].timesClicked, items[9].timesClicked, items[10].timesClicked, items[11].timesClicked, items[12].timesClicked, items[13].timesClicked, items[14].timesClicked, items[15].timesClicked, items[16].timesClicked, items[17].timesClicked, items[18].timesClicked, items[19].timesClicked],
        backgroundColor: [
          'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red'
        ],
        borderColor: [
          'black'
        ],
        borderWidth: 2
      }]
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
  var ctx2 = document.getElementById('seen_chart');
  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: [items[0].name, items[1].name, items[2].name, items[3].name, items[4].name, items[5].name, items[6].name, items[7].name, items[8].name, items[9].name, items[10].name, items[11].name, items[12].name, items[13].name, items[14].name, items[15].name, items[16].name, items[17].name, items[18].name, items[19].name],
      datasets: [{
        label: 'Amount of times seen',
        data: [items[0].timesSeen, items[1].timesSeen, items[2].timesSeen, items[3].timesSeen, items[4].timesSeen, items[5].timesSeen, items[6].timesSeen, items[7].timesSeen, items[8].timesSeen, items[9].timesSeen, items[10].timesSeen, items[11].timesSeen, items[12].timesSeen, items[13].timesSeen, items[14].timesSeen, items[15].timesSeen, items[16].timesSeen, items[17].timesSeen, items[18].timesSeen, items[19].timesSeen],
        backgroundColor: [
          'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'
        ],
        borderColor: [
          'black'
        ],
        borderWidth: 2
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Times seen',
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
