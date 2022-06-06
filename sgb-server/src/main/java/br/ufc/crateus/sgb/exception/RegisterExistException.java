package br.ufc.crateus.sgb.exception;

public class RegisterExistException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public RegisterExistException() {
		super("Algum dado informado já existente na base");
	}
	
}
