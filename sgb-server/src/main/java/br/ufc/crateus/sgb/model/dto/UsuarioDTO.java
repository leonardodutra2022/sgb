package br.ufc.crateus.sgb.model.dto;

import java.util.ArrayList;
import java.util.List;

import br.ufc.crateus.sgb.model.Usuario;
import br.ufc.crateus.sgb.model.enums.Perfis;
import br.ufc.crateus.sgb.model.enums.Permissoes;

/**
 * Classe dedicada a utilizar do artifício de transferência de objetos para operações específicas com uso do objeto, nesse caso para tratamento e manuseio do usuário.
 * @author Leonardo Dutra
 * @see Perfis
 * @see Permissoes
 */
public class UsuarioDTO {

	private long id;
	private String nomeUsuario;
	private String senha;
	private String papel;
	private List<Perfis> perfils;
	private List<Permissoes> permissoes = new ArrayList<Permissoes>();
	private boolean ativo;
	private String nomeCompleto;
	private String sexo;
	private String email;
	private Long siape;
	private boolean acessoInscricaoTemp;
	private String versionUpdated;
	private boolean sisUpdated;
	
	public UsuarioDTO() {
		
	}
	
	public UsuarioDTO(Usuario usuario) {
		setId(usuario.getId());
		setNomeUsuario(usuario.getNomeUsuario());
		setSenha(usuario.getSenha());
		setPapel(usuario.getPapel());
		setPerfils(usuario.getPerfils());
		setAtivo(usuario.isAtivo());
		setEmail(usuario.getEmail());
		setNomeCompleto(usuario.getNomeCompleto());
		setSexo(usuario.getSexo());
		setSiape(usuario.getSiape());
		setAcessoInscricaoTemp(usuario.isAcessoInscricaoTemp());
		setVersionUpdated(usuario.getVersionUpdated());
		setSisUpdated(usuario.isSisUpdated());
		for(Perfis perfil : perfils) {
			permissoes.addAll(perfil.getPermissoes());
		}
	}
	
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getNomeUsuario() {
		return nomeUsuario;
	}

	public void setNomeUsuario(String nomeUsuario) {
		this.nomeUsuario = nomeUsuario;
	}

	public String getPapel() {
		return papel;
	}

	public void setPapel(String papel) {
		this.papel = papel;
	}

	public List<Perfis> getPerfils() {
		return perfils;
	}

	public void setPerfils(List<Perfis> perfils) {
		this.perfils = perfils;
	}

	public List<Permissoes> getPermissoes() {
		return permissoes;
	}

	public void setPermissoes(List<Permissoes> permissoes) {
		this.permissoes = permissoes;
	}
	
	public Usuario toUsuario() {
		Usuario usuario = new Usuario();
		usuario.setNomeUsuario(getNomeUsuario());
		usuario.setPapel(getPapel());
		usuario.setPerfils(getPerfils());
		return usuario;
	}

	public boolean isAtivo() {
		return ativo;
	}

	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}

	public String getNomeCompleto() {
		return nomeCompleto;
	}

	public void setNomeCompleto(String nomeCompleto) {
		this.nomeCompleto = nomeCompleto;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getSiape() {
		return siape;
	}

	public void setSiape(Long siape) {
		this.siape = siape;
	}

	public boolean isAcessoInscricaoTemp() {
		return acessoInscricaoTemp;
	}

	public void setAcessoInscricaoTemp(boolean acessoInscricaoTemp) {
		this.acessoInscricaoTemp = acessoInscricaoTemp;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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
