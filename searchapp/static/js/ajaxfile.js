
$(document).ready(function(){
    $('#searchdata').on('click',function(e){
        e.preventDefault();
         console.log("hello")
         
        $event = $('#event').val();
        $event_name = $('#event-name').val();
        $date_start = $('#date-start').val();
        $date_end = $('#date-end').val();
        $mobile = $('#mobile').val();

        console.log($event)
        console.log($event_name)
        console.log($date_start)
        console.log($date_end)
        console.log($mobile)

        if($('#event').val()=="" & $('#mobile').val()=="" & $('#event-name').val()==""){
            $('.table').text("")
            
        }else{
            console.log("ajax calling");
            $.ajax({
                type: 'POST',
                url: '/search',
                data: {
                    event:$event,
                    event_name:$event_name,
                    date_start:$date_start,
                    date_end:$date_end,
                    mobile:$mobile,
                },
                headers: {
                    'X-CSRFToken': '{{ csrf_token }}',
                  },
                 success:function(data){
                    
                 $('.error').html('')
//                 $(".table").css("backgroundColor","yellow");
                 
//                  $(".table").append("<table width='750'><tr><th>Call Date</th>  <th>Source ID</th>  <th>Mobile No</th>  <th>Name</th>  <th>Company Name</th>  <th>Length in Second</th> <th>Status Name</th>  <th>Recording URL</th></tr>");
        
                
                  var trHTML = "<table>";
                  trHTML += "<tr><th>Call Date</th>  <th>Source ID</th>  <th> Mobile No</th>  <th>Name</th> <th>Company Name</th> <th>Length in Second</th>  <th>Status Name</th>  <th>Recording URL</th></tr>";//TABLE HEADER/HEADING----------
                  var newStr = trHTML.trim();
                  $.each(data, function (key,value) {
                      
                     newStr +=
                        '<tr><td>' + value.call_date +
                        '</td><td>' + value.source_id +
                        '</td><td>' + value.mobile_no +
                        '</td><td>' + value.name +
                        '</td><td>' + value.company_name +
                        '</td><td>' + value.length_in_sec +
                        '</td><td>' + value.status_name +
                        '</td><td>' + value.recording_url+ 
                        '</td><td>' + "<div class='col1d'><button type='submit' class='btn btn-success btn-md' href='#'>Download</button></div>" +

                        '</td></tr>';
                  });
                  newStr += "</table>";
                  
                    $('.table').html(' ');
                    $('.table').append(newStr);
                    
                   },

                 error: function(data){
                 $('.table').html(" ");
                 $('.error').html(data.responseJSON.error)
              }


            });
        }
    });

});


// function getbutton(recording){
//     if(recording==null)
//         {
//             value.recording_url = 'No Recording available'
//         }else{
//             '</td><td>' + "<div class='col1d'><button type='submit' class='btn btn-primary btn-md' href='#'>Download</button></div>" 
//         }
// }