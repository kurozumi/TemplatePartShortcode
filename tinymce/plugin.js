/**
 * Routines to add a menu button in WP 3.9 Editor
 */
tinymce.PluginManager.add('btnTemplatePartShortcodeMenu', function( editor, url ) {

	'use strict';

	/**
	 * Create and return a TinyMCE menu item
	 */
	function add_item( shortcode ) {
		var item = {
			'text' : shortcode.label,
			'body' : {
				type: shortcode.id
			},
			onclick : function(){
				if( jQuery.isEmptyObject( shortcode.fields ) ) {
					// this shortcode has no options to configure
					var values = {};
					values.selectedContent = editor.selection.getContent();
					var template = wp.template( 'template-part-shortcode-' + shortcode.id );
					editor.insertContent( template( values ) );
				}
			}
		};

		return item;
	}

	var items = [];
	jQuery.each( templatePartShortcodeEditor.shortcodes, function( key, shortcode ){
		shortcode.id = key;

		if( typeof shortcode.menu == 'object' ) {
			var menu = []; // list of submenus
			jQuery.each( shortcode.menu, function( sub_key, sub_item ){
				sub_item.id = sub_key;
				menu.push( add_item( sub_item ) );
			});
			items.push( {
				'text' : shortcode.label,
				'menu' : menu
			} );
		} else {
			items.push( add_item( shortcode ) );
		}
	} );

	editor.addButton( 'btnTemplatePartShortcodeMenu', {
		type: 'menubutton',
		text: 'テンプレートコード',
		tooltip: templatePartShortcodeEditor.editor.menuTooltip,
		menu: items
	} );

});