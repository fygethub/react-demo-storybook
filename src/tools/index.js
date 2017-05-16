export const urlChange = (url) => {
    if('' === url || url === undefined) return url;

    if(url.search(/http/ig) === -1){
        return 'http://api.zhuishushenqi.com' + url;
    }else {
        return url.replace(/^\/agent\//,'');
    }

}


export const calcUpdateTime = (time) => {
    let oldDate = time.substring(0,time.indexOf('Z')).replace('T',' ');
    let times = new Date().getTime() - new Date(oldDate).getTime();
    let hours = times / 1000 /3600;
    if(hours <= 24)
        return ~~hours + '小时前';
    let day = hours / 24;
    if(hours <= 30)
        return ~~day+ '天前';
    let month = day / 30;
    if(month <= 12)
        return ~~month +'个月前';

    return ~~(month / 12 )+ '年前';
}

export const isInArr = (arr,arr1) =>{
    return arr.some(item => arr1.some(item1 => item1 === item));
}