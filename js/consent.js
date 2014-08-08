 $(document).on('pagechange', function() {
            if(localStorage.getItem("user_uuid")==null) {
                console.log("consenting");
                setTimeout(function () {
                    $('#popupDialog').popup('open');
                }, 0); // delay above zero
            }
        });