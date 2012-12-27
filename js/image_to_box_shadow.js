function imageToBoxShadow(image, output){
    var image = image[0],
        output = output,
        width = image.width,
        height = image.height,
        ColorArr = [];

    image.canvas = $('<canvas/>').css({width: width + 'px', height: height + 'px'})[0];
    image.canvas.getContext('2d').drawImage(image, 0, 0, width, height);
    var pixelData = image.canvas.getContext('2d').getImageData(0, 0, width, height).data;

    for (var i=0,x=1,y=0;i<pixelData.length;i+=4,x+=1){
        if(x%(width+1) === 0){y += 1;}
        if(x === width+1){x = 1;}
        if(y === height+1){y = 1;}
        var alpha = pixelData[i+3]/255;
        var rgbaColor = x+'em '+y+'em rgba('+pixelData[i+0]+','+pixelData[i+1]+','+pixelData[i+2]+','+alpha.toFixed(3)+')';
        if(alpha !== 0){
            ColorArr.push(rgbaColor);
        }
    }
    // console.log(ColorArr.join()); - for debug color data.
    output.css('box-shadow', ColorArr.join(','));
}