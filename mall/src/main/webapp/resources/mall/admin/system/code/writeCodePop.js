
$(document).ready(function() {
    $('#form').validate({
        rules: {
            cd: { required: true},
            cd_name: { required: true }
        },
        messages: {
            cd: { required: "코드를 입력하시오." },
            cd_name: { required: "코드명을 다시 확인하세요." }
        }
    });
}); 