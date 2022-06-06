package br.ufc.crateus.sgb.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

/**
 * Classe auxiliar para uso da preparação da exportação de arquivos em alguns formatos, usando objetos de forma dinâmica - usando recursos avançados do Java Reflection
 * @author Leonardo Dutra
 */
public class ObjectUtils{
	
	private Field[] fields;
	private Method[] methods;
	
	public ObjectUtils(){
		
	}
	
	public ObjectUtils(Class<?> cls){
		this.fields = cls.getDeclaredFields();
		this.methods = cls.getDeclaredMethods();
	}
	
	public ObjectUtils(Field[] fields, Method[] methods){
		this.fields = fields;
		this.methods = methods;
	}

	public Field[] getFields() {
		return fields;
	}

	public void setFields(Field[] fields) {
		this.fields = fields;
	}

	public Method[] getMethods() {
		return methods;
	}

	public void setMethods(Method[] methods) {
		this.methods = methods;
	}
}
