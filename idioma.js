

let translations = {};
let currentLang = localStorage.getItem("lang") || "es";

async function loadLanguage(lang) {
	const response = await fetch(`./${lang}.json`);
	translations = await response.json();

	document.querySelectorAll("[data-i18n]").forEach((element) => {
		const key = element.getAttribute("data-i18n");

		// soporte para claves anidadas
		const value = key.split(".").reduce((obj, i) => obj?.[i], translations);

		if (value !== undefined) {
			element.textContent = value;
		}
	});

	localStorage.setItem("lang", lang);
	currentLang = lang;

	const select = document.getElementById("langSelect");
	if (select) {
		select.value = lang;
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const select = document.getElementById("langSelect");
	if (select) {
		select.addEventListener("change", async (event) => {
			const lang = event.target.value;
			await loadLanguage(lang);
		});
	}

	const langBtn = document.getElementById("langBtn");
	if (langBtn) {
		langBtn.addEventListener("click", async () => {
			currentLang = currentLang === "es" ? "en" : "es";
			await loadLanguage(currentLang);
		});
	}

	loadLanguage(currentLang);
});
