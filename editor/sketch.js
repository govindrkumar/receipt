// RECEIPT!
// This is the file to edit. p5.js reference: https://p5js.org/reference/
import JsBarcode from "jsbarcode";

export const receipt = {
  height: 1080, // 240–2000 px. Width is fixed by the printer.
  seed: 67,
};

// everything here is editable. play around or rm -rf and see what you come up with!
export function drawReceipt(p) {
  const { width: w, height: h } = p;
  const margin = 24;

  // Header
  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.BOLD);
  p.textSize(18);
  p.text("THE REMO-WORLD", w / 2, 30);

  dashedLine(p, margin, 60, w - margin, 60, 6, 5);
  // Sysiphus
  function drawSysiphus(p,x,y){
    // Head
    p.circle(x, y - 50, 25);
    // Body
    p.line(x,y-35, x - 10, y + 20);

    // hands
    // first-hand
    p.line(x, y - 25, x + 20, y - 40);
    p.line(x+20, y - 40, x + 45, y - 50);
    // second-hand
    p.line(x-3,y-15, x+20, y - 30);
    p.line(x+20, y - 30, x+45, y - 40 );

    // legs
    p.line(x-10, y + 20, x - 30, y + 35);
    p.line(x-30, y + 35, x-45, y + 50);
    p.line(x - 10, y + 20, x + 5, y + 30);
    p.line(x + 5, y + 30, x - 35, y + 50)

    // boulder
    p.circle(x+85, y-50, 80);

    // mountain
    // It will require me to add...multiple chain of lines
    p.line(x-45, y + 50, x + 10, y + 40 );
    p.line(x + 10, y + 40, x + 30, y + 30 );
    p.line(x+30, y + 30, x + 90, y-8);
    p.line(x+120, y - 30, x + 150, y - 50);
    p.line(x + 150, y - 50, x + 190, y - 100);
    p.line(x + 190, y - 100, x + 220, y - 150);
    p.line(x + 220, y - 150, x + 230, y -170 );
    p.line(x+230, y - 170, x + 240, y - 175);
    p.line(x - 45, y + 50, x - 60, y + 60);
    p.line(x - 60, y + 60, x - 80, y + 80);
    p.line(x - 80, y + 80, x - 120, y + 110);
    p.line(x - 120, y + 110, x - 130, y +130);
    p.line(x-130, y + 130, x - 160, y + 120);
    p.strokeWeight(2);
    p.line(x-150, y + 130, x + 250, y + 130);
  }
  
  // Draw Sisyphus on top of the mountains
  p.stroke(0);
  p.fill(255);
  p.strokeWeight(3);
  drawSysiphus(p, 150, 250);

  // Home Sweet home.....
  // My home... of course. 
  function myhome(p, x, y){
    p.rect(x-50, y, 200, 80);
    p.rect(x - 50, y - 80, 200, 80);
    p.rect(x - 50, y - 160, 200, 80);
    p.rect(x-50, y - 160, 66.6, 80);
    p.rect(x + 10, y - 80,66.6, 80 );
    p.rect(x-50, y - 160, 66.6, 80);
    p.rect(x + 10, y - 160,66.6, 80 );
    p.rect(x-50, y, 66.6, 80);
    p.rect(x + 10, y,66.6, 80);
  }

  p.stroke(0);
  p.fill(255);
  p.strokeWeight(3);
  myhome(p, 130, 600);


  dashedLine(p, margin, 930, w - margin, 930, 6, 5);

  const barcodeValue = "receipt.hackclub.com";
  drawBarcode(p, barcodeValue, w / 2, 960);

  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.NORMAL);
  p.textSize(10);
  p.text(barcodeValue, w / 2, 1024);
}

function drawBarcode(p, value, centerX, y) {
  const barcodeCanvas = document.createElement("canvas");
  JsBarcode(barcodeCanvas, value, {
    format: "CODE128",
    width: 1,
    height: 52,
    displayValue: false,
    margin: 0,
    background: "#ffffff",
    lineColor: "#000000",
  });
  // Draw directly on p5's canvas: p.image expects a p5 image wrapper, while
  // JsBarcode returns a regular browser canvas.
  p.drawingContext.drawImage(barcodeCanvas, Math.floor(centerX - barcodeCanvas.width / 2), y);
}

function dashedLine(p, x1, y1, x2, y2, dash, gap) {
  p.stroke(0);
  p.strokeWeight(2);
  for (let x = x1; x < x2; x += dash + gap) {
    p.line(x, y1, Math.min(x + dash, x2), y2);
  }
}
