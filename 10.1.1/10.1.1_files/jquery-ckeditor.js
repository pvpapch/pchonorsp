function createEditor(perms)
{
	if ( $('body').data('editor') != null )
		return;	

	var html = $('#contents').html();
	
	var mHeight = ($(window).height() - 300);
	
	var config = {
		customConfig: '/js/custom-config.js',
		fullPage: false,
		height: mHeight,
		resize_enabled: true
	};
	
	//$('#editor').html(html);
	if ( perms == 1 ) {
	$('body').data('editor', CKEDITOR.replace( 'editor',{
		toolbar :
	[
	{ name: 'document', items : [ 'Save' ] },
	{ name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
	{ name: 'editing', items : [ 'SelectAll','-','SpellChecker', 'Scayt' ] },
	
	'/',
	{ name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
	{ name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent',
	'-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
	{ name: 'links', items : [ 'Link','Unlink','Anchor' ] },
	{ name: 'insert', items : [ 'Table','HorizontalRule','Smiley','SpecialChar' ] },
	'/',
	{ name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
	{ name: 'colors', items : [ 'TextColor','BGColor' ] },
	{ name: 'tools', items : [ 'Maximize' ] }
]
	}));
	}
	else {
	$('body').data('editor', CKEDITOR.replace( 'editor', config ));
	}
	$('#contents').hide();	

	var editor = CKEDITOR.instances.editor;
	editor.setData(html);
	editor.config.protectedSource.push( /<math[\s\S]*?<\/math>/g );
	
}

function handleCKEditorPost() {
	var editor = CKEDITOR.instances.editor;
	if(editor.checkDirty()) {
		// Editor content differs from loaded content
		var editor_data = CKEDITOR.instances.editor.getData();
		
		var pname = window.location.search.substring( window.location.search.indexOf('name=')+5, window.location.search.indexOf('&',window.location.search.indexOf('name=')) );
		var ptitle = window.location.search.substring( window.location.search.indexOf('title=')+6, window.location.search.indexOf('&',window.location.search.indexOf('title=')) );
		var ptype = window.location.search.substring( window.location.search.indexOf('type=')+5, window.location.search.length);
		//alert(window.location.search.indexOf('name='));
		if ((window.location.search.indexOf('name=') == -1) || (window.location.search.indexOf('type=') == -1 )) { 
		
			ptype = 'lesson';
			pname = 'title';
			
		}
		//alert("1_"+pname+"2_" + ptitle+"3_" + ptype);
		var postData = {
			name: pname,
			title: ptitle,
			type: ptype,
			user: $('#userid').val(),
			content: editor_data
		};	
		
		$.ajax({
			async: false,
			type: 'POST',
			url: '/bookdb/ajaxpost.php',
			data: postData,
			error: function(msg) {
				alert('Error1: ' + msg);
			},
			success: function(msg) {
			//	alert(msg)
				if(msg == 'Save Successful!') {
					location.reload();
				} else {
					alert('Error Occured During Save_3: \n' + msg);					
				}
			}
		});
	}
}



function removeEditor() {
	var r=confirm("Save the content?");
	if(r==true) {
		handleCKEditorPost();
	}
	location.reload();
}

$(document).ready(function() {
	
	$('#launchEditor').hover(
		function() {
			$(this).css('cursor', 'pointer');
		},
		function() {
			$(this).css('cursor', 'auto');
		}
	);
	
	$('#launchEditor').click(function() {
		if ( $('body').data('editor') == null ) {
		if ( document.getElementById("perms").value == 1 ) {
				createEditor(1);
			}
			else {
				createEditor(2);
			}
			
			$(this).html('Exit Edit Mode');
		}
		else {
			removeEditor();
			$(this).html('Edit');
		}
	});
});	
