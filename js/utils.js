/*
 * @Author: zhengyifeng 
 * @Date: 2019-05-17 14:19:30 
 * @Last Modified by: zhengyifeng
 * @Last Modified time: 2020-04-22 10:20:55
 */
/*自定义打印方法*/
function log() {
    //@support IE8+
    var args = Array.prototype.slice.call(arguments);
    args.unshift("(myApp)");
    console.log.apply(console, args);
}
function error(message) {
    throw new Error(message);
}
//去掉前后空格
function trim(str) {
   return (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
}

/**
 * @param {Number} len - length of UUID.
 * @param {Number} radix.
 * @return {String} UUID
 * */
function getUUID(len,radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}
/**
 * @return {String} string reversed.
 */
String.prototype.reverse = function () {
  return this.split("").reverse().join("");  
};
/**
 * @return {Number} Max or Min value in array
 */
Array.prototype.getMax = function () {
    return Math.max.apply(Math,this);
};
Array.prototype.getMin = function () {
    return Math.min.apply(Math,this);
};
/**
 * @return {Array} unique from param.
 **/
Array.prototype.unique = function () {
    //todo 此方法对于数组中的对象有bug
    var arr = [],obj = {}, _self = this,len = _self.length;
    for(var i = 0;i<len;i++){
        if(!obj[_self[i]]){
            arr.push(_self[i]);
            obj[_self[i]] = 1;
        }
    }
    return arr;
};
/**
 * @param {Array} arr - array need to sort.
 * @return {Array} array is form min to max.
 * */
function fastsort(arr){
    if(arr.length<=1)return arr;
    var num = Math.floor(arr.length/2);
    var numValue=arr.splice(num,1)[0];
    var left =[],right=[];
    for(var i=0;i<arr.length;i++){
        if(arr[i]<numValue){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return fastsort(left).concat([numValue],fastsort(right))
}
/**
 * @param {String} mask - like yyyy-MM-dd HH:mm:ss.
 * @return {String} date - to formated string like 2017-10-11 20:30:23.
 * */
Date.prototype.format = function (mask) {
    var d = this;
    var m =  mask || "yyyy-MM-dd HH:mm:ss";
    var zeroize = function (value, length) {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };
    return m.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
        switch ($0) {
            case 'd':
                return d.getDate();
            case 'dd':
                return zeroize(d.getDate());
            case 'ddd':
                return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
            case 'dddd':
                return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
            case 'M':
                return d.getMonth() + 1;
            case 'MM':
                return zeroize(d.getMonth() + 1);
            case 'MMM':
                return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
            case 'MMMM':
                return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
            case 'yy':
                return String(d.getFullYear()).substr(2);
            case 'yyyy':
                return d.getFullYear();
            case 'h':
                return d.getHours() % 12 || 12;
            case 'hh':
                return zeroize(d.getHours() % 12 || 12);
            case 'H':
                return d.getHours();
            case 'HH':
                return zeroize(d.getHours());
            case 'm':
                return d.getMinutes();
            case 'mm':
                return zeroize(d.getMinutes());
            case 's':
                return d.getSeconds();
            case 'ss':
                return zeroize(d.getSeconds());
            case 'l':
                return zeroize(d.getMilliseconds(), 3);
            case 'L':
                var m = d.getMilliseconds();
                if (m > 99) m = Math.round(m / 10);
                return zeroize(m);
            case 'tt':
                return d.getHours() < 12 ? 'am' : 'pm';
            case 'TT':
                return d.getHours() < 12 ? 'AM' : 'PM';
            case 'Z':
                return d.toUTCString().match(/[A-Z]+$/);
// Return quoted strings with the surrounding quotes removed 
            default:
                return $0.substr(1, $0.length - 2);
        }
    });
};
/**
 * @param {Function} func - real function is executed
 * @param {Number} wait - millisecond is waited
 * @param {Boolean} immediate
 * @return {Function}
 * */
function _debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
/**
 * @param {Function} func - real function is executed
 * @param {Number} wait - millisecond is delayed
 * @param {Number} mustRun - func must execute interval
 * @return {Function}
 * */
function _throttle(func, wait, mustRun) {
    var timeout,startTime = new Date();
    return function() {
        var context = this,args = arguments, curTime = new Date();
        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if(curTime - startTime >= mustRun){
            func.apply(context,args);
            startTime = curTime;
            // 没达到触发间隔，重新设定定时器
        }else{
            timeout = setTimeout(function () {
                func.apply(context,args);
            }, wait);
        }
    };
}
/**
 * @param {String} name keyname
 * @param {String|Array} value 
 * */
function setLocalStore(name,value){
    //判断参数类型
    var ntyp = type(name);
    var valTyp = type(value);
    var valueStr = "";
    if("string"!==ntyp){
        error("key is not string");
    }
    if("array"!==valTyp&&"string"!==valTyp){
        error("value is not array or string");
    }
    if("array"===valTyp){
        valueStr = JSON.stringify(value);
    }else if("string"===valTyp){
        valueStr = value;
    }
    localStorage.setItem(name,valueStr);
}
function getLocalStore(name) {
    return JSON.parse(localStorage.getItem(name));
}
function delLocalStore(name) {
    localStorage.removeItem(name);
}

function setCookie(key,value,expire,domain,path) {
    var date = new Date();
    date.setDate(date.getDate()+expire);
    document.cookie = key+"="+decodeURI(value)+((expire==null)?"":";expire="+date.toGMTString())+((domain==null)?"":";domain="+decodeURI(domain))+((path==null)?"":";path="+decodeURI(path));
}
function getCookie(key) {
    if(!key){
        return "";
    }
    if (document.cookie.length>0)
    {
        var c_start=document.cookie.indexOf(key + "=");
        if (c_start!=-1)
        {
            c_start=c_start + key.length+1;
            var c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return encodeURI(document.cookie.substring(c_start,c_end))
        }
    }
    
}
function delCookie(key) {
    setCookie(key,"",-1);
}
/**
 *@param {Number} min
 * @param {Number} max
 * @return {Number} random int number between min and max
 * */
function _getRandom(min,max) {
    return  Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * filter html code
 * @param {String} str - HTML string
 * @return {String}
 */
function _escHTML(str){
    if("string"!==type(str)){return str;}
    var obj = {">":"&gt;","<":"&lt;","&":"&amp;"};
    return str.replace(/[<>&]/g,function (match) {
        return obj[match];
    })
}
function _decHTML(str){
    if("string"!==type(str)){return str;}
    var obj = {"&gt;":">","&lt;":"<","&amp;":"&"};
    return str.replace(/&gt;|&lt;|&amp;/g,function (match) {
        return obj[match];
    })
}
/**
 * 简单的属性支持检测
 * @param {String} property - 需要检测的css属性
 * @return {Boolean} - 是否支持，
 * */
function support(property) {
    //IE10+
    var root = document.documentElement;
    if (property in root.style) {
        root.classList.add(property.toLowerCase());
        return true;
    }
    root.classList.add('no-' + property.toLowerCase());
    return false;
}
/**
 * 简单的拼接字符串方法???
 * */
function _formatStr() {
    if(arguments.length==0){
        return null;
    }
    var str = arguments[0];
    var arg = arguments;
    str.replace(/\{\d{1}\}/gm,function ($e) {
        var i = $e.substring(1,2);
        return arg[i];
    })
}
/**
 * 生成六位数字验证码
 * */
function generateSixRandomNumber() {
    return ('000000'+Math.floor(Math.random()*999999)).slice(-6);
}
/**
 * 生成随机16进制颜色
 * */
function generateColor() {
    return '#'+('000000' + (Math.random()*0x1000000<<0).toString(16)).slice(-6);
}
/**
 * 任意颜色转rgb/rgba
 * @param {String} color
 * @return {String} 转换后的色值
 * */
function colorToRgb(color){
    var div = document.createElement("div");
    div.style.color = color;
    document.body.appendChild(div);
    //利用getComputedStyle一定返回的是rgb或rgba值
    var c = window.getComputedStyle(div).color;
    div.parentNode.removeChild(div);
    return c;
}
/**
 * 16进制颜色转rgb
 * */
function hexToRgb(hex){
    var hexs = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
    var r = hexs >>16;
    var g = (hexs & 0x00FF00) >> 8;
    var b = (hexs & 0x0000FF);
    return 'rgb('+r+','+g+','+b+')';
}
/**
 * 驼峰转-连接字符串
 * */
function camelcaseToJoin(s) {
    if(type(s)!='string') return false;
    return s.match(/^[a-z][a-z0-9]+|[A-Z][a-z0-9]*/g).join('-').toLowerCase();
}
/**
 * -字符串转驼峰
 * */
function strToCamelcase(str){
    var re=/-(\w)/g;
    return str.replace(re,function ($0,$1){
        return $1.toUpperCase();
    });
}

/**
 * url参数转成json对象
 */
function urlParamToJson(search) {
    if(search=== void 0){ search = '';}
    return (function (querystring) {
        if(querystring === void 0) {querystring = '';}
        return (function (q) {
            return (querystring.split('&').forEach(function (item) {
                return (function (kv) {
                    return kv[0]&&(q[kv[0]]=kv[1]);
                })(item.split('='));
            }) , q)
        })({});
    })(search.split('?')[1]);
}
/**
 * 通过参数名获取url的参数值
 * */
function getUrlParam(key) {
    var reg = new RegExp("(^|&)" + key +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null){
        return decodeURIComponent(r[2]);
    }
    return null;
}
/**
 * 统计文字个数
 * */
function wordCount(data) {
    var pattern = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
    var m = data.match(pattern);
    var count = 0;
    if(m === null)return count;
    for(var i=0;i<m.length;i++){
        if(m[i].charCodeAt(0)>=0x4E00){
            count+=m[i].length;
        }else{
            count+=1;
        }
    }
    return count
}
/**
 * 格式化数字，返回格式化完成的字符串
 * 293,488,485
 * */
function formatNum(num,n) {
    if(typeof num == 'number'){
        num = String(num.toFixed(n || 0));
        var re = /(-?\d+)(\d{3})/;
        while(re.test(num)) num = num.replace(re,"$1,$2");
    }
    return num;
}
/**
 * @param sNo {String}
 * 验证身份证id
 * */
function checkCHNCardID(sNo) {
    if(!/^[0-9]{17}[X0-9]$/.test(sNo)){
        return false;
    }
    var a,b,c;
    a = parseInt(sNo.substr(0,1))*7 + parseInt(sNo.substr(1,1))*9 + parseInt(sNo.substr(2,1))*10;
    a = a + parseInt(sNo.substr(3,1))*5 + parseInt(sNo.substr(4,1))*8 + parseInt(sNo.substr(5,1))*4;
    a = a + parseInt(sNo.substr(6,1))*2 + parseInt(sNo.substr(7,1))*1 + parseInt(sNo.substr(8,1))*6;
    a = a + parseInt(sNo.substr(9,1))*3 + parseInt(sNo.substr(10,1))*7 + parseInt(sNo.substr(11,1))*9;
    a = a + parseInt(sNo.substr(12,1))*10 + parseInt(sNo.substr(13,1))*5 + parseInt(sNo.substr(14,1))*8;
    a = a + parseInt(sNo.substr(15,1))*4 + parseInt(sNo.substr(16,1))*2;
    b = a%11;
    if(b==2){
        c = sNo.substr(17,1).toUpperCase();
    }else{
        c = parseInt(sNo.substr(17,1));
    }
    switch(b){
        case 0 : 
            if(c !=1){
                return false;
            }
            break;
        case 1 :
            if(c!=0){
                return false;
            }
            break;
        case 2 :
            if(c!="X"){
                return false;
            }
            break;
        case 3 :
            if(c!=9){
                return false;
            }
            break;
        case 4 :
            if(c!=8){
                return false;
            }
            break;
        case 5 :
            if(c!=7){
                return false;
            }
            break;
        case 6 :
            if(c!=6){
                return false;
            }
            break;
        case 7 :
            if(c!=5){
                return false;
            }
            break;
        case 8 :
            if(c!=4){
                return false;
            }
            break;
        case 9 :
            if(c!=3){
                return false;
            }
            break;
        case 10 :
            if(c!=2){
                return false;
            }
            break;
    }
    return true;
}
/**
 * @param {Object|Array} obj
 * */
function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function typeOf(obj){
    const reTypeOf = /(?:^\[object\s(.*?)\]$)/;
    return Object.prototype.toString.call(obj).replace(reTypeOf, '$1').toLowerCase();
}
/**
 * 深拷贝
 * @param {*} data 
 */
function deepCopy(data) {
	const t = typeOf(data);
	let o;
	if (t === 'array') {
		o = [];
	} else if (t === 'object') {
		o = {};
	} else {
		return data;
	}
	if (t === 'array') {
		for (let i = 0; i < data.length; i++) {
			o.push(deepCopy(data[i]));
		}
	} else if (t === 'object') {
		for (let i in data) {
			o[i] = deepCopy(data[i]);
		}
	}
	return o;
}
/**
 * 将数据保存到dataset中 IE10+
 * @param {Object} element 原生html元素
 * @param {String} name 数据名称
 * @param {String|Object|Array} data 保存的数据
 * */
function domSetData(element,name,data){
    if(data){
        if(typeOf(data)=='array'||typeOf(data)=='object'){
            element.dataset[strToCamelcase(name)] = JSON.stringify(data);
        }else{
            element.dataset[strToCamelcase(name)] = data;
        }
    }
}
/**
 * 获取dom的dataset中保存的数据
 * @param {Object} element - HTMLELEMENT
 * @param {String} name - 数据名称
 * @return {String|Object|Array} - 返回数据
 * */
function getDomSetData(element,name){
    return JSON.parse(element.dataset[strToCamelcase(name)]);
}
var cached;
/**
 * 获取网页默认滚动条宽度
 * @returns {Number} 滚动条宽度
 */
function getScrollBarSize(){
    if (cached === undefined) {
        const inner = document.createElement('div');
        inner.style.width = '100%';
        inner.style.height = '200px';

        const outer = document.createElement('div');
        const outerStyle = outer.style;

        outerStyle.position = 'absolute';
        outerStyle.top = 0;
        outerStyle.left = 0;
        outerStyle.pointerEvents = 'none';
        outerStyle.visibility = 'hidden';
        outerStyle.width = '200px';
        outerStyle.height = '150px';
        outerStyle.overflow = 'hidden';

        outer.appendChild(inner);
        document.body.appendChild(outer);
        const widthContained = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        let widthScroll = inner.offsetWidth;

        if (widthContained === widthScroll) {
            widthScroll = outer.clientWidth;
        }

        document.body.removeChild(outer);

        cached = widthContained - widthScroll;
    }
    return cached;
}

var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

/**
 * 判断参数是否为一个空对象
 * */
function isEmptyObject(obj){
	if(typeOf(obj)!='object') return false;
	return Object.keys(obj).length==0;
}
/**
 * 缓动滚动到指定位置
 * @param {HTMLElement} el 有滚动条的网页元素
 * @param {Number} from 滚动的起始位置，即当前元素的scrollTop
 * @param {Number} to 最终的scrollTop
 * @param {Number} duration 缓动持续时间
 * @param {Function} endCallback 缓动结束回调
 */
function scrollTop(el,to,duration,endCallback){
     let from = el.scrollTop;
     duration = duration||500;
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000/60);
            }
        );
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil(difference / duration * 50);

    function scroll(start, end, step) {
        if (start === end) {
            endCallback && endCallback();
            return;
        }

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }
        el.scrollTop = d;
        window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, step);
}
/**
 * @param {HTMLElement} el 
 * @param {String} cls
 */
