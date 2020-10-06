#!/usr/bin/env wolframscript
imageName = $ScriptCommandLine[[2]]
Print["Starting Image Conversion"]
SetDirectory[Directory[]];
file = FileNameJoin[{"..","images", imageName}];

originalImage = Import[file]
resizedImage = ImageResize[originalImage, 500]
modifiedImage = RemoveBackground[resizedImage]

outputDir = FileNameJoin[{".", "images"}]
fileLength = FileNames[All, outputDir] // Length
filename = FileNameJoin[{outputDir, StringJoin[ToString[fileLength + 1], ".jpg"]}]

Export[filename, modifiedImage, "JPEG"]

Print["Image Created"]
