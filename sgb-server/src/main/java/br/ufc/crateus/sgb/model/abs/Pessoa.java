package br.ufc.crateus.sgb.model.abs;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.MappedSuperclass;

/**
 * Superclasse abstrata visando estender informações básicas para algumas entidades, como Aluno, Usuario e etc
 * @author Leonardo Dutra
 */
@MappedSuperclass
public abstract class Pessoa{
	
	protected String nomeCompleto;
	
	@Column(length=1)
	protected String sexo;
	
	protected String email;
	
	protected Long siape;
	
	@Lob
	@Basic(fetch = FetchType.LAZY)
	protected byte[] rubrica;
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((nomeCompleto == null) ? 0 : nomeCompleto.hashCode());
		result = prime * result + ((sexo == null) ? 0 : sexo.hashCode());
		result = prime * result + ((siape == null) ? 0 : siape.hashCode());
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
		Pessoa other = (Pessoa) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (nomeCompleto == null) {
			if (other.nomeCompleto != null)
				return false;
		} else if (!nomeCompleto.equals(other.nomeCompleto))
			return false;
		if (sexo == null) {
			if (other.sexo != null)
				return false;
		} else if (!sexo.equals(other.sexo))
			return false;
		if (siape == null) {
			if (other.siape != null)
				return false;
		} else if (!siape.equals(other.siape))
			return false;
		return true;
	}
	
}
