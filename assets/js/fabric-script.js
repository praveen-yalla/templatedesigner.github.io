$(document).ready(function() {
    //localStorage.clear();
    var template;
    var saved;

    $("#text-styles").draggable({
        containment: "body",
        handle: ".text-style-handler"
    });

    $("#image-styles").draggable({
        containment: "body",
        handle: ".text-style-handler"
    });

    var colrs = ["red", "blue", "black"];

    for (var i = 0; i < colrs.length; i++) {
        $(".colors ul").append($("<li>").attr("title", colrs[i]));
    }


    var templates = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10", "t11", "t12", "t13", "t14", "t15", "t16", "t17", "t18", "t19", "t20", "t21"];

    for (var i = 0; i < templates.length; i++) {
        $(".default-templates ul").append($("<li>").append($("<img>").attr("alt", templates[i]).attr("src", "assets/images/backgrounds/" + templates[i] + ".png")));
    }


    var cliparts = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "f13", "f14", "f15", "f16", "f17", "f18", "f19", "f20", "f21", "f22", "f23", "f24", "f25", "f26", "f27", "f28", "f29", "f30", "f31", "f32", "f33", "f34", "f35"];

    for (var i = 0; i < cliparts.length; i++) {
        $(".cliparts .sub-actions ul").append($("<li>").append($("<img>").attr("alt", cliparts[i]).attr("src", "assets/images/floral/" + cliparts[i] + ".png")));
    }

    $(".colors ul li").each(function(ele) {
        $(this).css({
            "backgroundColor": $(this).attr("title")
        })
    });

    var width = $('.canvas-block').width();
    var height = $('.canvas-block').height();

    var ctx = new fabric.Canvas('canvasid');
    ctx.backgroundColor = '#fff';
    ctx.setWidth(width);
    ctx.setHeight(height);
    ctx.renderAll();


    $("#template-bg-color").on("change", function() {
        ctx.backgroundImage = false;
        ctx.backgroundColor = this.value;
        ctx.renderAll();
    });

    ctx.on('object:added', function() {
        saved = false;
    });
    ctx.on('object:modified', function() {
        saved = false;
    });

    ctx.on('object:selected', function(obj) {
        if (obj.target.get('type') === "i-text") {
            $("#text-styles").css({
                "display": "block"
            });

            $("#font-family").val(getActiveProp("fontFamily"));
            $("#font-size").val(getActiveProp("fontSize"));
            $("#text-align").val(getActiveProp("textAlign"));
            $("#stroke-width").val(getActiveProp("strokeWidth"));
            $("#line-height").val(getActiveProp("lineHeight"));
            $("#opacity").val(getActiveProp("opacity") * 100);
            $("#font-color").val(getActiveStyle("fill"));
            $("#text-bg-color").val(getActiveStyle("textBackgroundColor"));
            $("#stroke-color").val(getActiveStyle("stroke"));


        } else {
            $("#text-styles").css({
                "display": "none"
            });
        }

        if (obj.target.get('type') === "image") {
            $("#image-styles").css({
                "display": "block"
            });

            $(".img-opacity").val(getActiveStyle("opacity") * 100);


        } else {
            $("#image-styles").css({
                "display": "none"
            });
        }


    });




    var tmp = [];
    var lastli;


    $(".create-btn").on("click", function() {

        if (!localStorage.getItem("templatesdata")) {
            localStorage.setItem("templatesdata", "[]");
        }

        var tmpval = $(".create-template").val();


        if (tmpval != "") {

            var getStorage = JSON.parse(localStorage.getItem("templatesdata"));

            var arr = jQuery.map(getStorage, function(a) {
                if (a.templatename == tmpval) {
                    return "exists";
                }
            });

            if (arr != "exists") {

                lastli = $("<li>").append($("<span>").addClass("prj-img").append($("<i>").addClass("fa fa-file-image-o"))).append($("<span>").addClass("prj-title").text(tmpval));

                $(".saved-projs ul, .saved ul").append(lastli);



                getStorage.push({
                    "templatename": tmpval,
                    "data": []
                });

                template = tmpval;

                var setStorage = localStorage.setItem("templatesdata", JSON.stringify(getStorage));

                $(".welcome-box").css({
                    "display": "none"
                });

            } else {
                alert("Template Name Exits");
            }


        } else {
            alert("Please Enter Template Name")
        }

    });

    $(lastli).on("click", function() {

        template = $(this).find(".prj-title").text();

        alert(template);

        var getlatestdata = JSON.parse(localStorage.getItem("templatesdata"));

        var getarr = jQuery.map(getlatestdata, function(res) {
            if (res["templatename"] == template) {
                return res;
            }
        });

        var cdata = JSON.stringify(getarr[0]["data"]);
        ctx.loadFromJSON(cdata, ctx.renderAll.bind(ctx));


    });

    var gettempdata = JSON.parse(localStorage.getItem("templatesdata"));

    if (gettempdata != null) {

        for (var i = 0; i < gettempdata.length; i++) {

            var listli = $("<li>").append($("<span>").addClass("prj-img").append($("<i>").addClass("fa fa-file-image-o"))).append($("<span>").addClass("prj-title").text(gettempdata[i]["templatename"]));

            $(".saved-projs ul, .saved ul").append(listli);


            $(listli).on("click", function() {
                template = $(this).find(".prj-title").text();


                var getarr = jQuery.map(gettempdata, function(res) {
                    if (res["templatename"] == template) {
                        return res;
                    }
                });

                var cdata = JSON.stringify(getarr[0]["data"]);
                ctx.loadFromJSON(cdata, ctx.renderAll.bind(ctx));



                $(".welcome-box").css({
                    "display": "none"
                });

            });


        }



    }

    $(".saved ul li").on("click", function() {
        template = $(this).find(".prj-title").text();

        var getlatestdata = JSON.parse(localStorage.getItem("templatesdata"));


        var getarr = jQuery.map(getlatestdata, function(res) {
            if (res["templatename"] == template) {
                return res;
            }
        });

        var cdata = JSON.stringify(getarr[0]["data"]);
        ctx.loadFromJSON(cdata, ctx.renderAll.bind(ctx));


    });



    $('.textstyle-close').on("click", function() {
        $("#text-styles").css({
            "display": "none"
        });
    });
    $('.imgstyle-close').on("click", function() {
        $("#image-styles").css({
            "display": "none"
        });
    });
    ctx.on('before:selection:cleared', function(obj) {
        if (obj.target.get('type') === "i-text") {
            $("#text-styles").css({
                "display": "none"
            });
        }
        if (obj.target.get('type') === "image") {
            $("#image-styles").css({
                "display": "none"
            });
        }
    });




    $(".add-text").on("click", function() {
        var coords = getRandomLeftTop();
        var text = new fabric.IText("Text", {
            left: coords.left,
            top: coords.top
        });
        ctx.add(text);
    });


    /* Text Sytles */
    function setActiveProp(name, value) {
        var object = ctx.getActiveObject();
        if (!object) return;

        object.set(name, value).setCoords();
        ctx.renderAll();
    }

    function getActiveStyle(styleName, object) {
        object = object || ctx.getActiveObject();
        if (!object) return '';

        return (object.getSelectionStyles && object.isEditing) ? (object.getSelectionStyles()[styleName] || '') : (object[styleName] || '');
    };

    function getActiveProp(name) {
        var obj = obj || ctx.getActiveObject();

        if (!obj) return "";

        return obj[name] || ""

    }

    function setActiveStyle(styleName, value, object) {
        object = object || ctx.getActiveObject();
        if (!object) return;

        if (object.setSelectionStyles && object.isEditing) {
            var style = {};
            style[styleName] = value;
            object.setSelectionStyles(style);
            object.setCoords();
        } else {
            object[styleName] = value;
        }

        object.setCoords();
        ctx.renderAll();
    };


    $("#font-family").on("change", function() {
        setActiveProp("fontFamily", this.value.toLowerCase());
    });

    $("#font-size").on("change", function() {
        setActiveStyle('fontSize', this.value);
    });

    $("#text-align").on("change", function() {
        setActiveStyle('textAlign', this.value);
    });


    $("#font-color").on("change", function() {
        setActiveStyle('fill', this.value);
    });

    $("#text-bg-color").on("change", function() {
        setActiveStyle('textBackgroundColor', this.value);
    });

    $("#stroke-color").on("change", function() {
        setActiveStyle('stroke', this.value);
    });

    $("#stroke-width").on("change", function() {
        setActiveStyle('strokeWidth', this.value);
    });

    $("#line-height").on("change", function() {
        setActiveStyle('lineHeight', this.value);
    });
    $("#opacity").on("change", function() {
        setActiveStyle('opacity', parseInt(this.value, 10) / 100);
    });
    $("#bold").on("click", function() {

        setActiveStyle('fontWeight', getActiveStyle('fontWeight') === 'bold' ? '' : 'bold');
    });

    $("#italic").on("click", function() {
        setActiveStyle('fontStyle', getActiveStyle('fontStyle') === 'italic' ? '' : 'italic');
    });

    $("#underline").on("click", function() {
        setActiveStyle('textDecoration', getActiveStyle('textDecoration') === 'underline' ? '' : 'underline');
    });

    $("#overline").on("click", function() {
        setActiveStyle('textDecoration', getActiveStyle('textDecoration') === 'overline' ? '' : 'overline');
    });



    function download(url, name) {
        $('<a>').attr({ href: url, download: name })[0].click();
    }

    function downloadFabric(canvas, name) {
        download(canvas.toDataURL(), name + '.png');
    }



    $(".download").on("click", function() {
        downloadFabric(ctx, 'file1');
    });

    $(".templates .sub-actions li img").on("click", function() {

        fabric.Image.fromURL('assets/images/backgrounds/' + this.alt + '.png', function(objimage) {

            ctx.setBackgroundImage(objimage, ctx.renderAll.bind(ctx), {
                width: ctx.width,
                height: ctx.height,
                backgroundImageStretch: false
            });
            ctx.renderAll();
        });

    });

    $(".colors ul li").on("click", function() {
        ctx.backgroundImage = false;
        ctx.backgroundColor = this.title;
        ctx.renderAll();
    });

    $(".cliparts .sub-actions li img").on("click", function() {

        fabric.Image.fromURL('assets/images/floral/' + this.alt + '.png', function(objimage) {
            var coords = getRandomLeftTop();

            ctx.add(objimage);

            ctx.renderAll();

        });

    });


    $("#template-upload").change(function() {
        if (this.files && this.files[0]) {

            var reader = new FileReader();

            reader.onload = function(e) {
                var imgtag = $("<li>").append($("<img>").attr("src", e.target.result));
                $(".uploads ul").append(imgtag);

                /*ctx.setBackgroundImage(e.target.result, ctx.renderAll.bind(ctx), {
                    width: ctx.width,
                    height: ctx.height
                });
                ctx.renderAll();*/
            }
            reader.readAsDataURL(this.files[0]);
        }
    });


    $("#upload-cliparts").change(function() {
        if (this.files && this.files[0]) {

            var reader = new FileReader();

            reader.onload = function(e) {
                var imgtag = $("<li>").append($("<img>").attr("src", e.target.result));
                $(".upload-cliparts ul").append(imgtag);

            }
            reader.readAsDataURL(this.files[0]);
        }


    });




    $(".image").on("click", function() {
        $(".addimg").click();

        document.getElementById('addimg').onchange = function handleImage(e) {
            var reader = new FileReader();
            reader.onload = function(event) {
                console.log('fdsf');
                var imgObj = new Image();
                imgObj.src = event.target.result;
                imgObj.onload = function() {
                    var coords = getRandomLeftTop();
                    var image = new fabric.Image(imgObj);
                    image.set({
                        left: 590,
                        top: 150,
                        scaleX: 0.2,
                        scaleY: 0.2

                    });
                    ctx.add(image);
                }

            }
            reader.readAsDataURL(e.target.files[0]);
        }
    });


    $('.frnt').on("click", function() {
        var obj = ctx.getActiveObject();
        if (obj) {
            ctx.bringToFront(obj);
        }
    });

    $('.frwd').on("click", function() {
        var obj = ctx.getActiveObject();
        if (obj) {
            ctx.bringForward(obj);
        }
    });

    $('.back').on("click", function() {
        var obj = ctx.getActiveObject();
        if (obj) {
            ctx.sendToBack(obj);
        }
    });

    $('.bkrd').on("click", function() {
        var obj = ctx.getActiveObject();
        if (obj) {
            ctx.sendBackwards(obj);
        }
    });


    $('.img-opacity').on("change", function() {
        setActiveStyle('opacity', parseInt(this.value, 10) / 100);

    });

    $(".preview").on("click", function() {

        window.open(ctx.toDataURL('png'));
    });


    $(".contrl-redo").on("click", function() {
        $(".saved-projs,.contrl-redo,.create-div").css({
            "display": "none"
        });
        $(".controls").css({
            "display": "block"
        });

    });

    $(".create").on("click", function() {

        $(".create-div,.contrl-redo").css({
            "display": "block"
        });
        $(".saved-projs,.controls").css({
            "display": "none"
        });
    });
    $(".recentprj").on("click", function() {
        $(".create-div,.controls").css({
            "display": "none"
        });
        $(".saved-projs,.contrl-redo").css({
            "display": "block"
        });
    });





    $(".save").on("click", function() {


        var jsondata = ctx.toJSON();

        var getdata = JSON.parse(localStorage.getItem("templatesdata"));

        var dataarr = jQuery.map(getdata, function(data) {
            if (data["templatename"] == template) {
                return data;
            }
        });


        dataarr[0]["data"] = jsondata;
        localStorage.setItem("templatesdata", JSON.stringify(getdata));
        saved = true;
        if (saved == true) {
            alert("Template saved");
        }
        //alert(dataarr[0]["template"] + " saved");

    });






    $('html').keyup(function(e) {
        if (e.keyCode == 46) {
            var obj = ctx.getActiveObject();
            obj.remove();
        }
    });



})









































