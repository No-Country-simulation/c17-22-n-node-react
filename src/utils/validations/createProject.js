export default function validation(projectData) {
	const errors = {}

	if (!projectData.name) errors.name = "No puede estar vacio"

	if (projectData.name.length > 40)
		errors.name = "No puede tener mas de 40 caracteres"

	if (!projectData.description) errors.description = "No puede estar vacio"

	if (projectData.description.length < 50)
		errors.description = "No puede tener menos de 50 caracteres"

	if (!projectData.categoryId)
		errors.categoryId = "Debes seleccionar una categoria"

	if (!projectData.subcategoryId)
		errors.subcategoryId = "Debes seleccionar una subcategoria"

	if (!projectData.imageUrl) errors.imageUrl = "Debes subir una imagen"

	return errors
}
