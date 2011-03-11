function setup(pname, tem) {
    skel = $.tmpl(tem, {"Name" : pname });
    $('#projects').append(skel);
    $('#'+pname+'-tabs').tabs();
    $('#'+pname+'-tabs-overview').load('./data/'+pname+'.html #overview');
    $('#'+pname+'-tabs-planning').load('./data/'+pname+'.html #planning');
    $('#'+pname+'-tabs-development').load('./data/'+pname+'.html #development');
    $('#'+pname+'-tabs-results').load('./data/'+pname+'.html #results');

}

function init() {
      var projects = ['emlo', 'anmo', 'recovery','portfolio'] // These names are used to generate navigation and content. 

//hover states on the static widgets
    $('.navArrow').hover(
    	function() { $(this).addClass('ui-state-hover'); }, 
    	function() { $(this).removeClass('ui-state-hover'); }
    );
    
    $.get('./data/project_template.html', function(data) { //Retrieve the template for presenting projects
      var tem = data;

      for (var i=0; i<projects.length;i++) {
          setup(projects[i], tem)
      }

      var pname = window.location.hash.slice(1);
      if(pname.length > 0) {
          //select(pname)
      }
      else {
              //select('emlo');
      }
      projects.reverse();
      
      //Create a carousel of the projects - this creates the navigation and the animations for the items. The old navigation is kept as a non-js fallback.
      $("#projects").carouFredSel({
          direction: "up",
          items: 1,
          auto: {play: false},
          next : {
            button  : "#down",
            key     : "right"
          },
          prev : {
            button  : "#up",
            key     : "left"
          },
          pagination : {
            anchorBuilder:   function() {
                  project = projects.pop();
                  return '<li id="'+project+'"><a href="#"'+project+'" class="caroufredsel"><img src="images/'+project+'_thumb.png" alt="'+project+'_thumb"><br><span>'+project+'</span></a></li>';
              },
            container: "#navButtons"  
          },
          
          
      }); //end Carousel
    });
    
	
}

window.onload = init;