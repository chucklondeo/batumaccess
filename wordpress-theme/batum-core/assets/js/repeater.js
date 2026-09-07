jQuery(function ($) {
  'use strict';

  // --- Single file picker ---
  $(document).on('click', '.batum-file-select', function (e) {
    e.preventDefault();
    var targetSel = $(this).data('target');
    var frame = wp.media({ title: 'Select file', multiple: false });
    frame.on('select', function () {
      var att = frame.state().get('selection').first().toJSON();
      $(targetSel).val(att.id);
      $('.batum-file-preview[data-target="' + targetSel + '"]').html('<a href="' + att.url + '" target="_blank">' + att.filename + '</a>');
      $('.batum-file-clear[data-target="' + targetSel + '"]').show();
    });
    frame.open();
  });

  $(document).on('click', '.batum-file-clear', function (e) {
    e.preventDefault();
    var targetSel = $(this).data('target');
    $(targetSel).val('');
    $('.batum-file-preview[data-target="' + targetSel + '"]').html('');
    $(this).hide();
  });

  // --- Gallery picker ---
  $(document).on('click', '.batum-gallery-select', function (e) {
    e.preventDefault();
    var targetSel = $(this).data('target');
    var frame = wp.media({ title: 'Select images', multiple: true, library: { type: 'image' } });
    frame.on('select', function () {
      var items = frame.state().get('selection').toJSON();
      var ids = items.map(function (i) { return i.id; });
      $(targetSel).val(ids.join(','));
      var preview = $('.batum-gallery-preview[data-target="' + targetSel + '"]');
      preview.empty();
      items.forEach(function (i) {
        var thumb = (i.sizes && i.sizes.thumbnail) ? i.sizes.thumbnail.url : i.url;
        preview.append('<img src="' + thumb + '" style="width:64px;height:64px;object-fit:cover;border-radius:4px;">');
      });
    });
    frame.open();
  });

  // --- Generic repeater (columns come from the table's data-columns attribute) ---
  function rowTemplate(columns) {
    var cells = columns.map(function (key) {
      return '<td><input type="text" class="widefat" data-key="' + key + '"></td>';
    }).join('');
    return '<tr>' + cells + '<td><button type="button" class="button batum-repeater-remove">&times;</button></td></tr>';
  }

  $(document).on('click', '.batum-repeater-add', function (e) {
    e.preventDefault();
    var field = $(this).data('field');
    var table = $('table.batum-repeater[data-field="' + field + '"]');
    var columns = (table.data('columns') || '').toString().split(',').filter(Boolean);
    table.find('.batum-repeater-rows').append(rowTemplate(columns));
  });

  $(document).on('click', '.batum-repeater-remove', function (e) {
    e.preventDefault();
    $(this).closest('tr').remove();
  });

  // Serialize every repeater table on the form into its hidden JSON input right before it submits.
  $(document).on('submit', 'form', function () {
    $(this).find('table.batum-repeater').each(function () {
      var field = $(this).data('field');
      var rows = [];
      $(this).find('tbody tr').each(function () {
        var row = {};
        var hasValue = false;
        $(this).find('input').each(function () {
          var val = $(this).val();
          row[$(this).data('key')] = val;
          if (val) hasValue = true;
        });
        if (hasValue) rows.push(row);
      });
      $('#' + field + '_json').val(JSON.stringify(rows));
    });
  });
});
