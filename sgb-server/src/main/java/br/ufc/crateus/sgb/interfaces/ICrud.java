package br.ufc.crateus.sgb.interfaces;

import java.util.List;

import org.springframework.http.ResponseEntity;

/**
 * Interface padronizando procedimentos básicos para todos os controladores do sistema, que proverão 
 * @author Leonardo Dutra
 *
 */
public interface ICrud<T> {
	public ResponseEntity<?> add(T obj);
	public void delete(long id) throws Exception;
	public ResponseEntity<List<T>> getAll();
	public ResponseEntity<T> getById(long id) throws Exception;
	ResponseEntity<?> update(T obj, long id)  throws Exception;
}
