
$(function () {
	
	// Main fullscreen Calculator
	var main_calculator = Desmos.GraphingCalculator($('#fullscreen-desmos-calculator')[0],{
		border: false, administerSecretFolders: false
	});
	var current_calculator = null;

	$('#fullscreen-toolbar').bind('click',function () {
		$('#fullscreen-desmos-calculator-container').hide();
		if (current_calculator) {
			current_calculator.setState(main_calculator.getState());
		}
	});
	
	// Activate all calculators on page
	function activateAllCalculators(block) {
		var calculators = block.getElementsByClassName("desmos-calculator");
		for (var i = 0; i < calculators.length; ++i) {
			initCalculator(calculators[i]);
		}
	}
	// Initialize single calculator
	function initCalculator(element) {
		element.innerHTML = '';
		
		var calc;
		switch(element.getAttribute('data-type')) {
			case 'sci':
				var degreeMode = !!element.getAttribute('data-degree-mode');
				calc = Desmos.ScientificCalculator(element, {
					degreeMode: degreeMode
				});
			break;
			case 'ff':
				calc = Desmos.FourFunctionCalculator(element);
			break;
			case 'graph':
			default:
				calc = Desmos.GraphingCalculator(element,{
					administerSecretFolders: false,
					keypad: false,
					expressions: false,
					settingsMenu: false,
					zoomButtons: false,
					lockViewport: true
				});
			break;
		}
		
		var calcState = element.getAttribute('data-state');
    var calcSrc = element.getAttribute('data-src');
		if (calcState && calcState.toLowerCase() !== 'null') {
			calc.setState(JSON.parse(calcState));
		} else if (calcSrc && calcSrc.length > 0) {
      $.getJSON(calcSrc).then(res => calc.setState(res.state));
    }
		
		if (element.getAttribute('data-fullscreen') === 'true') {
			var fullscreenButton = $('<a>')
				.append($('<i class="fa fa-fw fa-lg fa-expand">'));
				
			fullscreenButton.bind('click', function () {
				$('#fullscreen-desmos-calculator-container').show();
				current_calculator = calc;
				main_calculator.setState(calc.getState());
				main_calculator.resize();
			});
			
			$(element).append(fullscreenButton);
		}
	}

	// Activate all calculators within the "contents" block
	activateAllCalculators(document.getElementById("contents"));

});