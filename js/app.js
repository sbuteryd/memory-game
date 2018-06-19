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
function fistStep(event){
    //1、捕捉点击
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
        let fistIcond = event.target.firstElementChild.className;
        console.log(fistIcond,"fisIcond");
    //4-1、getDiv 的元素是card  替换成动画,  如果找到同样的图标显示匹配以及动画效果
        getDiv.className = 'card open match animated tada';
    //4-2、 如果图标不匹配，替换成 card 不显示
        setTimeout(function inital () {
            if (fistStepList[0] !==fistIcond){
                getDiv.className = 'card open show nomatch animated wobble';
    //4-3、把不配备的动画去掉，点击完后
                setTimeout(function click () {
                    getDiv.className = 'card';
                },200)
    //4-4、如果配显现，清空列表，显现出来
            }else if ((fistStepList[0] === fistIcond)){
                let findshow = document.querySelector('.deck').querySelector('.show');
                findshow.className = 'card open match animated tada';
                fistStepList.pop();
            }else{
                fistStepList.pop()
            }

        },200)

    }
    console.log(fistStepList)

}

clickDiv.addEventListener('click',fistStep);