function runAnimation() {
  window.requestAnimationFrame(function () {

	const currentYear = 2025;

	// Force only numeric input in the textbox
	document.getElementById("enterYear").addEventListener("input", function (e) {
	this.value = this.value.replace(/\D/g, '');
	});
	
	window.onload = function() {
	let e = localStorage.getItem("yearDiff");
	if (e) {
		document.getElementById("yearValue").textContent = e.padStart(2, "0");
		let t = `year${e}.png`;
		document.getElementById("yearImage").src = t, document.getElementById("yearCount").style.display = "block"
	}
	}, document.getElementById("calcResult").addEventListener("click", function() {
	let e = document.getElementById("enterYear").value.trim(),
		t = document.getElementById("dataAlert"),
		n = document.getElementById("yearValue"),
		a = document.getElementById("yearCount"),
		r = document.getElementById("yearImage");
	if (t.textContent = "", isNaN(e)) {
		t.textContent = "Entered value is not a number. Please try again!";
		return
	}
	if (e.length > 4) {
		t.textContent = "Invalid value, number cannot exceed 4-digits. Please try again!";
		return
	}
	if (e.length < 4) {
		t.textContent = "Invalid value, number cannot be lower than 4-digits. Please try again!";
		return
	}
	if (e.length <= 4) {
		document.getElementById("s2").style.display = "block";
		document.getElementById("yearValue").style.display = "block";
		document.getElementById("enterYear").style.display = "none";
		document.getElementById("calcResult").style.display = "none";
	}
	let l = parseInt(e, 10);
	if (l > 2025) {
		document.getElementById("s2").style.display = "none";
		document.getElementById("yearValue").style.display = "none";
		document.getElementById("enterYear").style.display = "block";
		document.getElementById("calcResult").style.display = "block";
		t.textContent = "Invalid value, number entered is higher than the current year. Please try again!";
		return
	}
	if (l < 2000) {
		document.getElementById("s2").style.display = "none";
		document.getElementById("yearValue").style.display = "none";
		document.getElementById("enterYear").style.display = "block";
		document.getElementById("calcResult").style.display = "block";
		t.textContent = "Invalid value, number entered is older than the product launch. Please try again!";
		return
	}
	let i = 2025 - l,
		y = i.toString().padStart(2, "0");
	n.textContent = y;
	let d = `year${i}.png`;
	r.src = d, a.style.display = "block", localStorage.setItem("yearDiff", y)
	});

  });
}



  