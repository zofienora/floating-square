// src/CubeWave.js
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const CubeWave = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let angle = 0;
      const w = 24;
      let ma;
      let maxD;
      let quarterPI;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        ma = p.tan(p.cos(p.QUARTER_PI));
        maxD = p.dist(0, 0, 200, 200);
        quarterPI = p.QUARTER_PI;
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        maxD = p.dist(0, 0, p.width, p.height);
      };

      p.draw = () => {
        p.background(100);
        p.ortho(-1500, 1500, 1500, -1500, 0, 1000);
        p.rotateX(ma);
        p.rotateY(quarterPI);

        for (let z = 0; z < p.height; z += w) {
          for (let x = 0; x < p.width; x += w) {
            p.push();
            let d = p.dist(x, z, p.width / 2, p.height / 2);
            let offset = p.map(d, 0, maxD, -p.PI, p.PI);
            let a = angle + offset;
            let h = p.floor(p.map(p.sin(a), -1, 1, 100, 300));
            p.translate(x - p.width / 2, 0, z - p.height / 2);
            p.normalMaterial();
            p.box(w, h, w);
            p.pop();
          }
        }

        angle -= 0.06;
      };

      p.mousePressed = () => {
        ma *= -1;
        quarterPI *= -1;
      };
    };

   

    const p5Instance = new p5(sketch, sketchRef.current);
    return () => p5Instance.remove();
  }, []);

  return <div ref={sketchRef} />;
};

export default CubeWave;