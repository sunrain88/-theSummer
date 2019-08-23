/**
 * Created by 阳 on 2019/8/23.
 */
/*一个随机数生成器*/
function random_machine(){
    var len = arguments.length;
    var first,last;
    var i = 0,temp = 0,arr = [];
    var count = 0;
//             console.log(arguments[0] + " " + arguments[1] + " " + arguments[2] + " " + arguments.length);
    if(len == 0){                                              /*0个参数的情况，随机产生10个区间为[0,9]的整数*/
        count = 10;
        for( i = 0 ; i < count ; i ++){
            arr.push(parseInt(Math.random()*10));
        }
        return arr;
    }else if(len == 1){                                      /*1个参数的情况，随机产生arguments[0]个区间为[0,10]的整数*/
        count = arguments[0];
        for( i = 0 ; i < count ; i ++){
            arr.push( Math.round(Math.random()*10));          /*Math.round()四舍五入产生的误差比parseInt()小*/
        }
        return arr;
    }else if(len == 2){                                      /*2个参数的情况，随机产生arguments[0],区间为[arguments[1],arguments[1]+10]的整数*/
        count = arguments[0];
        first = arguments[1];
        for( i =0 ; i < count ; i ++){
            arr.push( Math.round(first + Math.random()*10));
        }
        return arr;
    }else if(len == 3){                                   /*3个参数的情况，随机产生arguments[0]个区间为[arguments[1],arguments[2]]的整数*/
        count = arguments[0];
        first = arguments[1];
        last = arguments[2];
        if(first > last){                                  /*当argument[1]大于arguments[2]时，二者换位*/
            first+=last;
            last = first - last;
            first = first - last;
        }
        temp = last - first;
        for( i = 0 ; i < count ; i ++){
            arr.push( Math.round(Math.random()*temp + first));
        }
        return arr;
    }else{
        console.log("请不要输入过多的参数");
        return false;
    }
}

/*内排序--插入排序--直接插入排序*/
function straight_insertion_sort(arr){
    var i, j, len = arr.length;
    for(i = 1; i < len ; i++){       /*从数组的第二位开始*/
        var temp = arr[i];        /*第一层循环开始，选中第i个元素，用一个变量暂时存储它，i依次增大，到length结束*/
        for( j = i ; j > 0 && arr[j-1] > temp ; j--){     /*第二层循环，从j=i开始，j依次减小，每次判断第j个元素是否大于第i个元素，知道j为1时结束*/
            arr[j] = arr[j-1];                               /*将数组第j-1个元素的值赋给第j个元素，实现元素的右移*/
        }
        arr[j] = temp;                                       /*将第i个元素插入到它左边第一个小于它的元素的右边*/
    }
    return arr;
}

/*内排序-插入排序-折半插入排序*/
function binary_insertion_sort(arr){                 /*折半插入排序是直接插入排序的优化，视同二分法减少了比较的次数，但时间复杂度与直接插入排序一样O(n*n)*/
    var i, j, low, high, mid;
    var len = arr.length;
    var temp;
    for(i = 1 ; i < len ; i++){                    /*第一层循环从i开始，i从1一次增大，到len结束*/
        if(arr[i] < arr[i - 1]){                   /*如果第i个元素比第i-1个元素小（逆序）*/
            temp = arr[i];
            low = 0;                               /*下界限元素序号赋值为0，上界限元素序号赋值为 i - 1*/
            high = i - 1;
            while(low <= high){                         /*while循环在由序界限内折半查找出距离i号元素最近的一个小于它的元素*/
                mid = parseInt((low + high) / 2);         /*求出下界与上界的中点*/
                if(temp < arr[mid]){                      /*如果第i号元素小于中点元素 */
                    high = mid -1;                       /*上界序号改变为中点左边的元素序号*/
                }else{                                    /*如果第i号元素大于中点元素*/
                    low = mid + 1;                        /*下界序号改变为中点右边的元素序号*/
                }
            }
            for(j = i - 1 ; j > high + 1 ; j --){                /*第二层循环从i-1号元素开始，依次减小，到求出的上界序号为止*/
                arr[j + 1] = arr[j];                             /*将有序区内上界以上元素整体右移*/
            }
            arr[high + 1] = temp;                                /*将第i号元素插入到上界元素的上方*/
        }
    }
    return arr;
}

