$(document).ready(function() {

    $("#srch_tags").tagit({
        fieldName: 'tag_ids[]',
        tagLimit: 5,
        allowSpaces: true,

        autocomplete: {
            minLength: 2,
            delay: 300,
            search: function(event, ui){$('#load_x').css('display', 'inline-block');},

            source: function(request, response){
                $.ajax({
                    dataType: "json",
                    type : 'Get',
                    url: tags_url,
                    data:{term: request.term},

                }).always(function(){
                    $('.ui-autocomplete-input').removeClass('ui-autocomplete-loading');
                    $('#load_x').css('display', 'none');

                }).done(function(msg){
                    //console.log(msg);
                    if(typeof(msg['json'])!='undefined')
                    response(msg['json']);
                });
            }
        },
    });

});