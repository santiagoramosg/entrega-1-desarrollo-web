

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
	const range = document.getElementById("field_range");
	if (range) {
		range.addEventListener("input", updateRangeValueDisplay);
		updateRangeValueDisplay();
	}
});

function handleFormSubmit(event) {
	event.preventDefault();
	
	// Recopilar datos del formulario
	const formData = collectFormData();
	
	// Guardar localmente
	localStorage.setItem("formData", JSON.stringify(formData));
	
	// Mostrar opciones de guardado
	showSaveOptions(formData);
}

// Función para recopilar datos del formulario
function collectFormData() {
	return {
		timestamp: new Date().toLocaleString(),
		nombre: document.getElementById("field1")?.value || "",
		apellido: document.getElementById("field2")?.value || "",
		correo_electronico: document.getElementById("field3")?.value || "",
		telefono: document.getElementById("field4")?.value || "",
		nombre_gato: document.getElementById("field5")?.value || "",
		edad_gato: document.getElementById("field6")?.value || "",
		raza_gato: document.getElementById("field7")?.value || "",
		nivel_magia: document.getElementById("field_range")?.value || "",
		fecha_nacimiento_gato: document.getElementById("field_date")?.value || "",
		motivo_inscripcion: document.getElementById("field8")?.value || "",
		pais_residencia: document.getElementById("field9")?.value || "",
		ciudad_residencia: document.getElementById("field10")?.value || "",
		direccion: document.getElementById("field11")?.value || "",
		nombre_mago_gato: document.getElementById("field12")?.value || "",
		esta_seguro: document.querySelector('input[name="esta_seguro"]:checked')?.value || "",
		magia_desaparicion_objetos: document.getElementById("field14_1")?.checked || false,
		magia_invocaciones: document.getElementById("field14_2")?.checked || false,
		magia_control_mental: document.getElementById("field14_3")?.checked || false,
		magia_otros: document.getElementById("field14_4")?.checked || false,
		otros_magia: document.getElementById("field15")?.value || ""
	};
}

// Función para mostrar opciones de guardado
function showSaveOptions(formData) {
	const message = `Datos guardados exitosamente!\n\nOpciones:\n1. Los datos se guardaron localmente\n2. Haz clic en "Descargar JSON" para guardar en tu computadora`;
	alert(message);
}

// Función para descargar los datos como JSON
function saveFormData() {
	const formData = collectFormData();
	localStorage.setItem("formData", JSON.stringify(formData));
	return formData;
}

function downloadFormData() {
	const formData = saveFormData();
	const dataStr = JSON.stringify(formData, null, 2);
	const dataBlob = new Blob([dataStr], { type: "application/json" });
	const url = URL.createObjectURL(dataBlob);
	const link = document.createElement("a");
	link.href = url;
	link.download = `formulario_${new Date().getTime()}.json`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}

// Función para cargar datos del formulario desde localStorage
function loadFormData() {
	const savedData = localStorage.getItem("formData");
	if (savedData) {
		const formData = JSON.parse(savedData);

			if (document.getElementById("field1")) document.getElementById("field1").value = formData.nombre;
		if (document.getElementById("field2")) document.getElementById("field2").value = formData.apellido;
		if (document.getElementById("field3")) document.getElementById("field3").value = formData.correo_electronico;
		if (document.getElementById("field4")) document.getElementById("field4").value = formData.telefono;
		if (document.getElementById("field5")) document.getElementById("field5").value = formData.nombre_gato;
		if (document.getElementById("field6")) document.getElementById("field6").value = formData.edad_gato;
		if (document.getElementById("field7")) document.getElementById("field7").value = formData.raza_gato;
		if (document.getElementById("field8")) document.getElementById("field8").value = formData.motivo_inscripcion;
		if (document.getElementById("field9")) document.getElementById("field9").value = formData.pais_residencia;
		if (document.getElementById("field10")) document.getElementById("field10").value = formData.ciudad_residencia;
		if (document.getElementById("field11")) document.getElementById("field11").value = formData.direccion;
		if (document.getElementById("field12")) document.getElementById("field12").value = formData.nombre_mago_gato;
		if (document.querySelector('input[name="esta_seguro"][value="Sí"]')) document.querySelector('input[name="esta_seguro"][value="Sí"]').checked = formData.esta_seguro === "Sí";
		if (document.querySelector('input[name="esta_seguro"][value="No"]')) document.querySelector('input[name="esta_seguro"][value="No"]').checked = formData.esta_seguro === "No";
		if (document.getElementById("field14_1")) document.getElementById("field14_1").checked = formData.magia_desaparicion_objetos;
		if (document.getElementById("field14_2")) document.getElementById("field14_2").checked = formData.magia_invocaciones;
		if (document.getElementById("field14_3")) document.getElementById("field14_3").checked = formData.magia_control_mental;
		if (document.getElementById("field14_4")) document.getElementById("field14_4").checked = formData.magia_otros;
		if (document.getElementById("field15")) document.getElementById("field15").value = formData.otros_magia;
		if (document.getElementById("field_range")) {
			document.getElementById("field_range").value = formData.nivel_magia || "5";
			updateRangeValueDisplay();
		}
		if (document.getElementById("field_date")) document.getElementById("field_date").value = formData.fecha_nacimiento_gato || "";
	}
}

function updateRangeValueDisplay() {
	const range = document.getElementById("field_range");
	const display = document.getElementById("field_range_value");
	if (range && display) {
		display.textContent = range.value;
	}
}




