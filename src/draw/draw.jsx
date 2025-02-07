import React from 'react';
import './draw.css'

export function Draw() {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div>
        <canvas id="drawCanvas" width = "400" height ="400" class="container-fluid" style="border:1px solid black;">
            </canvas>
            <br />
            <div id="controls">
                <label for="colors">Color:</label>
                <select name="colors" id="colors">
                    <option value="red">Red</option>
                    <option value="yellow">Yellow</option>
                    <option value="blue">Blue</option>
                    <option value="black">Black</option>
                </select>
                <label for="size">Size:</label>
                <select name="size" id="size">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </div>
            <div id="buttons">
                <button type="button" class="btn btn-outline-danger" id="clearButton"><b>clear</b></button>
                <button type="button" class= "btn btn-outline-primary"onclick="location.href='gallery.html';">gallery</button>
                <button type="button" class="btn btn-outline-success"onclick="location.href='share.html';">share</button>
            </div>
        </div>
    </main>
  );
}