var img;
var sound;
var echoStart = -1;
var echoDuration = 100;
var bg_color;

function preload() {
  img = loadImage(
    "assets/l.png"
  );
  img.resize(50, 0);

  soundFormats("mp3", "ogg");
  sound = loadSound(
    "assets/nice.mp3"
  );
}

function handleImg(file) {
  handleFile(file, "image");
}
function handleSound(file) {
  handleFile(file, "audio");
}

function handleFile(file, type) {
  if (file.type != type) {
    alert("bad type of file??? try again");
  }
  if (file.type === "image") {
    img = loadImage(file.data);
    img.resize(50, 0);
    Laura.img = img;
  } else if (file.type === "audio") {
    sound = createAudio(file.data, "");
    Laura.sound = sound;
  }
}

function setup() {
  input = createFileInput(handleImg);
  input.class("drop");
  var form = document.getElementById("imgfield");
  form.appendChild(input.elt);
  input = createFileInput(handleSound);
  input.class("drop");
  var form = document.getElementById("soundfield");
  form.appendChild(input.elt);

  createCanvas(window.innerWidth, window.innerHeight);
  Laura.init(img, sound, width, height);
}

function draw() {
  background(220);
  animate_bg();
  if (echoStart >= 0) {
    if (frameCount - echoStart > echoDuration) {
      echoStart = -1;

    }
    if (random() < (window.innerWidth * window.innerHeight) / 1000000) {
      new Laura();
    }
  }
  if (Laura.clones.length == 0) {
    Laura.sound.stop();

  }
  for (var i in Laura.clones) {
    var laura = Laura.clones[i];
    laura.display();
    laura.process(i);
  }
  Laura.sort();
}
function animate_bg() {
  if (echoStart <= 0) {
    return;
  }
  let from = color(220);
  let to = bg_color;
  var t = (frameCount - echoStart) / echoDuration;
  var t2 = 2 * t;
  if (t2 >= 1) {
    t2 = 2 - t2;
  }
  let inter = lerpColor(from, to, t2);
  background(inter);
  return;
}

function keyPressed(e) {
  if (key == " ") {
    beginEcho();
  }
  if (key == "m") {
    Laura.muted = !Laura.muted;
  }
}
function touchStarted() {
  beginEcho();
}
function beginEcho() {
  if (echoStart < 0) {
    echoStart = frameCount;
    bg_color = color(
      floor(random(255)),
      floor(random(255)),
      floor(random(255))
    ); //72 is a good hue
  }
}
function windowResized() {
  Laura.w = window.innerWidth;
  Laura.h = window.innerHeight;
  resizeCanvas(window.innerWidth, window.innerHeight);
}
