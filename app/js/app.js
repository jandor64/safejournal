var data = {

}

display_data(data);

function display_data(data) {
    //Start template with data list
    if(typeof data.post != "undefined" && data.post.length > 0) {
	    var htm = Defiant.render('post_template', data);
	    $("#fileDisplayArea").html(htm);
	}

    //Display a single entry
    $("body").on(
        'click',
        '.post_list a',
        function() {
            var post = JSON.search(data, '//*[id="'+ $(this).attr('href')+ '"]');
            var htm = Defiant.render('single_template', post);
            $("#fileDisplayArea").html(htm);
            return false;
        }
    )

    //Got to edit or new entry screen for a single entry
    $("body").on(
        'click',
        '.edit, .new',
        function() {
            var post = JSON.search(data, '//*[id="'+ $(this).attr('href')+ '"]');
            var htm = Defiant.render('edit_template', post);
            $("#fileDisplayArea").html(htm);
            $.trumbowyg.svgPath = false;
			$('textarea[name=entry]').trumbowyg({
			    btns: ['strong', '|', 'base64'],
			    autogrow: true
			});
            return false;
        }
    )

    //Submit a single entry form
    $("body").on(
        'submit',
        '.edit_single',
        function() {
            var form = $('.edit_single').serializeObject();

            //If updating, an id will be present
            if(form.id.length > 0) {
                for (var i=0; i<data.post.length; i++) {
                  if (data.post[i].id == form.id) {
                    data.post[i].title = form.title;
                    data.post[i].entry = form.entry;
                    data.post[i].updated = moment().format('YYYY-MM-DD HH:mm');
                    break;
                  }
                }
            } else {
            	//Insert a new entry
            	if(typeof data.post == "undefined") {
            		//This is the very first entry, pre-populate object
            		data = {
            			"post": []
            		}
            	}
            	//Push new entry
                data.post.push({
                    "id": max_id(data)+1,
                    "title": form.title,
                    "entry": form.entry,
                    "created": moment().format('YYYY-MM-DD HH:mm'),
                    "updated": moment().format('YYYY-MM-DD HH:mm'),
                });
            }
            go_home();
            return false;
        }
    )

    //Display home list
    function go_home() {
    	htm = Defiant.render('post_template', data);
        $("#fileDisplayArea").html(htm);
    }

    $("body").on(
        'click',
        'a[href=home]',
        function() {
        	go_home();
            return false;
        }
    );

    //Save data
    $("body").on(
        'click',
        '.save_all',
        function() {
            var password = prompt("Please enter your password");
            var encrypted = encrypt(password, data);
            var journal_export = new Blob([encrypted], {type: "text/plain;charset=utf-8"});
            saveAs(journal_export, "storage.txt");
        }
    )
}

function max_id(data) {
    var max = 0;
    for (var i = 0; i < data.post.length; i++) {
        if(parseInt(data.post[i].id) > max) {
            max = parseInt(data.post[i].id);
        }
    }
    return max;
}

function encrypt(password, data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), password, {format: CryptoJSAesJson}).toString();
}

function decrypt(password, data){
    var dec = CryptoJS.AES.decrypt(data, password, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8);
    return JSON.parse(CryptoJS.AES.decrypt(data, password, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8))
}

//Read file
window.onload = function() {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var textType = /text.*/;

        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                var password = prompt("Please enter your password");
                var decrypted = decrypt(password, reader.result);
                display_data(decrypted);
            }

            reader.readAsText(file);
        } else {
            fileDisplayArea.innerText = "File not supported!"
        }
    });
}
