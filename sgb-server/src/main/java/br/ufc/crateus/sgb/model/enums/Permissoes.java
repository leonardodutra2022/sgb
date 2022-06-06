package br.ufc.crateus.sgb.model.enums;

import org.springframework.security.core.GrantedAuthority;

/**
 * Enum contém todas as permissões existentes para o sistema
 * @author Leonardo Dutra
 */
public enum Permissoes implements GrantedAuthority {
	add_user,
	view_user,
	edit_user,
	delete_user,
	
	add_aluno,
	view_aluno,
	edit_aluno,
	delete_aluno,
	
	add_beneficio,
	view_beneficio,
	edit_beneficio,
	delete_beneficio,
	
	add_concessao,
	view_concessao,
	edit_concessao,
	delete_concessao,
	
	add_cronograma,
	view_cronograma,
	edit_cronograma,
	delete_cronograma,
	
	add_dados_acad,
	view_dados_acad,
	edit_dados_acad,
	delete_dados_acad,
	
	add_documentacao,
	view_documentacao,
	edit_documentacao,
	delete_documentacao,
	
	add_entrevista,
	view_entrevista,
	edit_entrevista,
	delete_entrevista,
	
	add_inscricao,
	view_inscricao,
	edit_inscricao,
	delete_inscricao,
	
	add_logradouro,
	view_logradouro,
	edit_logradouro,
	delete_logradouro,
	
	add_processo,
	view_processo,
	edit_processo,
	delete_processo,
	
	add_recurso,
	view_recurso,
	edit_recurso,
	delete_recurso,
	
	add_socioecon,
	view_socioecon,
	edit_socioecon,
	delete_socioecon,

	add_frequencia_registro,
	view_frequencia_registro,
	edit_frequencia_registro,
	delete_frequencia_registro,
	
	add_frequencia,
	view_frequencia,
	edit_frequencia,
	delete_frequencia,
	
	add_projeto,
	view_projeto,
	edit_projeto,
	delete_projeto,
	
	add_periodo,
	view_periodo,
	edit_periodo,
	delete_periodo,
	
	edit_sistema;
	
	@Override
	public String getAuthority() {
		return this.name();
	}

}
