package br.ufc.crateus.sgb.exception;

public class RegisterNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public RegisterNotFoundException(Long id) {
		super("Código do registro informado não foi localizado: " + id);
	}
}
