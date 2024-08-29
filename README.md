# blob pasteupload (SilverStripe 5 module)

Allows to paste images from clipboard to the built-in TinyMCE editor with subsequent upload to the files library. 
Currently Images are uploaded to the root folder and the filenames are not preserved.

## Installation

Install with composer
```
composer require gurucomkz/silverstripe-blobpasteupload
```

Flush config with `/flush=1` url.

## Conflict resultion

Module uses `TinyMCEConfig::setContentCSS()` to inject some styles into the editor area.
Sadly, there's no `TinyMCEConfig::addContentCSS` function and we have to first get the current CSS list, append to it and then save it.

If you have your own styles injected into the editor, please, in order to preserve this modules injections, do the following:
```php

$myStyle = '...path...'; #this is your stylesheet file URL

$tinymceconfig = TinyMCEConfig::get('cms'); # get instance
$contentCSS = $tinymceconfig->getContentCSS(); # get current list
if(!is_array($contentCSS)) $contentCSS = []; #check for array
$contentCSS[] = $myStyle; #HERE we append your file - repeat for every file
$tinymceconfig->setContentCSS($contentCSS); #save again
```

## TODO

* Configure target folder

