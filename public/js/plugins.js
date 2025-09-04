////////////////////////////////////////////////////////////
// PLUGINS
////////////////////////////////////////////////////////////
function checkContentHeight(target){
	var stageHeight=$( window ).height();
	var newHeight = (stageHeight/2)-(target.height()/2);
	return newHeight;
}

function checkContentWidth(target){
	var stageWidth=$( window ).width();
	var newWidth = (stageWidth/2)-(target.width()/2);
	return newWidth;
}

function getDigit(num, length){
	var newNum = String(num)
	for(n=1;n<=length;n++){
		newNum = '0'+newNum;
	}
	return newNum.substring(newNum.length-3, newNum.length);
}

function formatScore(num, length){
	var newNum = String(num)
	for(n=1;n<=length;n++){
		newNum = '0'+newNum;
	}
	return newNum.substring(newNum.length-length, newNum.length);	
}

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}