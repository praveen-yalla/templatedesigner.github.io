function getRandomLeftTop() {
    var offset = 50;
    return {
        left: fabric.util.getRandomInt(0 + offset, 700 - offset),
        top: fabric.util.getRandomInt(0 + offset, 500 - offset)
    };

}
