
$(document).ready(function(){
    $('#searchdata').on('click',function(e){
        e.preventDefault();
         console.log("hello")
         
        $event = $('#event').val();
        $event_name = $('#event-name').val();
        $status = $('#status').val();
        $date_start = $('#date-start').val();
        $date_end = $('#date-end').val();
        $mobile = $('#mobile').val();

        console.log($event)
        console.log($event_name)
        console.log($status)
        console.log($date_start)
        console.log($date_end)
        console.log($mobile)

        if($('#event').val()=="" && $('#event_name').val()=="" && $('#status').val()=="" && $('#date_start').val()=="" && $('#date_end').val()=="" && $('mobile').val()==""){

            $('.table').text("Please fill any fields")
            
        }else{
            console.log("ajax calling");
            $.ajax({
                type: 'POST',
                url: '/search',
                data: {
                    event:$event,
                    event_name:$event_name,
                    status:$status,
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
                  trHTML += "<tr><th>Call Date</th>  <th>Call Time</th>  <th>Campaign ID</th> <th>Campaign Name</th>  <th> Mobile No</th>  <th>User ID</th> <th>First Name</th> <th>Company Name</th> <th>Length in Second</th>  <th>Status</th>  <th>City</th></tr>";//TABLE HEADER/HEADING----------
                  var newStr = trHTML.trim();
                  $.each(data, function (key,value) {
                      
                     newStr +=
                        '<tr><td>' + value.call_date +
                        '</td><td>' + value.time +
                        '</td><td>' + value.campaign_id +
                        '</td><td>' + value.campaign_name +
                        '</td><td>' + value.mobile_no +
                        '</td><td>' + value.user_id +
                        '</td><td>' + value.first_name +
                        '</td><td>' + value.company_name +
                        '</td><td>' + value.length_in_sec +
                        '</td><td>' + value.status +
                        '</td><td>' + value.city+ 
                        '</td><td>' + "<div class='col1d'><a type='button' class='btn btn-success btn-md' href='audio_player/"+value.recording_filename+"'>PlayAudio</a></div>" +
                        '</td><td>' + "<div class='col2d'><a type='button' class='btn btn-success btn-md' href='song_download/"+value.recording_filename+"'>Download</a></div>" +

                        '</td></tr>';
                  });

                  newStr += "</table>";
                //   href='audio_player/?value='"+value.recording_filename+"'
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