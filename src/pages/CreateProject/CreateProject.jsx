import "./createproject.css"

export const CreateProject = () => {
	return (
		<form className="needs-validation" noValidate>
			<div className="form-floating mb-3 col-md-4">
				<input
					type="email"
					className="form-control"
					id="floatingInput"
					placeholder="name@example.com"
				></input>
				<label htmlFor="validationCustom01" className="floatingInput">
					Titulo
				</label>
				<div className="valid-feedback">Looks good!</div>
			</div>
			<div className="form-floating mb-3 col-md-4">
				<textarea
					className="form-control"
					placeholder="Leave a comment here"
					id="floatingTextarea2"
				></textarea>
				<label htmlFor="floatingTextarea2">Comments</label>
			</div>
			<input
				type="radio"
				className="btn-check"
				name="options"
				id="option1"
				autoComplete="off"
				checked
			/>
			<label className="btn btn-secondary" htmlFor="option1">
				Checked
			</label>

			<input
				type="radio"
				className="btn-check"
				name="options"
				id="option2"
				autoComplete="off"
			/>
			<label className="btn btn-secondary" htmlFor="option2">
				Radio
			</label>

			<input
				type="radio"
				className="btn-check"
				name="options"
				id="option3"
				autoComplete="off"
				disabled
			/>
			<label className="btn btn-secondary" htmlFor="option3">
				Disabled
			</label>

			<input
				type="radio"
				className="btn-check"
				name="options"
				id="option4"
				autoComplete="off"
			/>
			<label className="btn btn-secondary" htmlFor="option4">
				Radio
			</label>
			<div className="col-4">
				<button className="btn btn-primary" type="submit">
					Submit form
				</button>
			</div>
		</form>
	)
}
