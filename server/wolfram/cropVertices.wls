#!/usr/bin/env wolframscript
imageName = $ScriptCommandLine[[2]]

normalizedVertice1 = {ToExpression[$ScriptCommandLine[[3]]], ToExpression[$ScriptCommandLine[[4]]]}
normalizedVertice2 = {ToExpression[$ScriptCommandLine[[5]]], ToExpression[$ScriptCommandLine[[6]]]}

SetDirectory[Directory[]];
file = FileNameJoin[{".", "wolfram", "images", imageName}];

originalImage = Import[file]
dimensions = ImageDimensions[originalImage]

topLeftX = normalizedVertice1[[1]] * dimensions[[1]]
topLeftY = normalizedVertice1[[2]] * dimensions[[2]]

topLeftInvertedY = dimensions[[2]] - topLeftY

bottomRightX = normalizedVertice2[[1]] * dimensions[[1]]
bottomRightY = normalizedVertice2[[2]] * dimensions[[2]]

bottomRightInvertedY = dimensions[[2]] - bottomRightY

croppedImage = ImageTrim[originalImage, {{topLeftX, topLeftInvertedY}, {bottomRightX, bottomRightInvertedY}}]

outputDir = FileNameJoin[{".", "wolfram", "croppedImages"}]
fileLength = FileNames[All, outputDir] // Length
filename = FileNameJoin[{outputDir, StringJoin[ToString[fileLength], ".jpg"]}]

Export[filename, croppedImage, "JPEG"]

Print[filename]
