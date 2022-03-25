function select_all() {
    var flag = document.getElementById("all").checked;
    var oSelect = document.getElementsByName("product");
    if (flag == true) {
        for (var i = 0; i < oSelect.length; i++) {
            oSelect[i].checked = true;
        }
    }
    else if (flag == false) {
        for (var i = 0; i < oSelect.length; i++) {
            oSelect[i].checked = false;
        }
    }
}
function myEdit(rowId) {
    edit_flag = true;//修改中无需计算总价
    var row = document.getElementById(rowId).rowIndex;//获取表格的行
    var col = document.getElementById(rowId).cells;//获取表格的列
    var sum = col[2].innerHTML;//保存原来的商品数量，用以初始化
    col[2].innerHTML = "<input type='button' onclick='decrease(\"" + rowId + "\");' value='-' class='center'> " + sum + " <input type='button' onclick='increase(\"" + rowId + "\");' value='+' class='center'>";
    col[4].innerHTML = "<input type='button' value='删除'> <input type='button' value='确定' onclick='conRow(\"" + rowId + "\");'>";
}
function conRow(rowId) {
    edit_flag = false;//修改结束后可以计算总价
    var row = document.getElementById(rowId).rowIndex;//获取表格的行
    var col = document.getElementById(rowId).cells;//获取表格的列
    var sum = col[2].innerText;//获取更新后的商品数量(innerText不包括html标签内容)
    col[2].innerHTML = sum;
    col[4].innerHTML = "<input type='button' value='删除'> <input type='button' value='修改' onclick='myEdit(\"" + rowId + "\");'>";
}
function decrease(rowId) {
    var col = document.getElementById(rowId).cells;//获取表格的列
    var sum = parseInt(col[2].innerText);
    sum = sum - 1;
    if (sum == 0) {
        alert("商品数量最少为1！");
        sum += 1;
    }
    col[2].innerHTML = sum;
    myEdit(rowId);
}
function increase(rowId) {
    var col = document.getElementById(rowId).cells;//获取表格的列
    var sum = parseInt(col[2].innerText);
    sum = sum + 1;
    if (sum == 100) {
        alert("商品数量最多99！");
        sum -= 1;
    }
    col[2].innerHTML = sum;
    myEdit(rowId);
}
function myConfirm() {
    if (edit_flag == false) {
        var total_sum = 0;
        var goods = document.getElementsByClassName("goods");
        for (var i = 0; i < goods.length; i++) {
            if (document.getElementsByName("product")[i].checked == true) {
                var col = goods[i].cells;
                var sum = parseInt(col[2].innerHTML);
                var price = parseInt(col[3].innerHTML);
                total_sum += sum * price;
            }
            document.getElementById("total_price").innerHTML = "总价:&yen;" + total_sum;//点击确定后修改总价
        }
    }
    return total_sum;
}
function myAnotherConfirm() {
    var total = myConfirm();
    confirm(" 总 价: ¥" + total);//点击结算后修改总价
}
function myAdd() {
    var row1 = document.getElementById('row1');
    var newRow = row1.cloneNode(true);
    newRow.setAttribute("id", "row3");
    var col = newRow.cells;
    col[1].innerHTML = "<img src=\"img/row3.jpg\" alt='row3' class='little'> 联想拯救者y9000p 2021版";
    col[3].innerHTML = "8999";
    col[4].innerHTML = "<input type='button' value='删除'  onclick='myDel(this)';> <input type='button' value='修改' onclick='myEdit(\"row3\");'>";
    document.body.firstElementChild.appendChild(newRow);
}
function myDel(obj) {
    obj.parentNode.parentNode.remove();
}
var myCal = setInterval("myConfirm()", 200);//每200ms刷新一下总价
var edit_flag = false;//判断是否修改ing