/**
 * Created by 24192 on 2016/7/27.
 */
$(document).ready(function(){
    $('#pictureShow').hide();

    var scroll = function(ele,duration){
        $('html, body').animate({
            scrollTop: $('#'+ele).offset().top
        }, duration);
    };
    $('.jump-btn1').on('click',function(){
        scroll('page-3',1000);
        return false;
    });
    $('.jump-btn2').on('click',function(){
        scroll('page-3',600);
        return false;
    });
    $('.jump-btn3').on('click',function(){
        scroll('page-3',300);
        return false;
    });
    //�ϴ�ͼƬ
    document.querySelector('#file').addEventListener('change', function () {

        lrz(this.files[0])
            .then(function (rst) {
                // ����ɹ���ִ��
                console.log(rst);
                $('.picture-logo,.picture-p').hide();
                $('#pictureShow').show();
                $('#pictureShow').attr('src',rst.base64);
            })
            .catch(function (err) {
                // ����ʧ�ܻ�ִ��
                console.log("�ϴ�ʧ��="+err);
            })
            .always(function () {
                // �����ǳɹ�ʧ�ܣ�����ִ��
            });
    });
    function toFixed2 (num) {
        return parseFloat(+num.toFixed(2));
    }
});
