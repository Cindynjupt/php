$(function(){
  // delete edu email
  $('.js-delete-edu').on('click', function(e){
    e.preventDefault();
    var id = $(this).data('uid'),
        self = this;
    ajax('/admin/users/delete_edu', {
      'userid': id
    }, function(){
      $(self).parent().empty().append('<p class="text-muted">无</p>');
    });
  });

  // verify personal intro
  $('.js-check-intro').on('click', function(e){
    e.preventDefault();
    var id = $(this).data('uid'),
        managerId = $('body').data('manager'),
        flag = $(this).data('flag'),
        self = this,
        success = '<span class="label label-success">通过</span>',
        fail = '<span class="label label-danger">不通过</span>',
        introStatus = $('.js-intro-status');
    ajax('/admin/users/intro_status', {
      'userid': id,
      'flag': flag,
      'managerId': managerId
    }, function(){
      if (flag === 1) {
        introStatus.html(success);
      } else {
        introStatus.html(fail);
      }
    });
  });

  // delete photo
  $('.js-delete-photo').on('click', function(e){
    e.preventDefault();
    var id = $(this).data('uid'),
        slot = $(this).data('slot'),
        self = this;
    ajax('/admin/users/delete_photo', {
      'userid': id,
      'slot': slot
    }, function(){
      $(self).parents('.js-photo-container').remove();
    });
  });

  // change account status
  $('.js-change-account-status').on('click', function(e){
    var id = $(this).data('uid'),
        status = $(this).data('verify'),
        flag = $(this).data('flag'),
        buttons = $('.js-account-buttons'),
        loader = $('.js-loader');

    buttons.hide();
    loader.show();

    ajax('/admin/users/account_status', {
      'userid': id,
      'status': status,
      'flag': flag
    }, function(){
      // force a reload to make button status change
      window.location.reload();
    });
  });

  // utility
  function ajax(url, data, callback) {
    $.ajax({
      url: url,
      data: data,
    }).done(function(response){
      if (response.result) {
        alert('操作成功');
        callback();
      } else {
        alert('操作失败');
      }
    });
  }

  // show large image when click on thumbnail
  $('.js-thumb').on('click', function(){
      var src = $(this).attr('src'),
          img = new Image(),
          overlay = $('.overlay');
      img.src = src;
      img.onload = function(){
          overlay.show();
          img.style.position = 'fixed';
          img.style.top = '50%';
          img.style.left = '50%';
          img.style.marginLeft = - img.width / 2 + 'px';
          img.style.marginTop = - img.height / 2 + 'px';
          $('body').append(img);

          $(img).one('click', function(){
              $(this).remove();
              overlay.hide();
          });

          overlay.one('click', function(){
              $(img).remove();
              overlay.hide();
          });
      }
  });
});