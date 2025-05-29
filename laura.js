class Laura {
  static init(img, sound, w, h) {
    Laura.max_age = 100;
    Laura.img = img;
    Laura.sound = sound;
    Laura.muted = false;
    Laura.clones = [];
    Laura.w = w;
    Laura.h = h;
  }
  
  static sort() {
    // Laura.clones.sort(function(a, b) {
    //   return b.scale - a.scale;
    // });
  }
  
  constructor(height, width) {
    var px = random(0 - Laura.w / 2, (Laura.w * 3) / 2);
    var py = random(0 - Laura.h / 2, (Laura.h * 3) / 2);
    // var px = random(Laura.w),
    //   py = random(Laura.h);
    this.px = px;
    this.py = py;
    this.x = px;
    this.y = py;
    this.dx = random(Laura.w);
    this.dy = random(Laura.h);
    this.scale = random(1, 5);
    this.age = 0;
    Laura.clones.push(this);
    if (!Laura.muted) {
      Laura.sound.play();
    }
    return this;
  }

  process(i) {
    this.age += 1;

    if (this.age > Laura.max_age) {
      Laura.clones.splice(i, 1);
      return;
    }

    // var t = laura.age/max_age;
    var t = pow(1.05, this.age) / Laura.max_age;
    this.x = lerp(this.px, this.dx, t);
    this.y = lerp(this.py, this.dy, t);
  }

  display() {
    if (this.age <= 0 || this.age >= Laura.max_age) {
      return;
    }
    var x = this.x;
    var y = this.y;
    //fyi how big it gets at peak depends on the max_scale
    //how fast it happens depends on the two
    var t = Laura.max_age - 2 * this.age;
    var max_scale = 10000 * this.scale;
    var scale = (Laura.max_age * Laura.max_age - t * t) / max_scale;
    var w = scale * Laura.img.width;
    var h = scale * Laura.img.height;
    // w=10;
    // h=10;
    if (scale <= 0) {
      return;
    }
    image(Laura.img, x - w / 2, y - h / 2, w, h);
  }
}
