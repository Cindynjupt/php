$(function(){
  var checkboxes = $('.candidates-table tbody input');
  var img, w, h, overlay = $('.overlay');

  $('.js-hold-all').on('click', function(){
    if (!window.confirm('确定暂停所有用户？')) { return null; }
    var userIds = _.map(document.querySelectorAll('.js-userid'), id);
    hold(userIds, function(){
      $('.candidates-table tbody').empty();
    });
  });
  
  $('.js-hold-selected').on('click', function(){
    var selecteUserIds = _.map(document.querySelectorAll('.selected .js-userid'), id);
    hold(selecteUserIds, function(){
      $('.selected').remove();
    });
  });

  checkboxes.on('click', function(e){
    $(this).parents('tr').toggleClass('selected', $(this).is(':checked'));
    checkButton();
  });

  $('.candidates-table thead input').on('click', function(e){
    var rows = $('.candidates-table tbody tr'),
        checked = $(this).is(':checked');
    if (checked) {
      checkboxes.attr('checked', 'checked');
    } else {
      checkboxes.removeAttr('checked');
    }
    rows.toggleClass('selected', checked);
    checkButton();
  });

  // sort
  $('[href=#score], [href=#inactive]').on('click', function(e){
    e.preventDefault();
    $('[name=sort]').val($(this).attr('href').replace('#',''));
    $('#candidates-filter-form').submit();
  });

  $('.js-avatar').on('click', 'img', showImage);

  (function drawGraph() {
    var temp, domain, range = [10, 190], scale, svg; //matching, locked

    // draw the graph
    temp = d3.merge(data);
    domain = [d3.min(temp), d3.max(temp)];
    scale = d3.scale.linear().domain(domain).range(range);

    svg = d3.selectAll('svg').data(data);

    svg.selectAll('rect')
      .data(function(d) { return d })
      .transition()
      .attr('width', function(d){ return scale(d); });

    svg.selectAll('text')
      .data(function(d) { return d })
      .text(function(d){ return d })
      .attr('x', function(d){ return scale(d) + 2});
  })();

  function id(td) {
    return parseInt(td.textContent, 10);
  }

  function hold(users, callback) {
    $.ajax({
      type: 'POST',
      url: '/admin/users/lock_users',
      data: { users: users },
      success: function(response) {
        if(response.result) {
          alert('操作成功');
          callback();
        }
      },
      dataType: 'json'
    });
  }

  function checkButton() {
    if (checkboxes.filter(':checked').length > 0) {
      $('.js-hold-selected').removeAttr('disabled');
    } else {
      $('.js-hold-selected').attr('disabled', 'disabled');
    }
  }

  function showImage(e) {
    img = new Image();
    img.src = e.currentTarget.getAttribute('src');
    img.onload = function(){
      w = img.width;
      h = img.height;
      img.style.position = 'fixed';
      img.style.top = '50%';
      img.style.left = '50%';
      img.style.marginLeft = -w/2 + 'px';
      img.style.marginTop = -h/2 + 'px';

      document.body.appendChild(img);
      overlay.show();
      overlay.click(hideImage);
      img.onclick = hideImage;
    }
  }

  function hideImage() {
    overlay.hide();
    $(img).remove();
  }
})