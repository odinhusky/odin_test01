// device APIs are available
function onDeviceReady() {
    if (history.length > 1) {
        navigator.app.exitApp();
        return;
    }

    //alert(navigator.network.connection.type);
    if (navigator.network.connection.type === Connection.NONE) {
        //location.replace("offline.html");
        location.href = "offline.html";
    } else {
        // <!-- Configuration Start: Please customize following configuration -->
        location.replace("http://blog.pulipuli.info/");
        // <!-- Configuration End -->
    }

    //下方換頁用的====================
    var zindex;
    var nowindex = 3; //現在所在頁面，一開始設定為一進入的頁面的zindex
    var preindex = []; //紀錄瀏覽過頁面的陣列的zindex
    var count = 0; //計算現在按返回鍵返回第幾次
    preindex.push(nowindex);
    console.log('nowindex=' + nowindex);
    console.log('preindex=' + preindex);
    $('.content' + nowindex).addClass('this');
    $('.btn').on('click', function () {
        zindex = parseInt($(this).data('zindex'));
        if (zindex !== 0) {
            //如果點的不是back就讓count歸零
            count = 0;
            console.log('count=' + count);

            nowindex = zindex;

            var acindex = preindex.length;
            //不讓重複的頁面記錄在陣列裡面
            if (acindex == 0) {
                preindex.push(zindex);
            } else if (acindex == 1) {
                if (preindex[0] !== nowindex) {
                    preindex.push(zindex);
                }
            } else {
                if (preindex[acindex - 1] !== nowindex) {
                    preindex.push(zindex);
                }
            }
            $('.content' + zindex).css('z-index', '100').addClass('this').siblings().css('z-index', '').removeClass('this');

        } else {
            // count = count + 1;
            // console.log('count=' + count);
            var acindex2 = preindex.length;
            console.log('acindex2=' + acindex2);
            if (acindex2 == 1) {
                var backpage = preindex[0];
                $('.content' + backpage).css('z-index', '100').addClass('this').siblings().css('z-index', '').removeClass('this');
            } else if (acindex2 == 2) {
                var backpage = preindex[0];
                $('.content' + backpage).css('z-index', '100').addClass('this').siblings().css('z-index', '').removeClass('this');
                preindex.splice(1, 1) //splice(陣列中的索引值,從索引位置開始刪掉幾筆,從索引位置開始塞入新的資料)
                console.log(preindex.length);
            } else if (acindex2 >= 3) {
                var backindex = acindex2 - 2;
                console.log('backindex=' + backindex);

                var backpage = preindex[backindex];
                console.log('backpage=' + backpage);

                $('.content' + backpage).css('z-index', '100').addClass('this').siblings().css('z-index', '').removeClass('this');
                preindex.splice(acindex2 - 1, 1) //splice(陣列中的索引值,從索引位置開始刪掉幾筆,從索引位置開始塞入新的資料)
                console.log(preindex.length);
            }

        }


        // console.log('zindex=' + zindex);
        // console.log('nowindex=' + nowindex);
        console.log('preindex=' + preindex);
    });
    //下方換頁用的END====================

    //從右邊滑進來的頁面
    $('.block').on('click', function () {
        var selector_page = $(this).data('page');
        $(selector_page).stop().animate({ left: 0 }, 500, 'linear');
        var selector_layer = $(this).data('layer');
        $(selector_layer).stop().animate({ left: -100 + '%' }, 500, 'linear');
    });

    $('.back').on('click', function () {
        var selector_back = $(this).data('page');
        $(selector_back).stop().animate({ left: 100 + '%' }, 500, 'linear');
        var selector_layer = $(this).data('layer');
        if (selector_layer == '.layer1') {
            var dataNumber = $(this).data('number');
            // console.log(dataNumber);
            if (dataNumber !== undefined) {
                var selectorArray = dataNumber.split('/');
                var selectorArrayLength = selectorArray.length;
                // console.log(selectorArrayLength);
                for (var item = 0; item < selectorArrayLength; item++) {
                    // console.log(selectorArray[item]);
                    $(selectorArray[item]).animate({ left: 100 + '%' }, 0);
                }
            } else {
                // console.log('是undefined');
                $(selector_layer).stop().animate({ left: 0 }, 500, 'linear');
            }

        }
        $(selector_layer).stop().animate({ left: 0 }, 500, 'linear');
    });
}
document.addEventListener("deviceready", onDeviceReady, false);