/*内排序-插入排序-希尔排序*/
function shell_sort(arr){                  /*希尔排序时没结束时总体上没有有序区，只是分成的每一组在组内相对有序（分组一般使用二分法）*/
    var i, j, d, len = arr.length,temp;
    d = parseInt(len / 2);       /*对arr数组进行分组，第一次分为len/2组*/
    while(d > 0){                    /*分组循环（第一层循环）每次循环都将分组的数量除以2*/
        for(i = d; i < len ; i++){    /*第二层循环,从i = d（即为每一组的第二个数）开始，i++，到len结束，所有组的元素依次循环排序*/
            temp = arr[i];            /*记录下每一组无序区的第一个元素*/
            j = i - d;                /*将j指向本组无序区的第一个元素*/
            while(j >= 0&&temp < arr[j]){               /*第三层循环，当j小于0或者本组无序区第一个元素在本组有序区找到第一个小于它的元素时，循环停止*/
                arr[j + d] = arr[j];                         /*将在本组有序区找到的元素右边 的元素全部右移在本组右移一个位置*/
                j = j - d;                                /*j指向本组的上一个元素*/
            }
            arr[j + d] = temp;              /*将本组无序区的第一个元素插入到找到的第一个小于它的元素的右边*/
        }
        d = parseInt(d / 2);                    /*分组减半，组内元素加倍（当组数不为偶数时，组数为原来的（d-1）/2*/
    }
    return arr;
}

/*内排序--交换排序--冒泡排序*/
function bubble_sort(arr){
    var i, j,len = arr.length,exchange;
    for(i = 0 ; i < len ; i ++){                        /*第一层循环从i（数组头部）开始，循环次数为数组长度*/
        exchange = false;                               /*重置观察者*/
        for(j = len-1 ; j > i ; j --){                  /*第二层循环每次从len-1（数组尾部）开始，向数组头部冒泡，到i结束，循环次数为len-i.*/
            if(arr[j - 1] > arr[j]){
                arr[j] += arr[j-1];
                arr[j - 1] = arr[j] - arr[j - 1];
                arr[j] = arr[j] - arr[j - 1];
                exchange = true;                       /*观察第一层循环的第i次循环下的整个第二层循环中是否有交换*/
            }
        }
        if(exchange == false)                          /*第一层循环的第i次循环下的整个第二层循环中一次交换也没有发生，则说明数组已经全体有序*/
            return arr;                                    /*直接结束整个排序并返回有序数组*/
    }
    return arr;
}

/*内排序--交换排序--快速排序（还有点小      问题）*/
function quick_sort(arr,s,t){
    function partition(arr , s , t){
        var  i = s,j = t;
        var temp = arr[i];
        while(i < j){
            while(j > i && arr[j] >= temp){
                j --;
            }
            arr[i] = arr[j] ;
//                     arr[j] = arr[i] - arr[j];
//                     arr[i] = arr[i] - arr[j];
            while(i < j && arr[i] <= temp ){
                i ++;
            }
            arr[j] = arr[i];
//                     arr[i] = arr[j] - arr[i];
//                     arr[j] = arr[j] - arr[i];
        }
        arr[i] = temp;
        return i;
    }
    var i;
//             if(s < t){
    i = partition(arr , s , t);
    partition(arr , s , i - 1);
    partition(arr , i + 1 , t);
//             }
    return arr;
}

/*内排序-交换排序-快速排序（demo2）*/
const quickSort = (array) =>{
    const sort = (arr, left = 0, right = arr.length - 1) => {
        if (left >= right) {//如果左边的索引大于等于右边的索引说明整理完毕
            return;
        }
        let i = left;
        let j = right;
        const baseVal = arr[j]; // 取无序数组最后一个数为基准值
        while (i < j) {//把所有比基准值小的数放在左边大的数放在右边
            while (i < j && arr[i] <= baseVal) { //找到一个比基准值大的数交换
                i++
            }
            arr[j] = arr[i]; // 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）
            while (j > i && arr[j] >= baseVal) { //找到一个比基准值小的数交换
                j--
            }
            arr[i] = arr[j] ;// 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
        }
        arr[j] = baseVal ;// 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
        sort(arr, left, j-1); // 将左边的无序数组重复上面的操作
        sort(arr, j+1, right); // 将右边的无序数组重复上面的操作
    }
    const newArr = array.concat(); // 为了保证这个函数是纯函数拷贝一次数组
    sort(newArr);
    return newArr;
}

/*内排序-选择排序-简单选择排序*/
function simple_selection_sort(arr){
    var i, j, mark, len = arr.length;
    for(i = 0; i < len ; i++){             /*第一层排序i从0开始，i以此增加，到len结束*/
        mark = i;                            /*mark指向无序部分的第一个元素*/
        for(j = i + 1;j < len ;j ++){      /*第二层循环j从i+ 1开始，j依次增加，到len结束,找出本次循环中最小的一个元素*/
            if(arr[j] < arr[mark]){        /*比较Mark与arr[j]元素的大小*/
                mark = j;                  /*Mark指向比较中较小的元素（）*/
            }
        }
        if(mark != i){                   /*如果mark不是指向无序区的第一个元素，则交换arr[i]与arr[mark]*/
            arr[i] = arr[i] + arr[mark];
            arr[mark] = arr[i] - arr[mark];
            arr[i] = arr[i] - arr[mark];
        }
    }
    return arr;
}

/*内排序--选择排序--堆排序*/
function  hear_sort(arr){

}
