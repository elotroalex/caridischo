
// Methods and jQuery UI for Wax search box
function excerptedString(str) {
  str = str || ''; // handle null > string
  if (str.length < 120) {
    return str;
  }
  else {
    return `${str.substring(0, 120)} ...`;
  }
}

function getThumbnail(item, url) {
  if ('thumbnail' in item) {
    return `<img class='sq-thumb-sm' src='${url}/${item.thumbnail}'/>&nbsp;&nbsp;&nbsp;`
  }
  else {
    return '';
  }
}

function displayResult(item, fields, url, lang, blurb) {
  var pid   = item.pid;
  var label = item.label || 'Untitled';
  var link  = item.permalink;
  var thumb = getThumbnail(item, url);
  var meta  = excerptedString(eval("item." + blurb));

  return `<div class="result"><a href="${url}${lang}${link}/">${thumb}<p><span class="title">${label}</span><br><span class="meta">${meta}</span></p></a></div>`;
}

function startSearchUI(fields, indexFile, url, lang, the_word_results, blurb) {
  $.getJSON(indexFile, function(store) {
    var index  = new elasticlunr.Index;

    index.saveDocument(false);
    index.setRef('lunr_id');

    for (i in fields) { index.addField(fields[i]); }
    for (i in store)  { index.addDoc(store[i]); }

    $('input#search').on('keyup', function() {
      var results_div = $('#results');
      var query       = $(this).val();
      var results     = index.search(query, { boolean: 'AND', expand: true });

      results_div.empty();
      results_div.append(`<p class="results-info">${results.length} ${the_word_results}</p>`);

      for (var r in results) {
        var ref    = results[r].ref;
        var item   = store[ref];
        var result = displayResult(item, fields, url, lang, blurb);

        results_div.append(result);
      }
    });
  });
}
