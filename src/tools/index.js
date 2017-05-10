export const urlChange = (url) => {
    if('' === url || url === undefined) return url;

    if(url.search(/http/ig) === -1){
        return 'http://api.zhuishushenqi.com' + url;
    }else {
        return url.replace(/^\/agent\//,'');
    }

}
