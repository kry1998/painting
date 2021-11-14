let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/r0lLJIB0k/';

let resultLabel = "waiting......";
let capture;
let count=0;
let apiInfo="good";
let resultIndex=-1;
let labelRaw=["Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8","Class 9"];

let labelName=
[
"Female ‘twin’ figure with cowrie shell cloak (ere ibeji)",
"Head of a Saint",
"Tripod cylinder vessel with Teotihuacan imagery of emerging sacred water",
"The Visitation",
"Kylix",
"Helmet mask (sowei)",
"Corner fragment of a sarcophagus ",
"Battle of the Sexes from the portfolio: Guerrilla Girls’ Most Wanted: 1985–2008",
"Door from a chief’s house"
];

let labelArtist=
[
"N/A",
"N/A",
"N/A",
"N/A",
"N/A",
"N/A",
"N/A",
"Guerrilla Girls (Artist collective, active 1985–present)",
"Areogun of Osi-Ilorin (Nigerian, 1880–1954)"
];


let labelDate=[
"20th century",
"13th century",
"350-550 CE",
"c. 1350",
"c. 490–480 BCE",
"20th century",
"c. 230–240 CE",
"1996 (Printed 2008)",
"c. 1920"
];

let labelClassification=
[
"Sculpture",
"Sculpture",
" Ceramic",
"Glass",
"Ceramic",
"Sculpture",
"Sculpture",
"Print",
"Sculpture"
];

let labelCulture=
[
"Yoruba peoples (Nigeria, Oyo region)",
"French",
"Maya (Petén region, Lowlands, Northern Guatemala)",
"Austrian",
"Greek (Attic)",
"Mende peoples (Sierra Leone)",
"Roman",
"American",
"Nigerian"
];

let labelCreditLine=
[
" Gift of Dr. and Mrs. Robert M. Segaul",
"The Brummer Collection",
"Gift of Mr. John B. Fulling",
"Gift of Mrs. Ella Brummer in memory of her husband, Ernest Brummer.",
"Gift of Barbara Newborg, M.D., from the collection of Walter Kempner, M.D.",
"Gift of Andrew and Vera Laska",
"Gift of Mrs. Ella Brummer",
"Museum purchase",
"Museum purchase"
];

	

