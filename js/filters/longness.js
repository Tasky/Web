/**
 * Created by nanne on 30-03-14.
 */
tasky.filter('longness', function() {
    return function(microsec, extra) {
        function padLeft(nr, n, str){
            return new Array(n-String(nr).length+1).join(str||'0')+nr;
        }
        var sec = Math.floor(microsec / 1000);
        var hour = Math.floor(sec / (60*60));
        var min = Math.floor(sec / 60) % 60;

        if(extra==undefined) {
            extra = "h:m:s";
        }
        extra = extra.replace('h', padLeft(hour, 2));
        extra = extra.replace('m', padLeft(min, 2));
        extra = extra.replace('s', padLeft(sec % 60, 2));
        return extra;
    };
});