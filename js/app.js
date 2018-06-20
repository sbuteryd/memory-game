/*
 * 创建一个包含所有卡片的数组
 */


/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */

const clickDiv = document.querySelector('.deck');
const fistStepList =[];
let count = 0;
let timeStop =1;
let gameStep =0;

let timeList = document.querySelector('.time');
let lastTime = setInterval(function () {
    timeList.textContent = count = count+1;
    if(timeStop ===9){
        clearInterval(lastTime)
    }
    },1000);


function fistStep(event){
    //1、步数
    if(event.srcElement.nodeName === 'LI'){
        gameStep = gameStep+1;
        document.querySelector('.moves').textContent = gameStep;
    }

    let getDiv = event.target;
    console.log(event);
    //2、抓取第一个图标
    if ((fistStepList.length === 0) && (event.srcElement.nodeName === 'LI')&&(event.target.className ==='card')) {
        let fistIcond = event.target.firstElementChild.className;
        fistStepList.push(fistIcond);
        getDiv.className = 'card open show';

        //3、防止第二次点击
    }else if (((fistStepList.length === 1) && (event.srcElement.nodeName === 'LI'))&&(event.target.className ==='card')){
    //4、抓取第二个图标
        let fistClick = fistStepList.pop();
        let fistIcond = event.target.firstElementChild.className;
        console.log(fistIcond,"fisIcond");
    //4-1、getDiv 的元素是card  替换成动画,  如果找到同样的图标显示匹配以及动画效果
        getDiv.className = 'card open match animated tada';
    //4-2、 如果图标不匹配，替换成 card 不显示
        setTimeout(function inital () {
            if (fistClick !==fistIcond){
                let findShow = document.querySelector('.deck').querySelector('.show');
                getDiv.className = 'card open show nomatch animated wobble';
                findShow.className = 'card open show nomatch animated wobble';

    //4-3、把不配备的动画去掉，点击完后
                setTimeout(function click () {
                    getDiv.className = 'card';
                    findShow.className ='card';
                },480);
    //4-4、如果配显现，清空列表，显现出来
            }else if ((fistClick === fistIcond)){
                timeStop = timeStop+1;
                let diffScond = document.querySelector('.deck').querySelector('.show');
                diffScond.className ='card open match animated tada';
                console.log(fistStepList);
                console.log(timeStop,'timestop');
            }
        },0)

    }
    console.log(fistStepList)

}

clickDiv.addEventListener('click',fistStep);

//Reset button
     //（1）、查找重置按钮
const restButton = document.querySelector('.restart').querySelector('i');
     //（2）、给按钮添加事件
restButton.addEventListener('click',function () {
     //（3）、找到每一个图框，
    const findCards = document.querySelector('.deck').querySelectorAll('.card');
    for(let i =0; i<findCards.length;i++){
     //（4）、替换成黑色风格
        findCards[i].className = 'card'
    }
     //（5）、enable shuffle 图标随机打乱
    randCard();
});

// random cards
function randCard() {
    //（1）、找到每一个图标
    const randCards = document.querySelector('.deck').querySelectorAll('i');
    //（2）、图标列表，这个要放入随机函数
    const carList = [];
    for (let i = 0; i < randCards.length; i++) {
        //（3）、找到每一个 图标，添加到列表
        carList.push(randCards[i].className)
    }
    //（4）、列表添加到洗牌
    const cardShuffle = shuffle(carList);
    //（5）、把页面的图标，替换成随机的图标，
    for (let i = 0; i < randCards.length; i++) {
        randCards[i].className = cardShuffle[i]
    }
    fistStep();
}
