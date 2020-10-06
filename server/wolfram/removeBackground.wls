#!/usr/bin/env wolframscript
imageName = $ScriptCommandLine[[2]]
Print["Starting Image Conversion"]
SetDirectory[Directory[]];
file = FileNameJoin[{"images", imageName}];

originalImage = Import[file]
noBackgroundImage = RemoveBackground[originalImage]
sharpenedImage = Sharpen[noBackgroundImage, 20]

outputDir = FileNameJoin[{".", "wolfram", "images"}]
fileLength = FileNames[All, outputDir] // Length
filename = FileNameJoin[{outputDir, StringJoin[ToString[fileLength], ".jpg"]}]

Export[filename, sharpenedImage, "JPEG"]

Print["Image Created"]
