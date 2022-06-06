package br.ufc.crateus.sgb.exception;

/**
 * Classe de tratamento de exceção quando há problemas de tratamento e armazenamento diverso 
 * @author Leonardo Dutra
 * @see RuntimeException
 */
public class StorageException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public StorageException(String message) {
		super(message);
	}

	public StorageException(String message, Throwable cause) {
		super(message, cause);
	}
}
