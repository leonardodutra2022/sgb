package br.ufc.crateus.sgb.utils;

import org.apache.commons.lang.math.RandomUtils;

public class RandomCredentialsUtils {
	
	static int lengthUsuario = 15;
	static int lenghtPass = 15;
	
	public static String getUsuarioRandom() {
		
		Long n = RandomUtils.nextLong();
		String usuarioRandom = n.toString().substring(1, lengthUsuario);
		String u = "usuario_" + usuarioRandom;
		return u;
	}
	
	public static String getPassRandom() {
		Long n = RandomUtils.nextLong();
		String passRandom = n.toString().substring(1, lenghtPass);
		
		String p = "pass_" + passRandom;
		
		return p;
	}

}
