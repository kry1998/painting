let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/r0lLJIB0k/';

let resultLabel = "waiting......";
var capture;
let count=0;
let apiInfo="good";
let resultIndex=0;
let labelRaw=["Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8","Class 9"];
let labelName=["Portrait of Miss Mary Lillian Duke",
               "Head of a Saint",
               "Tripod cylinder vessel with Teotihuacan imagery of emerging sacred water",
               "Class 4",
               "Class 5",
               "Class 6",
               "Class 7",
               "Class 8",
               "Class 9"];
let labelArtist=["Joaquín Sorolla y Bastida (Spanish, 1863-1923)",
                 "Class 2",
                 "Class 3",
                 "Class 4",
                 "Class 5",
                 "Class 6",
                 "Class 7",
                 "Class 8",
                 "Class 9"];
let labelDate=["1911","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8","Class 9"];
let labelClassification=["Painting","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8","Class 9"];
let labelMedium=["Oil on canvas",
                 "Class 2",
                 "Class 3",
                 "Class 4",
                 "Class 5",
                 "Class 6",
                 "Class 7",
                 "Class 8",
                 "Class 9"];
let labelCreditLine=["Gift of Mr. Nicholas D. Biddle",
                     "Class 2",
                     "Class 3",
                     "Class 4",
                     "Class 5",
                     "Class 6",
                     "Class 7",
                     "Class 8",
                     "Class 9"];
let labelDescription=["This portrait captures Mary Lillian Duke (1887-1960) at the age of 24, just for years after her graduation from Trinity College with a degree in English. Painted in Paris by the popular Spanish painter Joaquin Sorolla y Bastida, this portrait was one of four commissioned by her father, Benjamin N. Duke, for the family’s residence at 2 East 89th Street in New York.       Four years after the portrait was painted, Mary Lillian Duke wed Anthony Joseph Drexel Biddle, Jr. (1897-1961). The couple had two children, Mary Duke Biddle Trent Semans (1920-2012) and Nicholas Benjamin Duke Biddle (1921-2004). The marriage ended in divorce in 1931. In 1934, the Duke family purchased Pinecrest in the Forest Hills neighborhood of Durham. Mary Lillian Duke Biddle lived between Pinecrest and New York City for decades, making extensive renovations to her homes, which included various art purchases. It is believed that between 1948-1955 she purchased Portrait of an Artist, the subject of the exhibition Off the Map: The Provenance of a Painting, on view nearby.",
                      "Class 2",
                      "Class 3",
                      "Class 4",
                      "Class 5",
                      "Class 6",
                      "Class 7",
                      "Class 8",
                      "Class 9"];

var h1;

//text info
var font;
var tSize= 40
var buffer = 15
let scalar = 0.9; //a made up number for each font
var asc;
var spaceWidth;
var leading;

//load trained model
function preload() 
{
  font = loadFont("Regular.otf")
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  count+=10;
}

//do classification
function classifyVideo() 
{
  classifier.classify(capture, gotResults);
  count+=10;
}

//get result
function gotResults(error, results) 
{
  // Something went wrong!
  if (error) {
    console.error(error);
    apiInfo="error";
    return;
  }
  // Store the label and classify again!
  resultLabel = results[0].label;
  apiInfo = resultLabel;
  getInfo(resultLabel);
}


function setup() 
{
    createCanvas(1000, 1800);
  //video = createCapture(VIDEO);
  //video.hide();
  
  textFont(font);
  textSize(tSize);
  strokeWeight(4);
  textAlign(LEFT, BASELINE);
  asc = textAscent() * scalar; // Calc ascent 
  print (asc);
  
  var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }    
    //video: {
      //facingMode: "user"
    //} 
  };
  capture = createCapture(constraints);
  capture.hide();
  
  button = createButton('Detect');
  button.position(450, 900);
  button.size(250, 100);
  //button.style("font-family", "Comic Sans MS");
  button.style("font-size", "48px");
  button.mousePressed(detectPainting);
  
  buttonListen = createButton('Listen');
  buttonListen.position(150, 900);
  buttonListen.size(250, 100);
  //button.style("font-family", "Comic Sans MS");
  buttonListen.style("font-size", "48px");
  //buttonListen.mousePressed(playSound);
  
  buttonMore = createButton('More');
  buttonMore.position(750, 900);
  buttonMore.size(250, 100);
  //button.style("font-family", "Comic Sans MS");
  buttonMore.style("font-size", "48px");
  //buttonMore.mousePressed(goToSite);
}

function draw() 
{
  background(255);
  
  fill(100);
  rect(0,0,1200,800);
  
  image(capture,50,50);
  text(resultLabel,10,10);
  text(count,100,100);
  
  var lineNum=25;
  lineNum = showText(resultIndex,"Title:  "+str(labelName[resultIndex]),lineNum);
  lineNum = showText(resultIndex,"Artist: "+str(labelArtist[resultIndex]),lineNum);
  lineNum = showText(resultIndex,"Date: "+str(labelDate[resultIndex]),lineNum);
  lineNum = showText(resultIndex,"Classification: "+str(labelClassification[resultIndex]),lineNum);
  lineNum = showText(resultIndex,"Medium: "+str(labelMedium[resultIndex]),lineNum);
  lineNum = showText(resultIndex,"Credit Line: "+str(labelCreditLine[resultIndex]),lineNum);
  lineNum = showText(resultIndex,"Credit Line: "+str(labelCreditLine[resultIndex]),lineNum);
  lineNum = showText(resultIndex,"Description: ",lineNum);
  lineNum = showText(resultIndex,str(labelDescription[resultIndex]),lineNum);
  print(lineNum); 
}

function getInfo(resultLabel)
{
    for(let i=0;i<labelRaw.length;i++)
    {
      if(labelRaw[i]==resultLabel)
      {
        resultIndex = i;
      }
    }
}

function showText(index, theText ,lineNum)
{
  var x = 0;
  var y = 0;
  
  var words = str(theText).split(" ");

  var currentOffset = 0; //how far across the page?
  noStroke();
  fill(0);
  for (var j = 0; j < words.length; j++) {
        
        var wordWidth = textWidth(words[j]);
        x = buffer + currentOffset  //xpos
        var rightEdge = x + wordWidth

        if (rightEdge > width - buffer){
          currentOffset = 0
          x = buffer + currentOffset //xpos
          lineNum ++
        }
        
         if (currentOffset == 0){
          spaceWidth = textWidth(" ")
        }else{
          spaceWidth = textWidth(" ")
        }
        
        y = buffer + lineNum * tSize
        text(words[j], x, y +asc, wordWidth, tSize);
        // four pixels between words
        currentOffset += wordWidth + spaceWidth; 
      
    }
  leading = textLeading();
  return lineNum+1;
}


function detectPainting()
{
  count+=10;
  classifyVideo();
}

//function playSound()
//{
//}

//function goToSite()
//{
//  
//}

function mousePressed() 
{
  // count+=10;
  // print(mouseX,mouseY)
  // classifyVideo();
  // getInfo(resultLabel);
}
