<?php
$shortcodes = [];

foreach (glob(TEMPLATEPATH . '/template-parts/shortcode/*.php') as $file) {
    $headers = get_file_data($file, ["Label" => "Template Label"]);
    $filename = pathinfo($file, \PATHINFO_FILENAME);
	$shortcodes[$filename] = [
        "label" => $headers["Label"],
        "fields" => [],
        "template" => '[tps name="' . $filename . '"]'
    ];
}

if ($shortcodes) {
    add_shortcode('tps', function($atts){
        $atts = shortcode_atts([
            "name" => ""
        ], $atts);
        if(!empty($atts["name"])) {
        	ob_start();
            get_template_part("template-parts/shortcode/".$atts["name"]);
        	$template = ob_get_contents();
        	ob_end_clean();

        	return $template;
        }
    });
}

return $shortcodes;