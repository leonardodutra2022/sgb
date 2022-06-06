package br.ufc.crateus.sgb.interfaces;

import java.util.Optional;

/**
 * Interface contendo procedimentos padronizados para prover validação para uso dos controladores
 * @author Leonardo Dutra
 */
public interface IValidation<T> {
	public boolean verifyFormat();
	public boolean verifySize();
	public boolean isNull();
	public boolean isExist(long id);
	Optional<T> getById(long id);
}