let labelDescription=
[
"This portrait captures Mary Lillian Duke (1887-1960) at the age of 24, just for years after her graduation from Trinity College with a degree in English. Painted in Paris by the popular Spanish painter Joaquin Sorolla y Bastida, this portrait was one of four commissioned by her father, Benjamin N. Duke, for the family’s residence at 2 East 89th Street in New York. Four years after the portrait was painted, Mary Lillian Duke wed Anthony Joseph Drexel Biddle, Jr. (1897-1961). The couple had two children, Mary Duke Biddle Trent Semans (1920-2012) and Nicholas Benjamin Duke Biddle (1921-2004). The marriage ended in divorce in 1931. In 1934, the Duke family purchased Pinecrest in the Forest Hills neighborhood of Durham. Mary Lillian Duke Biddle lived between Pinecrest and New York City for decades, making extensive renovations to her homes, which included various art purchases. It is believed that between 1948-1955 she purchased Portrait of an Artist, the subject of the exhibition Off the Map: The Provenance of a Painting, on view nearby.",
"No description yet.",
"No description yet.",
"This window may have been part of a cycle showing the life of the Virgin Mary. In this scene, the pregnant Mary, on the right, visits her cousin Elizabeth, who is herself miraculously pregnant with the future John the Baptist. On their meeting, the baby leaped in Elizabeth, recognizing the divinity of Mary’s child.",
"A kylix is a shallow drinking cup with horizontal handles on a tall foot.",
"Associated with the Sande Society for female initiation, this mask (sowei) would have been worn during rites of passage to celebrate the advancement of girls to adulthood. The mask represents their ideals of feminine beauty: lustrous blackness, beautifully arranged hair, a high forehead, downcast eyes, pursed lips, neck rings that attest to wholesome living, and an expression of inner spiritual concentration. The Mende are among the only group in Africa where masks are both owned and worn by women. This unusual mask combines the traditional religious beliefs of the Mende with the teachings of Islam. The small red packet (lasimoi) affixed to the top of the mask contains Arabic inscriptions on paper folded into a small bundle and wrapped in cloth. The interior of the mask is covered in Arabic calligraphy and mystical formulas of the magic square, a numeric reference to express respect and veneration for the universe and its maker. Islamic law prohibits rituals associated with spirit worship, yet the Mende successfully combine their traditional beliefs with the teachings of the Koran, bringing together both the power of nature and the sacred Word of God.",
"This sarcophagus fragment shows a dancing maenad, or female worshipper of Dionysus, the god of wine and theater, among other things. Though perhaps surprising to see references to this god on a funerary object, considering his well-known affiliations with drunken revels and ritual madness, Dionysus’s origin myth involved a miraculous birth, death, and rebirth. This perhaps provided believers with a promise of a happy afterlife. The work is dynamic with drapery that swirls up around the figure, and the surface shows deeply cut furrows created by using a drill across the surface of the stone. In the early third century sculptors seem to have preferred the very linear appearance of grooves created by the tool without much additional modeling to soften and round the edges.In Collection: Antiquities",
"The Guerrilla Girls, a contemporary collective whose anonymous members wear gorilla masks to conceal their identities, subvert notions of individual authorship as they jointly fight for equality in the arts and society. Using various printing techniques often in poster format, they alert wide audiences to the exclusion of marginalized communities from museums, galleries, and the pages of art magazines.",
"The artist, one of the most famous of the Yoruba Osi masters, was a prolific carver of doors, house posts, bowls and masks seen in shrines and chiefs' houses around Osi-Ilorin, in southwest Nigeria. This door is typical of Areogun's distinctive style, including multiple low-relief figures arranged in an orderly, tight composition. The layering of horizontal bands to display the actions of a wide variety of people is common to his work. Depicted from top to bottom are a chief seated on a stool, a colonial district officer on a bicycle, a warrior/hunter equestrian figure, and a priest with chicken and medicine, among others. Other works by Areogun are in the collections of the Smithsonian National Museum of African Art, UCLA's Fowler Museum of Cultural History, and the Yale University Art Gallery."
];

let moreInfo=[
  "https://en.wikipedia.org/wiki/Yoruba_people",
  "https://nasher.duke.edu/galleries/medieval-europe/",
  "https://nasher.duke.edu/galleries/art-of-the-americas/",
  "https://en.wikipedia.org/wiki/Visitation_(Christianity)",
  "https://en.wikipedia.org/wiki/Kylix",
  "https://www.youtube.com/watch?v=HBeH9KhQPww",
  "https://en.wikipedia.org/wiki/Ancient_Roman_sarcophagi",
  "https://en.wikipedia.org/wiki/Guerrilla_Girls",
  "N/A",
]

var h1;

//text info
var font;
var tSize= 40
var buffer = 15
let scalar = 0.9; //a made up number for each font
var asc;
var spaceWidth;
var leading;

//confirm/cancel detect
let toConfirm = false;
let confirmed= false;

let toPlayMusic=false;
let isPlayingMusic=false;

let slider;

let images=[];
let musics=[];
let speech;

var myTextArea;

let detectBtnPressCount=1;

//load trained model
function preload() 
{
  font = loadFont("Regular.otf")
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  count+=10;
	
  for(let i=0;i<9;i++)
  {
    images[i] = loadImage((i+1)+'.jpg');
    musics[i] = loadSound((i+1)+'.mp3');
    musics[i].onended(soundOverCallback);
  }
}

soundOverCallback = function() 
  {
      console.info("sound finished");
      buttonListen.text="Listen";
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
  toConfirm=true;
  capture.pause();
  //getInfo(resultLabel);
}


