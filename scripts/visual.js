//setup takes a project name and a template. It creates/appends a DOM skeleton to hold the data related to the project, then loads the data.
function setup(pname, tem) {
    $('#projects-loading').remove();
    var skel = $.tmpl(tem, {
        "Name": pname
    });
    $('#projects').append(skel);
    $('#' + pname + '-tabs').tabs();
}

function fillIn(pname) {
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


function changeSlide(direction, projects, sections){
    var loc = window.location.hash.slice(1);
    var components = loc.split('-');
    var pname = components[0];
    if(components.length > 1) sname = components[1];
    else sname = sections[0];
    var sindex = sections.indexOf(sname);
    var pindex = projects.indexOf(pname);  
    if (direction == 'forward') {
        if(sindex == sections.length-1) { //we need to advance to the first section of the next project.
            news = sections[0];
            if (pindex == projects.length-1){ //we need to loop around to the next project 
                newp = projects[0];
            }
            else {
                newp = projects[pindex+1];
            }
        } //end if for advancing to next project
        else {
            newp = pname;
            news = sections[sindex+1];
        }
        setHash(newp+'-'+news)
    } //end direction == forward if
    else { //we're going backward
        if(sindex == 0) { //we need to advance to the last section of the previous project.
            news = sections[sections.length-1];
            if (pindex == 0){ //we need to loop around to the previous project 
                newp = projects[projects.length-1];
            }
            else {
                newp = projects[pindex-1];
            }
        } //end if for advancing to next project
        else {
            newp = pname;
            news = sections[sindex-1];
        }
        setHash(newp+'-'+news)
    }//end backward else
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
        pagination: {
            anchorBuilder: function() {
                project = projects.pop();
                return '<li id="' + project + '"><a href="#' + project + '" class="caroufredsel" onclick="setHash('+"'"+ project + "'"+')"><img src="images/' + project + '_thumb.png" alt="' + project + '_thumb"><br><span>' + project + '</span></a></li>';
            },
            container: "#navButtons"
        }
    });
    $("#nav-loading").remove();
    var pname = window.location.hash.slice(1);
    //This is logic to load the appropriate page. TODO
    if (pname.length > 0) {
        setview();
    }

}


function init() {
    $(window).hashchange( function(){    
        setview()
    }); //monitor for hashchanges and react.
    var projects = ['emlo', 'anmo', 'recovery', 'portfolio'];
    var sections = ['overview', 'planning', 'development', 'results'];
    $(window).keydown( function(){
        if (event.keyCode=='39') changeSlide('forward', projects, sections);
        if (event.keyCode=='37') changeSlide('backward', projects, sections);
    });

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
        var caroprojects = projects.slice(0);
        caroprojects.reverse();
        //it's necesary to reverse the projects as the carousel loads them in opposite order.
        makeProjectCarousel(caroprojects);
        //make the carousel when it's done
        for (var i = 0; i < projects.length; i++) {
            fillIn(projects[i]);
        }
    });
}

window.onload = init;