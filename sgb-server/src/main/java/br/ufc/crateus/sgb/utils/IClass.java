package br.ufc.crateus.sgb.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

/**
 * Interface dedicada a fornecer procedimentos - usando recursos avançados do Java Reflection - onde é possível tratar chamadas e uso dinâmicos de objetos em tempo de execução
 * @author Leonardo Dutra
 */
public interface IClass {
	
	default Class<?> getClassName(Object obj){
		return obj.getClass();
	}
	
	default String getClassToString(Object obj) {
		return obj.getClass().getName();
	}
	
	default Class<?> getClass(String className) throws ClassNotFoundException {
		return Class.forName(className);
	}

	default ClassLoader getClassLoader(Object obj) {
		return obj.getClass().getClassLoader();
	}
	
	default int getColumnCount() {
		return getClass().getDeclaredFields().length;
	}
	
	default Iterable<?> getMethodsTitle(){
		List<String> listaMetodos = new ArrayList<String>();
		
		for(Method m : getClass().getMethods())
			listaMetodos.add(m.getName());
		
		return listaMetodos;
	}
	
	default Method[] getMethods(Object obj){
		return getClassName(obj).getMethods();
	}
	
	default Method[] getMethods(Class<?> cls){
		return cls.getMethods();
	}
	
	default Type[] getTypesMethod(Method method) {
		Type[] genericParameterTypes = method.getGenericParameterTypes();
		return genericParameterTypes;
	}
	
	default Method findByName(String nameMethod, Object obj) {
		for(Method m : getMethods(obj))
			if(m.getName() == nameMethod)
				return m;
		
		return null;
	}
	
	default Package getPackage(Class<?> classe) {
		return classe.getPackage();
	}
	
	default Type getType(Method method) {
		return method.getGenericReturnType();
	}
	
	default boolean instanceofParameterizedType(Type type) {
		return type instanceof ParameterizedType;
	}
	
	default List<String> getClasseByParameterizedType(Type[] pTypes) {

		List<String> lista = new ArrayList<>();

		for(Type t : pTypes) {
			lista.add(((Class<?>) t).getName());
		}
		
		return lista;
	}
	
	default Field[] getFields(Object obj) {
		return getClassName(obj).getFields();
	}
	
	default Field[] getFields(Class<?> cls) {
		return cls.getDeclaredFields();
	}
	
	default Field findByName(Object obj, String field) {
		for(Field f : getFields(obj))
			if(f.getName() == field)
				return f;
		
		return null;
	}
}
