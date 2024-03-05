function resetpage() {
	var resetp=confirm("If you reset this page then all edits will be lost and it will revert to the original template. Are you sure you want to continue?");
	if (resetp==true) {
		var resetphp = "resetpage.php" + window.location.search;
		window.open(resetphp);
	}
}	