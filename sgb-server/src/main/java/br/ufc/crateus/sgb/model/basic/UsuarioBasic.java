package br.ufc.crateus.sgb.model.basic;

/**
 * Entidade possui informações específicas para situações em que será preciso trafegar tais dados sem que haja prejuizo em segurança de informações sensíveis.
 * @author Leonardo Dutra
 */
public class UsuarioBasic {
	
	private long id;
	private String nomeUsuario;
	private String nomeCompleto;
	private boolean ativo;
	private String email;
	
	public UsuarioBasic() {
		
	}
	
	public UsuarioBasic(long id, String nomeUsuario, String nomeCompleto, boolean ativo, String email) {
		super();
		this.id = id;
		this.nomeUsuario = nomeUsuario;
		this.nomeCompleto = nomeCompleto;
		this.ativo = ativo;
		this.email = email;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public String getNomeUsuario() {
		return nomeUsuario;
	}
	
	public void setNomeUsuario(String nomeUsuario) {
		this.nomeUsuario = nomeUsuario;
	}
	
	public String getNomeCompleto() {
		return nomeCompleto;
	}
	
	public void setNomeCompleto(String nomeCompleto) {
		this.nomeCompleto = nomeCompleto;
	}
	
	public boolean isAtivo() {
		return ativo;
	}
	
	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}
}
