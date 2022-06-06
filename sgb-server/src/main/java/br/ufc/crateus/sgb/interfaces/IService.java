package br.ufc.crateus.sgb.interfaces;

import java.util.Optional;

public interface IService<T> {
	Optional<T> add(T obj);
	Optional<T> update(T obj, long id);
}