var img01URL = 'https://www.google.com/images/srpr/logo4w.png';
var img02URL = 'http://fabricjs.com/lib/pug.jpg';

var canvas = new fabric.Canvas('c');

// Note the use of the `originX` and `originY` properties, which we set
// to 'left' and 'top', respectively. This makes the math in the `clipTo`
// functions a little bit more straight-forward.
var clipRect1 = new fabric.Rect({
    originX: 'left',
    originY: 'top',
    left: 180,
    top: 10,
    width: 200,
    height: 200,
    fill: '#DDD',
    /* use transparent for no fill */
    strokeWidth: 0,
    selectable: false
});
// We give these `Rect` objects a name property so the `clipTo` functions can
// find the one by which they want to be clipped.
clipRect1.set({
    clipFor: 'pug'
});
canvas.add(clipRect1);

var clipRect2 = new fabric.Rect({
    originX: 'left',
    originY: 'top',
    left: 10,
    top: 10,
    width: 150,
    height: 150,
    fill: '#DDD',
    /* use transparent for no fill */
    strokeWidth: 0,
    selectable: false
});
// We give these `Rect` objects a name property so the `clipTo` functions can
// find the one by which they want to be clipped.
clipRect2.set({
    clipFor: 'logo'
});
canvas.add(clipRect2);

