//setup takes a project name and a template. It creates/appends a DOM skeleton to hold the data related to the project, then loads the data.
function setup(pname, tem) {
    var skel = $.tmpl(tem, {
        "Name": pname
    });
    $('#projects').append(skel);
    $('#' + pname + '-tabs').tabs();
    $('#' + pname + '-tabs-overview').load('./data/' + pname + '.html #overview');
    $('#' + pname + '-tabs-planning').load('./data/' + pname + '.html #planning');
    $('#' + pname + '-tabs-development').load('./data/' + pname + '.html #development');
    $('#' + pname + '-tabs-results').load('./data/' + pname + '.html #results');

}

function setview() {
    loc = window.location.hash.slice(1);
    var components = loc.split('-');
    var pname = components[0];
    if(components.length > 1) {
        $('#' + pname + '-tabs').tabs('select', components[0]+'-tabs-' + components[1]);
    }
    else {
        $('#' + pname + '-tabs').tabs('select', components[0]+'-tabs-overview');
    }
    $("#projects").trigger("slideTo", $("#" + pname+'-project'));
}

function setHash(loc) {
    window.location.hash = loc;
}

function makeProjectCarousel(projects) {
    //Create a carousel of the projects - this creates the navigation and the animations for the items.
    $("#projects").carouFredSel({
        direction: "up",
        items: 1,
        auto: {
            play: false
        },
        next: {
            button: "#down",
            key: "right"
        },
        prev: {
            button: "#up",
            key: "left"
        },
        pagination: {
            anchorBuilder: function() {
                project = projects.pop();
                return '<li id="' + project + '"><a href="#' + project + '" class="caroufredsel" onclick="setHash('+"'"+ project + "'"+')"><img src="images/' + project + '_thumb.png" alt="' + project + '_thumb"><br><span>' + project + '</span></a></li>';
            },
            container: "#navButtons"
        }
    });

    var pname = window.location.hash.slice(1);
    //This is logic to load the appropriate page. TODO
    if (pname.length > 0) {
        setview();
    }

}


function init() {
    $(window).hashchange( function(){
    
    // Alerts every time the hash changes!
    
    setview()
    }); //monitor for hashchanges and react.
    var projects = ['emlo', 'anmo', 'recovery', 'portfolio']
    // These names of the projects used to generate navigation and content. They should map to the directory structure.
    //add hover states on the static widgets
    $('.navArrow').hover(
    function() {
        $(this).addClass('ui-state-hover');
    },
    function() {
        $(this).removeClass('ui-state-hover');
    }
    );

    $.get('./data/project_template.html',
    function(data) {
        //Retrieve the template for presenting projects and use it to set up the projects.
        var tem = data;
        for (var i = 0; i < projects.length; i++) {
            setup(projects[i], tem)
        }
        projects.reverse();
        //it's necesary to reverse the projects as the carousel loads them in opposite order.
        makeProjectCarousel(projects);
        //make the carousel when it's done
    });
}

window.onload = init;