function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}
/**
 * @param {HTMLElement} el 
 * @param {String} cls
 */
function addClass(el, cls) {
    if (!el) return;
    let curClass = el.className;
    const classes = (cls || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else {
            if (!hasClass(el, clsName)) {
                curClass += ' ' + clsName;
            }
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}
/**
 * @param {HTMLElement} el 
 * @param {String} cls
 */
function removeClass(el, cls) {
    if (!el || !cls) return;
    const classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else {
            if (hasClass(el, clsName)) {
                curClass = curClass.replace(' ' + clsName + ' ', ' ');
            }
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}
/**
 * 判断数字输入是否合法，并且替换不合法的数字
 */
function checkNum(value){
    var str = value;
    var len1 = str.substr(0,1);
    var len2 = str.substr(1,1);

    //如果第一位是0，第二位不是点，就用数字把点替换掉
    if(str.length > 1 && len1==0 && len2 != '.'){
        str = str.substr(1,1);
    }

    //第一位不能是.
    if(len1=='.'){
        str = '';
    }

    //限制只能输入一个小数点
    if(str.indexOf(".")!=-1){
        var str_=str.substr(str.indexOf(".")+1);
        //限制只能输入一个小数点
        if(str_.indexOf(".")!=-1){
            str=str.substr(0,str.indexOf(".")+str_.indexOf(".")+1);
        }
    }
    //限制只能输入一个负号
    if(str.indexOf("-")!=-1){
        if (str.indexOf("-")>0){
            str=str.substr(0,str.indexOf("-"));
        }
        var str_=str.substr(str.indexOf("-")+1);
        //限制只能输入一个小数点
        if(str_.indexOf("-")!=-1){
            str=str.substr(0,str.indexOf("-")+str_.indexOf("-")+1);
        }
    }
    return str.replace(/[^\-?\d.]/g,'').replace(/[\(\)\?]/g, '');
}
