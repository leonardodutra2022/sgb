package br.ufc.crateus.sgb.utils;


public class RubricaUtils {
	
	private long usuarioId;
	
	private String rubricaBase64String;

	private boolean hasRubrica;
	
	public RubricaUtils(long usuarioId, String rubricaString) {
		this.rubricaBase64String = rubricaString;
		this.usuarioId = usuarioId;
	}
	
	public RubricaUtils() {
		
	}

	public String getRubricaBase64String() {
		return rubricaBase64String;
	}

	public void setRubricaBase64String(String rubricaBase64String) {
		this.rubricaBase64String = rubricaBase64String;
	}

	public long getUsuarioId() {
		return usuarioId;
	}

	public void setUsuarioId(long usuarioId) {
		this.usuarioId = usuarioId;
	}

	public boolean isHasRubrica() {
		return hasRubrica;
	}

	public void setHasRubrica(boolean hasRubrica) {
		this.hasRubrica = hasRubrica;
	}
	
}
