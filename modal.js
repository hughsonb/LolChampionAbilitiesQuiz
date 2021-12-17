$(document).ready(function() {

    // Gets the video src from the data-src on each button
    var video_source; 

    $('td a').click(function() {
        video_source = $(this).data( "src" );
    });
    
      
    $('#myModal').on('shown.bs.modal', function (e) 
    {
        // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
        $("source").attr('src', video_source); 
        $("video")[0].load(); 
    })
      
    // stop playing the youtube video when I close the modal
    $("#myModal").on('hidden.bs.modal', function (e) {
        $("video")[0].pause();
        $("source").removeAttr('src')
    });
});//doc ready
    
    
    