function findByClipName(name) {
    return _(canvas.getObjects()).where({
        clipFor: name
    }).first()
}

// Since the `angle` property of the Image object is stored 
// in degrees, we'll use this to convert it to radians.
function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

var clipByName = function(ctx) {
    this.setCoords();
    var clipRect = findByClipName(this.clipName);
    var scaleXTo1 = (1 / this.scaleX);
    var scaleYTo1 = (1 / this.scaleY);
    ctx.save();

    var ctxLeft = -(this.width / 2) + clipRect.strokeWidth;
    var ctxTop = -(this.height / 2) + clipRect.strokeWidth;
    var ctxWidth = clipRect.width - clipRect.strokeWidth;
    var ctxHeight = clipRect.height - clipRect.strokeWidth;

    ctx.translate(ctxLeft, ctxTop);

    ctx.rotate(degToRad(this.angle * -1));
    ctx.scale(scaleXTo1, scaleYTo1);
    ctx.beginPath();
    ctx.rect(
        clipRect.left - this.oCoords.tl.x,
        clipRect.top - this.oCoords.tl.y,
        clipRect.width,
        clipRect.height
    );
    ctx.closePath();
    ctx.restore();
}

var pugImg = new Image();
pugImg.onload = function(img) {
    var pug = new fabric.Image(pugImg, {
        angle: 45,
        width: 500,
        height: 500,
        left: 230,
        top: 50,
        scaleX: 0.3,
        scaleY: 0.3,
        clipName: 'pug',
        clipTo: function(ctx) {
            return _.bind(clipByName, pug)(ctx)
        }
    });
    canvas.add(pug);
};
pugImg.src = img02URL;

var logoImg = new Image();
logoImg.onload = function(img) {
    var logo = new fabric.Image(logoImg, {
        angle: 0,
        width: 550,
        height: 190,
        left: 50,
        top: 50,
        scaleX: 0.25,
        scaleY: 0.25,
        clipName: 'logo',
        clipTo: function(ctx) {
            return _.bind(clipByName, logo)(ctx)
        }
    });
    canvas.add(logo);
};
logoImg.src = img01URL;
