// validacion_form.js — MEW-arts

function validarFormulario() {
	let valido = true;

	document.querySelectorAll(".error-msg").forEach(e => e.remove());
	document.querySelectorAll(".campo-error").forEach(e => e.classList.remove("campo-error"));

	function error(id, msg) {
		const el = document.getElementById(id);
		if (!el) return;
		el.classList.add("campo-error");
		const span = document.createElement("span");
		span.className = "error-msg";
		span.textContent = msg;
		el.insertAdjacentElement("afterend", span);
		valido = false;
	}

	["field1", "field2", "field5", "field7"].forEach(id => {
		if (!document.getElementById(id)?.value.trim())
			error(id, "Campo obligatorio.");
	});

	const dir = document.getElementById("field11")?.value.trim();
	if (!dir) error("field11", "Campo obligatorio.");
	else if (dir.length < 5) error("field11", "Dirección muy corta.");

	const email = document.getElementById("field3")?.value.trim();
	if (!email) error("field3", "Campo obligatorio.");
	else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) error("field3", "Email inválido.");

	const tel = document.getElementById("field4")?.value.trim();
	if (!tel) error("field4", "Campo obligatorio.");
	else if (!/^\d{7,15}$/.test(tel)) error("field4", "Solo dígitos (7-15).");

	const edad = document.getElementById("field6")?.value;
	if (edad === "") error("field6", "Campo obligatorio.");
	else if (edad < 0 || edad > 30) error("field6", "Edad entre 0 y 30.");

	const nivelMagia = document.getElementById("field_range")?.value;
	if (nivelMagia === "" || nivelMagia == null) error("field_range", "Selecciona un nivel de magia.");
	else if (Number(nivelMagia) < 0 || Number(nivelMagia) > 10)
		error("field_range", "Nivel de magia inválido.");

	const fechaGato = document.getElementById("field_date")?.value;
	if (!fechaGato) error("field_date", "Selecciona fecha de nacimiento.");
	else {
		const fechaNac = new Date(fechaGato);
		const hoy = new Date();
		if (fechaNac > hoy) error("field_date", "La fecha no puede ser futura.");
		else if (hoy.getFullYear() - fechaNac.getFullYear() > 30)
			error("field_date", "La fecha es demasiado antigua.");
	}

	if (!document.getElementById("field8")?.value.trim())
		error("field8", "Campo obligatorio.");

	if (!document.getElementById("field9")?.value) error("field9", "Selecciona un país.");
	if (!document.getElementById("field10")?.value) error("field10", "Selecciona una ciudad.");

	if (!document.getElementById("field12")?.value.trim())
		error("field12", "Campo obligatorio.");

	if (!document.querySelector('input[name="esta_seguro"]:checked'))
		error("field13_1", "Selecciona una opción.");

	const checks = ["field14_1","field14_2","field14_3","field14_4"];
	if (!checks.some(id => document.getElementById(id)?.checked))
		error("field14_1", "Selecciona al menos un tipo de magia.");

	if (document.getElementById("field14_4")?.checked && !document.getElementById("field15")?.value.trim())
		error("field15", "Describe la magia extra.");
	else if (document.getElementById("field14_4")?.checked && document.getElementById("field15")?.value.trim().length < 5)
		error("field15", "Mínimo 5 caracteres para describir la magia.");

	return valido;
}

const style = document.createElement("style");
style.textContent = `
	.error-msg { display:block; color:#e63946; font-size:0.82em; margin-top:3px; }
	.campo-error { border: 2px solid #e63946 !important; }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
	const btn = document.querySelector('button[onclick="downloadFormData()"]');
	if (btn) {
		btn.removeAttribute("onclick");
		btn.addEventListener("click", () => {
			if (validarFormulario()) downloadFormData();
			else alert("Completa todos los campos antes de continuar.");
		});
	}
});
