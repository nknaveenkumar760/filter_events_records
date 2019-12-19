
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
                  trHTML += "<tr><th>Call Date</th>  <th>Call Time</th>  <th>Campaign ID</th> <th>Campaign Name</th>  <th> Mobile No</th>  <th>User ID</th> <th>First Name</th> <th>Company Name</th> <th>Length in Second</th>  <th>Status</th>  <th>City</th> <th>       </th> <th>     </th></tr>";//TABLE HEADER/HEADING----------
                  var newStr = trHTML.trim();
                  $.each(data, function (key,value) {
                    // console.log(key)
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
                        '</td><td>' + "<div class='col1d'><button class='audio_play' data-toggle='modal' id='"+key+"' data-url='audio_player/"+value.recording_filename+"'><img src='/static/image/audi-icon.png' width='30px'/></button></div>" +
                        '</td><td>' + "<div class='col2d'><a type='button'  href='song_download/"+value.recording_filename+"'><img src='/static/image/downlaod-icon.png' width='30px'/></a></div>" +

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

// audio paly modal 

$(document).on('click', '.audio_play', function (e) {
    // var theID = $(this).attr('id');
    var url = $(this).attr('data-url');
    console.log('id name',theID)
    e.preventDefault();
    console.log("its working.")
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: url,
        data: { },

        success: function(data)
        { 
              $('#empModal').modal('show'); 
            $('.modal-body').html(data);
            
            // console.log("success audio modal...")
        }
       });
   });


// $(document).ready(function(){
//   $("#all_records").on('click',function(e) {
//       e.preventDefault()
//     var table = $("table tbody");
    
//     var total_data = []
    
//     table.find('tr').each(function (i) {
//         var array_list = []
//         var $tds = $(this).find('td'),
//         Call_Date = $tds.eq(0).text(),
//         Call_Time	 = $tds.eq(1).text(),
//         campaign_id = $tds.eq(2).text();
//         // console.log("hello dattt", Call_Date, Call_Time, campaign_id)
//         // do something with productId, product, Quantity
//         array_list.push(Call_Date, Call_Time, campaign_id);
//         console.log(array_list)
//         total_data.push(array_list)  
//         console.log(total_data)
//     });
    
//         console.log(total_data)

//         $.ajax({
//             type: "GET",
//             contentType: "application/json",
//             url: '/all_records_downloads',
//             data: { 
//                 total_data
//             },
    
//             success: function(data)
//             { 
//                 console.log(data)
//             }
//         });
//     });
// });

// $(document).ready(function(){
//   $("#all_records").on('click',function(e) {
//       e.preventDefault()
//         var TableData;
//         TableData = storeTblValues();
                
//  $.ajax({
//     type: "GET",
//     url: '/all_records_downloads',
//     data: {
//      table_data:TableData 
//     },
//     success: function(data){
//         console.log(data)
//         // return value stored in msg variable
//     }
//     });
// });


// function storeTblValues()
// {
//     console.log("function executedd...")
//     var TableData = new Array();

//     $('.table tr').each(function(row, tr){
//         TableData[row]={
//             "taskNo" : $(tr).find('td:eq(0)').text()
//             , "date" :$(tr).find('td:eq(1)').text()
//             , "description" : $(tr).find('td:eq(2)').text()
//             , "task" : $(tr).find('td:eq(3)').text()
//         }
//         // console.log(TableData[row])    
//     }); 
//     TableData.shift();  // first row will be empty - so remove
//     var array_list = []
//     array_list.push(TableData)
//     console.log(array_list)
//     var myJsonString = JSON.stringify(array_list);
//     return myJsonString;
// }
// });

$(document).ready(function(){
    $('#all_records').on('click', function(){    
        $(".table").table2excel({    
            filename: "Your_File_Name.xls" ,   
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });    
        });    
    });    

