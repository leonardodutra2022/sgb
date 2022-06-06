package br.ufc.crateus.sgb.model.enums;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Enum contém todos os perfis para a parte de segurança do sistema, onde elecam quais permissões cada perfil possui, pela qual o usuário vai ter.
 * @author Leonardo Dutra
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Perfis {
	
	admin("Administrador", 
			Arrays.asList(
					Permissoes.add_user, Permissoes.edit_user, Permissoes.delete_user, Permissoes.view_user,
					Permissoes.add_aluno, Permissoes.edit_aluno, Permissoes.delete_aluno, Permissoes.view_aluno,
					Permissoes.add_beneficio, Permissoes.edit_beneficio, Permissoes.delete_beneficio, Permissoes.view_beneficio,
					Permissoes.add_concessao, Permissoes.edit_concessao, Permissoes.delete_concessao, Permissoes.view_concessao,
					Permissoes.add_cronograma, Permissoes.edit_cronograma, Permissoes.delete_cronograma, Permissoes.view_cronograma,
					Permissoes.add_dados_acad, Permissoes.edit_dados_acad, Permissoes.delete_dados_acad, Permissoes.view_dados_acad,
					Permissoes.add_documentacao, Permissoes.edit_documentacao, Permissoes.delete_documentacao, Permissoes.view_documentacao,
					Permissoes.add_entrevista, Permissoes.edit_entrevista, Permissoes.delete_entrevista, Permissoes.view_entrevista,
					Permissoes.add_inscricao, Permissoes.edit_inscricao, Permissoes.delete_inscricao, Permissoes.view_inscricao,
					Permissoes.add_logradouro, Permissoes.edit_logradouro, Permissoes.delete_logradouro, Permissoes.view_logradouro,
					Permissoes.add_processo, Permissoes.edit_processo, Permissoes.delete_processo, Permissoes.view_processo,
					Permissoes.add_recurso, Permissoes.edit_recurso, Permissoes.delete_recurso, Permissoes.view_recurso,
					Permissoes.add_socioecon, Permissoes.edit_socioecon, Permissoes.delete_socioecon, Permissoes.view_socioecon,
					Permissoes.add_frequencia_registro, Permissoes.edit_frequencia_registro, Permissoes.delete_frequencia_registro, Permissoes.view_frequencia_registro,
					Permissoes.add_frequencia, Permissoes.edit_frequencia, Permissoes.delete_frequencia, Permissoes.view_frequencia,
					Permissoes.add_projeto, Permissoes.edit_projeto, Permissoes.delete_projeto, Permissoes.view_projeto,
					Permissoes.add_periodo, Permissoes.edit_periodo, Permissoes.delete_periodo, Permissoes.view_periodo,
					Permissoes.edit_sistema

			)),
	membro_comissao("Membro", 
			Arrays.asList(
					Permissoes.add_user, Permissoes.edit_user, Permissoes.view_user,
					Permissoes.add_aluno, Permissoes.edit_aluno, Permissoes.view_aluno,
					Permissoes.add_beneficio, Permissoes.edit_beneficio, Permissoes.view_beneficio,
					Permissoes.add_concessao, Permissoes.edit_concessao, Permissoes.delete_concessao, Permissoes.view_concessao,
					Permissoes.add_cronograma, Permissoes.edit_cronograma, Permissoes.delete_cronograma, Permissoes.view_cronograma,
					Permissoes.add_dados_acad, Permissoes.edit_dados_acad, Permissoes.view_dados_acad,
					Permissoes.add_documentacao, Permissoes.edit_documentacao, Permissoes.view_documentacao,
					Permissoes.add_entrevista, Permissoes.edit_entrevista, Permissoes.view_entrevista,
					Permissoes.view_inscricao, Permissoes.edit_inscricao,
					Permissoes.add_logradouro, Permissoes.edit_logradouro, Permissoes.delete_logradouro, Permissoes.view_logradouro,
					Permissoes.add_processo, Permissoes.edit_processo, Permissoes.view_processo,
					Permissoes.edit_recurso, Permissoes.view_recurso,
					Permissoes.view_socioecon,
					Permissoes.add_frequencia_registro, Permissoes.view_frequencia_registro,
					Permissoes.add_frequencia, Permissoes.view_frequencia, Permissoes.edit_frequencia,
					Permissoes.add_projeto, Permissoes.edit_projeto, Permissoes.delete_projeto, Permissoes.view_projeto,
					Permissoes.add_periodo, Permissoes.edit_periodo, Permissoes.delete_periodo, Permissoes.view_periodo
			)),
	aluno("Aluno", 
			Arrays.asList(
					Permissoes.view_user,
					Permissoes.add_aluno, Permissoes.edit_aluno, Permissoes.view_aluno,
					Permissoes.view_beneficio,
					Permissoes.view_concessao,
					Permissoes.view_cronograma,
					Permissoes.add_dados_acad, Permissoes.edit_dados_acad, Permissoes.view_dados_acad, Permissoes.delete_dados_acad,
					Permissoes.view_documentacao,
					Permissoes.view_entrevista,
					Permissoes.add_inscricao, Permissoes.edit_inscricao, Permissoes.view_inscricao,
					Permissoes.add_logradouro, Permissoes.edit_logradouro, Permissoes.view_logradouro,
					Permissoes.view_processo,
					Permissoes.add_recurso, Permissoes.edit_recurso, Permissoes.view_recurso,
					Permissoes.add_socioecon, Permissoes.edit_socioecon, Permissoes.view_socioecon, Permissoes.delete_socioecon,
					Permissoes.add_frequencia_registro, Permissoes.view_frequencia_registro, Permissoes.delete_frequencia_registro, Permissoes.edit_frequencia_registro,
					Permissoes.view_frequencia,
					Permissoes.view_projeto,
					Permissoes.view_periodo					
			)),
	tae("Tecnico_Administrativo",
			Arrays.asList(
					Permissoes.view_user, Permissoes.add_user, Permissoes.edit_user,
					Permissoes.view_aluno,
					Permissoes.view_beneficio,
					Permissoes.view_concessao,
					Permissoes.view_cronograma,
					Permissoes.view_dados_acad,
					Permissoes.view_documentacao,
					Permissoes.view_entrevista,
					Permissoes.view_inscricao,
					Permissoes.view_logradouro,
					Permissoes.view_processo,
					Permissoes.view_frequencia_registro, 
					Permissoes.view_frequencia, Permissoes.edit_frequencia,
					Permissoes.view_projeto,
					Permissoes.view_periodo
					
			)),
	docente("Docente", 
			Arrays.asList(
					Permissoes.view_user,
					Permissoes.view_aluno,
					Permissoes.view_beneficio,
					Permissoes.view_frequencia, Permissoes.edit_frequencia, Permissoes.add_frequencia,
					Permissoes.view_frequencia_registro, Permissoes.add_frequencia_registro, Permissoes.edit_frequencia_registro,   
					Permissoes.view_projeto,
					Permissoes.view_periodo
					));
	
	
	@JsonIgnore
	private List<Permissoes> permissoes = new ArrayList<>();
	private String nome;
	private String atributo;
	
	
	private Perfis(String nome, List<Permissoes> permissoes) {
		this.nome = nome;
		this.atributo = name();
		this.permissoes.addAll(permissoes);
	}
	
	public List<Permissoes> getPermissoes(){
		return permissoes;
	}
	
	public void setPermissoes(List<Permissoes> permissoes) {
		this.permissoes = permissoes;
	}
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public String getAtributo() {
		return atributo;
	}

	public void setAtributo(String atributo) {
		this.atributo = atributo;
	}

	public static List<String> getValuesNomes(){
		List<String> listRetorno = new ArrayList<String>();
		for(Perfis perfis : values()) {
			listRetorno.add(perfis.getNome());
		}
		return listRetorno;
	}
}
