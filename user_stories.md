# User Stories Monday Lab

- As a business owner, I want to do market research to determine which products are the most desireable before investing resources into selling them so I can save time and money.

- As a business owner, I want to conduct research with real people in a focus group where their actions will indicate which of the products I am considering selling are most in demand so I can avoid wasting energy and money.

- As a business owner, I want to have an app built to streamline this market research, and to deliver the data is collects so I can be informed about customer interest to better make my business successful.

- As a focus group participant, I want to use the means provided by the business to clearly demonstrate which products I would be interested in so that i can demonstrate customer insterest.

- As a developer, I want to build an app that measures customer interest in a group of products and that delivers easily understandable data so my client can use their resources well.

- As a developer, I want to build an app that displays three random clickable images of products so the focus group participant can click on them to express their interest.

- As a developer, I want the choices of the focus group participant to be tracked and collected as well as the information regarding how many times each of the images was displayed so my client can clearly deduce which products are most desired.

- As a developer, I want to make the results of the apps function visually displayable and the interface of the app itself easy to use, nice to look at, and professional looking to make the experience of using it as seamless as possible.


# Technical plan

- [X] Need to have three images side by side on page 
  - 3 img tags
  - put images in ul and get them side by side 

- [X] Need to target images to be able to change and track them
    - Get image node in script
    - Give ids to each img in html
    - Use getElementById in script to reference each image

- [X] Need to change what is displayed in the browser when user clicks.
  - need each image to have a src attribute to be able to change it.
  - need to have a list (array) of the image paths as strings
  - need to have event listener looking for clicks
  - need to have clickHandler function that changes src of images on page   

- [X] Need to load random images
  - generate random number using math.random 
  - know/set the range of the random number
  - Target an image at a random index to target random image in array. Generate the number with a min of 0 and a max of .length of array.

- [X] Collect click data - done
  - make each image an object using an object constructor to collect data about it and reference.
  - make properties: 
    * name of image
    * path to image

- [X] Track how many times images are displayed
  - add a for loop that adds 1 to the value to a variable for every time that images is displayed.

- [ ] Ensure that duplicated are not displayed on reload
  - use an if/else statement that checks to see if random number ends at same index as others and if so reruns the random number generation.

- [ ] Ensure that no images previously displayed are re-displayed on next load
  - ?

- [ ] Ensure that the script doesn't allow any clicks past 25. 


## Local Storage technical plan

- ensure that tracked values (timesClicked, timesSeen, percentClicked) are all stored on localStorage once first run through has finished.  

- ensure that those values are gotten (localStorage.getItem) upon new page loads.

- ensure that values accumulate

- ensure that accumulated values display in chart. 

- 
