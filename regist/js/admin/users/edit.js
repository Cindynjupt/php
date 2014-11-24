$(function(){
  // after page load, replace comma separated tags to real tags
  var tagInputs = $('.tags input'),
      div, tags, tag, tagContainer;

  tagInputs.hide();

  _.map(tagInputs, function(input) {
    div = document.createElement('div');
    tags = input.value.split('，');
    tags = _.map(tags, function(tag){ return '<div class="tag">' + tag + '</div>'; });
    tags = tags.join('');
    div.innerHTML = tags;
    $(input).after(div);
  });

  $('form').on('click', '.tag', function(){
    tag = $(this);
    tagContainer = tag.parent();
    tag.remove();
    tags = _.map(tagContainer.find('.tag'), function(t) { return t.textContent });
    console.log(tags.join('，'));
    // update the text input value
    tagContainer.prev().val(tags.join('，'));
  });

});