/**
 * Created by �� on 2019/8/23.
 */
/*һ�������������*/
function random_machine(){
    var len = arguments.length;
    var first,last;
    var i = 0,temp = 0,arr = [];
    var count = 0;
//             console.log(arguments[0] + " " + arguments[1] + " " + arguments[2] + " " + arguments.length);
    if(len == 0){                                              /*0��������������������10������Ϊ[0,9]������*/
        count = 10;
        for( i = 0 ; i < count ; i ++){
            arr.push(parseInt(Math.random()*10));
        }
        return arr;
    }else if(len == 1){                                      /*1��������������������arguments[0]������Ϊ[0,10]������*/
        count = arguments[0];
        for( i = 0 ; i < count ; i ++){
            arr.push( Math.round(Math.random()*10));          /*Math.round()�����������������parseInt()С*/
        }
        return arr;
    }else if(len == 2){                                      /*2��������������������arguments[0],����Ϊ[arguments[1],arguments[1]+10]������*/
        count = arguments[0];
        first = arguments[1];
        for( i =0 ; i < count ; i ++){
            arr.push( Math.round(first + Math.random()*10));
        }
        return arr;
    }else if(len == 3){                                   /*3��������������������arguments[0]������Ϊ[arguments[1],arguments[2]]������*/
        count = arguments[0];
        first = arguments[1];
        last = arguments[2];
        if(first > last){                                  /*��argument[1]����arguments[2]ʱ�����߻�λ*/
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
        console.log("�벻Ҫ�������Ĳ���");
        return false;
    }
}

/*������--��������--ֱ�Ӳ�������*/
function straight_insertion_sort(arr){
    var i, j, len = arr.length;
    for(i = 1; i < len ; i++){       /*������ĵڶ�λ��ʼ*/
        var temp = arr[i];        /*��һ��ѭ����ʼ��ѡ�е�i��Ԫ�أ���һ��������ʱ�洢����i�������󣬵�length����*/
        for( j = i ; j > 0 && arr[j-1] > temp ; j--){     /*�ڶ���ѭ������j=i��ʼ��j���μ�С��ÿ���жϵ�j��Ԫ���Ƿ���ڵ�i��Ԫ�أ�֪��jΪ1ʱ����*/
            arr[j] = arr[j-1];                               /*�������j-1��Ԫ�ص�ֵ������j��Ԫ�أ�ʵ��Ԫ�ص�����*/
        }
        arr[j] = temp;                                       /*����i��Ԫ�ز��뵽����ߵ�һ��С������Ԫ�ص��ұ�*/
    }
    return arr;
}

/*������-��������-�۰��������*/
function binary_insertion_sort(arr){                 /*�۰����������ֱ�Ӳ���������Ż�����ͬ���ַ������˱ȽϵĴ�������ʱ�临�Ӷ���ֱ�Ӳ�������һ��O(n*n)*/
    var i, j, low, high, mid;
    var len = arr.length;
    var temp;
    for(i = 1 ; i < len ; i++){                    /*��һ��ѭ����i��ʼ��i��1һ�����󣬵�len����*/
        if(arr[i] < arr[i - 1]){                   /*�����i��Ԫ�رȵ�i-1��Ԫ��С������*/
            temp = arr[i];
            low = 0;                               /*�½���Ԫ����Ÿ�ֵΪ0���Ͻ���Ԫ����Ÿ�ֵΪ i - 1*/
            high = i - 1;
            while(low <= high){                         /*whileѭ��������������۰���ҳ�����i��Ԫ�������һ��С������Ԫ��*/
                mid = parseInt((low + high) / 2);         /*����½����Ͻ���е�*/
                if(temp < arr[mid]){                      /*�����i��Ԫ��С���е�Ԫ�� */
                    high = mid -1;                       /*�Ͻ���Ÿı�Ϊ�е���ߵ�Ԫ�����*/
                }else{                                    /*�����i��Ԫ�ش����е�Ԫ��*/
                    low = mid + 1;                        /*�½���Ÿı�Ϊ�е��ұߵ�Ԫ�����*/
                }
            }
            for(j = i - 1 ; j > high + 1 ; j --){                /*�ڶ���ѭ����i-1��Ԫ�ؿ�ʼ�����μ�С����������Ͻ����Ϊֹ*/
                arr[j + 1] = arr[j];                             /*�����������Ͻ�����Ԫ����������*/
            }
            arr[high + 1] = temp;                                /*����i��Ԫ�ز��뵽�Ͻ�Ԫ�ص��Ϸ�*/
        }
    }
    return arr;
}

/*������-��������-ϣ������*/
function shell_sort(arr){                  /*ϣ������ʱû����ʱ������û����������ֻ�Ƿֳɵ�ÿһ��������������򣨷���һ��ʹ�ö��ַ���*/
    var i, j, d, len = arr.length,temp;
    d = parseInt(len / 2);       /*��arr������з��飬��һ�η�Ϊlen/2��*/
    while(d > 0){                    /*����ѭ������һ��ѭ����ÿ��ѭ�������������������2*/
        for(i = d; i < len ; i++){    /*�ڶ���ѭ��,��i = d����Ϊÿһ��ĵڶ���������ʼ��i++����len�������������Ԫ������ѭ������*/
            temp = arr[i];            /*��¼��ÿһ���������ĵ�һ��Ԫ��*/
            j = i - d;                /*��jָ�����������ĵ�һ��Ԫ��*/
            while(j >= 0&&temp < arr[j]){               /*������ѭ������jС��0���߱�����������һ��Ԫ���ڱ����������ҵ���һ��С������Ԫ��ʱ��ѭ��ֹͣ*/
                arr[j + d] = arr[j];                         /*���ڱ����������ҵ���Ԫ���ұ� ��Ԫ��ȫ�������ڱ�������һ��λ��*/
                j = j - d;                                /*jָ�������һ��Ԫ��*/
            }
            arr[j + d] = temp;              /*�������������ĵ�һ��Ԫ�ز��뵽�ҵ��ĵ�һ��С������Ԫ�ص��ұ�*/
        }
        d = parseInt(d / 2);                    /*������룬����Ԫ�ؼӱ�����������Ϊż��ʱ������Ϊԭ���ģ�d-1��/2*/
    }
    return arr;
}

/*������--��������--ð������*/
function bubble_sort(arr){
    var i, j,len = arr.length,exchange;
    for(i = 0 ; i < len ; i ++){                        /*��һ��ѭ����i������ͷ������ʼ��ѭ������Ϊ���鳤��*/
        exchange = false;                               /*���ù۲���*/
        for(j = len-1 ; j > i ; j --){                  /*�ڶ���ѭ��ÿ�δ�len-1������β������ʼ��������ͷ��ð�ݣ���i������ѭ������Ϊlen-i.*/
            if(arr[j - 1] > arr[j]){
                arr[j] += arr[j-1];
                arr[j - 1] = arr[j] - arr[j - 1];
                arr[j] = arr[j] - arr[j - 1];
                exchange = true;                       /*�۲��һ��ѭ���ĵ�i��ѭ���µ������ڶ���ѭ�����Ƿ��н���*/
            }
        }
        if(exchange == false)                          /*��һ��ѭ���ĵ�i��ѭ���µ������ڶ���ѭ����һ�ν���Ҳû�з�������˵�������Ѿ�ȫ������*/
            return arr;                                    /*ֱ�ӽ����������򲢷�����������*/
    }
    return arr;
}

/*������--��������--�������򣨻��е�С      ���⣩*/
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

/*������-��������-��������demo2��*/
const quickSort = (array) =>{
    const sort = (arr, left = 0, right = arr.length - 1) => {
        if (left >= right) {//�����ߵ��������ڵ����ұߵ�����˵���������
            return;
        }
        let i = left;
        let j = right;
        const baseVal = arr[j]; // ȡ�����������һ����Ϊ��׼ֵ
        while (i < j) {//�����бȻ�׼ֵС����������ߴ���������ұ�
            while (i < j && arr[i] <= baseVal) { //�ҵ�һ���Ȼ�׼ֵ���������
                i++
            }
            arr[j] = arr[i]; // ���ϴ��ֵ�����ұ����û�бȻ�׼ֵ��������ǽ��Լ���ֵ���Լ���i ���� j��
            while (j > i && arr[j] >= baseVal) { //�ҵ�һ���Ȼ�׼ֵС��������
                j--
            }
            arr[i] = arr[j] ;// ����С��ֵ����������û���ҵ��Ȼ�׼ֵС�������ǽ��Լ���ֵ���Լ���i ���� j��
        }
        arr[j] = baseVal ;// ����׼ֵ��������λ�����һ��ѭ������ʱ�� j ���� i ��
        sort(arr, left, j-1); // ����ߵ����������ظ�����Ĳ���
        sort(arr, j+1, right); // ���ұߵ����������ظ�����Ĳ���
    }
    const newArr = array.concat(); // Ϊ�˱�֤��������Ǵ���������һ������
    sort(newArr);
    return newArr;
}

/*������-ѡ������-��ѡ������*/
function simple_selection_sort(arr){
    var i, j, mark, len = arr.length;
    for(i = 0; i < len ; i++){             /*��һ������i��0��ʼ��i�Դ����ӣ���len����*/
        mark = i;                            /*markָ�����򲿷ֵĵ�һ��Ԫ��*/
        for(j = i + 1;j < len ;j ++){      /*�ڶ���ѭ��j��i+ 1��ʼ��j�������ӣ���len����,�ҳ�����ѭ������С��һ��Ԫ��*/
            if(arr[j] < arr[mark]){        /*�Ƚ�Mark��arr[j]Ԫ�صĴ�С*/
                mark = j;                  /*Markָ��Ƚ��н�С��Ԫ�أ���*/
            }
        }
        if(mark != i){                   /*���mark����ָ���������ĵ�һ��Ԫ�أ��򽻻�arr[i]��arr[mark]*/
            arr[i] = arr[i] + arr[mark];
            arr[mark] = arr[i] - arr[mark];
            arr[i] = arr[i] - arr[mark];
        }
    }
    return arr;
}

/*������--ѡ������--������*/
function  hear_sort(arr){

}
