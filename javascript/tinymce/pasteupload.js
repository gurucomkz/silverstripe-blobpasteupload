(function (tinymce) {
    tinymce.PluginManager.add('pasteupload', function (editor, url, $) {

        var fetchBlob = function(url){
            return new Promise(function(resolve,reject){
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = 'blob';
                xhr.onload = function(e) {
                    if (this.status == 200) {
                        resolve(this.response);
                    }
                };
                xhr.send();
            });
        }
        editor.on('PastePreProcess', function(a,b,c) {
            console.log('PastePreProcess',a,b,c)
            if(!a || !a.content) return;

            var match = a.content.match(/<img.*src="(blob:[^"]+)".*>/);
            if(!match) return;
            var myid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            var bloburl = match[1];
            a.content = a.content.replace('src=','id="'+myid+'" class="blink_me" src=');
            fetchBlob(bloburl).then(function(blobdata){
                var ftype = blobdata.type.split('/')[1];
                var data = new FormData();
                data.append('SecurityID', jQuery('[name="SecurityID"]').val());
                data.append('ParentID', 0);
                data.append('Upload', blobdata, "pastefile."+ftype);

                var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
                xhr.open( 'post', '/admin/assets/api/createFile', true);
                xhr.send(data);
                xhr.onload = function(e) {
                    if (this.status == 200) {
                        try{
                            var rsp = JSON.parse(this.response),
                                rspfile = rsp[0],
                                el = editor.dom.get(myid);
                            el.removeAttribute('id');
                            el.setAttribute('src',rspfile.url);
                            el.setAttribute('width',rspfile.width);
                            el.setAttribute('height',rspfile.height);
                            el.setAttribute('data-id',rspfile.id);
                            el.setAttribute('class',"leftAlone ss-htmleditorfield-file image");
                        }catch(e){

                        }
                    }
                };
            });
        });
        editor.on('PastePostProcess', function(a,b,c) {
            console.log('PastePostProcess',a,b,c)
        });
    });
})(tinymce);
