# Notes

## TO-DO
* Check d20
* Change parameters and compare against this set of results
* Maybe make a quick evaluator program
* Generalize cropping function for any object containing a bounding poly 
* Create wolfram script to try and find the shape / map shape to dice for DB
* Try tesseract if Google Vision OCR doesnt work out


## Orange D12
Medium light (seems to work better on side number?) (light looks the same on both sides)  
parseInt on results  
Cropping top number (if on angle take highest bounding poly? Might not work for D20? works best with lower viewing angle that might make that number harder to read)  
possibly detect shape for dice detection for max value sorting (pipe cropped images to wolfram script)  
lots of 5/n/6./8n grouped results with new lines (should check if consistent top right -> bottom left reading direction)  
Good
* 2
* 3
* 6
* 7
* 9
* 11
* 12

Okay
* 5 (5n)
* 8 (same as 10)
* 10 (could not be read upside down)

Bad (Could not read)
* 1
* 4 