function setup() 
{
  createCanvas(1000, 1050);
 
  //capture.hide();
  
  textFont(font);
  textSize(tSize);
  strokeWeight(4);
  textAlign(LEFT, BASELINE);
  asc = textAscent() * scalar; // Calc ascent 
  //print (asc);
  
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
  
  //capture = createCapture(VIDEO);
  capture = createCapture(constraints);
  capture.hide();
  
  button = createButton('Detect');
  button.id('buttonDetect');
  button.position(370, 820);
  button.size(250, 100);
  //button.style("font-family", "Comic Sans MS");
  button.style("font-size", "48px");
  button.mousePressed(detectPainting);
  
  buttonListen = createButton('Listen');
  buttonListen.id('buttonListen');
  buttonListen.position(60, 820);
  buttonListen.size(250, 100);
  //button.style("font-family", "Comic Sans MS");
  buttonListen.style("font-size", "48px");
  buttonListen.mousePressed(playSound);
  
  buttonMore = createButton('More');
  buttonMore.position(680, 820);
  buttonMore.size(250, 100);
  //button.style("font-family", "Comic Sans MS");
  buttonMore.style("font-size", "48px");
  buttonMore.mousePressed(goToSite);
  
  //button for confirm detection result
  buttonConfirmDetect = createButton('Yes');
  buttonConfirmDetect.position(500, 900);
  buttonConfirmDetect.size(150, 80);
  //buttonConfirmDetect.style("font-family", "Comic Sans MS");
  buttonConfirmDetect.style("font-size", "40px");
  buttonConfirmDetect.mousePressed(ConfirmDetect);
  
  buttonCancelDetect = createButton('No');
  buttonCancelDetect.position(700, 900);
  buttonCancelDetect.size(150, 80);
  //buttonCancelDetect.style("font-family", "Comic Sans MS");
  buttonCancelDetect.style("font-size", "40px");
  buttonCancelDetect.mousePressed(CancelDetect);
  
  buttonConfirmDetect.hide();
  buttonCancelDetect.hide();
  
  //button for confirm detection result
  buttonMusicOkay = createButton('Okay');
  buttonMusicOkay.position(200, 800);
  buttonMusicOkay.size(200, 100);
  //buttonMusicOkay.style("font-family", "Comic Sans MS");
  buttonMusicOkay.style("font-size", "48px");
  buttonMusicOkay.mousePressed(MusicOkay);
  
  buttonMusicExit = createButton('Exit');
  buttonMusicExit.position(550, 800);
  buttonMusicExit.size(200, 100);
  //buttonMusicExit.style("font-family", "Comic Sans MS");
  buttonMusicExit.style("font-size", "48px");
  buttonMusicExit.mousePressed(MusicExit);
  
  buttonMusicOkay.hide();
  buttonMusicExit.hide();
  
  speech = new p5.Speech(voiceReady); //callback, speech synthesis object
  //speech.started();
  
  function voiceReady() 
  {
    console.log(speech.voices);
    document.getElementById("buttonListen").innerHTML = 'Listen';
  }
  
  slider = createSlider(0, 255, 100);
  slider.position(240, 980);
  slider.style('width', '260px');
  
  myTextArea = createElement('textarea');  
  myTextArea.attribute("rows","30");
  myTextArea.attribute("cols","80");
  myTextArea.attribute("id","info");
  myTextArea.attribute("name","info");
  myTextArea.val=" ";
 
}

