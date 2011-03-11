
//hover states on the static widgets


function log(message) {
	$("#log").append(message)
	
}
function advanceSelection(num) {
	var outbox = $('.project.selected');
	var sibs = outbox.parent().children(); //Have to use parents children since siblings excludes the reference element.
	var wrapdigit = 0; //wrapdigit is the point at which the selection has to loop around
	if(num <0) var wrapdigit = sibs.length-1;
	var i=-1;
	while(sibs[i] != outbox[0]) { 
		i = i + 1;
		if(i+ num < sibs.length && i + num > -1) inbox=$(sibs[i+num]); 
		else inbox = $(sibs[wrapdigit]);
	} 
	animate(outbox,inbox, 400,num);
}
function toggleSelected(outbox, inbox) {
	var outnav = $('#'+outbox.attr('id') + 'nav');
	var innav = $('#'+inbox.attr('id') + 'nav');
	outbox.removeClass('selected');
	outnav.removeClass('selected');
	inbox.addClass('selected');
	innav.addClass('selected');
}
function animate(outbox,inbox, t, dir) {
	if(dir<0) dir="up";
	else dir = "down";
	if($(':animated').length ==0) //prevent animations from getting queued on double click
		outbox.hide("slide", { direction: dir, callback:animateIn(outbox,inbox,t,t+100, dir)}, t);
	
}	
function animateIn(outbox,inbox,t,del, dir){
	toggleSelected(outbox, inbox);
	if(dir=="up") dir = "down";
	else dir = "up";
	inbox.stop().delay(del).show("slide", { direction: dir}, t); //the delay is necessary to keep the boxes from overlapping onscreen
}

function select(name) {
    //window.location.hash = '#' + name; 
	var oldbox = $('.project.selected');
	var speed = 400;
	if(oldbox.length==0) {
		animateIn(oldbox,$('#'+name),speed,0);
		$('#up').css('display','block');
		$('#down').css('display','block');
	}
	else if(oldbox.attr("id") != name) {
		animate(oldbox,$('#'+name), speed)
	}
}

function setup(pname) {
    $('#'+pname+'-tabs').tabs();
    $('#'+pname+'-tabs-overview').load('./data/'+pname+'.html #overview');
    $('#'+pname+'-tabs-planning').load('./data/'+pname+'.html #planning');
    $('#'+pname+'-tabs-development').load('./data/'+pname+'.html #development');
    $('#'+pname+'-tabs-results').load('./data/'+pname+'.html #results');
}

function init() {
    var pname = window.location.hash.slice(1);
    if(pname.length > 0) {
        select(pname)
    }
    else {
            select('emlo');
    }

    $('.navArrow').hover(
    	function() { $(this).addClass('ui-state-hover'); }, 
    	function() { $(this).removeClass('ui-state-hover'); }
    );

	setup('emlo');
	setup('anmo')
	setup('recovery')
	setup('portfolio');
	
	
}

window.onload = init;