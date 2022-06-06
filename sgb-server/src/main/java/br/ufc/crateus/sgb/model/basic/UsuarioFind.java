package br.ufc.crateus.sgb.model.basic;

import java.io.Serializable;

import br.ufc.crateus.sgb.model.Usuario;

/**
 * Entidade possui informações específicas para situações em que será preciso trafegar tais dados sem que haja prejuizo em segurança de informações sensíveis - nesse caso para pesquisa.
 * @author Leonardo Dutra
 */
public class UsuarioFind extends Usuario implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private long id;

	private String nomeCompleto;

	private boolean ativo;
	
	public UsuarioFind(long id, String nomeCompleto, boolean ativo) {
		super();
		this.id = id;
		this.nomeCompleto = nomeCompleto;
		this.ativo = ativo;
	}

	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (ativo ? 1231 : 1237);
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + ((nomeCompleto == null) ? 0 : nomeCompleto.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UsuarioFind other = (UsuarioFind) obj;
		if (ativo != other.ativo)
			return false;
		if (id != other.id)
			return false;
		if (nomeCompleto == null) {
			if (other.nomeCompleto != null)
				return false;
		} else if (!nomeCompleto.equals(other.nomeCompleto))
			return false;
		return true;
	}
	
	
}
