function shalloEqual(next,prev) {
    if(prev === next) return true;
    const prevKes = Object.keys(prev);
    const nextKes = Object.keys(next);
    if(prevKes.length !== nextKes.length) return false;
    return prevKes.every((key)=>prev.hasOwnProperty(key) && prev[key] === next[key]);
}


function PureRender(Component) {
    if(!Component.prototype.shouldComponentUpdate){
        Component.prototype.shouldComponentUpdate = function (nextProps, nextState) {
            console.group('start equal component props and state');
            let isRender = PureRender.prototype.shouldComponentUpdate(nextProps,nextState,this.props,this.state);
            console.info('the equal result is  :' + isRender);
            console.groupEnd();
            return isRender
        }
    }
}


PureRender.prototype.shouldComponentUpdate = function(nextProps,nextState,prevProp,prevState){
    return !shalloEqual(nextProps,prevProp) || !shalloEqual(nextState,prevState);
}


export default PureRender;
