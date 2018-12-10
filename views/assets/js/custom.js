    // Use Morris.Area instead of Morris.Line
    Morris.Line({
      element: 'chart-home',
      behaveLikeLine: true,
      data: [
        {x: '2011 Q1', y: 3, z: 3},
        {x: '2011 Q2', y: 2, z: 1},
        {x: '2011 Q3', y: 2, z: 4},
        {x: '2011 Q4', y: 3, z: 3}
      ],
      xkey: 'x',
      ykeys: ['y', 'z'],
      labels: ['Y', 'Z'],
      // lineColors: '#3E8EF7'
    });
  

    Waves.init();
    Waves.attach('.waves-effect', ['waves-button', 'waves-float']);


$(window).scroll(function() {
  var height = $(window).height();
  $('.sidebar').css('height',height);
})