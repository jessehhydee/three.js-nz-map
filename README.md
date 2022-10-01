# threejs-nz-map

This is inspired by Github & Stripes webgl globes and built for Coffee Stamps website: https://www.coffeestamp.co.nz

The dots clustered togeather resembling continents are achieved by reading an image of NZ.
Getting the image data for each pixel and iterating over each pixel.
If the pixels r,g,b values exceeed 100, display dot.
The position of the dot is worked out by determining the lat and long position of the pixel.

Each dot within the canvas independently changes colour to give off a twinkling effect.
This is achieved by shaders. 

If clicked and held, each dot independently extrudes off the globe creating a scattered effect.
This is achieved by shaders.

If a location dot is hovered over, the locations store name appears within a label.
Each location is a store using Coffee Stamp.

![alt text](https://github.com/jessehhydee/threejs-nz-map/blob/main/img/nz_globe.png?raw=true)