function draw() 
{
  background(255);
  
  noStroke();
  fill(180);
  //rect(0,0,1000,800);
  
  image(capture,(width-capture.width)/2,100);
  
  //text(resultLabel,10,10);
  //text(count,100,100);
  
  if(resultIndex>=0)
  {
    fill(0);
    textSize(40);
    textStyle(BOLD);
    textAlign(CENTER);
	  
    if(resultIndex==7 || resultIndex==2)
    {
       textSize(30);
    }
    text(labelName[resultIndex], width/2,50);
    
    textStyle(NORMAL);
    textAlign(LEFT);
    
    let val = slider.value()/255+1;
    //print(val)
     
    
    document.getElementById('info').value = "Artist: "+str(labelArtist[resultIndex]) + "\n" +
    "Date: "+str(labelDate[resultIndex]) + "\n" +
    "Classification: "+str(labelClassification[resultIndex])+ "\n" +
    "Culture: "+str(labelCulture[resultIndex])+ "\n" +
    "Credit Line: "+str(labelCreditLine[resultIndex])+ "\n" +
    "Description: \n"+str(labelDescription[resultIndex])+ "\n"
    ;
    
    document.getElementById('info').style.fontSize=val+"em";
  }
  //print(lineNum); 
  fill(0);
  textSize(30);
  text("Adjust Font Size: ",10,1000);
  
  if(toConfirm)
  {
     showConfirmDetectUI(); 
  }
  
  if(toPlayMusic)
  {
      showMusicSoundUI();
     
  }
   
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


function showConfirmDetectUI()
{
  //show rect mask
  fill(255);
  rect(0,650,width,400);
  
  //show image
  let index=0;
  for(let i=0;i<labelRaw.length;i++)
  {
     if(labelRaw[i]==resultLabel)
    {
        index = i;
    }
  }
  image(images[index],100,700,300,300);
  fill(0);
  textSize(50);
  textStyle(BOLD);
  text("Is this what you \nare viewing?", 500,760);
  
  //show button
  button.hide();
  buttonListen.hide();
  buttonMore.hide();
  slider.hide();
  myTextArea.hide();
  
  buttonConfirmDetect.show();
  buttonCancelDetect.show();
}

function showMusicSoundUI()
{
  fill(255);
  rect(0,0,width,height);
  
  fill(0);
  textStyle(BOLD);
  textSize(80);
  text("Use headphones or \nlower the sound, please.", 100,500);
  
  //show button
  button.hide();
  buttonListen.hide();
  buttonMore.hide();
  slider.hide();
  myTextArea.hide();
  
  buttonMusicOkay.show();
  buttonMusicExit.show();
}

function detectPainting()
{
  if(isPlayingMusic)
    {
      musics[resultIndex].stop();
      document.getElementById("buttonListen").innerHTML = 'Listen'; 
      isPlayingMusic=false;
    }
  
  count+=10;
  detectBtnPressCount++;
  if(detectBtnPressCount==1)
  {
    document.getElementById("buttonDetect").innerHTML = 'Detect';
    capture.play();
  }
  if(detectBtnPressCount==2)
  {
     classifyVideo();
     detectBtnPressCount=0;
     document.getElementById("buttonDetect").innerHTML = 'Retake';
     capture.pause();
  }
  
}

function playSound()
{
    if(!isPlayingMusic)
    {
      toPlayMusic=true;
      print(buttonListen.id());
      document.getElementById("buttonListen").innerHTML = 'Pause';
    }
  else
    {
       if(musics[resultIndex].isPlaying()) 
       {
         musics[resultIndex].pause();
          document.getElementById("buttonListen").innerHTML = 'Listen';
       }
       else
        {
           musics[resultIndex].play();
          document.getElementById("buttonListen").innerHTML = 'Pause';
        }
       
    }
   
}

function goToSite()
{
   
  if(resultIndex>=0)
  {
    if(musics[resultIndex].isPlaying()) 
    {
	musics[resultIndex].pause();
	document.getElementById("buttonListen").innerHTML = 'Pause';
     }
	  
     window.open(moreInfo[resultIndex]);
  }
}

function ConfirmDetect()
{
  toConfirm=false;
  confirmed=true;
  getInfo(resultLabel);
  resetButtons();
}

function CancelDetect()
{
  toConfirm=false;
  confirmed=false;
  resetButtons();
}

function MusicOkay()
{
  print("play");
  if(resultIndex>=0)
  {
    speech.setVoice("Google UK English Female");
    let splitString = split(labelDescription[resultIndex], '.');
    for(let i=0;i<splitString.length;i++)
    {
        //print(splitString[i]);
        //speech.speak(splitString[i]); // say something
    }
    //speech.speak(splitString[0]); // say something
    //speech.speak(labelDescription[resultIndex]); // say something
    //speech.speak(splitString[2]); // say something
    musics[resultIndex].play();
    isPlayingMusic=true;
    
  }
  toPlayMusic=false;
  resetButtons();
}

function MusicExit()
{
  toPlayMusic=false;
  isPlayingMusic=false;
  document.getElementById("buttonListen").innerHTML = 'Listen';
  resetButtons();
}


function resetButtons()
{
  button.show();
  buttonListen.show();
  buttonMore.show();
  slider.show();
  myTextArea.show();
  
  buttonConfirmDetect.hide();
  buttonCancelDetect.hide();
  
  buttonMusicOkay.hide();
  buttonMusicExit.hide();
  
  //capture.play();
}

function mousePressed() 
{
  //speech.setVoice("Google UK English Female");
  //speech.speak("coding train 12"); // say something
  //speech.speak("coding train 12"); // say something
  // count+=10;
  // print(mouseX,mouseY)
  // classifyVideo();
  // getInfo(resultLabel);
}
