package br.ufc.crateus.sgb.exception;

/**
 * Classe de tratamento de exceção quando arquivo não foi encontrado
 * @author Leonardo Dutra
 * @see StorageException
 */
public class StorageFileNotFoundException extends StorageException {

	private static final long serialVersionUID = 1L;

	public StorageFileNotFoundException(String message) {
		super(message);
	}

	public StorageFileNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}
	
}
