package br.ufc.crateus.sgb.utils;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Type;
import java.lang.reflect.ParameterizedType;

/**
 * Classe abstrata que fornece procedimentos avançados para obter informações dinâmicas dos objetos genéricos em tempo de execução para uso
 * @author Leonardo Dutra
 * @see IClass
 */
public abstract class AbstractTypeReference<T> implements IClass{

	private final Type type;
	private volatile Constructor<?> constructor;
	
	protected AbstractTypeReference() {
		
		Type superclass = getClass().getGenericSuperclass();

		if(superclass instanceof Class) {
			throw new RuntimeException("Falta informar tipo de parametro... ");
		}
		
		this.type = ((ParameterizedType) superclass).getActualTypeArguments()[0];
				
	}
	
	
	@SuppressWarnings("unchecked")
	public T newInstance() throws NoSuchMethodException, 
		IllegalAccessException,	InvocationTargetException, 
		InstantiationException {
		
		if(constructor == null) {
			Class<?> rawType = type instanceof Class<?>
				? (Class<?>) type
				: (Class<?>) ((ParameterizedType) type).getRawType();
			constructor = rawType.getConstructor();
		}
		return (T) constructor.newInstance();
	}
	
	public Type getType() {
		return this.type;
	}
	
}
