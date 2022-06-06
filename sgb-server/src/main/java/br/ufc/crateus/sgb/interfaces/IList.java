package br.ufc.crateus.sgb.interfaces;

import java.util.List;

/**
 * Interface para listagem padronizada para alguns controladores 
 * @author Leonardo Dutra
 */
public interface IList<T> {
	List<T> getAll();
	List<T> getBySigla(String sigla);
	T getById(long id);
}
