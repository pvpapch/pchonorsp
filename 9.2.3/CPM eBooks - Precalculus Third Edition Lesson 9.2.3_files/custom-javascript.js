//******* card focus ***********


(function () {
  var closebtn = document.querySelector('.close');
  if (closebtn) {
    closebtn.addEventListener('click', function () {
      document.getElementById('card-focus').tabIndex = "0";
      document.getElementById('card-focus').focus();      
    });
  }

  //******* Humburger Menu change Icon ***********
var btnCollapse=document.querySelector('.button-collapse');
if(btnCollapse){
  btnCollapse.addEventListener('click', function () {
    const icon = this.querySelector('i');

    if (icon.classList.contains('fa-bars')) {
      document.getElementById('slide-out').className = 'side-nav fixed sn-bg-4 custom-scrollbaryle side-nav-mobile-block';
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');

    } else {
      document.getElementById('slide-out').className = 'side-nav fixed sn-bg-4 custom-scrollbaryle side-nav-mobile-none';
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}
  
  //******* Sub menu active ***********

  var activeclass = document.querySelectorAll('.drop-body li a');
  var activeparent = document.querySelectorAll('.side-nav li ');

  for (var i = 0; i < activeclass.length; i++) {
    activeclass[i].addEventListener('click', activateClass);
  }

  function activateClass(e) {
    for (var i = 0; i < activeclass.length; i++) {
      activeclass[i].classList.remove('active');
    }
// activate new lesson before page reloads
    e.target.classList.add('active');
  }

  //****** accessibility for collapse and expand *************

  var sideColExp = document.getElementsByClassName("side-col-exp");
  var i;
  for (i = 0; i < sideColExp.length; i++) {
    sideColExp[i].addEventListener("click", function () {

      var x = this.querySelector(".collapsible-header").getAttribute("aria-expanded");
      for (j = 0; j < sideColExp.length; j++) {
        sideColExp[j].querySelector(".collapsible-header").setAttribute("aria-expanded", 'false');
      }
      if (x == "true") {
        x = "false"
      } else {
        x = "true"
      }
      this.querySelector(".collapsible-header").setAttribute("aria-expanded", x);
    });
  }

})();

//******* Mobile Tabs ***********

//switch tabs from select element
function mobileTabs() {
  var tab_selector =  document.getElementById("tab_selector");
  var tablink = tab_selector.options[tab_selector.selectedIndex].value;
  window.location = tablink;
}


// Close the dropdown if the user clicks outside of it
function profilefunction() {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }     
  
    }

window.onclick = function(event) {
  if (!event.target.matches('.dropdown-btn-hidden')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



// toggles mobile menu
function togglemenu(){
var btnCollapse=document.querySelector('.button-collapse');
if(btnCollapse){
    const icon = btnCollapse.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      document.getElementById('slide-out').className = 'side-nav fixed sn-bg-4 custom-scrollbaryle side-nav-mobile-block';
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');

    } else {
      document.getElementById('slide-out').className = 'side-nav fixed sn-bg-4 custom-scrollbaryle side-nav-mobile-none';
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
    
    }
}

// page init including menu highlighting and custom content highlighting
function loadactive(lesson,tab){
  var lessonid = "id-" + lesson;
  var jqlessonid = "#"+lessonid.replace(/\./g,'\\.');
  $(jqlessonid).parent().closest('div').siblings('a').attr('aria-expanded','true');
  if (tab) {
  	document.getElementById(tab).setAttribute("aria-selected","true");
 }
}



// switch to full screen
function fullscreen(){
	document.getElementById("topnav").style.display="none";
	document.getElementById("slide-out").style.display="none";
	document.getElementById("maincontent").style.width="100%";
	document.getElementById("maincontent").style.setProperty("margin-top", "3em", "important");
	document.getElementById("main-wrapper-body").style.padding="0";
	document.getElementById("navtabs").style.display="none";
	document.getElementById("contenttitle").style.display="none";
	document.getElementById("contentfooter").style.display="none";
	document.getElementById("tabcontent").style.height="calc(100vh - 80px)";
	if (document.getElementById("mobilesearch")) document.getElementById("mobilesearch").style.setProperty("display", "none", "important");
	document.getElementById("mobiletab").style.setProperty("display", "none", "important");
	document.getElementById("exitfullscreenbutton").style.display="block";
}

// exit full screen
function exitfullscreen(){
	document.getElementById("exitfullscreenbutton").style.display="none";
	document.getElementById("mobiletab").style.setProperty("display", "");
	if (document.getElementById("mobilesearch")) document.getElementById("mobilesearch").style.setProperty("display", "");
	document.getElementById("tabcontent").style.height="";
	document.getElementById("contentfooter").style.display="";
	document.getElementById("contenttitle").style.display="";
	document.getElementById("navtabs").style.display="";
	document.getElementById("main-wrapper-body").style.padding="";
	document.getElementById("maincontent").style.setProperty("margin-top", "");
	document.getElementById("maincontent").style.width="";
	document.getElementById("slide-out").style.display="";
	document.getElementById("topnav").style.display="";
}
