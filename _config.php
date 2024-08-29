<?php

use SilverStripe\Core\Manifest\ModuleLoader;
use SilverStripe\Forms\HTMLEditor\TinyMCEConfig;

$loader = ModuleLoader::getModule('gurucomkz/silverstripe-blobpasteupload');
$tinymceconfig = TinyMCEConfig::get('cms');

$tinymceconfig->enablePlugins(['pasteupload' => $loader->getResource('javascript/tinymce/pasteupload.js')]);
$tinymceconfig->setOption('paste_data_images', true);
$contentCSS = $tinymceconfig->getContentCSS();
if (!is_array($contentCSS)) {
    $contentCSS = [];
}
$contentCSS[] = $loader->getResource('css/styles.css');
$tinymceconfig->setContentCSS($contentCSS);
