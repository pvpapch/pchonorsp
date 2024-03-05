/*******************************************
 * File: jquery-glossary.js
 * Author: Kevin
 * Date: Mon, Apr 25, 2011
 *
 * Description: Does pop-up glossary for
 *  books
 *******************************************/

 function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

$(document).ready(function() {

	var ptitle = getQueryVariable('title')
	var plang = getQueryVariable('lang')


	//set multilanguage titles
	//es_titles is titles in Spanish that should show alternate language English lessons
	var es_titles = ["cc1s","cc2s","cc3s","ccas","ccgs","cca2s","int1s","int2s","int3s"];

	//en_titles is titles in English that should show alternate language Spanish lessons
	var en_titles = ["cc1","cc2","cc3","cca","ccg","cca2","cc4","int2","int3","cc1mn","cc2mn","cc3mn"];
	var en_title = en_titles.includes(ptitle);
	var es_title = es_titles.includes(ptitle);


	if (en_title && (plang=="es")){
			if (ptitle == "cc4") {
				ptitle = "int1s";
			}
			else {
			ptitle = ptitle + "s";
			}
		}
		else if (es_title && (plang=="en")){
			if (ptitle == "int1s") {
				ptitle = "cc4";
			}
			else {
			ptitle = ptitle.slice(0,(ptitle.length-1))
			}
		}




	var glossaryUrl = '/bookdb/GlossaryLookup.php?title=' + ptitle;

	//alert(glossaryUrl);
	$.ajax({
		type: 'GET',
		url: glossaryUrl,
		dataType: 'xml',
		cache: 'false',
		success: glossaryXmlParser,
		error: function(a,b,c) {
      console.log(a,b,c)
			alert(b);
		}
	});

	// $('#contents').append('<div id="glosspop" title="Glossary"></div>');
  $('#contents').append(`<div id="gloss" class="modal" tabindex="-1" role="dialog">
  <div id="gloss-dialog" class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header gloss-modal-header">
        <h5 id="gloss-title" class="modal-title gloss-modal-title">Modal title</h5>
        <button id="gloss-close-btn" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" class="gloss-modal-title">&times;</span>
        </button>
      </div>
      <div id="gloss-body" class="modal-body"></div>
    </div>
  </div>
</div>`);
  $('#gloss').on('click', () => {
    // $('#gloss-body').empty();
    $('#gloss').toggle();
  })
  $('#gloss-close-btn').on('click', () => {
    // $('#gloss-body').empty();
    $('#gloss').toggle();
  })
  $('#gloss-dialog').on('click', (eve) => {
    // $('#gloss-body').empty();
    eve.stopPropagation();
  })
});

function addClickHandlersToNestedGlossaryItems(xml){
  $('#gloss-body span').each(function(ele) {
    let glossaryId = $(this).attr('data-glossary-item-id')
    $(this).on('click', () => {
      let title, text;
      let matchingId = $(xml).find(`definition > id:contains('${glossaryId}')`)
      if(matchingId){
        let matchingDef = matchingId.parent();
        let glossText = matchingDef.find('text').text();
        let glossName = matchingDef.find('name').text().trim();
        $('#gloss-title').text(glossName)
        $('#gloss-body').html(glossText)
        MathJax.Hub.Queue(["Typeset",MathJax.Hub], document.getElementById('gloss'));
        addClickHandlersToNestedGlossaryItems(xml)
      }
    })
  })
}

function glossaryXmlParser(xml) {
  // $('span').each(function(ele) {
  //   const glossaryId = $(this).attr('data-glossary-item-id');
  //   const spanText = $(this).html().toLowerCase();
  //
  //   let match = $(xml).find(`definition > id:contains('${glossaryId}')`).filter(function() { return $(this).children().length === 0;})
  //               .parent();
  //
  //   if(!match){
  //     match = $(xml).find(`definition > name:contains('${spanText}')`).filter(function() { return $(this).children().length === 0;})
  //               .parent();
  //   }
  //   if(!match && $(this).html().toLowerCase()[$(this).html().toLowerCase().length - 1] === 's'){
  //     match = $(xml).find(`definition > name:contains('${spanText.slice(spanText.length -1)}')`).filter(function() { return $(this).children().length === 0;})
  //
  //   }
  //
  //   if(match){
  //     console.log('Match found', spanText)
  //     let matchingDef = match.parent();
  //     $(this).on('click', function() {
  //       let glossText = matchingDef.find('text').text();
  //       let glossName = matchingDef.find('name').text().trim();
  //       $('#gloss-title').text(glossName)
  //       $('#gloss-body').html(glossText)
  //       addClickHandlersToNestedGlossaryItems(xml)
  //     });
  //   }
  // });

  const strongAndBolds = $('strong,b');
  const spans = [];
  const jSpans = $('span.glossary-link').each(function(s){
    const html = $(this).html().toLowerCase();
    const glossaryId = $(this).attr('data-glossary-item-id')
    spans.push({
      ele: $(this),
      html,
      glossaryId
    });
  })


	$(xml).find('definition').each(function() {
		var defname = $(this).find('name').text().trim();
		var deftext = $(this).find('text').text();
		var defid = $(this).find('id').text();
		strongAndBolds.each(function(ele) {
			if( ($(this).html().toLowerCase() == defname.toLowerCase()) || ($(this).html().toLowerCase() == (defname.toLowerCase()+'s')) )
			{
				$(this).css('color', 'blue');
        $(this).click(function() {

          $('#gloss-title').text(defname)
          $('#gloss-body').html(deftext)
          $('#gloss').toggle();

          MathJax.Hub.Queue(["Typeset",MathJax.Hub], document.getElementById('gloss'));
          addClickHandlersToNestedGlossaryItems(xml)
        });
				$(this).hover(
					function() {
						$(this).css('cursor', 'pointer');
					},
					function() {
						$(this).css('cursor', 'auto');
					}
				);
			}
		});

    for (var i = 0; i < spans.length; i++){
      const span = spans[i];
      if( (span.glossaryId == defid || span.html == defname.toLowerCase()) || (span.html == (defname.toLowerCase()+'s')) )
      {
        $(span.ele).unbind('click');
        $(span.ele).on('click', function() {
          $('#gloss-title').text(defname)
          $('#gloss-body').html(deftext)
          $('#gloss').toggle();
          MathJax.Hub.Queue(["Typeset",MathJax.Hub], document.getElementById('gloss'));
          addClickHandlersToNestedGlossaryItems(xml)
        });
      }
    }
	});
}
