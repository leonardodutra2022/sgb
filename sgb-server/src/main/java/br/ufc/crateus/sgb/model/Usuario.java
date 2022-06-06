package br.ufc.crateus.sgb.model;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.ufc.crateus.sgb.model.abs.Pessoa;
import br.ufc.crateus.sgb.model.enums.Perfis;
import br.ufc.crateus.sgb.utils.RandomCredentialsUtils;

/**
 * Entidade representa as informações de cadastro de cada usuário do sistema
 * @author Leonardo Dutra
 * @see Pessoa
 * @see Perfis
 */
@Entity
public class Usuario extends Pessoa{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private String nomeUsuario;
	private String nomeUsuario$;
	private String papel;
	private String senha$;
	private String senha;
	@Enumerated(EnumType.STRING)
	@ElementCollection(fetch = FetchType.EAGER)
	private List<Perfis> perfils;
	private boolean ativo;
	@Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataHora;
	private boolean acessoInscricaoTemp;
	private String setor;
	private String cursoResponsavel;
	private String telefoneResponsavel;
	private String versionUpdated;
	private boolean sisUpdated;
	
	public Usuario(Aluno aluno) {
		this.email = aluno.getEmail();
		this.siape = aluno.getSiape();
		this.nomeCompleto = aluno.getNomeCompleto();
		this.sexo = aluno.getSexo();
		this.ativo = true;
		this.papel = "Aluno";
		this.setPerfils(Arrays.asList(Perfis.aluno));
		this.telefoneResponsavel = aluno.getCelularA();
		this.nomeUsuario = RandomCredentialsUtils.getUsuarioRandom();
		this.senha = RandomCredentialsUtils.getPassRandom();
	}

	public String getSetor() {
		return setor;
	}

	public void setSetor(String setor) {
		this.setor = setor;
	}

	public String getCursoResponsavel() {
		return cursoResponsavel;
	}

	public void setCursoResponsavel(String cursoResponsavel) {
		this.cursoResponsavel = cursoResponsavel;
	}

	public String getTelefoneResponsavel() {
		return telefoneResponsavel;
	}

	public void setTelefoneResponsavel(String telefoneResponsavel) {
		this.telefoneResponsavel = telefoneResponsavel;
	}

	public boolean isAcessoInscricaoTemp() {
		return acessoInscricaoTemp;
	}

	public void setAcessoInscricaoTemp(boolean acessoInscricaoTemp) {
		this.acessoInscricaoTemp = acessoInscricaoTemp;
	}

	public Date getDataHora() {
		return dataHora;
	}

	public void setDataHora(Date dataHora) {
		this.dataHora = dataHora;
	}

	public Usuario () {
		this.ativo = true;
	}
	
	public String getNomeUsuario() {
		return nomeUsuario;
	}
	public void setNomeUsuario(String nomeUsuario) {
		this.nomeUsuario = nomeUsuario;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public List<Perfis> getPerfils() {
		return perfils;
	}
	public void setPerfils(List<Perfis> perfils) {
		this.perfils = perfils;
	}
	public String getPapel() {
		return papel;
	}
	public void setPapel(String papel) {
		this.papel = papel;
	}
	public boolean isAtivo() {
		return ativo;
	}
	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}
	
	public String getEmail() {
		return this.email;
	}	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getNomeCompleto() {
		return this.nomeCompleto;
	}
	public void setNomeCompleto(String nomeCompleto) {
		this.nomeCompleto = nomeCompleto;
	}
	
	public String getSexo() {
		return this.sexo;
	}
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	
	public Long getSiape() {
		return this.siape;
	}
	
	public void setSiape(Long siape) {
		this.siape = siape;
	}
	
	public byte[] getRubrica() {
		return rubrica;
	}

	public void setRubrica(byte[] rubrica) {
		this.rubrica = rubrica;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + (ativo ? 1231 : 1237);
		result = prime * result + ((dataHora == null) ? 0 : dataHora.hashCode());
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + ((nomeUsuario == null) ? 0 : nomeUsuario.hashCode());
		result = prime * result + ((papel == null) ? 0 : papel.hashCode());
		result = prime * result + ((perfils == null) ? 0 : perfils.hashCode());
		result = prime * result + ((senha == null) ? 0 : senha.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		if (ativo != other.ativo)
			return false;
		if (dataHora == null) {
			if (other.dataHora != null)
				return false;
		} else if (!dataHora.equals(other.dataHora))
			return false;
		if (id != other.id)
			return false;
		if (nomeUsuario == null) {
			if (other.nomeUsuario != null)
				return false;
		} else if (!nomeUsuario.equals(other.nomeUsuario))
			return false;
		if (papel == null) {
			if (other.papel != null)
				return false;
		} else if (!papel.equals(other.papel))
			return false;
		if (perfils == null) {
			if (other.perfils != null)
				return false;
		} else if (!perfils.equals(other.perfils))
			return false;
		if (senha == null) {
			if (other.senha != null)
				return false;
		} else if (!senha.equals(other.senha))
			return false;
		return true;
	}

	public String getNomeUsuario$() {
		return nomeUsuario$;
	}

	public void setNomeUsuario$(String nomeUsuario$) {
		this.nomeUsuario$ = nomeUsuario$;
	}

	public String getSenha$() {
		return senha$;
	}

	public void setSenha$(String senha$) {
		this.senha$ = senha$;
	}

	public String getVersionUpdated() {
		return versionUpdated;
	}

	public void setVersionUpdated(String versionUpdated) {
		this.versionUpdated = versionUpdated;
	}

	public boolean isSisUpdated() {
		return sisUpdated;
	}

	public void setSisUpdated(boolean sisUpdated) {
		this.sisUpdated = sisUpdated;
	}
	
}
